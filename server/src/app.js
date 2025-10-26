import express from "express";
import cors from "cors";
// import helmet from "helmet";
// import morgan from "morgan";
// import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import postRouter from "./routes/posts/index.js";
import authRouter from "./routes/auth/index.js";
const app = express();

// Security & middleware    
// app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/posts", postRouter);
// Logging
// if (process.env.NODE_ENV !== "test") app.use(morgan("combined"));

// Routes
// app.use("/api/v1", routes);
app.use("/posts", postRouter);
app.use("/auth", authRouter);

// Error handling
// app.use(notFound);
// app.use(errorHandler);

export default app;

