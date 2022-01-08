const express = require("express");
const { check } = require("express-validator"); // Retorna um novo middleware com as validações necessárias.

const placeControllers = require("../controllers/places-controllers");
const checkAuth = require("../middleware/check-auth");

const fileUpload = require("../middleware/file-upload");

const router = express.Router(); // Para registrat middleares

router.get("/:pid", placeControllers.getPlaceById); // Open

router.get("/user/:uid", placeControllers.getPlacesByUserId); // Open

router.use(checkAuth);

// Need Token
router.post(
  "/",
  fileUpload.single("image"), // 'image' == body ref
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placeControllers.createPlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placeControllers.updatePlace
);

router.delete("/:pid", placeControllers.deletePlace);

module.exports = router;
