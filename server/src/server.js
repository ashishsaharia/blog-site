import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
export const server = new Promise((res) => {


    app.listen(PORT, () => {
      res(`Server running on port ${PORT}`);
      console.log(`Server running on port ${PORT}`);
    });
  });


