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
exports.SyncStockPriceConsumer = void 0;
const database_config_1 = require("../configs/database.config");
const kafka_constant_1 = require("../constants/kafka.constant");
const catch_error_log_repo_1 = require("../repo/catch-error-log.repo");
const processor = ({ topic, partition, message }) => __awaiter(void 0, void 0, void 0, function* () {
    let tryTimes = 0;
    while (tryTimes <= 3) {
        try {
            const data = JSON.parse(message.value.toString());
            const { code, exchange, tradingDate, askPrice1, askVol1 } = data;
            console.log(data, "   ---count---  ", tryTimes);
            const sql = `insert into stock-price (code,exchange,tradingDate,askPrice1,askVol1) values (?,?,?,?,?) on duplicate key update exchange=?, tradingDate=?, askPrice1=?, askVol1=?`;
            yield (0, database_config_1.query)(database_config_1.codesePool, sql, [code, exchange, tradingDate, askPrice1, askVol1, exchange, tradingDate, askPrice1, askVol1]);
        }
        catch (error) {
            (0, catch_error_log_repo_1.catchErrorLog)(JSON.stringify(error), Date());
        }
        tryTimes += 1;
    }
});
exports.SyncStockPriceConsumer = {
    name: 'sync-stock-price',
    fromBeginning: false,
    topicSubscribe: kafka_constant_1.KAFKA_TOPIC.CODESE,
    groupId: 'operation-group:sync-stock-price',
    processor
};
