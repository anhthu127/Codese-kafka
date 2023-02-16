import { codesePool, query } from "../configs/database.config";

export const createStockTable = async () => {
    const sqlCreateTableStock = "CREATE TABLE IF NOT EXISTS `stock-price` (id INT NOT NULL AUTO_INCREMENT, code VARCHAR(45) NOT NULL, exchange VARCHAR(45) NULL, tradingDate VARCHAR(45) NULL, askPrice1 INT NULL, askPrice2 INT NULL, askPrice3 INT NULL, askVol1 INT NULL, askVol2 INT NULL, askVol3 INT NULL, bidPrice1 INT NULL, bidPrice2 INT NULL, bidPrice3 INT NULL, bidVol1 INT NULL, bidVol2 INT NULL, bidVol3 INT NULL, lastPrice INT NULL, totalVol INT NULL, refPrice INT NULL, timeStamp TIMESTAMP, PRIMARY KEY (id)) ;";
    await query(codesePool, sqlCreateTableStock);
};