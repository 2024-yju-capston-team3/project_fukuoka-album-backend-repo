import { Express } from 'express';
import { Auth } from './auth'

export const routes = (app: Express) => {
  app.use('/auth', Auth());
}
