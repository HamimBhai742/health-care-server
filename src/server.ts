import { Server } from 'http';
import { prisma } from './config/prisma.config';
import { ENV } from './config/env';
import { app } from './app';

let server: Server;

async function main() {
  try {
    await prisma.$connect();
    console.log('Connect Db');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

async function startServer() {
  try {
    await main();
    server = app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startServer();
