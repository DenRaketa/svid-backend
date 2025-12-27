import express from "express";
import { formSchema } from "../validators/partner.schema.js";

const router = express.Router();

router.post("/partner", async (req, res) => {
  const result = formSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.flatten().fieldErrors,
    });
  }

  const data = result.data;
  try {
    const airtableResponse = await fetch(
      "https://api.airtable.com/v0/appL0usV2OrNFLr7E/tblFrN89KwFzUengq",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: data.name,
            Directions: data.directions,
            InteractionFormat: data.internactionFormat,
            Phone: data.phone ?? null,
          },
        }),
      }
    );

    if (!airtableResponse.ok) {
      const error = await airtableResponse.text();
      console.error("Airtable error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to save data to Airtable",
      });
    }

    const airtableData = await airtableResponse.json();

    return res.status(201).json({
      success: true,
      message: "Form saved to Airtable successfully",
      airtableRecordId: airtableData.id,
    });
  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
