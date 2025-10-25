import Elysia, { t } from "elysia";
import mongoose from "mongoose";
import { AuthServiceDashboard } from "../../middleware/auth.middleware";
import GalleryService from "../../services/gallery.service";
import type { IGallery } from "../../interface/gallery.interface";
import type { IMultiLanguageText } from "../../interface/global.interface";

const ObjectId = mongoose.Types.ObjectId.createFromHexString;

export const galleryAdminController = new Elysia()
    .group("/admin/gallery", (group) =>
        group
            // Get all gallery items
            .get("/", async ({ set }) => {
                try {
                    const items = await GalleryService.allGallery();

                    if (!items || items.length === 0) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على عناصر المعرض",
                        };
                    }

                    return {
                        error: false,
                        message: "تم استرجاع عناصر المعرض بنجاح",
                        results: items,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في استرجاع عناصر المعرض",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
            })

            // Create Title for gallery
            .post("/title", async ({ body, set }) => {
                try {
                    const item = await GalleryService.createTitleGallery({
                        title: body.title,
                    });

                    return {
                        error: false,
                        message: "تم حفظ عنوان المعرض بنجاح",
                        results: item,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في حفظ عنوان المعرض",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                body: t.Object({
                    title: t.Object({
                        ar: t.Optional(t.Nullable(t.String())),
                        en: t.Optional(t.Nullable(t.String())),
                        ku: t.Optional(t.Nullable(t.String())),
                    })
                })
            })

            // Update gallery title by ID
            .put("/title/id/:id", async ({ params, body, set }) => {
                try {
                    if (!ObjectId(params.id)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معرف غير صالح",
                        };
                    }

                    const updatedItem = await GalleryService.updateTitleGallery({
                        id: params.id,
                        title: body.title,
                    });

                    if (!updatedItem) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على عنصر المعرض لتحديثه",
                        };
                    }

                    return {
                        error: false,
                        message: "تم تحديث عنوان المعرض بنجاح",
                        results: updatedItem,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في تحديث عنوان المعرض",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                body: t.Object({
                    title: t.Object({
                        ar: t.Optional(t.Nullable(t.String())),
                        en: t.Optional(t.Nullable(t.String())),
                        ku: t.Optional(t.Nullable(t.String())),
                    })
                }),
                params: t.Object({
                    id: t.String(),
                })
            })

            // Add image to gallery
            .post("/images/id/:id", async ({ body, set, params }) => {
                try {
                    const item: any = await GalleryService.createImageGallery({
                        data: body,
                        id: params.id
                    });

                    set.status = 201;
                    return {
                        error: false,
                        message: "تم إضافة الصورة للمعرض بنجاح",
                        results: item,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في إضافة الصورة للمعرض",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                body: t.Object({
                    title: t.Object({
                        ar: t.Optional(t.Nullable(t.String())),
                        en: t.Optional(t.Nullable(t.String())),
                        ku: t.Optional(t.Nullable(t.String())),
                    }),
                    description: t.Object({
                        ar: t.Optional(t.Nullable(t.String())),
                        en: t.Optional(t.Nullable(t.String())),
                        ku: t.Optional(t.Nullable(t.String())),
                    }),
                    image: t.Object({
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
                }),
                params: t.Object({
                    id: t.String(),
                })
            })

            // Update gallery image
            .put("/images/itemId/:itemId/imageId/:imageId", async ({ body, params, set }) => {
                try {
                    if (!ObjectId(params.itemId) || !ObjectId(params.imageId)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معرف غير صالح",
                        };
                    }
                    const updatedItem = await GalleryService.updateImageGallery({
                        itemId: params.itemId,
                        imageId: params.imageId,
                        data: body,
                    });

                    if (!updatedItem) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على صورة المعرض لتحديثها",
                        };
                    }

                    return {
                        error: false,
                        message: "تم تحديث صورة المعرض بنجاح",
                        results: updatedItem,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في تحديث صورة المعرض",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                body: t.Object({
                    title: t.Optional(t.Object({
                        ar: t.Optional(t.Nullable(t.String())),
                        en: t.Optional(t.Nullable(t.String())),
                        ku: t.Optional(t.Nullable(t.String())),
                    })),
                    description: t.Optional(t.Object({
                        ar: t.Optional(t.Nullable(t.String())),
                        en: t.Optional(t.Nullable(t.String())),
                        ku: t.Optional(t.Nullable(t.String())),
                    })),
                    image: t.Optional(t.Object({
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
                    })),
                }),
                params: t.Object({
                    itemId: t.String(),
                    imageId: t.String(),
                })
            })

            // Delete gallery image
            .delete("/images/itemId/:itemId/imageId/:imageId", async ({ params, set }) => {
                try {
                    if (!ObjectId(params.itemId) || !ObjectId(params.imageId)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معرف غير صالح",
                        };
                    }

                    const deletedItem = await GalleryService.deleteImageGallery({
                        itemId: params.itemId,
                        imageId: params.imageId
                    });

                    if (!deletedItem) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على صورة المعرض لحذفها",
                        };
                    }

                    return {
                        error: false,
                        message: "تم حذف صورة المعرض بنجاح",
                        results: deletedItem,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في حذف صورة المعرض",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                params: t.Object({
                    itemId: t.String(),
                    imageId: t.String(),
                })
            })

            // Delete entire gallery
            .delete("/id/:id", async ({ params, set }) => {
                try {
                    if (!ObjectId(params.id)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معرف غير صالح",
                        };
                    }

                    const deletedItem = await GalleryService.deleteGallery({
                        id: params.id
                    });

                    if (!deletedItem) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على المعرض لحذفه",
                        };
                    }

                    return {
                        error: false,
                        message: "تم حذف المعرض بنجاح",
                        results: deletedItem,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في حذف المعرض",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                params: t.Object({
                    id: t.String(),
                })
            })

            // Get gallery count
            .get("/count", async ({ set }) => {
                try {
                    const count = await GalleryService.getGalleryCount();

                    return {
                        error: false,
                        message: "تم استرجاع عدد عناصر المعرض بنجاح",
                        results: { count },
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في استرجاع عدد عناصر المعرض",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
            })
    );

export default galleryAdminController;