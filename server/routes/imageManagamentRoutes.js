const express = require("express");
const router = express.Router();

//Controlador
const imageManagamentController = require("../controllers/imageManagementController");

router.post("/getimage", imageManagamentController.getImage);

router.post(
  "/uploadimage",
  imageManagamentController.upload,
  imageManagamentController.uploadImage
);

module.exports = router;
