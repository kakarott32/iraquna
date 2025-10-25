import VideoSectionSchema from "../models/video_section.model";
import type { IVideoSection } from "../interface/video_section.interface";
import type { UpdateWriteOpResult } from "mongoose";

class VideoSectionService {
    private videoSectionSchema = VideoSectionSchema;

    public async getVideoSection() {
        const videoSection = await this.videoSectionSchema.findOne();
        return videoSection;
    }

    public async getVideoSectionById({
        id,
    }: {
        id: string;
    }) {
        const videoSection = await this.videoSectionSchema.findById(id);
        return videoSection;
    }

    public async createVideoSection({
        data,
    }: {
        data: IVideoSection;
    }) {
        const videoSection = await this.videoSectionSchema.create(data);
        return videoSection;
    }

    public async updateVideoSection({
        filter,
        update,
    }: {
        filter: Record<string, any>;
        update: Record<string, any>;
    }): Promise<UpdateWriteOpResult> {
        const videoSection = await this.videoSectionSchema.updateOne(filter, {
            $set: update,
        });
        return videoSection;
    }

    public async deleteVideoSection({
        id,
    }: {
        id: string;
    }) {
        const videoSection = await this.videoSectionSchema.findByIdAndDelete(id);
        return videoSection;
    }
}

export default new VideoSectionService();