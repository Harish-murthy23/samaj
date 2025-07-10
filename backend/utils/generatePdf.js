import PdfPrinter from 'pdfmake';
import { format } from 'date-fns';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Font setup
const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Bold.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-BoldItalic.ttf'
  },
   NotoSansDevanagari: {
    normal: 'fonts/NotoSansDevanagari-Regular.ttf',
    bold: 'fonts/NotoSansDevanagari-Regular.ttf',
    italics: 'fonts/NotoSansDevanagari-Regular.ttf',
    bolditalics: 'fonts/NotoSansDevanagari-Regular.ttf'
  }
};

export const generateFamilyPdf = async (head, members) => {
  const printer = new PdfPrinter(fonts);

  // Read image and convert to base64
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const logoPath = path.join(__dirname, '..', 'assets', 'telugu.jpg');
  const logoBase64 = fs.readFileSync(logoPath).toString('base64');

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40,60],

    background: () => ({
      image: 'data:image/jpeg;base64,' + logoBase64,
      width: 300,
      opacity: 0.1,
      absolutePosition: { x: 150, y: 250 }
    }),

    header: {
      columns: [
        {
          image: 'data:image/jpeg;base64,' + logoBase64,
          width: 50,
          margin: [10,5, 0, 0],
        },
        {
          stack: [
            { text: 'JAI AGNIKULA KSHATRIYA TELUGU SAMAJA', style: 'headerTitle' },
            { text: 'Raipur, Chhattisgarh (R.No.-5837/2005)', style: 'subHeader' }
          ],
          alignment: 'center',
          margin: [0, 10, 0,40]
        },
        {
          image: 'data:image/jpeg;base64,' + logoBase64,
          width: 50,
          margin: [0,5,10,10]
        },
      ]
    },

    footer: function (currentPage, pageCount) {
  return {
    stack: [
      {
        text: `Page ${currentPage} of ${pageCount}`,
        alignment: 'center',
        fontSize: 10,
        margin: [0, 5]
      },
      {
        text: `\nनोट- किसी भी तरह की तकनीकी सहायता या फॉर्म भरने पर गलती होने पर कॉल करें (हरीश मूर्ति- मो.7987007015)`,
        font:'NotoSansDevanagari',
        alignment: 'center',
        italics: true,
        fontSize: 9,
        margin: [0, 0, 0, 10]
      }
    ]
  };
},

    content: [
      { text: `Application Number: ${head.applicationNumber}`, style: 'appNumber', margin: [0, 5, 0, 20] },
      { text: 'HEAD OF FAMILY DETAILS', style: 'sectionHeader' },
      {
        table: {
          widths: ['*', '*'],
          body: [
            ['Name', head.name || ''],
            ['Age', head.age?.toString() || ''],
            ['Gender', head.gender || ''],
            ['Marital Status', head.maritalStatus || ''],
            ['Aadhaar', head.aadhaar || ''],
            ['Contact', head.contact || ''],
            ['Village', head.village || ''],
            ['Email', head.email || 'N/A'],
            ['Occupation', head.occupation || 'N/A'],
            ['Qualification', head.qualification || 'N/A'],
            ['Address', head.address || '']
          ]
        }
      },
      { text: '\n\n' },
      { text: 'FAMILY MEMBERS', style: 'sectionHeader' },
      {
        table: {
          headerRows: 1,
          widths: ['*', '*', '*', '*', '*', '*'],
          body: [
            ['Name', 'Relationship', 'Age', 'Gender', 'Marital Status', 'Aadhaar'],
            ...members.map(m => [
              m.name || '',
              m.relationship || '',
              m.age?.toString() || '',
              m.gender || '',
              m.maritalStatus || '',
              m.aadhaar || ''
            ])
          ]
        }
      },
      {
        text: `\n\nRegistration Date: ${format(new Date(head.createdAt || Date.now()), 'dd/MM/yyyy HH:mm')}`,
        alignment: 'right',
        italics: true
      }
    ],

    styles: {
      headerTitle: { fontSize: 16, bold: true },
      subHeader: { fontSize: 10 },
      appNumber: { fontSize: 14, bold: true, color: '#1a237e' },
      sectionHeader: { fontSize: 14, bold: true, margin: [0, 0, 0, 10], decoration: 'underline' }
    }
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  return new Promise((resolve, reject) => {
    const chunks = [];
    pdfDoc.on('data', chunk => chunks.push(chunk));
    pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
    pdfDoc.on('error', reject);
    pdfDoc.end();
  });
};
