import Elysia, { t } from "elysia";
import mongoose from "mongoose";
import { AuthServiceDashboard } from "../../middleware/auth.middleware";
import JobRequestService from "../../services/job_request.service";

const ObjectId = mongoose.Types.ObjectId;

export const jobRequestAdminController = new Elysia()
    .group("/admin/job-request", (group) =>
        group
            // Get job request configuration
            .get("/", async ({ set }) => {
                try {
                    const config = await JobRequestService.getJobRequestConfig();

                    if (!config) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على إعدادات طلب الوظيفة",
                        };
                    }

                    return {
                        error: false,
                        message: "تم استرجاع إعدادات طلب الوظيفة بنجاح",
                        results: config,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في استرجاع إعدادات طلب الوظيفة",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
            })

            // Update job request (PUT - singleton pattern)
            .put("/", async ({ body, set }) => {
                try {
                    const updatedConfig = await JobRequestService.createOrUpdateJobRequest({
                        data: body,
                    });

                    if (!updatedConfig) {
                        set.status = 500;
                        return {
                            error: true,
                            message: "خطأ في تحديث إعدادات طلب الوظيفة",
                        };
                    }

                    return {
                        error: false,
                        message: "تم تحديث إعدادات طلب الوظيفة بنجاح",
                        results: {
                            button_text: updatedConfig.button_text,
                            is_hide: updatedConfig.is_hide,
                            url: process.env.JOB_REQUEST_URL || "",
                        },
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في تحديث إعدادات طلب الوظيفة",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                body: t.Object({
                    button_text: t.Optional(t.String()),
                    is_hide: t.Optional(t.Boolean()),
                })
            })
    );

export default jobRequestAdminController;
