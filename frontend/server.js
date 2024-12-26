const app = require('./app');
const { createServer } = require('http');

const server = createServer(app);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});