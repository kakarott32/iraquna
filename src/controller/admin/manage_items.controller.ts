import Elysia, { t } from "elysia";
import mongoose from "mongoose";
import { AuthServiceDashboard } from "../../middleware/auth.middleware";
import ManageItemsService from "../../services/manage_items.service";

const ObjectId = mongoose.Types.ObjectId.createFromHexString;

export const manageItemsAdminController = new Elysia()
    .group("/admin/manage-items", (group) =>
        group
            // Get manage items (usually returns single item)
            .get("/", async ({ set }) => {
                try {
                    const items = await ManageItemsService.allManageItem();

                    if (!items) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على عناصر الإدارة",
                        };
                    }

                    return {
                        error: false,
                        message: "تم استرجاع عناصر الإدارة بنجاح",
                        results: items,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في استرجاع عناصر الإدارة",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
            })

            // Create Title for manage items
            .post("/title", async ({ body, set }) => {
                try {
                    const item = await ManageItemsService.createTitleManageItem({
                        title: body.title,
                        sorting: body.sorting
                    });

                    return {
                        error: false,
                        message: "تم حفظ عناصر الإدارة بنجاح",
                        results: item,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في حفظ عناصر الإدارة",
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
                    sorting: t.Number({
                        error: "Sorting is required",
                    })
                })
            })

            .put("/sorting/id/:id", async ({  params,body, set }) => {
                //sort items by given array of ids and their order
                try {
                    const sortNumber = body.sorting;
                    await ManageItemsService.updateSortingManageItem({
                        id: params.id,
                        sorting: sortNumber
                    });


                    return {
                        error: false,
                        message: "تم تحديث ترتيب عناصر الإدارة بنجاح",
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في تحديث ترتيب عناصر الإدارة",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                body: t.Object({
                    sorting: t.Number({
                        error: "Sorting number is required",
                    })
                }),
                params: t.Object({
                    id: t.String(),
                })
            })

            .put("/title/id/:id", async ({ params, body, set }) => {
                try {
                    if (!ObjectId(params.id)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معرف غير صالح",
                        };
                    }

                    const updatedItem = await ManageItemsService.updateTitleManageItem({
                        id: params.id,
                        title: body.title,
                    });

                    if (!updatedItem) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على عنصر الإدارة لتحديثه",
                        };
                    }

                    return {
                        error: false,
                        message: "تم تحديث عنوان عناصر الإدارة بنجاح",
                        results: updatedItem,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في تحديث عنوان عناصر الإدارة",
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

            .post("/images/id/:id", async ({ body, set, params }) => {
                try {
                    const item: any = await ManageItemsService.createImageManageItem({
                        data: body,
                        id: params.id
                    });

                    set.status = 201;
                    return {
                        error: false,
                        message: "تم اضافة عنصر بنجاح",
                        results: item,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في اضافة العنصر",
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
                    stars: t.Number(),
                    weight: t.Number(),
                    weight_unite: t.Object({
                        ar: t.String({
                            error: "Weight unit in Arabic is required",
                        }),
                        en: t.String({
                            error: "Weight unit in English is required",
                        }),
                        ku: t.String({
                            error: "Weight unit in Kurdish is required",
                        }),
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
                    description: t.Object({
                        ar: t.Optional(t.Nullable(t.String())),
                        en: t.Optional(t.Nullable(t.String())),
                        ku: t.Optional(t.Nullable(t.String())),
                    }),
                }),
                params: t.Object({
                    id: t.String(),
                })
            })

            //edit details without image change
            .put("/images/itemId/:itemId/imageId/:imageId", async ({ body, params, set }) => {
                try {
                    if (!ObjectId(params.itemId) || !ObjectId(params.imageId)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معرف غير صالح",
                        };
                    }
                    const updatedItem = await ManageItemsService.updateImageManageItem({
                        itemId: params.itemId,
                        imageId: params.imageId,
                        data: body,
                    });

                    if (!updatedItem) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على عنصر الإدارة لتحديثه",
                        };
                    }

                    return {
                        error: false,
                        message: "تم تحديث عنصر الإدارة بنجاح",
                        results: updatedItem,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في تحديث عنصر الإدارة",
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
                    stars: t.Optional(t.Number()),
                    weight: t.Optional(t.Number()),
                    weight_unite: t.Optional(t.Object({
                        ar: t.String({
                            error: "Weight unit in Arabic is required",
                        }),
                        en: t.String({
                            error: "Weight unit in English is required",
                        }),
                        ku: t.String({
                            error: "Weight unit in Kurdish is required",
                        }),
                    })),
                    description: t.Optional(t.Object({
                        ar: t.Optional(t.Nullable(t.String())),
                        en: t.Optional(t.Nullable(t.String())),
                        ku: t.Optional(t.Nullable(t.String())),
                    })),
                }),
                params: t.Object({
                    itemId: t.String(),
                    imageId: t.String(),
                })
            })


            .delete("/images/itemId/:itemId/imageId/:imageId", async ({ params, set }) => {
                try {
                    if (!ObjectId(params.itemId) || !ObjectId(params.imageId)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "معرف غير صالح",
                        };
                    }

                    const deletedItem = await ManageItemsService.deleteImageManageItem({
                        itemId: params.itemId,
                        imageId: params.imageId
                    });

                    if (!deletedItem) {
                        set.status = 404;
                        return {
                            error: true,
                            message: "لم يتم العثور على عنصر الإدارة لحذفه",
                        };
                    }

                    return {
                        error: false,
                        message: "تم حذف عنصر الإدارة بنجاح",
                        results: deletedItem,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في حذف عنصر الإدارة",
                    };
                }
            }, {
                beforeHandle: AuthServiceDashboard,
                params: t.Object({
                    itemId: t.String(),
                    imageId: t.String(),
                })
            })
    );

export default manageItemsAdminController;