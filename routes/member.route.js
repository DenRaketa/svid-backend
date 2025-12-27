import express from "express";
import { formSchema } from "../validators/member.schema.js";

const router = express.Router();

router.post("/member", (req, res) => {
  const result = formSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.flatten().fieldErrors,
    });
  }

  const data = result.data;

  // 🔥 Тут можеш:
  // - зберігати в Firestore
  // - відправляти в CRM
  // - логувати і т.д.

  return res.status(201).json({
    success: true,
    message: "Form validated successfully",
    data,
  });
});

export default router;
