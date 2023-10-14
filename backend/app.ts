import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// added
import { userRouter } from "./controller/user.routes";
import { labelRouter } from "./controller/label.routes";
import { noteRouter } from "./controller/note.routes";
import { folderRouter } from "./controller/folder.routes";
import { expressjwt } from "express-jwt";

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

const swaggerOpts = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notery",
      version: "1.0.0",
    },
  },
  apis: ["./controller/*.routes.ts"],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
const jwtSecret = process.env.JWT_SECRET; 

app.use(cors());

app.use(
  expressjwt({ secret: jwtSecret, algorithms: ['HS256']}).unless({
    path: [/^\/api-docs\/.*/,'/users/login', '/users/register', '/status'],
  })
);

app.use(bodyParser.json());
// added
app.use('/users', userRouter);
app.use('/labels', labelRouter);
app.use('/notes', noteRouter);
app.use('/folders', folderRouter);

app.get("/status", (req, res) => {
  res.json({ message: "Back-end is running..." });
});

app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
  console.log(`Back-end is running on port ${port}.`);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error.name === 'UnauthorizedError') {
    res.status(401).json({ status: 'unauthorized', message: error.message })
  } else {
    next();
  }
});