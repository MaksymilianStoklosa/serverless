import createAPI from "lambda-api";

export const api = createAPI({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
  },
});

// @ts-ignore
api.get("/", async (_, res) => {
  res.status(202).json({ status: "ok" });
});

api.routes(true);
