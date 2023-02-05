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
exports.query = exports.codesePool = exports.dbName = exports.dbConfig = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
exports.dbConfig = {
    timezone: 'Asia/Ho_Chi_Minh',
    limitConnection: 5,
};
exports.dbName = {
    marketDb: 'marketDb'
};
exports.codesePool = mysql2_1.default.createPool({
    connectionLimit: exports.dbConfig.limitConnection,
    host: 'localhost',
    port: 3310,
    user: 'root',
    password: 'password',
    database: 'marketDb'
});
const query = (pool, sql, params) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
});
exports.query = query;
