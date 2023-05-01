const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  searchProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getSlug,
  getCategories
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/categories", getCategories);

router.get("/slug/:slug", getSlug);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);

module.exports = router;
