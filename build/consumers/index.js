"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafka_config_1 = require("../configs/kafka.config");
const sync_stock_price_consumer_1 = require("./sync-stock-price.consumer");
function initConsumer(consumerInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const consumer = kafka_config_1.kafkaClient.consumer({ groupId: consumerInfo.groupId });
        yield consumer.connect();
        yield consumer.subscribe({
            topic: consumerInfo.topicSubscribe,
            fromBeginning: consumerInfo.fromBeginning
        });
        yield consumer.run({
            eachMessage: consumerInfo.processor,
            autoCommit: true,
            autoCommitThreshold: 100,
            autoCommitInterval: 5000
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield initConsumer(sync_stock_price_consumer_1.SyncStockPriceConsumer);
    });
}
main();
