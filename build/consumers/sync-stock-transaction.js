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
const kafka_constant_1 = require("../constants/kafka.constant");
const processor = ({ topic, partition, message }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(topic);
        console.log(partition);
        const data = JSON.parse(message.value.toString());
        const { code, exchange, tradingDate, askPrice1, askVol1 } = data;
        // const sql = `insert into StockPrice (code,exchange,trading_date,askPrice1,askVol1) values (?,?,?,?,?) on duplicate key update exchange=?, trading_date=?, askPrice1=?, askVol1=?`
        // await query(codesePool, sql, [code, exchange, tradingDate, askPrice1, askVol1, exchange, tradingDate, askPrice1, askVol1])
    }
    catch (error) {
        console.error(error);
    }
});
exports.SyncStockPriceConsumer = {
    name: 'sync-stock-price',
    fromBeginning: false,
    topicSubscribe: kafka_constant_1.KAFKA_TOPIC.STOCK_TRANSACTION,
    groupId: 'operation-group:sync-stock-price',
    processor
};
