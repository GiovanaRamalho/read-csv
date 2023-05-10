import express from "express";
import {} from "dotenv/config";
import router from "./routes.js";

function main() {
  const app = express();
  app.use(router);

  app.listen(process.env.PORT || 3000, () => {
    console.log("App running in port", `${process.env.PORT || 3000}`);
  });
}

try {
  main();
} catch (error) {
  console.log(error);
}
