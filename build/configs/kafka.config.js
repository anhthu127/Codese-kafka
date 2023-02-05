"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.producer = exports.kafkaClient = exports.isProducerConnected = void 0;
const kafkajs_1 = require("kafkajs");
exports.isProducerConnected = false;
exports.kafkaClient = new kafkajs_1.Kafka({
    clientId: 'codese-client-id',
    brokers: ['localhost:9092'],
    retry: {
        retries: 5
    },
});
exports.producer = exports.kafkaClient.producer({
    createPartitioner: kafkajs_1.Partitioners.LegacyPartitioner
});
exports.producer.connect();
exports.producer.on('producer.connect', () => {
    exports.isProducerConnected = true;
});
