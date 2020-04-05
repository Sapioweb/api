import { Server } from './app/server';
import { Exceptions } from "./app/enums";
import { Exception } from "./app/modules/exception";

const { HOST, PORT } = process.env;

if (!HOST || !PORT) {
  throw new Exception({ code: 400, message: Exceptions.HOST_PORT_CONFIGURATION })
}

const server = new Server().app;

server.listen(PORT, () => {
  console.info(`${HOST}:${PORT}`);
});
