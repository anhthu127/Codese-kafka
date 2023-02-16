import express, { Request, Response } from "express";

const router = express.Router();

const app = express();
app.use(router);
router.get("/api/delivery", async (req: Request, res: Response) => {
  res.send({
    code: 1,
    data: "already delivery ",
  });
});

app.listen(3004, () => {
  console.log("delivery:3004");
});
