import express, { Request, Response } from "express";
import { signIn } from "../controller/auth"
const router = express.Router();

export const Auth = () => {
  router.get('/', async (req: Request, res: Response) => {
    const credential = req.headers.authorization;

    const user = await signIn(credential);

    res.json(user);
  })

  return router;
}
