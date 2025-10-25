import GallerySchema from "../models/gallery.model";
import type { IGallery, IGalleryImages } from "../interface/gallery.interface";
import mongoose from "mongoose";
import type { IMultiLanguageText } from "../interface/global.interface";

const ObjectId = mongoose.Types.ObjectId.createFromHexString;

class GalleryService {
    private gallerySchema = GallerySchema;

    public async createTitleGallery({
        title,
    }: {
        title: IMultiLanguageText;
    }) {
        const newItem = await this.gallerySchema.create({ title });
        return newItem;
    }

    public async allGallery() {
        const items = await this.gallerySchema.find().sort({ createdAt: -1 });
        return items;
    }

    public async updateTitleGallery({
        id,
        title,
    }: {
        id: string;
        title: IMultiLanguageText;
    }) {
        const updatedItem = await this.gallerySchema.findByIdAndUpdate(
            id,
            { title },
            { new: true }
        );
        return updatedItem;
    }

    public async createImageGallery({
        data,
        id
    }: {
        data: IGalleryImages;
        id: string;
    }) {
        const newItem = await this.gallerySchema.findByIdAndUpdate(
            id,
            {
                $push: { images: data },
            },
            { new: true }
        );
        return newItem;
    }

    public async updateImageGallery({
        itemId,
        imageId,
        data
    }: {
        itemId: string;
        imageId: string;
        data: Partial<IGalleryImages>;
    }) {
        const updatedItem = await this.gallerySchema.findOneAndUpdate(
            { _id: ObjectId(itemId), "images._id": ObjectId(imageId) },
            {
                $set: {
                    "images.$.title": data.title,
                    "images.$.description": data.description,
                    "images.$.image": data.image,
                },
            },
            { new: true }
        );
        return updatedItem;
    }

    public async deleteImageGallery({
        itemId,
        imageId
    }: {
        itemId: string;
        imageId: string;
    }) {
        const updatedItem = await this.gallerySchema.findByIdAndUpdate(
            itemId,
            {
                $pull: { images: { _id: ObjectId(imageId) } },
            },
            { new: true }
        );
        return updatedItem;
    }

    public async deleteGallery({
        id,
    }: {
        id: string;
    }) {
        const deletedItem = await this.gallerySchema.findByIdAndDelete(id);
        return deletedItem;
    }

    public async getGalleryCount() {
        const count = await this.gallerySchema.countDocuments();
        return count;
    }
}

export default new GalleryService();