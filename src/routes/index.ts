import { Express } from "express";
import { Auth } from "./auth";
import { Upload } from "./upload";
import { User } from "./user";

export const routes = (app: Express) => {
	app.use("/auth", Auth());
	app.use("/upload", Upload());
	app.use("/user", User());
};
