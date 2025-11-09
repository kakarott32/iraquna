import mongoose from "mongoose";
import type { IGallery } from "../interface/gallery.interface";

const galleryImageSchema = new mongoose.Schema(
    {
        title: {
            ar: { type: String, default: null },
            en: { type: String, default: null },
            ku: { type: String, default: null },
        },
        image: {
            id: { type: String, required: true },
            url: { type: String, required: true },
            width: { type: Number, required: true },
            height: { type: Number, required: true },
        },
    },
    { timestamps: true }
);

const gallerySchema = new mongoose.Schema(
    {
        title: {
            ar: { type: String, default: null },
            en: { type: String, default: null },
            ku: { type: String, default: null },
        },
        images: [galleryImageSchema],
        sorting: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const GallerySchema = mongoose.model<IGallery>("Gallery", gallerySchema);

export default GallerySchema;