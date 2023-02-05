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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncStockPriceConsumer = void 0;
const moment_1 = __importDefault(require("moment"));
const database_config_1 = require("../configs/database.config");
const kafka_constant_1 = require("../constants/kafka.constant");
const processor = ({ topic, partition, message }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startProcess = (0, moment_1.default)();
        const data = JSON.parse(message.value.toString());
        const { code, exchange, tradingDate, askPrice1, askVol1 } = data;
        const sql = `insert into StockPrice (code,exchange,trading_date,askPrice1,askVol1) values (?,?,?,?,?) on duplicate key update exchange=?, trading_date=?, askPrice1=?, askVol1=?`;
        yield (0, database_config_1.query)(database_config_1.codesePool, sql, [code, exchange, tradingDate, askPrice1, askVol1, exchange, tradingDate, askPrice1, askVol1]);
        const endProcess = (0, moment_1.default)();
        console.info(`process_time: ${endProcess.diff(startProcess, 'milliseconds')}ms`);
    }
    catch (error) {
        console.error(error);
    }
});
exports.SyncStockPriceConsumer = {
    name: 'sync-stock-price',
    fromBeginning: false,
    topicSubscribe: kafka_constant_1.KAFKA_TOPIC.CODESE,
    groupId: 'operation-group:sync-stock-price',
    processor
};
