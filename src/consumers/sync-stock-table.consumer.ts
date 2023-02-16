import { codesePool, query } from "../configs/database.config";
import { KAFKA_TOPIC } from "../constants/kafka.constant";
import { IConsumer } from "../interfaces/IConsumer.interface";
import fs from "fs";
import { createStockTable } from "../repo/create-stock-table-repo";
const listStockFileName = "stock-codes.txt";
const processor = async ({ topic, partition, message }) => {
  try {
    const data = JSON.parse(message.value.toString());
    const { code, exchange, tradingDate, askPrice1, askVol1 } = data;
    let isExist = false;
    fs.readFile(listStockFileName, function (err, buf) {
      isExist = buf.toString().includes(code);
    });
    if (!isExist) {
      await createStockTable(data);
      fs.appendFile(listStockFileName, `, ${code}`, function (err) {
        if (err) throw err;
        console.log("Saved!");
      });
    }

    const sqlInsertStockTransaction = `insert into ? (code,exchange,tradingDate,askPrice1,askVol1) values (?,?,?,?,?) `;
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
