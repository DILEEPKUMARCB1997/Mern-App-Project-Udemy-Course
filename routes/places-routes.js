const express = require("express");
const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controllers.js");
const fileUpload = require("../middlewares/file-upload.js");
const checkAuth = require("../middlewares/check-auth.js");

const router = express.Router();

router.get("/:placeId", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.use(checkAuth);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.patch(
  "/:placeId",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesControllers.updatePlace
);

router.delete("/:placeId", placesControllers.deletePlace);

module.exports = router;
