import express from "express";
import productController from "../controllers/ProductController.js";
import middleware from "../middleware/Middleware.js";

const router = express.Router();

router.post("/create-product", middleware, productController.createProduct);
router.put("/update-product/:id", middleware, productController.updateProduct);
router.delete("/delete-product/:id", middleware, productController.deleteProduct);
router.get("/get-product/:id", middleware, productController.getProduct);
router.get("/get-all-products", middleware, productController.getAllProducts);
router.get("/search-products", middleware, productController.searchProducts);
router.get("/get-products-by-category/:categoryId", middleware, productController.getProductsByCategory);

export default router;
