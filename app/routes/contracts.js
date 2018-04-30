var express = require('express');
var router = express.Router();
var fs = require('fs');
var PDFDocument = require('pdfkit');

// Modules
var doc = new PDFDocument;

router.get('/', function (req, res) {
  doc.pipe(fs.createWriteStream('file.pdf'));

  doc.pipe(res);

  // add stuff to PDF here using methods described below...
  var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.'

  doc.fontSize(12);

  doc.text('This text is left aligned. ' + lorem);

  doc.moveDown();

  doc.text('This text is centered. ' + lorem);

  doc.moveDown();

  doc.text('This text is justified. ' + lorem);

  doc.addPage();

  doc.text('This text is right aligned. ' + lorem);

  doc.moveDown();

  doc.text('This text is justified. ' + lorem);

  doc.moveDown();

  doc.text('This text is justified. ' + lorem);

  // finalize the PDF and end the stream
  doc.end();
});

module.exports = router
