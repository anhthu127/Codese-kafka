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
exports.SyncStockTableConsumer = void 0;
const database_config_1 = require("../configs/database.config");
const kafka_constant_1 = require("../constants/kafka.constant");
const fs_1 = __importDefault(require("fs"));
const create_stock_table_repo_1 = require("../repo/create-stock-table-repo");
const listStockFileName = "stock-codes.txt";
const processor = ({ topic, partition, message }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = JSON.parse(message.value.toString());
        const { code, exchange, tradingDate, askPrice1, askVol1 } = data;
        let isExist = false;
        fs_1.default.readFile(listStockFileName, function (err, buf) {
            isExist = buf.toString().includes(code);
        });
        if (!isExist) {
            yield (0, create_stock_table_repo_1.createStockTable)(data);
            fs_1.default.appendFile(listStockFileName, `, ${code}`, function (err) {
                if (err)
                    throw err;
                console.log("Saved!");
            });
        }
        const sqlInsertStockTransaction = `insert into ? (code,exchange,tradingDate,askPrice1,askVol1) values (?,?,?,?,?) `;
        yield (0, database_config_1.query)(database_config_1.codesePool, sqlInsertStockTransaction, [
            code.toUpperCase(),
            code,
            exchange,
            tradingDate,
            askPrice1,
            askVol1,
        ]);
    }
    catch (error) {
        console.error(error);
    }
});
exports.SyncStockTableConsumer = {
    name: "create-stock-table",
    fromBeginning: false,
    topicSubscribe: kafka_constant_1.KAFKA_TOPIC.CREATE_STOCK_TABLE,
    groupId: "operation-group:create-stock-table",
    processor,
};
