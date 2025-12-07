import mongoose from "mongoose";

const specialProductItemsSchema = new mongoose.Schema({
    title: {
        ar: {
            type: String,
            default: null
        },
        en: {
            type: String,
            default: null
        },
        ku: {
            type: String,
            default: null
        }
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
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
    },

    description: {
        ar: {
            type: String,
            default: null
        },
        en: {
            type: String,
            default: null
        },
        ku: {
            type: String,
            default: null
        }
    }
}, { timestamps: true });

const SpecialProductItemsSchema = mongoose.model("special_product_items", specialProductItemsSchema);

export default SpecialProductItemsSchema;