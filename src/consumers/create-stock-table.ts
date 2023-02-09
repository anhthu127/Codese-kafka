import { codesePool, query } from "../configs/database.config";
import { KAFKA_TOPIC } from "../constants/kafka.constant";
import { IConsumer } from "../interfaces/IConsumer.interface";
const processor = async ({ topic, partition, message }) => {
  try {
    console.log(topic);
    console.log(partition);

    const data = JSON.parse(message.value.toString());
    const { code, exchange, tradingDate, askPrice1, askVol1 } = data;

    const sqlCheckCodeExist = `select * from stocksCode where code = ?`;
    const isExisted = await query(codesePool, sqlCheckCodeExist, [code]);
    const sqlInsertStockTransaction = `insert into ? (code,exchange,tradingDate,askPrice1,askVol1) values (?,?,?,?,?) `;

    if (isExisted.length < 1) {
      const sqlInsertCodeStock = `insert into stocksCode (code) values (?)`;
      const sqlCreateTableStock = `CREATE TABLE ? (code varchar,   exchange int,  tradingDate datetime,  askPrice1 int,  askVol1 int)   `;
      await query(codesePool, sqlInsertCodeStock, [code]);
      await query(codesePool, sqlCreateTableStock, [code.toUpperCase()]);
    }
    await query(codesePool, sqlInsertStockTransaction, [
      code.toUpperCase(),
      code,
      exchange,
      tradingDate,
      askPrice1,
      askVol1,
    ]);
  } catch (error) {
    console.error(error);
  }
};
export const SyncStockTableConsumer: IConsumer = {
  name: "create-stock-table",
  fromBeginning: false,
  topicSubscribe: KAFKA_TOPIC.CREATE_STOCK_TABLE,
  groupId: "operation-group:create-stock-table",
  processor,
};
