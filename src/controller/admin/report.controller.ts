import Elysia, { t } from "elysia";
import mongoose from "mongoose";
import { AuthServiceDashboard } from "../../middleware/auth.middleware";
import ReportService from "../../services/report.service";

const ObjectId = mongoose.Types.ObjectId;

export const reportAdminController = new Elysia()
    .group("/admin/reports", (group) =>
        group
            // Get all reports with pagination
            .get("/", async ({ query, set }) => {
                try {
                    const page = parseInt(query.page as string) || 1;
                    const limit = Math.min(parseInt(query.limit as string) || 10, 100); // Max 100 per page
                    const isRead = query.is_read === 'true' ? true : query.is_read === 'false' ? false : undefined;

                    // Validate pagination parameters
                    if (page < 1) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "رقم الصفحة يجب أن يكون أكبر من صفر",
                        };
                    }

                    if (limit < 1) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "عدد العناصر يجب أن يكون أكبر من صفر",
                        };
                    }

                    const result = await ReportService.getAllReportsWithPagination({
                        page,
                        limit,
                        isRead,
                    });

                    return {
                        error: false,
                        message: "تم استرجاع التقارير بنجاح",
                        results: result.reports,
                        pagination: result.pagination,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في استرجاع التقارير",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                query: t.Object({
                    page: t.Optional(t.String()),
                    limit: t.Optional(t.String()),
                    is_read: t.Optional(t.String()),
                }),
            })


            // Update report read status
            .put("/:id", async ({ params, body, set }) => {
                try {
                    if (!ObjectId.isValid(params.id)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معرف التقرير غير صالح",
                        };
                    }

                    const updatedReport = await ReportService.updateReportReadStatus({
                        id: params.id,
                        is_read: body.is_read,
                    });

                    if (!updatedReport) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على التقرير لتحديثه",
                        };
                    }

                    return {
                        error: false,
                        message: body.is_read ? "تم وضع علامة مقروء على التقرير" : "تم إلغاء علامة المقروء من التقرير",
                        results: updatedReport,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في تحديث حالة التقرير",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                params: t.Object({
                    id: t.String(),
                }),
                body: t.Object({
                    is_read: t.Boolean({
                        error: "حالة القراءة مطلوبة (true أو false)",
                    }),
                }),
            })

            // Delete single report
            .delete("/:id", async ({ params, set }) => {
                try {
                    if (!ObjectId.isValid(params.id)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معرف التقرير غير صالح",
                        };
                    }

                    const deletedReport = await ReportService.deleteReport({
                        id: params.id,
                    });

                    if (!deletedReport) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على التقرير لحذفه",
                        };
                    }

                    return {
                        error: false,
                        message: "تم حذف التقرير بنجاح",
                        results: deletedReport,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في حذف التقرير",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                params: t.Object({
                    id: t.String(),
                }),
            })

            // Get reports count
            .get("/stats/count", async ({ query, set }) => {
                try {
                    const isRead = query.is_read === 'true' ? true : query.is_read === 'false' ? false : undefined;
                    
                    const count = await ReportService.getReportsCount({ isRead });

                    return {
                        error: false,
                        message: "تم استرجاع عدد التقارير بنجاح",
                        results: {
                            count,
                            filter: isRead !== undefined ? (isRead ? "مقروءة" : "غير مقروءة") : "جميع التقارير"
                        },
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في استرجاع عدد التقارير",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                query: t.Object({
                    is_read: t.Optional(t.String()),
                }),
            })
    );

export default reportAdminController;