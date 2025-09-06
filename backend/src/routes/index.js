import express from "express"; 
import productRoutes from "./ProductRoute.js";
const routes = (app) => {
     app.use("/api/products",productRoutes);
}

export default routes;