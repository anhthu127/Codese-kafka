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
exports.createStockTable = void 0;
const database_config_1 = require("../configs/database.config");
const createStockTable = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = data;
    const sqlCreateTableStock = `CREATE TABLE ? (id int  NOT NULL AUTO_INCREMENT, code varchar,   exchange int,  tradingDate datetime,  askPrice1 int,  askVol1 int)  PRIMARY KEY (id) `;
    yield (0, database_config_1.query)(database_config_1.codesePool, sqlCreateTableStock, [code.toUpperCase()]);
});
exports.createStockTable = createStockTable;
