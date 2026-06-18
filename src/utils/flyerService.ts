import PDFDocument from "pdfkit";
import axios from "axios";
import { PassThrough } from "stream";

// Flyer data interface - Updated to support strings or arrays of strings
export interface FlyerData {
  status: "LOST" | "FOUND";
  petName: string;
  breed: string;
  color: string;
  lastSeenLocation: string;
  lastSeenDate: string;
  reward?: string;
  contactPhone: string | string[]; // Can now handle multiple entries
  contactEmail: string | string[]; // Can now handle multiple entries
  imageUrl: string;
}

// Helper to normalize data into a clean, uniform array of strings
const normalizeContactData = (
  field: string | string[] | undefined,
): string[] => {
  if (!field) return [];
  if (Array.isArray(field)) return field.filter(Boolean);
  return field.split(/[\s,;|]+/).filter(Boolean); // Handles fallback string splitting if comma/space separated
};

// Generate a printable comic-styled PDF flyer
export async function generatePetFlyer(data: FlyerData): Promise<PassThrough> {
  const doc = new PDFDocument({ size: "LETTER", margin: 36 });
  const stream = new PassThrough();
  doc.pipe(stream);

  try {
    let imageBuffer: Buffer | null = null;

    try {
      const imageResponse = await axios.get(data.imageUrl, {
        responseType: "arraybuffer",
        timeout: 5000,
      });
      imageBuffer = Buffer.from(imageResponse.data);
    } catch (imgError) {
      console.warn(
        `Warning: Could not download image from ${data.imageUrl}. Defaulting to comic layout placeholder text.`,
      );
    }

    // ── COMIC CONFIG & DESIGN SYSTEM CONSTANTS ────────────────────────────────
    const pageWidth = 612;
    const pageHeight = 792;

    const bgComicYellow = "#FDF2A9";
    const cyanAccent = "#22D3EE";
    const purpleAccent = "#C084FC";
    const brightRed = "#EF4444";
    const deepBlack = "#000000";

    const alertBannerColor = data.status === "LOST" ? brightRed : "#3B82F6";

    // 1. FILL CANVAS BACKGROUND
    doc.rect(0, 0, pageWidth, pageHeight).fill(bgComicYellow);

    // 2. OUTER MIKU CANVAS BORDER
    doc
      .rect(15, 15, pageWidth - 30, pageHeight - 30)
      .lineWidth(4)
      .stroke(deepBlack);

    // ── HEADER SECTION ────────────────────────────────────────────────────────
    const headerX = 36;
    const headerY = 36;
    const headerW = pageWidth - 72;
    const headerH = 85;

    doc.rect(headerX + 8, headerY + 8, headerW, headerH).fill(deepBlack);
    doc
      .rect(headerX, headerY, headerW, headerH)
      .fillAndStroke(alertBannerColor, deepBlack);

    doc
      .fillColor("#FFFFFF")
      .fontSize(44)
      .font("Helvetica-Bold")
      .text(`💥 ${data.status} PET! 💥`, headerX, headerY + 18, {
        align: "center",
        width: headerW,
      });

    // ── PET NAME BADGE ────────────────────────────────────────────────────────
    const nameX = 36;
    const nameY = 145;
    const nameW = 220;
    const nameH = 45;

    doc.rect(nameX + 4, nameY + 4, nameW, nameH).fill(deepBlack);
    doc.rect(nameX, nameY, nameW, nameH).fillAndStroke(purpleAccent, deepBlack);

    doc
      .fillColor(deepBlack)
      .fontSize(22)
      .font("Helvetica-Bold")
      .text(data.petName.toUpperCase(), nameX, nameY + 12, {
        align: "center",
        width: nameW,
      });

    // ── REWARD ACCENT STICKER ───────────────────────────────────────────────
    if (data.reward) {
      doc.save();
      doc.rotate(-4, { origin: [pageWidth - 190, 155] });

      doc.rect(pageWidth - 216, 149, 180, 40).fill(deepBlack);
      doc
        .rect(pageWidth - 220, 145, 180, 40)
        .fillAndStroke("#FACC15", deepBlack);

      doc
        .fillColor(deepBlack)
        .fontSize(16)
        .font("Helvetica-Bold")
        .text(`💥 ${data.reward}`, pageWidth - 220, 157, {
          align: "center",
          width: 180,
        });

      doc.restore();
    }

    // ── MAIN IMAGE SECTION (NEO-BRUTALIST COMIC PANEL) ──────────────────────
    const imgWidth = 320;
    const imgHeight = 240;
    const imgX = (pageWidth - imgWidth) / 2;
    const imgY = 220;

    doc.rect(imgX + 10, imgY + 10, imgWidth, imgHeight).fill(deepBlack);
    doc
      .rect(imgX, imgY, imgWidth, imgHeight)
      .lineWidth(4)
      .fillAndStroke("#FFFFFF", deepBlack);

    if (imageBuffer) {
      doc.save();
      doc.rect(imgX + 2, imgY + 2, imgWidth - 4, imgHeight - 4).clip();
      doc.image(imageBuffer, imgX + 2, imgY + 2, {
        fit: [imgWidth - 4, imgHeight - 4],
        align: "center",
        valign: "center",
      });
      doc.restore();
    } else {
      doc
        .rect(imgX + 2, imgY + 2, imgWidth - 4, imgHeight - 4)
        .fill(cyanAccent);
      doc
        .rect(imgX + 2, imgY + 2, imgWidth - 4, imgHeight - 4)
        .lineWidth(2)
        .stroke(deepBlack);

      doc
        .fillColor(deepBlack)
        .fontSize(16)
        .font("Helvetica-Bold")
        .text(
          "IMAGE TRANS-LINK ERROR!\n\nSCAN QR NODE TO INVENT DATA",
          imgX,
          imgY + 100,
          { align: "center", width: imgWidth },
        );
    }

    // ── DOSSIER DATA DETAILS SECTION ─────────────────────────────────────────
    let detailsBoxY = 490;
    const detailsBoxW = pageWidth - 72;
    const detailsBoxH = 145;

    doc.rect(36 + 6, detailsBoxY + 6, detailsBoxW, detailsBoxH).fill(deepBlack);
    doc
      .rect(36, detailsBoxY, detailsBoxW, detailsBoxH)
      .lineWidth(4)
      .fillAndStroke("#FFFFFF", deepBlack);

    doc
      .rect(36, detailsBoxY, detailsBoxW, 30)
      .fillAndStroke(cyanAccent, deepBlack);
    doc
      .fillColor(deepBlack)
      .fontSize(12)
      .font("Helvetica-Bold")
      .text("🕵️‍♂️ MISSION DOSSIER / CORE DATA CODES", 48, detailsBoxY + 9);

    const labelX = 55;
    const valueX = 210;
    let currentY = detailsBoxY + 42;

    const rowItems = [
      { label: "SPECIES // BREED :", val: data.breed },
      { label: "COLOR MARKINGS :", val: data.color },
      { label: "LAST SEEN ANCHOR :", val: data.lastSeenLocation },
      { label: "TIMESTAMP MISSING:", val: data.lastSeenDate },
    ];

    rowItems.forEach((item) => {
      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .fillColor(deepBlack)
        .text(item.label.toUpperCase(), labelX, currentY);

      doc
        .font("Helvetica")
        .fontSize(12)
        .fillColor("#374151")
        .text(item.val, valueX, currentY, { width: pageWidth - valueX - 55 });

      currentY += 24;
    });

    // ── FOOTER DASH TERMINAL DECORATION ─────────────────────────────────────
    const lineY = 660;
    doc
      .moveTo(36, lineY)
      .lineTo(pageWidth - 36, lineY)
      .lineWidth(3)
      .dash(8, { space: 6 })
      .stroke(deepBlack)
      .undash();

    // ── CONTACT SECTION BLOCK (UPDATED FOR MULTIPLE CONTACTS) ────────────────
    const footerY = 685;
    const footerW = pageWidth - 72;
    const footerH = 65;

    // Normalize incoming string fields or arrays safely
    const phonesList = normalizeContactData(data.contactPhone);
    const emailsList = normalizeContactData(data.contactEmail);

    const phonesString = phonesList.join("  •  ");
    const emailsString = emailsList.map((e) => e.toUpperCase()).join("  •  ");

    // Dynamic layout scaling based on data payload density
    const totalEntries = phonesList.length + emailsList.length;
    const contactFontSize = totalEntries > 4 ? 11 : totalEntries > 2 ? 13 : 15;
    const textGapOffset = totalEntries > 4 ? 26 : 32;

    // Contact Footprint Shadow
    doc.rect(36 + 6, footerY + 6, footerW, footerH).fill(deepBlack);
    // Contact Container Box Frame
    doc
      .rect(36, footerY, footerW, footerH)
      .lineWidth(4)
      .fillAndStroke("#FFFFFF", deepBlack);

    doc
      .fillColor(deepBlack)
      .fontSize(10)
      .font("Helvetica-Bold")
      .text(
        "🚨 IF YOU HAVE SIGNATURE DATA, INITIATE CONTACT IMMEDIATELY: 🚨",
        36,
        footerY + 10,
        {
          align: "center",
          width: footerW,
        },
      );

    // Render aggregated dynamic contact info block lines
    doc
      .fillColor(alertBannerColor)
      .fontSize(contactFontSize)
      .font("Helvetica-Bold")
      .text(`TEL: ${phonesString || "N/A"}`, 42, footerY + textGapOffset, {
        align: "center",
        width: footerW - 12,
      });

    doc.text(
      `EMAIL: ${emailsString || "N/A"}`,
      42,
      doc.y + 3, // Places the email row cleanly directly underneath phone rows
      { align: "center", width: footerW - 12 },
    );

    // Finalize document writing pipeline
    doc.end();
    return stream;
  } catch (error) {
    doc.end();
    console.error("Failed to generate PDF Flyer:", error);
    throw new Error("Flyer generation pipeline crashed.");
  }
}
