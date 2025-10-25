import ConnectUsSchema from "../models/connect_us.model";
import type { IConnectUs } from "../interface/connect_us.interface";
import mongoose from "mongoose";

class ConnectUsService {
    private connectUsSchema = ConnectUsSchema;

    // Get single ConnectUs information (singleton pattern)
    public async getConnectUsInfo() {
        const info = await this.connectUsSchema.findOne().sort({ createdAt: -1 });
        return info;
    }

    // Create ConnectUs information if none exists
    public async createConnectUsInfo({
        data,
    }: {
        data: IConnectUs;
    }) {
        const info = await this.connectUsSchema.create(data);
        return info;
    }

    // Update or create ConnectUs information (singleton pattern)
    public async updateOrCreateConnectUsInfo({
        data,
    }: {
        data: Partial<IConnectUs>;
    }) {
        const existingInfo = await this.connectUsSchema.findOne();
        
        if (existingInfo) {
            const updatedInfo = await this.connectUsSchema.findByIdAndUpdate(
                existingInfo._id,
                { $set: data },
                { new: true }
            );
            return updatedInfo;
        } else {
            // If no existing info, create new one (ensure required fields are provided)
            const newInfo = await this.connectUsSchema.create(data);
            return newInfo;
        }
    }

    // Update existing ConnectUs information by ID
    public async updateConnectUsInfo({
        id,
        data,
    }: {
        id: string;
        data: Partial<IConnectUs>;
    }) {
        const updatedInfo = await this.connectUsSchema.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );
        return updatedInfo;
    }

    // Delete ConnectUs information
    public async deleteConnectUsInfo({
        id,
    }: {
        id: string;
    }) {
        const deletedInfo = await this.connectUsSchema.findByIdAndDelete(id);
        return deletedInfo;
    }

    // Check if ConnectUs information exists
    public async connectUsExists() {
        const count = await this.connectUsSchema.countDocuments();
        return count > 0;
    }

    // Get all ConnectUs records (for admin purposes)
    public async getAllConnectUsInfo() {
        const allInfo = await this.connectUsSchema.find().sort({ createdAt: -1 });
        return allInfo;
    }
}

export default new ConnectUsService();