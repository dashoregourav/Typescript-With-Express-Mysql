import express, { Application, Request, Response } from "express";
import { mydb } from "../config/db";
import bodyParser from "body-parser";
import index from "../routes";

const app = express();

const port: number = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", index);

mydb
  .then((port) => {
    app.listen(port, (): void => {
      console.log(`Listening to the port :${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
