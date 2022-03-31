const app = require("./app");
const port = 3000; // todo migrate to process.env

app.listen(port, () =>
  console.log(`Products API is listening at http://localhost:${port}`)
);
