import mongoose from "mongoose";
import type { IJobRequest } from "../interface/job_request.interface";

const jobRequestSchema = new mongoose.Schema(
    {
        button_text: {
            type: String,
            required: true,
            trim: true,
        },
        is_hide: {
            type: Boolean,
            default: false,
        },
        url: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const JobRequestSchema = mongoose.model<IJobRequest>("JobRequest", jobRequestSchema);

export default JobRequestSchema;
