import { makeServer } from "./makeServer";
let server: any;

export function startServer() {
  if (process.env.NODE_ENV === "development" && !server) {
    server = makeServer();
  }
}