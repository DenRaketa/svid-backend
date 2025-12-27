import express from "express";
import cors from "cors";
import partnerFormRoute from "./routes/partner.route.js";
import memberFormRoute from "./routes/member.route.js";
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/form", partnerFormRoute);
app.use("/api/form", memberFormRoute);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
