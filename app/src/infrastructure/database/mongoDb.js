import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongoose default connection is open");
});

db.on("error", (err) => {
  // console.log(`Mongoose default connection has occured \n${err}`);
});

db.on("disconnected", () => {
  //  console.log('Mongoose default connection is disconnected');
});

process.on("SIGINT", () => {
  db.close(() => {
    //   console.log(
    //      'Mongoose default connection is disconnected due to application termination'
    //   );
    process.exit(0);
  });
});

export default db;
