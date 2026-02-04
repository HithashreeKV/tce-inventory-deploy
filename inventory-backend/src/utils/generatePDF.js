
import PDFDocument from 'pdfkit';

export const generatePDF = (logs, res, month) => {
  const doc = new PDFDocument();
  doc.pipe(res);

  doc.text(`Inventory Report - ${month}`);
  doc.moveDown();

  logs.forEach(l => {
    doc.text(`${l.created_at} | ${l.action_type} | ${l.quantity_changed}`);
  });

  doc.end();
};
