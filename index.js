import http from "http";
import app from './app.js'

const server = http.createServer( app );

server.listen(3000, "0.0.0.0", () => {
  console.log("⏺️ Server listening in http://localhost:3000");
});
