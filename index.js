import express from "express";
import cors from "cors";
import leadFormRoute from "./routes/lead.route.js";
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/form", leadFormRoute);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
