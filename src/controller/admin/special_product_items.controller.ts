import Elysia, { t } from "elysia";
import mongoose from "mongoose";
import { AuthServiceDashboard } from "../../middleware/auth.middleware";
import SpecialProductItemsService from "../../services/special_product_items.service";

const ObjectId = mongoose.Types.ObjectId.createFromHexString;

export const specialProductItemsAdminController = new Elysia()
    .group("/admin/special-product-items", (group) =>
        group
            // Get all special product items
            .get("/", async ({ query, set }) => {
                try {
                    const page = query.page ? parseInt(query.page as string) : 1;
                    const limit = query.limit ? parseInt(query.limit as string) : 10;

                    // Validate pagination parameters
                    if (page < 1 || limit < 1 || limit > 100) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معاملات الصفحات غير صالحة. الصفحة يجب أن تكون >= 1 والحد الأقصى للعناصر <= 100",
                        };
                    }

                    const result = await SpecialProductItemsService.getAllSpecialProductItems({
                        page,
                        limit
                    });

                    return {
                        error: false,
                        message: "تم استرجاع عناصر المنتجات المميزة بنجاح",
                        results: result,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في استرجاع عناصر المنتجات المميزة",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
            })

            // Get single special product item by ID
            .get("/:id", async ({ params, set }) => {
                try {
                    if (!mongoose.Types.ObjectId.isValid(params.id)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معرف غير صالح",
                        };
                    }

                    const item = await SpecialProductItemsService.getSpecialProductItemById({
                        id: params.id,
                    });

                    if (!item) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على العنصر",
                        };
                    }

                    return {
                        error: false,
                        message: "تم استرجاع العنصر بنجاح",
                        results: item,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في استرجاع العنصر",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
            })

            // Create new special product item
            .post("/", async ({ body, set }) => {
                try {
                    const newItem = await SpecialProductItemsService.createSpecialProductItem({
                        data: body,
                    });

                    set.status = 201;
                    return {
                        error: false,
                        message: "تم إنشاء العنصر المميز بنجاح",
                        results: newItem,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في إنشاء العنصر المميز",
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
                    stars: t.Number({
                        minimum: 1,
                        maximum: 5,
                        error: "Stars must be between 1 and 5",
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
                })
            })

            // Update special product item
            .put("/:id", async ({ params, body, set }) => {
                try {
                    if (!mongoose.Types.ObjectId.isValid(params.id)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معرف غير صالح",
                        };
                    }

                    const updatedItem = await SpecialProductItemsService.updateSpecialProductItem({
                        id: params.id,
                        data: body,
                    });

                    if (!updatedItem) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على العنصر للتحديث",
                        };
                    }

                    return {
                        error: false,
                        message: "تم تحديث العنصر المميز بنجاح",
                        results: updatedItem,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في تحديث العنصر المميز",
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
                    stars: t.Optional(t.Number({
                        minimum: 1,
                        maximum: 5,
                        error: "Stars must be between 1 and 5",
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
                })
            })

            // Delete special product item
            .delete("/:id", async ({ params, set }) => {
                try {
                    if (!mongoose.Types.ObjectId.isValid(params.id)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معرف غير صالح",
                        };
                    }

                    const deletedItem = await SpecialProductItemsService.deleteSpecialProductItem({
                        id: params.id,
                    });

                    if (!deletedItem) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على العنصر للحذف",
                        };
                    }

                    return {
                        error: false,
                        message: "تم حذف العنصر المميز بنجاح",
                        results: deletedItem,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في حذف العنصر المميز",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
            })
    );