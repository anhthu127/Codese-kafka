import { isProducerConnected, producer } from "../configs/kafka.config";
import { KAFKA_TOPIC } from "../constants/kafka.constant";

export async function produceErrorsHandler(key: string, value: string) {
    if (isProducerConnected) {
        await producer.send({
            topic: KAFKA_TOPIC.DLQ,
            messages: [
                {
                    key,
                    value,
                },
            ],
        });
    }
}
