import { envConfig } from "./Config/environment.config";
import { HttpRequest } from "../lib/Types/Request";
import { HttpResponse } from "../lib/Types/Response";
import { IFramework } from "../lib/Interfaces/Framework.interface";
import { authMiddleware } from "./Middlewares/AuthMiddleware";
import { loggerMiddleware } from "./Middlewares/LoggerMiddleware";
import { useJsonResponseMiddleware } from "../lib/Middlewares/UseJsonResponseMiddleware";
import { framework } from "../lib/app";

const app: IFramework = framework;
const PORT: number = envConfig.PORT;
const NODE_ENV: string = envConfig.NODE_ENV;

app.use(authMiddleware);
app.use(loggerMiddleware);
app.use(useJsonResponseMiddleware);

app.get("/get-test", (req: HttpRequest, res: HttpResponse): void => {
  const { query } = req.queryParams;

  if (query === "ping") {
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(`Query: ${query} Response: pong`));
    return null;
  }

  res.statusCode = 200;
  res.json("GET endpoint working");
});

app.get("/products/:category/:id", (req: HttpRequest, res: HttpResponse) => {
  const { id, category } = req.pathVariables;
  const { name, surname } = req.queryParams;

  const data = {
    productId: id,
    productCategory: category,
    queryParams: {
      name,
      surname,
    },
  };

  res.statusCode = 200;
  res.json(data);
});

app.post("/post-test", (req: HttpRequest, res: HttpResponse) => {
  const body = req.body;

  res.statusCode = 201;
  res.json(body);
});

app.put("/put-test", (req: HttpRequest, res: HttpResponse) => {
  res.statusCode = 201;
  res.json("PUT endpoint working");
});

app.del("/delete-test", (req: HttpRequest, res: HttpResponse) => {
  res.statusCode = 201;
  res.json("DELETE endpoint working");
});

app.patch("/patch-test", (req: HttpRequest, res: HttpResponse) => {
  res.statusCode = 201;
  res.json("PATCH endpoint working");
});

app.listen(PORT, NODE_ENV);
