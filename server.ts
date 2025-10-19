
import express from 'express';
import { createServer } from 'http';
import next from 'next';
import { initSocket } from './server/config/socket';



const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);

  // ✅ Attach Socket.IO
  initSocket(httpServer);

  // Next.js route handling
  server.all('*', (req, res) => handle(req, res));

  httpServer.listen(3000, () => {
    console.log('> Server running on http://localhost:3000');
  });
});
