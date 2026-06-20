import PDFDocument from "pdfkit";
import axios from "axios";
import { PassThrough } from "stream";

export interface FlyerData {
  status: "LOST" | "FOUND";
  petName: string;
  breed: string;
  color: string;
  lastSeenLocation: string;
  lastSeenDate: string;
  reward?: string;
  contactPhone: string | string[];
  contactEmail: string | string[];
  imageUrl: string;
}

const normalizeContactData = (
  field: string | string[] | undefined,
): string[] => {
  if (!field) return [];
  if (Array.isArray(field)) return field.filter(Boolean);
  return field.split(/[\s,;|]+/).filter(Boolean);
};

export async function generatePetFlyer(data: FlyerData): Promise<PassThrough> {
  const doc = new PDFDocument({ size: "LETTER", margin: 36 });
  const stream = new PassThrough();

  // Pipe the document right into the pass-through stream
  doc.pipe(stream);

  try {
    let imageBuffer: Buffer | null = null;

    try {
      if (data.imageUrl) {
        const imageResponse = await axios.get(data.imageUrl, {
          responseType: "arraybuffer",
          timeout: 5000,
        });
        imageBuffer = Buffer.from(imageResponse.data);
      }
    } catch (imgError) {
      console.warn(`Warning: Could not download image from ${data.imageUrl}.`);
    }

    // ── DESIGN SYSTEM (PROFESSIONAL MODERN / DARK THEME AESTHETIC) ───────
    const pageWidth = 612;
    const pageHeight = 792;

    // Palette: Clean Professional Slate / Dark Palette
    const bgDark = "#0F172A"; // Slate 900
    const cardDark = "#1E293B"; // Slate 800
    const borderSlate = "#334155"; // Slate 700
    const textMuted = "#94A3B8"; // Slate 400
    const textLight = "#F8FAFC"; // Slate 50

    // Status Accent Colors
    const alertColor = data.status === "LOST" ? "#EF4444" : "#3B82F6"; // Vivid Red or Clean Blue
    const rewardGold = "#F59E0B"; // Amber 500

    // 1. MAIN BACKGROUND BACKGROUND FILL
    doc.rect(0, 0, pageWidth, pageHeight).fill(bgDark);

    // ── HEADER SECTION ────────────────────────────────────────────────────────
    const headerY = 40;
    const contentWidth = pageWidth - 72; // 540

    // Status Accent Block Banner
    doc.rect(36, headerY, contentWidth, 60).fill(alertColor);

    doc
      .fillColor(textLight)
      .fontSize(28)
      .font("Helvetica-Bold")
      .text(`${data.status} PET`, 36, headerY + 16, {
        align: "center",
        width: contentWidth,
      });

    // ── PET NAME & REWARD SUB-HEADER ──────────────────────────────────────────
    const subHeaderY = 115;

    doc
      .fillColor(textLight)
      .fontSize(36)
      .font("Helvetica-Bold")
      .text(data.petName.toUpperCase(), 36, subHeaderY, {
        align: "left",
        width: contentWidth / 2,
      });

    if (data.reward) {
      doc
        .fillColor(rewardGold)
        .fontSize(20)
        .font("Helvetica-Bold")
        .text(`REWARD: ${data.reward}`, 36, subHeaderY + 12, {
          align: "right",
          width: contentWidth,
        });
    }

    // ── MAIN IMAGE PANEL (CLEAN FRAMED CONTAINER) ────────────────────────────
    const imgWidth = 540;
    const imgHeight = 310;
    const imgX = 36;
    const imgY = 175;

    // Outer Image Card Backing
    doc.rect(imgX, imgY, imgWidth, imgHeight).fill(cardDark);
    doc.rect(imgX, imgY, imgWidth, imgHeight).lineWidth(1).stroke(borderSlate);

    if (imageBuffer) {
      doc.save();
      // Safe boundary crop clipping
      doc.rect(imgX + 4, imgY + 4, imgWidth - 8, imgHeight - 8).clip();
      doc.image(imageBuffer, imgX + 4, imgY + 4, {
        fit: [imgWidth - 8, imgHeight - 8],
        align: "center",
        valign: "center",
      });
      doc.restore();
    } else {
      doc
        .fillColor(textMuted)
        .fontSize(14)
        .font("Helvetica")
        .text("NO IMAGE AVAILABLE", imgX, imgY + imgHeight / 2 - 7, {
          align: "center",
          width: imgWidth,
        });
    }

    // ── DOSSIER DETAILS PANEL (GRID STRUCTURE) ───────────────────────────────
    const detailsBoxY = 510;
    const detailsBoxH = 135;

    doc.rect(36, detailsBoxY, contentWidth, detailsBoxH).fill(cardDark);
    doc
      .rect(36, detailsBoxY, contentWidth, detailsBoxH)
      .lineWidth(1)
      .stroke(borderSlate);

    const labelX = 60;
    const valueX = 220;
    let currentY = detailsBoxY + 20;

    const rowItems = [
      { label: "Breed / Species :", val: data.breed },
      { label: "Color / Markings :", val: data.color },
      { label: "Last Seen Location :", val: data.lastSeenLocation },
      { label: "Date Missing :", val: data.lastSeenDate },
    ];

    rowItems.forEach((item) => {
      // Muted structural label
      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .fillColor(textMuted)
        .text(item.label, labelX, currentY);

      // Bright descriptive value
      doc
        .font("Helvetica")
        .fontSize(12)
        .fillColor(textLight)
        .text(item.val || "Not specified", valueX, currentY, {
          width: pageWidth - valueX - 60,
        });

      currentY += 26;
    });

    // ── CONTACT FOOTER CARD SECTION ──────────────────────────────────────────
    const footerY = 665;
    const footerH = 85;

    const phonesList = normalizeContactData(data.contactPhone);
    const emailsList = normalizeContactData(data.contactEmail);
    const phonesString = phonesList.join("   |   ");
    const emailsString = emailsList.join("   |   ");

    // Unified Clean Contact Card Block
    doc.rect(36, footerY, contentWidth, footerH).fill(cardDark);
    doc
      .rect(36, footerY, contentWidth, footerH)
      .lineWidth(1.5)
      .stroke(alertColor);

    doc
      .fillColor(textMuted)
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("IF SEEN, PLEASE CONTACT IMMEDIATELY", 36, footerY + 15, {
        align: "center",
        width: contentWidth,
      });

    if (phonesString) {
      doc
        .fillColor(textLight)
        .fontSize(14)
        .font("Helvetica-Bold")
        .text(phonesString, 36, footerY + 34, {
          align: "center",
          width: contentWidth,
        });
    }

    if (emailsString) {
      doc
        .fillColor(alertColor)
        .fontSize(11)
        .font("Helvetica")
        .text(emailsString, 36, footerY + 56, {
          align: "center",
          width: contentWidth,
        });
    }

    // End the document process safely
    doc.end();
    return stream;
  } catch (error) {
    doc.end();
    console.error("Failed to generate PDF Flyer:", error);
    throw error;
  }
}
