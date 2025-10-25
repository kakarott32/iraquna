import Elysia, { t } from "elysia";
import mongoose from "mongoose";
import { AuthServiceDashboard } from "../../middleware/auth.middleware";
import VideoSectionService from "../../services/video_section.service";

const ObjectId = mongoose.Types.ObjectId.createFromHexString;

export const videoSectionAdminController = new Elysia()
    .group("/admin/video-section", (group) =>
        group
            .get("/", async ({ set }) => {
                try {
                    const videoSection = await VideoSectionService.getVideoSection();

                    if (!videoSection) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على قسم الفيديو",
                        };
                    }

                    return {
                        error: false,
                        message: "تم استرجاع قسم الفيديو بنجاح",
                        results: videoSection,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في استرجاع قسم الفيديو",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
            })

            .put("/", async ({ body, set }) => {
                try {
                    const existingVideoSection = await VideoSectionService.getVideoSection();

                    if (!existingVideoSection) {
                        // Create new video section if none exists
                        const newVideoSection = await VideoSectionService.createVideoSection({
                            data: body,
                        });

                        return {
                            error: false,
                            message: "تم إنشاء قسم الفيديو بنجاح",
                            results: newVideoSection,
                        };
                    }

                    // Update existing video section
                    const updatedVideoSection = await VideoSectionService.updateVideoSection({
                        filter: { _id: existingVideoSection._id },
                        update: body,
                    });

                    if (updatedVideoSection.modifiedCount === 0) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "لم يتم تحديث قسم الفيديو",
                        };
                    }

                    // Get the updated video section
                    const videoSection = await VideoSectionService.getVideoSection();

                    return {
                        error: false,
                        message: "تم تحديث قسم الفيديو بنجاح",
                        results: videoSection,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في تحديث قسم الفيديو",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                body: t.Object({
                    title: t.Optional(t.Object({
                        ar: t.Optional(t.Union([t.String(), t.Null()])),
                        en: t.Optional(t.Union([t.String(), t.Null()])),
                        ku: t.Optional(t.Union([t.String(), t.Null()])),
                    })),
                    description: t.Optional(t.Object({
                        ar: t.Optional(t.Union([t.String(), t.Null()])),
                        en: t.Optional(t.Union([t.String(), t.Null()])),
                        ku: t.Optional(t.Union([t.String(), t.Null()])),
                    })),
                    video: t.Object({
                        id: t.String({
                            error: "Video ID is required",
                        }),
                        url: t.String({
                            error: "Video URL is required",
                        }),
                        duration: t.Number({
                            error: "Video duration is required",
                        }),
                    }),
                    image_right_top: t.Object({
                        id: t.String({
                            error: "Image ID is required",
                        }),
                        url: t.String({
                            error: "Image URL is required",
                        }),
                        width: t.Number({
                            error: "Image width is required",
                        }),
                        height: t.Number({
                            error: "Image height is required",
                        }),
                    }),
                    image_right_bottom: t.Object({
                        id: t.String({
                            error: "Image ID is required",
                        }),
                        url: t.String({
                            error: "Image URL is required",
                        }),
                        width: t.Number({
                            error: "Image width is required",
                        }),
                        height: t.Number({
                            error: "Image height is required",
                        }),
                    }),
                    image_left_top: t.Object({
                        id: t.String({
                            error: "Image ID is required",
                        }),
                        url: t.String({
                            error: "Image URL is required",
                        }),
                        width: t.Number({
                            error: "Image width is required",
                        }),
                        height: t.Number({
                            error: "Image height is required",
                        }),
                    }),
                    image_left_bottom: t.Object({
                        id: t.String({
                            error: "Image ID is required",
                        }),
                        url: t.String({
                            error: "Image URL is required",
                        }),
                        width: t.Number({
                            error: "Image width is required",
                        }),
                        height: t.Number({
                            error: "Image height is required",
                        }),
                    }),
                })
            })
    );