import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

const app = express();

// Security & middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== "test") app.use(morgan("combined"));

// Routes
app.use("/api/v1", routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;

