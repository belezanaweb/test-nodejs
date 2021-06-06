import express from "express";

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "hi :D" });
});

app.listen(3333);
