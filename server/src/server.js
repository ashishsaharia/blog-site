import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/index.js";
import logger from "./config/logger.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
  } catch (err) {
    logger.error("Server startup error:", err);
    process.exit(1);
  }
})();

