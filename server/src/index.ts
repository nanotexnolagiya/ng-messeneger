import {App, Socket} from './Application';
import { logger } from './logger'
import * as mongoose from "mongoose";
import config from "./config";
import * as socket from 'socket.io'

mongoose.connect(
  config.mongoDbUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(() => {
  const server = App.listen(config.port);
  const io = socket(server)
  new Socket(io)
  server.on('listening', () =>
    logger.info('Application started on http://%s:%d', config.host, config.port)
  );
})

process.on('unhandledRejection', (reason, p) =>
  {
    logger.error('Unhandled Rejection at: Promise ')
    p.catch(console.log)
  }
).on('uncaughtException', err => {
  logger.error('Uncaught Exception thrown', err);
  process.exit(1);
});
