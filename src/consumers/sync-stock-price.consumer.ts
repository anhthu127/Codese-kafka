import { codesePool, query } from "../configs/database.config";
import { KAFKA_TOPIC } from "../constants/kafka.constant";
import { IConsumer } from "../interfaces/IConsumer.interface";
import { catchErrorLog } from "../repo/catch-error-log.repo";

const processor = async ({ topic, partition, message }) => {
    let tryTimes = 0;
    while (tryTimes <= 3) {
        try {

            const data = JSON.parse(message.value.toString())
            const { code, exchange, tradingDate, askPrice1, askVol1 } = data
            console.log(data, "   ---count---  ", tryTimes);

            const sql = `insert into stock-price (code,exchange,tradingDate,askPrice1,askVol1) values (?,?,?,?,?) on duplicate key update exchange=?, tradingDate=?, askPrice1=?, askVol1=?`
            await query(codesePool, sql, [code, exchange, tradingDate, askPrice1, askVol1, exchange, tradingDate, askPrice1, askVol1])

        } catch (error) {
            catchErrorLog(JSON.stringify(error), Date())
        }
        tryTimes += 1
    }

}

export const SyncStockPriceConsumer: IConsumer = {
    name: 'sync-stock-price',
    fromBeginning: false,
    topicSubscribe: KAFKA_TOPIC.CODESE,
    groupId: 'operation-group:sync-stock-price',
    processor
}