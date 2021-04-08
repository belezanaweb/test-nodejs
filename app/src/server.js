import app from "./app.js";

const PORT = process.env.PORT ? process.env.PORT : 8080;

app.listen(PORT);
console.log(`Server running: ${PORT}`);
