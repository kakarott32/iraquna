import AnimatedProductItemsSchema from "../models/animated_product_items.model";
import type { IAnimatedProductItems } from "../interface/animated_product_items.interface";
import type { UpdateWriteOpResult } from "mongoose";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId.createFromHexString;

class AnimatedProductItemsService {
    private animatedProductItemsSchema = AnimatedProductItemsSchema;

    public async getAllAnimatedProductItems({
        page = 1,
        limit = 10
    }: {
        page?: number;
        limit?: number;
    } = {}) {
        const skip = (page - 1) * limit;
        
        const [items, total] = await Promise.all([
            this.animatedProductItemsSchema
                .find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            this.animatedProductItemsSchema.countDocuments()
        ]);

        const totalPages = Math.ceil(total / limit);
        
        return {
            items,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: total,
                itemsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        };
    }

    public async getAnimatedProductItemById({
        id,
    }: {
        id: string;
    }) {
        const item = await this.animatedProductItemsSchema.findById(id);
        return item;
    }

    public async createAnimatedProductItem({
        data,
    }: {
        data: IAnimatedProductItems;
    }) {
        const item = await this.animatedProductItemsSchema.create(data);
        return item;
    }

    public async updateAnimatedProductItem({
        id,
        data,
    }: {
        id: string;
        data: Partial<IAnimatedProductItems>;
    }): Promise<any> {
        const item = await this.animatedProductItemsSchema.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );
        return item;
    }

    public async deleteAnimatedProductItem({
        id,
    }: {
        id: string;
    }) {
        const item = await this.animatedProductItemsSchema.findByIdAndDelete(id);
        return item;
    }

    public async getAnimatedProductItemsCount() {
        const count = await this.animatedProductItemsSchema.countDocuments();
        return count;
    }
}

export default new AnimatedProductItemsService();