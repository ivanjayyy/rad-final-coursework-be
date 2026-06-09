import PDFDocument from "pdfkit";
import axios from "axios";
import { PassThrough } from "stream";

// Flyer data interface
export interface FlyerData {
  status: "LOST" | "FOUND";
  petName: string;
  breed: string;
  color: string;
  lastSeenLocation: string;
  lastSeenDate: string;
  reward?: string;
  contactPhone: string;
  contactEmail: string;
  imageUrl: string; 
}

// Generate a printable PDF flyer
export async function generatePetFlyer(data: FlyerData): Promise<PassThrough> {
  // Create an A4 or Letter document with standard margins
  const doc = new PDFDocument({ size: "LETTER", margin: 36 });
  const stream = new PassThrough();
  doc.pipe(stream);

  try {
    // Fetch the pet image as an arraybuffer
    let imageBuffer: Buffer | null = null;

    try {
      const imageResponse = await axios.get(data.imageUrl, {
        responseType: "arraybuffer",
        timeout: 5000,
      });
      imageBuffer = Buffer.from(imageResponse.data);
    } catch (imgError) {
      console.warn(
        `Warning: Could not download image from ${data.imageUrl}. Defaulting to layout placeholder text.`,
      );
    }

    // Design constants
    const pageWidth = 612; // Letter width in points
    const accentColor = data.status === "LOST" ? "#D32F2F" : "#1976D2"; // Red for Lost, Blue for Found

    // Header section
    doc.rect(0, 0, pageWidth, 110).fill(accentColor);

    doc
      .fillColor("#FFFFFF")
      .fontSize(54)
      .font("Helvetica-Bold")
      .text(`${data.status} PET`, 0, 30, { align: "center", width: pageWidth });

    // Pet name
    doc
      .fillColor("#212121")
      .fontSize(36)
      .font("Helvetica-Bold")
      .text(data.petName.toUpperCase(), 36, 130, {
        align: "center",
        width: pageWidth - 72,
      });

    // Main image section
    // Centers a 280x280pt image on the canvas
    const imgWidth = 280;
    const imgHeight = 280;
    const imgX = (pageWidth - imgWidth) / 2;
    const imgY = 180;

    // Draw a subtle dark frame around the photo
    doc
      .rect(imgX - 4, imgY - 4, imgWidth + 8, imgHeight + 8)
      .lineWidth(3)
      .stroke("#E0E0E0");

    if (imageBuffer) {
      // If image exists, draw it normally
      doc.image(imageBuffer, imgX, imgY, {
        fit: [imgWidth, imgHeight],
        align: "center",
        valign: "center",
      });
    } else {
      // Fallback: Fill box with light grey background and draw missing text
      doc.rect(imgX, imgY, imgWidth, imgHeight).fill("#F5F5F5");

      doc
        .fillColor("#757575")
        .fontSize(14)
        .font("Helvetica-Bold")
        .text(
          "PHOTO ONLINE ONLY\n\nScan QR or Visit App Profile",
          imgX,
          imgY + 120,
          {
            align: "center",
            width: imgWidth,
          },
        );
    }

    // Details section
    let detailsY = 480;
    doc
      .fillColor("#212121")
      .fontSize(16)
      .font("Helvetica-Bold")
      .text("DESCRIPTION & DETAILS", 50, detailsY);

    // Horizontal Separator Line
    doc
      .moveTo(50, detailsY + 20)
      .lineTo(pageWidth - 50, detailsY + 20)
      .lineWidth(1)
      .stroke("#BDBDBD");

    // Grid details layout
    const labelX = 50;
    const valueX = 180;
    let currentY = detailsY + 32;

    const rowItems = [
      { label: "Breed / Species:", val: data.breed },
      { label: "Color / Markings:", val: data.color },
      { label: "Last Seen Location:", val: data.lastSeenLocation },
      { label: "Date Missing:", val: data.lastSeenDate },
    ];

    if (data.reward) {
      rowItems.push({ label: "REWARD OFFERED:", val: data.reward });
    }

    rowItems.forEach((item) => {
      // Highlight rewards differently
      const isReward = item.label.includes("REWARD");

      doc
        .font("Helvetica-Bold")
        .fontSize(13)
        .fillColor(isReward ? accentColor : "#616161")
        .text(item.label, labelX, currentY);

      doc
        .font(isReward ? "Helvetica-Bold" : "Helvetica")
        .fontSize(13)
        .fillColor(isReward ? accentColor : "#212121")
        .text(item.val, valueX, currentY, { width: pageWidth - valueX - 50 });

      currentY += 22;
    });

    // Contact section
    const footerY = 670;
    doc
      .rect(36, footerY, pageWidth - 72, 80)
      .fill("#F5F5F5")
      .stroke("#E0E0E0");

    doc
      .fillColor("#212121")
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("IF YOU HAVE ANY INFORMATION, PLEASE CONTACT:", 36, footerY + 15, {
        align: "center",
        width: pageWidth - 72,
      });

    doc
      .fillColor(accentColor)
      .fontSize(20)
      .font("Helvetica-Bold")
      .text(
        `Phone: ${data.contactPhone}   |   Email: ${data.contactEmail}`,
        36,
        footerY + 40,
        { align: "center", width: pageWidth - 72 },
      );

    // Finalize document writing
    doc.end();
    return stream;
  } catch (error) {
    doc.end();
    console.error("Failed to generate PDF Flyer:", error);
    throw new Error("Flyer generation pipeline crashed.");
  }
}
