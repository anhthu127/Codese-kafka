import { codesePool, query } from "../configs/database.config";

export const catchErrorLog = async (message, time) => {
    console.log("--------------  ", message, time);

    const sqlInsertErrorLog = `insert into "error-log" (messageLog, timeLog) value(?,?)`
    await query(codesePool, sqlInsertErrorLog, [message, time]);
};
