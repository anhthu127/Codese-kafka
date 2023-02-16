import { codesePool, query } from "../configs/database.config";

export const createErrorsLogTable = async () => {
    const sqlCreateTableLog = "CREATE TABLE IF NOT EXISTS `error-log` (id int  NOT NULL AUTO_INCREMENT, messageError varchar(256), timeLog datetime, PRIMARY KEY (id))  ";
    await query(codesePool, sqlCreateTableLog);
};