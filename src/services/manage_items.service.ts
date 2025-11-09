import ManageItemsSchema from "../models/manage_items.model";
import type { IManageItems, IManageImages } from "../interface/Manage_items.interface";
import mongoose from "mongoose";
import type { IMultiLanguageText } from "../interface/global.interface";

const ObjectId = mongoose.Types.ObjectId.createFromHexString;

class ManageItemsService {
    private manageItemsSchema = ManageItemsSchema;


    public async createTitleManageItem({
        title,
        sorting
    }: {
        title: IMultiLanguageText;
        sorting: number;
    }) {
        const newItem = await this.manageItemsSchema.create({ title, sorting });
        return newItem;
    }

    //updateSortingManageItem
    public async updateSortingManageItem({
        id,
        sorting,
    }: {
        id: string;
        sorting: number;
    }) {
        const updatedItem = await this.manageItemsSchema.findByIdAndUpdate( 
            id,
            { sorting },
            { new: true }
        );
        return updatedItem;
    }

    public async allManageItem() {
        const items = await this.manageItemsSchema.find().sort({ sorting: -1 });
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
                    "images.$.weight_unite": data.weight_unite
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

        const items = await this.manageItemsSchema.find().sort({ sorting: -1 });

        return {
            items
        };
    }


}

export default new ManageItemsService();