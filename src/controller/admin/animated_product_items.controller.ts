import Elysia, { t } from "elysia";
import mongoose from "mongoose";
import { AuthServiceDashboard } from "../../middleware/auth.middleware";
import AnimatedProductItemsService from "../../services/animated_product_items.service";

export const animatedProductItemsAdminController = new Elysia()
    .group("/admin/animated-product-items", (group) =>
        group
            // Get all animated product items
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

                    const result = await AnimatedProductItemsService.getAllAnimatedProductItems({
                        page,
                        limit
                    });

                    return {
                        error: false,
                        message: "تم استرجاع عناصر المنتجات المتحركة بنجاح",
                        results: result,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في استرجاع عناصر المنتجات المتحركة",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
            })

            // Get single animated product item by ID
            .get("/:id", async ({ params, set }) => {
                try {
                    if (!mongoose.Types.ObjectId.isValid(params.id)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معرف غير صالح",
                        };
                    }

                    const item = await AnimatedProductItemsService.getAnimatedProductItemById({
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

            // Create new animated product item
            .post("/", async ({ body, set }) => {
                try {
                    const newItem = await AnimatedProductItemsService.createAnimatedProductItem({
                        data: body,
                    });

                    set.status = 201;
                    return {
                        error: false,
                        message: "تم إنشاء العنصر بنجاح",
                        results: newItem,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في إنشاء العنصر",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                body: t.Object({
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

            // Update animated product item
            .put("/:id", async ({ params, body, set }) => {
                try {
                    if (!mongoose.Types.ObjectId.isValid(params.id)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معرف غير صالح",
                        };
                    }

                    const updatedItem = await AnimatedProductItemsService.updateAnimatedProductItem({
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
                        message: "تم تحديث العنصر بنجاح",
                        results: updatedItem,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في تحديث العنصر",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                body: t.Object({
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

            // Delete animated product item
            .delete("/:id", async ({ params, set }) => {
                try {
                    if (!mongoose.Types.ObjectId.isValid(params.id)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معرف غير صالح",
                        };
                    }

                    const deletedItem = await AnimatedProductItemsService.deleteAnimatedProductItem({
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
                        message: "تم حذف العنصر بنجاح",
                        results: deletedItem,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في حذف العنصر",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
            })
    );