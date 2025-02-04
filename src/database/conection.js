import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: "localhost",
    user: "alexander",
    password: "Alex@nder",
    port: 3306,
    database: "companies"
})