import SpecialProductItemsSchema from "../models/special_product_items.model";
import type { ISpecialProductItems } from "../interface/special_product_items.interface";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId.createFromHexString;

class SpecialProductItemsService {
    private specialProductItemsSchema = SpecialProductItemsSchema;

    public async getAllSpecialProductItems({
        page = 1,
        limit = 10
    }: {
        page?: number;
        limit?: number;
    } = {}) {
        const skip = (page - 1) * limit;
        
        const [items, total] = await Promise.all([
            this.specialProductItemsSchema
                .find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            this.specialProductItemsSchema.countDocuments()
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

    public async getSpecialProductItemById({
        id,
    }: {
        id: string;
    }) {
        const item = await this.specialProductItemsSchema.findById(id);
        return item;
    }

    public async createSpecialProductItem({
        data,
    }: {
        data: Omit<ISpecialProductItems, 'id'>;
    }) {
        const item = await this.specialProductItemsSchema.create(data);
        return item;
    }

    public async updateSpecialProductItem({
        id,
        data,
    }: {
        id: string;
        data: Partial<Omit<ISpecialProductItems, 'id'>>;
    }): Promise<any> {
        const item = await this.specialProductItemsSchema.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );
        return item;
    }

    public async deleteSpecialProductItem({
        id,
    }: {
        id: string;
    }) {
        const item = await this.specialProductItemsSchema.findByIdAndDelete(id);
        return item;
    }

    public async getSpecialProductItemsCount() {
        const count = await this.specialProductItemsSchema.countDocuments();
        return count;
    }
}

export default new SpecialProductItemsService();