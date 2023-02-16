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
const express_1 = __importDefault(require("express"));
const database_config_1 = require("./configs/database.config");
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const create_log_table_repo_1 = require("./repo/create-log-table.repo");
const router = express_1.default.Router();
const app = (0, express_1.default)();
app.use(router);
const server = http_1.default.createServer(app);
fs_1.default.writeFileSync("stock-codes.txt", "");
const getStockTransaction = (stockCode) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `select * from StockPrice where code='${stockCode}'`;
    const result = yield (0, database_config_1.query)(database_config_1.codesePool, sql);
    return result;
});
router.get("/api/stock-chart-data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    const result = yield getStockTransaction(code);
    res.send({
        code: 1,
        data: result,
    });
}));
(0, create_log_table_repo_1.createErrorsLogTable)();
server.listen(3003, () => {
    console.log("*:3003");
});
