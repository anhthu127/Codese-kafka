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
const socket_io_client_1 = require("socket.io-client");
const kafka_config_1 = require("../configs/kafka.config");
const kafka_constant_1 = require("../constants/kafka.constant");
function produceMessage(key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        if (kafka_config_1.isProducerConnected) {
            yield kafka_config_1.producer.send({
                topic: kafka_constant_1.KAFKA_TOPIC.CODESE,
                messages: [
                    {
                        key,
                        value,
                    },
                ],
            });
        }
    });
}
function produceStockTransation(key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        if (kafka_config_1.isProducerConnected) {
            yield kafka_config_1.producer.send({
                topic: kafka_constant_1.KAFKA_TOPIC.CODESE,
                messages: [
                    {
                        key,
                        value,
                    },
                ],
            });
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const socket = (0, socket_io_client_1.io)("http://localhost:3000");
        socket.on("stockPrice", (data) => {
            console.log(data);
            produceStockTransation(`${data.code}-${data.type}`, JSON.stringify(data));
        });
    });
}
main();
