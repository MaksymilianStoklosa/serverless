import express from "express";
import { api } from "./api";
const PORT = 4000;

async function main() {
  const expressApp = express();

  expressApp.use(express.json());
  expressApp.all(/\/.*/, async (req, res) => {
    try {
      const { body, headers, query, url } = req;

      const event = {
        body,
        headers,
        httpMethod: req.method,
        queryStringParameters: query,
        pathParameters: {
          proxy: url.replace("/", ""),
        },
        path: req.path,
      };

      // @ts-expect-error - we don't need context here
      const response: any = await api.run(event);
      Object.entries(response.headers).forEach(([key, value]) =>
        // @ts-expect-error - wrong types
        res.header(key, value),
      );
      res.header("Content-Type", "application/json");
      res.status(response.statusCode).send(response.body);
    } catch (e) {
      console.log("Local server error");
      console.error(e);
    }
  });
  expressApp.listen(PORT, () => {
    console.log(`API wrapper started at http://localhost:${PORT}`);
  });
}

main();
