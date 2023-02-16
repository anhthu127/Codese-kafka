import { codesePool, query } from "../configs/database.config";
import { KAFKA_TOPIC } from "../constants/kafka.constant";
import { IConsumer } from "../interfaces/IConsumer.interface";

const processor = async ({ message }) => {
    let tryTimes = 0;

    try {
        while (tryTimes <= 3) {
            const data = JSON.parse(message.value.toString())
            console.log(data);
            const sqlInsertErrorLog = "insert into `error-log` (messageLog, timeLog) value(?,?)"
            await query(codesePool, sqlInsertErrorLog, [message, new Date()]);
        }
    } catch (error) {
        tryTimes += 1
        console.error("- -- - - - - - - - - - - - :       ", error)

    }
}

//  DLQ: Dead Letter Queue
export const SyncErrorHandlerConsumer: IConsumer = {
    name: 'sync-stock-dlq',
    fromBeginning: false,
    topicSubscribe: KAFKA_TOPIC.DLQ,
    groupId: `operation-group: ${KAFKA_TOPIC.DLQ}`,
    processor
}