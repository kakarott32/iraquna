import mongoose from "mongoose";

const videoSectionSchema = new mongoose.Schema({
    title: {
        ar: {
            type: String,
            required: false,
            default: null
        },
        en: {
            type: String,
            required: false,
            default: null
        },
        ku: {
            type: String,
            required: false,
            default: null
        }
    },
    description: {
        ar: {
            type: String,
            required: false,
            default: null
        },
        en: {
            type: String,
            required: false,
            default: null
        },
        ku: {
            type: String,
            required: false,
            default: null
        }
    },
    video: {
        id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        }
    },
    image_right_top: {
        id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    },
    image_right_bottom: {
        id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    },
    image_left_top: {
        id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    },
    image_left_bottom: {
        id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    }
}, { timestamps: true });

const VideoSectionSchema = mongoose.model("video_sections", videoSectionSchema);

export default VideoSectionSchema;