import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: true
        },
        categoryId: {
            type: String,
            required: true
        },
        
    },
    {
        timestamps: true
    }
)

const productModel = mongoose.model("Product",productSchema);

export default productModel;