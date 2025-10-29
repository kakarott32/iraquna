import ManageItemsSchema from "../models/manage_items.model";
import type { IManageItems, IManageImages } from "../interface/Manage_items.interface";
import mongoose from "mongoose";
import type { IMultiLanguageText } from "../interface/global.interface";

const ObjectId = mongoose.Types.ObjectId.createFromHexString;

class ManageItemsService {
    private manageItemsSchema = ManageItemsSchema;


    public async createTitleManageItem({
        title,
    }: {
        title: IMultiLanguageText;
    }) {
        const newItem = await this.manageItemsSchema.create({ title });
        return newItem;
    }

    public async allManageItem() {
        const items = await this.manageItemsSchema.find().sort({ createdAt: -1 });
        return items;
    }

    public async updateTitleManageItem({
        id,
        title,
    }: {
        id: string;
        title: IMultiLanguageText;
    }) {
        const updatedItem = await this.manageItemsSchema.findByIdAndUpdate(
            id,
            { title },
            { new: true }
        );
        return updatedItem;
    }
    public async createImageManageItem({
        data,
        id
    }: {
        data: IManageImages;
        id: string;
    }) {
        const newItem = await this.manageItemsSchema.findByIdAndUpdate(
            id,
            {
                $push: { images: data },
            },
            { new: true }
        );
        return newItem;
    }

    public async updateImageManageItem({
        itemId,
        imageId,
        data
    }: {
        itemId: string;
        imageId: string;
        data: Partial<IManageImages>;
    }) {
        const updatedItem = await this.manageItemsSchema.findOneAndUpdate(
            { _id: ObjectId(itemId), "images._id": ObjectId(imageId) },
            {
                $set: {
                    "images.$.title": data.title,
                    "images.$.stars": data.stars,
                    "images.$.weight": data.weight,
                },
            },
            { new: true }
        );
        return updatedItem;
    }  

    public async deleteImageManageItem({
        itemId,
        imageId
    }: {
        itemId: string;
        imageId: string;
    }) {
        const updatedItem = await this.manageItemsSchema.findByIdAndUpdate(
            itemId,
            {
                $pull: { images: { _id: ObjectId(imageId) } },
            },
            { new: true }
        );
        return updatedItem;
    }

    public async getAllManageItems() {

        const items = await this.manageItemsSchema.find().sort({ createdAt: -1 });
        
        return {
            items
        };
    }


}

export default new ManageItemsService();