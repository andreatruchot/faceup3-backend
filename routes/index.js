var express = require('express');
var router = express.Router();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const uniqid = require('uniqid');

router.post('/upload', async (req, res) => {
  const photoPath = `./tmp/${uniqid()}.jpg`;

  await req.files.photoFromFront.mv(photoPath);
  const resultCloudinary = await cloudinary.uploader.upload(photoPath);

  // Suppression du fichier temporaire après l'upload
  fs.unlinkSync(photoPath);

  res.json({ result: true, url: resultCloudinary.secure_url });
});

module.exports = router;
