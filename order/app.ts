import express, { Request, Response } from "express";

const router = express.Router();

const app = express();
app.use(router);
router.get("/api/order", async (req: Request, res: Response) => {
  res.send({
    code: 1,
    data: "order order ",
  });
});

app.listen(3005, () => {
  console.log("order:3005");
});
