import pdf from 'html-pdf';

export const generatePDF = (html, filename) => {
  return new Promise((resolve, reject) => {
    pdf.create(html).toFile(filename, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};