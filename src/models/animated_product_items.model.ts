import mongoose from "mongoose";

const animatedProductItemsSchema = new mongoose.Schema({
    image: {
        id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    }
}, { timestamps: true });

const AnimatedProductItemsSchema = mongoose.model("animated_product_items", animatedProductItemsSchema);

export default AnimatedProductItemsSchema;