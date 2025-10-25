import VideoSectionSchema from "../models/video_section.model";
import type { IVideoSection } from "../interface/video_section.interface";
import type { UpdateWriteOpResult } from "mongoose";

class VideoSectionService {
    private videoSectionSchema = VideoSectionSchema;

    public async getVideoSection() {
        const videoSection = await this.videoSectionSchema.findOne();
        return videoSection;
    }
}

export default new VideoSectionService();