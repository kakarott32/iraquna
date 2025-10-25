import mongoose from "mongoose";
import type { IReport } from "../interface/report.interface";

const reportSchema = new mongoose.Schema(
    {
        full_name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        is_read: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// Index for better query performance
reportSchema.index({ is_read: 1 });
reportSchema.index({ createdAt: -1 });

const ReportSchema = mongoose.model<IReport>("Report", reportSchema);

export default ReportSchema;