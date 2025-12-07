import Elysia, { t } from "elysia";
import mongoose from "mongoose";
import { AuthServiceDashboard } from "../../middleware/auth.middleware";
import ConnectUsService from "../../services/connect_us.service";

const ObjectId = mongoose.Types.ObjectId;

export const connectUsAdminController = new Elysia()
    .group("/admin/connect-us", (group) =>
        group
            // Get ConnectUs information
            .get("/", async ({ set }) => {
                try {
                    const info = await ConnectUsService.getConnectUsInfo();

                    if (!info) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على معلومات التواصل",
                        };
                    }

                    return {
                        error: false,
                        message: "تم استرجاع معلومات التواصل بنجاح",
                        results: info,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في استرجاع معلومات التواصل",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
            })

            // Create ConnectUs information (POST)
            .post("/", async ({ body, set }) => {
                try {
                    // Check if ConnectUs info already exists
                    const exists = await ConnectUsService.connectUsExists();
                    
                    if (exists) {
                        set.status = 409;
                        return {
                            error: true,
                            message: "معلومات التواصل موجودة بالفعل، استخدم PUT للتحديث",
                        };
                    }

                    const info = await ConnectUsService.createConnectUsInfo({
                        data: {
                            ...body,
                            phone_3: body.phone_3 || undefined,
                            phone_4: body.phone_4 || undefined,
                            map_embed_link: body.map_embed_link || undefined,
                            facebook_link: body.facebook_link || undefined,
                            instagram_link: body.instagram_link || undefined,
                            whatsapp_link: body.whatsapp_link || undefined,
                            youtube_link: body.youtube_link || undefined,
                            tiktok_link: body.tiktok_link || undefined,
                        },
                    });

                    set.status = 201;
                    return {
                        error: false,
                        message: "تم إنشاء معلومات التواصل بنجاح",
                        results: info,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في إنشاء معلومات التواصل",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                body: t.Object({
                    phone_1: t.String({
                        error: "الهاتف الأول مطلوب",
                    }),
                    phone_2: t.Optional(t.Nullable(t.String())),
                    phone_3: t.Optional(t.Nullable(t.String())),
                    phone_4: t.Optional(t.Nullable(t.String())),
                    email: t.String({
                        format: "email",
                        error: "البريد الإلكتروني مطلوب ويجب أن يكون صالحاً",
                    }),
                    address: t.String({
                        error: "العنوان مطلوب",
                    }),
                    map_embed_link: t.Optional(t.Nullable(t.String())),
                    facebook_link: t.Optional(t.Nullable(t.String())),
                    instagram_link: t.Optional(t.Nullable(t.String())),
                    whatsapp_link: t.Optional(t.Nullable(t.String())),
                    youtube_link: t.Optional(t.Nullable(t.String())),
                    tiktok_link: t.Optional(t.Nullable(t.String())),
                })
            })

            // Update ConnectUs information (PUT - singleton pattern)
            .put("/", async ({ body, set }) => {
                try {
                    const updatedInfo = await ConnectUsService.updateOrCreateConnectUsInfo({
                        data: {
                            ...body,
                            phone_3: body.phone_3 || undefined,
                            phone_4: body.phone_4 || undefined,
                            map_embed_link: body.map_embed_link || undefined,
                            facebook_link: body.facebook_link || undefined,
                            instagram_link: body.instagram_link || undefined,
                            whatsapp_link: body.whatsapp_link || undefined,
                            youtube_link: body.youtube_link || undefined,
                            tiktok_link: body.tiktok_link || undefined,
                        },
                    });

                    return {
                        error: false,
                        message: "تم تحديث معلومات التواصل بنجاح",
                        results: updatedInfo,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في تحديث معلومات التواصل",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                body: t.Object({
                    phone_1: t.Optional(t.String()),
                    phone_2: t.Optional(t.Nullable(t.String())),
                    phone_3: t.Optional(t.Nullable(t.String())),
                    phone_4: t.Optional(t.Nullable(t.String())),
                    email: t.Optional(t.String({
                        format: "email",
                        error: "البريد الإلكتروني يجب أن يكون صالحاً",
                    })),
                    address: t.Optional(t.String()),
                    map_embed_link: t.Optional(t.Nullable(t.String())),
                    facebook_link: t.Optional(t.Nullable(t.String())),
                    instagram_link: t.Optional(t.Nullable(t.String())),
                    whatsapp_link: t.Optional(t.Nullable(t.String())),
                    youtube_link: t.Optional(t.Nullable(t.String())),
                    tiktok_link: t.Optional(t.Nullable(t.String())),
                })
            })

            // Update ConnectUs information by ID (PUT with ID)
            .put("/:id", async ({ params, body, set }) => {
                try {
                    if (!ObjectId.isValid(params.id)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معرف معلومات التواصل غير صالح",
                        };
                    }

                    const updatedInfo = await ConnectUsService.updateConnectUsInfo({
                        id: params.id,
                        data: {
                            ...body,
                            phone_3: body.phone_3 || undefined,
                            phone_4: body.phone_4 || undefined,
                            map_embed_link: body.map_embed_link || undefined,
                            facebook_link: body.facebook_link || undefined,
                            instagram_link: body.instagram_link || undefined,
                            whatsapp_link: body.whatsapp_link || undefined,
                            youtube_link: body.youtube_link || undefined,
                            tiktok_link: body.tiktok_link || undefined,
                        },
                    });

                    if (!updatedInfo) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على معلومات التواصل لتحديثها",
                        };
                    }

                    return {
                        error: false,
                        message: "تم تحديث معلومات التواصل بنجاح",
                        results: updatedInfo,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في تحديث معلومات التواصل",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                params: t.Object({
                    id: t.String(),
                }),
                body: t.Object({
                    phone_1: t.Optional(t.String()),
                    phone_2: t.Optional(t.Nullable(t.String())),
                    phone_3: t.Optional(t.Nullable(t.String())),
                    phone_4: t.Optional(t.Nullable(t.String())),
                    email: t.Optional(t.String({
                        format: "email",
                        error: "البريد الإلكتروني يجب أن يكون صالحاً",
                    })),
                    address: t.Optional(t.String()),
                    map_embed_link: t.Optional(t.Nullable(t.String())),
                    facebook_link: t.Optional(t.Nullable(t.String())),
                    instagram_link: t.Optional(t.Nullable(t.String())),
                    whatsapp_link: t.Optional(t.Nullable(t.String())),
                    youtube_link: t.Optional(t.Nullable(t.String())),
                    tiktok_link: t.Optional(t.Nullable(t.String())),
                })
            })

            // Delete ConnectUs information (DELETE)
            .delete("/:id", async ({ params, set }) => {
                try {
                    if (!ObjectId.isValid(params.id)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معرف معلومات التواصل غير صالح",
                        };
                    }

                    const deletedInfo = await ConnectUsService.deleteConnectUsInfo({
                        id: params.id,
                    });

                    if (!deletedInfo) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على معلومات التواصل لحذفها",
                        };
                    }

                    return {
                        error: false,
                        message: "تم حذف معلومات التواصل بنجاح",
                        results: deletedInfo,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في حذف معلومات التواصل",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                params: t.Object({
                    id: t.String(),
                }),
            })

            // Get all ConnectUs records (admin only)
            .get("/all", async ({ set }) => {
                try {
                    const allInfo = await ConnectUsService.getAllConnectUsInfo();

                    return {
                        error: false,
                        message: "تم استرجاع جميع معلومات التواصل بنجاح",
                        results: allInfo,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في استرجاع معلومات التواصل",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
            })

            // Check if ConnectUs exists
            .get("/exists", async ({ set }) => {
                try {
                    const exists = await ConnectUsService.connectUsExists();

                    return {
                        error: false,
                        message: "تم فحص وجود معلومات التواصل بنجاح",
                        results: { exists },
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في فحص وجود معلومات التواصل",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
            })
    );

export default connectUsAdminController;