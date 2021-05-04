import express, { Request, Response, Router } from "express";
import { connection } from "../config/db";
import { userType } from "../types/user";
const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Successfully Working...",
  });
});

router.post("/create", (req: Request, res: Response) => {
  const data:userType = {
    firstName: req.body.first,
    lastName: req.body.last,
    email: req.body.email,
    mobile: req.body.mobile,
  };
  connection.query("Insert into user set ?", data, (err, result) => {
    if (err) {
      res.json({
        msg: "error",
        error: err,
      });
    } else {
      res.status(200).json({
        msg: "SuccessFully Created User",
        data: result,
      });
    }
  });
});

router.get("/get-details", (req: Request, res: Response) => {
  connection.query("select * from user", (err, result) => {
    if (err) {
      res.json({
        msg: "error",
        error: err,
      });
    } else {
      res.status(200).json({
        msg: "SuccessFully Fetch User Data",
        data: result,
      });
    }
  });
});

router.put("/update/:id", (req: Request, res: Response) => {
  const data :userType = {
    firstName: req.body.first,
    lastName: req.body.last,
    email: req.body.email,
    mobile: req.body.mobile,
  };
  connection.query(`update user set ? where id=${req.params.id}`,data,(err, result) => {
      if (err) {
        res.json({
          msg: "error",
          error: err,
        });
      } else {
        res.json({
          msg: "successFully Updated User",
          data: result,
        });
      }
    }
  );
});

router.delete("/delete/:id", (req: Request, res: Response) => {
  connection.query(`delete from user where id=${req.params.id}`,(err, result) => {
      if (err) {
        res.json({
          msg: "error",
          error: err,
        });
      } else {
        res.json({
          msg: "SuccessFully Deleted User",
          data: result,
        });
      }
    }
  );
});

export default router;