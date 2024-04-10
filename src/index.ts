import express, { Express, Request, Response } from 'express';
import { Server } from 'http';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

import router from './router';
import whitelist from './middlewares/whitelist';
import globalErrorHandler from './controllers/errorController';

import { env } from './utils/env';

const app: Express = express();

const PORT: number = Number(env.PORT);

// global middlewares
app.use(morgan('dev')); // Development logging
app.use(express.json({ limit: '10kb' })); // reading data from body into req.body
app.use(cookieParser()); // Parse cookies
app.use(compression()); // Compresses requests
app.use(helmet()); // Set security HTTP headers
app.use(whitelist('page', 'regione', 'sort')); // prevent parameter pollution

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 60 minutes).
	message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// routing
app.use('/api', router);
app.all('*', (req: Request, res: Response) => {
	res
		.status(404)
		.json({ message: `Can't find ${req.originalUrl} on this server!` });
});

app.use(globalErrorHandler);

// server setup and start
const server: Server = app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

console.clear();
