const express = require('express')
const { Kafka } = require('kafkajs')
const mysql = require("mysql");
const moment = require("moment");
const CircularJSON = require("circular-json")

const port = 9000
const ss = "http://localhost:3000"

const app = express()
const { io } = require("socket.io-client");

const socket = io(ss);
const DB_CONFIG = {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "kafka",
    port: 8080,
};
const connection = mysql.createConnection(DB_CONFIG)

// const createTableSql = " CREATE TABLE `stock-code` (id INT(8)  NOT NULL AUTO_INCREMENT, code VARCHAR(255) unique, exchange VARCHAR(255), tradingDate VARCHAR(255), askPrice1 VARCHAR(255), askPrice2 VARCHAR(255), PRIMARY KEY (id));";

// connection.query("DROP TABLE IF EXISTS`stock-code` ;")
// new Promise((resolve, reject) => {
//     connection.query(createTableSql, [], (err, data) => {
//         if (err) return reject("CREATED TABLE FAILURE:    ", err);
//         return resolve(data);
//     });
// });


const excuteQuery = async (SQLSTR, PARAMS) => {
    return await new Promise((resolve, reject) => {
        console.log("sql command    ", mysql.format(SQLSTR, PARAMS));

        connection.query(SQLSTR, PARAMS, (err, data) => {
            if (err) return reject("SQL ERROR:  ====     ", err);
            return resolve(data);
        });
    });
}

const insertIntoTable = async (stockInfo) => {

    console.log("stockInfo     ", stockInfo);
    const { code, exchange, tradingDate, askPrice1, askPrice2 } = stockInfo
    const sqlExist = "Select * from `stock-code` where code = ?"
    const isExist = await excuteQuery(sqlExist, [code]);

    const sqlInsertStr = "INSERT INTO `stock-code` (code, exchange, tradingDate, askPrice1, askPrice2) VALUES (?,?,?,?,?) ";
    const sqlUpdateStr = "UPDATE `stock-code` SET exchange = ? , tradingDate=? , askPrice1=?, askPrice2=? where code =? ";
    if (isExist.length === 0) {
        await excuteQuery(sqlInsertStr, [code, exchange, tradingDate, askPrice1, askPrice2]);

    } else {
        await excuteQuery(sqlUpdateStr, [exchange, tradingDate, askPrice1, askPrice2, code]);


    }
}

const kafka = new Kafka({
    clientId: 'client-self-name',
    brokers: ["127.0.0.1:9092"]
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'NewGroup2' })
const topic = 'topic3'

const kafkaConnect = async () => {
    await producer.connect()
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
    readMessages()

}

kafkaConnect();
const sendToQueue = async (stockPrice) => {
    await producer.send({
        topic,
        messages: [
            { value: CircularJSON.stringify(stockPrice) },
        ],
    })
}
const readMessages = async () => {
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message) {
                await insertIntoTable(JSON.parse(message.value.toString()))

            }
        },
    })
}

try {
    socket.on('stockPrice', (dataSocket) => {
        sendToQueue(dataSocket)
    })
} catch (error) {
    throw error;

}

