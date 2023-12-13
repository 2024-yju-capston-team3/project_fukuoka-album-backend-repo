import express, { Express } from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { Upload } from "./routes/upload";
config();

const app: Express = express();

app.use(
	cors({
		origin: process.env.ORIGIN,
		credentials: true,
	})
);

app.use(morgan("dev"));
app.use(express.json());
app.use("/upload", Upload());

app.listen(process.env.PORT, () => {
	console.log(process.env.PORT);
});
