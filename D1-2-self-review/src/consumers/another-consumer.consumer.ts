import { codesePool, query } from "../configs/database.config"
import { KAFKA_TOPIC } from "../constants/kafka.constant"
import { IConsumer } from "../interfaces/IConsumer.interface"

const processorTestOtherGroup = async ({ topic, partition, message }) => {
    try {
        const { code, exchange, tradingDate, askPrice1, askPrice2, askPrice3, askVol1, askVol2, askVol3, bidPrice1, bidPrice2,
            bidPrice3, bidVol1, bidVol2, bidVol3, lastPrice, totalVol, refPrice } = JSON.parse(message.value.toString())

        const sql = "insert into `stock` (code,exchange,`tradingDate`,askPrice1,askPrice2,askPrice3,askVol1,askVol2,askVol3,bidPrice1,bidPrice2," +
            "bidPrice3, bidVol1, bidVol2, bidVol3, lastPrice, totalVol, refPrice) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        await query(codesePool, sql, [code, exchange, tradingDate, askPrice1, askPrice2, askPrice3, askVol1, askVol2, askVol3, bidPrice1, bidPrice2,
            bidPrice3, bidVol1, bidVol2, bidVol3, lastPrice, totalVol, refPrice])

    } catch (error) {
        console.error(`OTHER GROUP ERROR: ======,  ${error}`)
    }
}

export const SyncStoreStock: IConsumer = {
    name: 'handle-something',
    fromBeginning: true,
    topicSubscribe: KAFKA_TOPIC.CODESE,
    groupId: 'other-group:handle-something',
    processor: processorTestOtherGroup
}