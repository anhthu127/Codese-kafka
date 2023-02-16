import { kafkaClient } from "../configs/kafka.config";
import { IConsumer } from "../interfaces/IConsumer.interface";
import { SyncErrorHandlerConsumer } from "./sync-demo-dlq-retry-insert.consumer";
import { SyncStockPriceConsumer } from "./sync-stock-price.consumer";

async function initConsumer(consumerInfo: IConsumer) {
    const consumer = kafkaClient.consumer({ groupId: consumerInfo.groupId })
    await consumer.connect()
    console.log("11111111");

    await consumer.subscribe({
        topic: consumerInfo.topicSubscribe,
        fromBeginning: consumerInfo.fromBeginning
    })
    console.log("222222222", consumerInfo.topicSubscribe);

    await consumer.run({
        eachMessage: consumerInfo.processor,
        autoCommit: true,
        autoCommitThreshold: 100,
        autoCommitInterval: 5000
    })
}


async function main() {
    await initConsumer(SyncErrorHandlerConsumer)
}

main()