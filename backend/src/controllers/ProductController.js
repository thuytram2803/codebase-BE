import productService from "../services/ProductService.js";

const productController = {
    async createProduct(req,res) {
        try {
            const { name, description, price, categoryId } = req.body;
            if (!name || !price || !categoryId) {
                return res.status(400).json({message: "Name, price, categoryId are required"});
            }
            const Product = await productService.createProduct({
                name,
                description,
                price,
                categoryId
            })
            return res.status(201).json({message: "Product created successfully", result: Product});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },
    async updateProduct(req,res) {
        try {
            const { id } = req.params;
            const { name, description, price, categoryId } = req.body;
            if (!name || !price || !categoryId) {
                return res.status(400).json({message: "Name, price, categoryId are required"});
            }
            const Product = await productService.update(id, { name, description, price, categoryId });
            return res.status(200).json({message: "Product updated successfully", result: Product});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },
    async deleteProduct(req,res) {
        try {
            const { id } = req.params;
            const result = await productService.remove(id);
            return res.status(200).json({message: "Product deleted successfully", result});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },
    async getProduct(req,res) {
        try {
            const { id } = req.params;
            const result = await productService.getById(id);
            return res.status(200).json({message: "Product fetched successfully", result});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },
    async getAllProducts(req,res) {
        try {
            const { page, limit, sort, filter } = req.query;
            const result = await productService.getAll( { page, limit, sort }, filter);
            return res.status(200).json({message: "Products fetched successfully", result});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },
    async searchProducts(req,res) {
        try {
            const { q, page, limit } = req.query;
            const result = await productService.search(q, page, limit);
            return res.status(200).json({message: "Products fetched successfully", result});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },
    async getProductsByCategory(req,res) {
        try {
            const { categoryId } = req.params;
            const { page, limit } = req.query;
            const result = await productService.getByCategory(categoryId, page, limit);
            return res.status(200).json({message: "Products fetched successfully", result});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }
}

export default productController;