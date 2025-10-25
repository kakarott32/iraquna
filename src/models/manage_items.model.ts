import mongoose from "mongoose";

const manageImagesSchema = new mongoose.Schema({
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
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    weight: {
        type: Number,
        default: null
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
    }
});

const manageItemsSchema = new mongoose.Schema({
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
    images: [manageImagesSchema]
}, { timestamps: true });

const ManageItemsSchema = mongoose.model("manage_items", manageItemsSchema);

export default ManageItemsSchema;