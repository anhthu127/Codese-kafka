import moment from "moment";
import { codesePool, query } from "../configs/database.config";
import { KAFKA_TOPIC } from "../constants/kafka.constant";
import { IConsumer } from "../interfaces/IConsumer.interface";
import mysql from 'mysql2'

const processor = async ({ topic, partition, message }) => {
    try {
        const startProcess = moment()

        const data = JSON.parse(message.value.toString())
        const { code, exchange, tradingDate, askPrice1, askPrice2, askPrice3, askVol1, askVol2, askVol3, bidPrice1, bidPrice2,
            bidPrice3, bidVol1, bidVol2, bidVol3, lastPrice, totalVol, refPrice } = data

        const sql = "insert into `stock-price` (code,exchange,`tradingDate`,askPrice1, askPrice2, askPrice3, askVol1, askVol2, askVol3, bidPrice1, bidPrice2," +
            "bidPrice3, bidVol1, bidVol2, bidVol3, lastPrice, totalVol, refPrice) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) on duplicate key update exchange=?, trading_date=?, askPrice1=?, askVol1=? ;"
        console.log(mysql.format(sql, [code, exchange, tradingDate, askPrice1, askPrice2, askPrice3, askVol1, askVol2, askVol3, bidPrice1, bidPrice2,
            bidPrice3, bidVol1, bidVol2, bidVol3, lastPrice, totalVol, refPrice]));

        await query(codesePool, sql, [code, exchange, tradingDate, askPrice1, askPrice2, askPrice3, askVol1, askVol2, askVol3, bidPrice1, bidPrice2,
            bidPrice3, bidVol1, bidVol2, bidVol3, lastPrice, totalVol, refPrice])

        const endProcess = moment()
        console.info(`process_time: ${endProcess.diff(startProcess, 'milliseconds')}ms`)
    } catch (error) {
        console.error(`CONSUMER ERROR: ======,  ${error}`)
    }
}

export const SyncStockPriceConsumer: IConsumer = {
    name: 'sync-stock-price',
    fromBeginning: true,
    topicSubscribe: KAFKA_TOPIC.CODESE,
    groupId: 'operation-group:sync-stock-price',
    processor
}