var express = require('express');
var router = express.Router();
var AdmZip = require("adm-zip");
var path = require("path");

router.post('/zip', (req, res) => {
  try {
    if(!req.files) {
      res.send({
          status: false,
          message: 'No file uploaded'
      });
    } else {
      let inputFile = req.files.inputFile;
      
      var zippedFileName = "output.zip";
      var zip = new AdmZip();
      zip.addFile("test.txt", inputFile.data);
      zip.writeZip(zippedFileName);
      
      res.sendFile(path.resolve(zippedFileName), (err) => {
        console.log('error', err);
      });
    }
  } catch (err) {
      console.log(err);
      res.status(500).send(err);
  }
});

module.exports = router;
