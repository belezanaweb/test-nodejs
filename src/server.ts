import app from './app';
import http from 'http';

const PORT = 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

export = server
