import Product from "../models/ProductModel.js";

const ProductService = {
    async createProduct(productData) {
        const product = await Product.create(productData);
        return product;
    },   
    async update(id,changes) {
        const product = await Product.findByIdAndUpdate(id,changes,{ new : true});
        return product;
    },
    async remove(id) {
        await Product.findByIdAndDelete(id);
        return true;
    },
    async getById(id) {
        try {
            const product = await Product.findById(id);
            return product;
        } catch (err) {
            throw new Error("Product not found");
        }
    },
    async getAll({page = 1, limit = 10, sort = "-createdAt"}, filter) {
        const skip = (Number)(page - 1) * (Number)(limit);
        const query = {};
        if (filter) {
            const [field, value] = filter;
            query[field] = { $regex: value, $options: "i"};
        }   

        const [items, total] = await Promise.all([
            Product.find(query).sort(sort).skip(skip).limit(limit),                 
            Product.countDocuments(query),
        ])

        return { items, total, page: Number(page), limit: Number(limit)};
    },

    async search({ q = "", page = 1, limit = 20}) {
        const skip = (Number)(page - 1) * (Number)(limit);
        const regex = new RegExp(q, "i");
        const filter = { $or : [ { name: regex}, {description: regex}]};
        const [items, total] = await Promise.all([
            Product.find(filter).skip(skip).limit(limit),
            Product.countDocuments(filter),
        ])
        return { items, total, page: Number(page), limit: Number(limit)};
    },
    async getByCategory(categoryId, {page = 1, limit = 10}) {
        const skip = (Number)(page - 1) * (Number)(limit);
        const filter = { categoryId};
        const [items, total] = await Promise.all([
            Product.find(filter).skip(skip).limit(limit),
            Product.countDocuments(filter),
        ])
        return { items, total, page: Number(page), limit: Number(limit)};
    },
}

export default ProductService;