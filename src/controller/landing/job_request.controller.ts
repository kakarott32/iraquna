import Elysia from "elysia";
import JobRequestService from "../../services/job_request.service";

export const jobRequestLandingController = new Elysia()
    .group("/job-request", (group) =>
        group
            // Get active job request configuration (public endpoint)
            .get("/", async ({ set }) => {
                try {
                    const config = await JobRequestService.getActiveJobRequest();

                    if (!config) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لا توجد إعدادات طلب وظائف نشطة",
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
            })
    );

export default jobRequestLandingController;
