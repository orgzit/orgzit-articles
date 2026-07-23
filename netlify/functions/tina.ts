import express, { type Request, type Response, type NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import ServerlessHttp from 'serverless-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { TinaNodeBackend, type BackendAuthProvider } from '@tinacms/datalayer';
import databaseClient from '../../tina/__generated__/databaseClient';

dotenv.config();

// Independent of the /admin page gate (netlify/edge-functions/admin-gate.ts) —
// this is what actually stops someone from POSTing GraphQL mutations straight
// to this endpoint without ever going through the /admin UI.
const sharedPasswordAuthProvider: BackendAuthProvider = {
  isAuthorized: async (req) => {
    const auth = req.headers['authorization'];
    if (auth === `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return { isAuthorized: true };
    }
    return { isAuthorized: false, errorMessage: 'Unauthorized', errorCode: 401 };
  },
};

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const tinaBackend = TinaNodeBackend({
  authProvider: sharedPasswordAuthProvider,
  databaseClient,
});

// Express 5 (path-to-regexp v8+) requires a named wildcard segment —
// bare '*' throws "Missing parameter name" at startup.
app.all('/api/tina/*splat', (req: Request, res: Response, _next: NextFunction) => tinaBackend(req, res));

export const handler = ServerlessHttp(app);
