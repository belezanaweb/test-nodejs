const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

require("./api/routes/products")(app, false);

app.listen(port, () => {
  console.log(`Belezanaweb api listening at http://localhost:${port}`);
});
