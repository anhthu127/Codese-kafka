import express, { Request, Response } from "express";

const router = express.Router();

const app = express();
app.use(router);
router.get("/api/payment", async (req: Request, res: Response) => {
  res.send({
    code: 1,
    data: "payment payment ",
  });
});

app.listen(3006, () => {
  console.log("payment:3006");
});
