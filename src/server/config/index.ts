import * as dotenv from "dotenv";

dotenv.config(); // stores the code in 'process.env'

export const dbCredentials = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE
}