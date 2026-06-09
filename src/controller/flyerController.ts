import { Request, Response } from "express";
import { generatePetFlyer, FlyerData } from "../utils/flyerService";

export async function generateFlyer(req: Request, res: Response) {
  try {
    const flyerMockData: FlyerData = {
      status: "LOST",
      petName: "Barnaby",
      breed: "Golden Retriever Mix",
      color: "Golden/Cream with a white chest patch",
      lastSeenLocation: "Oakridge Park, North Avenue near 4th street",
      lastSeenDate: "May 22, 2026",
      reward: "$500 Cash (No Questions Asked)",
      contactPhone: "555-0199",
      contactEmail: "findbarnaby@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=500&auto=format&fit=crop",
    };

    const pdfStream = await generatePetFlyer(flyerMockData);

    // Set headers to open natively inside browser PDF viewers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'inline; filename="lost-pet-flyer.pdf"',
    );

    // Pipe the generation stream into the Express HTTP response object
    pdfStream.pipe(res);
  } catch (error) {
    console.error("Flyer Controller Error:", error);
    res.status(500).json({ error: "Could not generate printable PDF flyer." });
  }
}
