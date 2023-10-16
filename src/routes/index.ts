import { Express } from "express";
import { Auth } from "./auth";
import { Upload } from "./upload";

export const routes = (app: Express) => {
	app.use("/auth", Auth());
	app.use("/upload", Upload());
};
