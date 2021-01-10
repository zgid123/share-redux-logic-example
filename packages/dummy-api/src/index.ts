import 'module-alias/register';

import * as path from 'path';
import * as http from 'http';

import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import compress from 'compression';
import bodyParser from 'body-parser';

import env from '@config/env';
import initRouter from '@initializers/initRouter';
import exceptionHandler from '@middlewares/exceptionHandler';
import initGlobalVariables from '@initializers/initGlobalVariables';

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(compress());
app.use(morgan('common'));
app.use(
  cors({
    origin: [/localhost:/],
  }),
);

initGlobalVariables();

initRouter(app).then(() => {
  app.use(exceptionHandler);

  server.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Express server listening on port ${env.port}, in ${process.env.NODE_ENV} mode`,
    );
  });
});
