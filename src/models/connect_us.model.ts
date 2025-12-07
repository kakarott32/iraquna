import mongoose from "mongoose";
import type { IConnectUs } from "../interface/connect_us.interface";

const connectUsSchema = new mongoose.Schema(
    {
        phone_1: {
            type: String,
            required: true,
            trim: true,
        },
        phone_2: {
            type: String,
            default: null,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        map_embed_link: {
            type: String,
            default: null,
            trim: true,
        },
        facebook_link: {
            type: String,
            default: null,
            trim: true,
        },
        instagram_link: {
            type: String,
            default: null,
            trim: true,
        },
        phone_3: {
            type: String,
            default: null,
            trim: true,
        },
        phone_4: {
            type: String,
            default: null,
            trim: true,
        },
        whatsapp_link: {
            type: String,
            default: null,
            trim: true,
        },
        youtube_link: {
            type: String,
            default: null,
            trim: true,
        },
        tiktok_link: {
            type: String,
            default: null,
            trim: true,
        },
    },
    { timestamps: true }
);

const ConnectUsSchema = mongoose.model<IConnectUs>("ConnectUs", connectUsSchema);

export default ConnectUsSchema;