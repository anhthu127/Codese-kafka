import { codesePool, query } from "../configs/database.config";
import { isProducerConnected } from "../configs/kafka.config";
import { KAFKA_TOPIC } from "../constants/kafka.constant";
import { IConsumer } from "../interfaces/IConsumer.interface";
import { produceErrorsHandler } from "../producers/handling-errors.producer";
const processor = async ({ message }) => {
    try {
        const data = JSON.parse(message.value.toString())
        const {
            code,
            exchange,
            tradingDate,
            askPrice1,
            askPrice2,
            askPrice3,
            askVol1,
            askVol2,
            askVol3,
            bidPrice1,
            bidPrice2,
            bidPrice3,
            bidVol1,
            bidVol2,
            bidVol3,
            lastPrice,
            totalVol,
            refPrice,
        } = data;

        if (askPrice1 % 2 != 0) {
            throw Error('Retry message ');
        }

        const sql = "insert into `stock-price` (code, exchange, tradingDate, askPrice1, askPrice2, askPrice3, askVol1, askVol2, askVol3, bidPrice1, bidPrice2, bidPrice3, bidVol1, bidVol2, bidVol3, lastPrice, totalVol, refPrice) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) on duplicate key update exchange=?, tradingDate=?, askPrice1=?, askPrice2=?, askPrice3=?, askVol1=?, askVol2=?, askVol3=?, bidPrice1=?, bidPrice2=?, bidPrice3=?, bidVol1=?, bidVol2=?, bidVol3=?, lastPrice=?, totalVol=?, refPrice=?";

        await query(codesePool, sql, [
            code,
            exchange,
            tradingDate,
            askPrice1,
            askPrice2,
            askPrice3,
            askVol1,
            askVol2,
            askVol3,
            bidPrice1,
            bidPrice2,
            bidPrice3,
            bidVol1,
            bidVol2,
            bidVol3,
            lastPrice,
            totalVol,
            refPrice,
            // conditions section
            exchange,
            tradingDate,
            askPrice1,
            askPrice2,
            askPrice3,
            askVol1,
            askVol2,
            askVol3,
            bidPrice1,
            bidPrice2,
            bidPrice3,
            bidVol1,
            bidVol2,
            bidVol3,
            lastPrice,
            totalVol,
            refPrice,
        ]);

    } catch (error) {
        console.error("- -- - - - - - - - - - - - :       ", error)
        if (isProducerConnected) {
            produceErrorsHandler(message.code, JSON.stringify(message))
        }
    }
}

export const SyncStockPriceConsumer: IConsumer = {
    name: 'sync-stock-price',
    fromBeginning: false,
    topicSubscribe: KAFKA_TOPIC.CODESE,
    groupId: 'operation-group:sync-stock-price',
    processor
}