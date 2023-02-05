import { codesePool, query } from "../configs/database.config"

const createTable = async () => {
    const dropTableSql = "DROP table if exists `stock-price` "
    const createSqlStr = "CREATE table `stock-price` (id int not null  auto_increment , code varchar(256) unique, exchange varchar(256), tradingDate dateTime, askPrice1 int, askPrice2 int, askPrice3 int, askVol1 int, askVol2 int, askVol3 int,"
        + " bidPrice1 int, bidPrice2 int, bidPrice3 int, bidVol1 int, bidVol2 int, bidVol3 int, lastPrice int, totalVol int, refPrice int, primary key (id) ); "

    try {
        await query(codesePool, dropTableSql)
        await query(codesePool, createSqlStr)

    } catch (error) {
        throw error

    }
}

async function main() {
    await createTable()
}

main()
