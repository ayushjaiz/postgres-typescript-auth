import express from "express";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv"
import { connectToDB, createUserTable } from "./config/dbConfig";

dotenv.config({ path: `${process.cwd()}/.env` });
const app = express();

const port = process.env.APP_PORT || 3000;

// Creates user table
createUserTable();

app.use(express.json());
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Response from server');
})

app.listen(port, async () => {
    console.log(`Server running at localhost:${port}`)
    try {
        await connectToDB();
    } catch (e) {
        console.log(e);
    }
});