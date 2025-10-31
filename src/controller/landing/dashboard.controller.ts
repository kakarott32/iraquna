import Elysia, { t } from "elysia";
import VideoSectionService from "../../services/video_section.service";
import AnimatedProductItemsService from "../../services/animated_product_items.service";
import SpecialProductItemsService from "../../services/special_product_items.service";
import ConnectUsService from "../../services/connect_us.service";
import GalleryService from "../../services/gallery.service";
import ManageItemsService from "../../services/manage_items.service";
import type { SupportedLanguage } from "../../interface/global.interface";
import ReportService from "../../services/report.service";

export const dashboardLandingController = new Elysia()
    .group("/dashboard", (group) =>
        group
            .get("/", async ({ query, set }) => {
                try {

                    const language = (query.lang as SupportedLanguage) || 'ar';

                    // Validate language
                    if (!['ar', 'en', 'ku'].includes(language)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "Unsupported language. Use: ar, en, or ku",
                        };
                    }

                    // Fetch all data concurrently for better performance
                    const [videoSection, animatedProducts, specialProducts, connectInfo] = await Promise.all([
                        VideoSectionService.getVideoSection(),
                        AnimatedProductItemsService.getAllAnimatedProductItems({ page: 1, limit: 10 }),
                        SpecialProductItemsService.getAllSpecialProductItems({ page: 1, limit: 10 }),
                        ConnectUsService.getConnectUsInfo()
                    ]);

                    // Helper function to localize multi-language text
                    const localizeText = (text: any) => {
                        if (!text || typeof text !== 'object') return text;
                        return text[language] || text.ar || text.en || text.ku || null;
                    };

                    // Localize video section
                    const localizedVideoSection = videoSection ? {
                        _id: videoSection._id,
                        title: localizeText(videoSection.title),
                        description: localizeText(videoSection.description),
                        video: videoSection.video,
                        image_right_top: videoSection.image_right_top,
                        image_right_bottom: videoSection.image_right_bottom,
                        image_left_top: videoSection.image_left_top,
                        image_left_bottom: videoSection.image_left_bottom,
                        createdAt: videoSection.createdAt,
                        updatedAt: videoSection.updatedAt
                    } : null;

                    // Localize animated products
                    const localizedAnimatedProducts = animatedProducts.items.map((item: any) => ({
                        _id: item._id,
                        image: item.image,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt
                    }));

                    // Localize special products  
                    const localizedSpecialProducts = specialProducts.items.map((item: any) => ({
                        _id: item._id,
                        title: localizeText(item.title),
                        stars: item.stars,
                        image: item.image,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt
                    }));

                    // Prepare success message based on language
                    const successMessage = language === 'ar' ? "تم استرجاع بيانات لوحة التحكم بنجاح" :
                        language === 'en' ? "Dashboard data retrieved successfully" :
                            "زانیارییەکانی داشبۆرد بە سەرکەوتووی وەرگیرا";

                    return {
                        error: false,
                        message: successMessage,
                        language,
                        results: {
                            video_section: localizedVideoSection,
                            animated_products: {
                                items: localizedAnimatedProducts,
                                pagination: animatedProducts.pagination
                            },
                            special_products: {
                                items: localizedSpecialProducts,
                                pagination: specialProducts.pagination
                            },
                            connect_info: connectInfo
                        }
                    };

                } catch (error) {
                    const language = (query.lang as SupportedLanguage) || 'ar';
                    set.status = 500;
                    return {
                        error: true,
                        message: language === 'ar' ? "خطأ في استرجاع بيانات لوحة التحكم" :
                            language === 'en' ? "Error retrieving dashboard data" :
                                "هەڵەیەک لە وەرگرتنەوەی زانیارییەکانی داشبۆردا ڕوویدا",
                    };
                }
            }, {
                query: t.Object({
                    lang: t.Optional(t.Union([
                        t.Literal('ar'),
                        t.Literal('en'),
                        t.Literal('ku')
                    ]))
                })
            })
            .get("/gallery", async ({ query, set }) => {
                try {
                    const language = (query.lang as SupportedLanguage) || 'ar';

                    // Validate language
                    if (!['ar', 'en', 'ku'].includes(language)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "Unsupported language. Use: ar, en, or ku",
                        };
                    }

                    // Fetch all gallery data
                    const galleries = await GalleryService.allGallery();

                    // Helper function to localize multi-language text
                    const localizeText = (text: any) => {
                        if (!text || typeof text !== 'object') return text;
                        return text[language] || text.ar || text.en || text.ku || null;
                    };

                    // Localize gallery data
                    const localizedGalleries = galleries.map((gallery: any) => ({
                        _id: gallery._id,
                        title: localizeText(gallery.title),
                        images: gallery.images.map((image: any) => ({
                            _id: image._id,
                            title: localizeText(image.title),
                            image: image.image,
                        })),
                        createdAt: gallery.createdAt,
                        updatedAt: gallery.updatedAt
                    }));

                    // Prepare success message based on language
                    const successMessage = language === 'ar' ? "تم استرجاع المعرض بنجاح" :
                        language === 'en' ? "Gallery retrieved successfully" :
                            "گاڵەری بە سەرکەوتووی وەرگیرا";

                    return {
                        error: false,
                        message: successMessage,
                        language,
                        results: localizedGalleries
                    };

                } catch (error) {
                    const language = (query.lang as SupportedLanguage) || 'ar';
                    set.status = 500;
                    return {
                        error: true,
                        message: language === 'ar' ? "خطأ في استرجاع المعرض" :
                            language === 'en' ? "Error retrieving gallery" :
                                "هەڵەیەک لە وەرگرتنەوەی گاڵەرییەکەدا ڕوویدا",
                    };
                }
            }, {
                query: t.Object({
                    lang: t.Optional(t.Union([
                        t.Literal('ar'),
                        t.Literal('en'),
                        t.Literal('ku')
                    ]))
                })
            })
            .get("/special-product-items", async ({ query, set }) => {
                try {
                    const language = (query.lang as SupportedLanguage) || 'ar';
                    const page = parseInt(query.page as string) || 1;
                    const limit = Math.min(parseInt(query.limit as string) || 10, 50); // Max 50 per page

                    // Validate language
                    if (!['ar', 'en', 'ku'].includes(language)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "Unsupported language. Use: ar, en, or ku",
                        };
                    }

                    // Validate pagination parameters
                    if (page < 1) {
                        set.status = 400;
                        const errorMessage = language === 'ar' ? "رقم الصفحة يجب أن يكون أكبر من صفر" :
                            language === 'en' ? "Page number must be greater than zero" :
                                "ژمارەی پەڕە دەبێت لە سفرەوە زیاتر بێت";
                        return {
                            error: true,
                            message: errorMessage,
                        };
                    }

                    if (limit < 1) {
                        set.status = 400;
                        const errorMessage = language === 'ar' ? "عدد العناصر يجب أن يكون أكبر من صفر" :
                            language === 'en' ? "Limit must be greater than zero" :
                                "ژمارەی بابەتەکان دەبێت لە سفرەوە زیاتر بێت";
                        return {
                            error: true,
                            message: errorMessage,
                        };
                    }

                    // Fetch special product items with pagination
                    const specialProducts = await SpecialProductItemsService.getAllSpecialProductItems({ page, limit });

                    // Helper function to localize multi-language text
                    const localizeText = (text: any) => {
                        if (!text || typeof text !== 'object') return text;
                        return text[language] || text.ar || text.en || text.ku || null;
                    };

                    // Localize special products  
                    const localizedSpecialProducts = specialProducts.items.map((item: any) => ({
                        _id: item._id,
                        title: localizeText(item.title),
                        stars: item.stars,
                        image: item.image,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt
                    }));

                    // Prepare success message based on language
                    const successMessage = language === 'ar' ? "تم استرجاع المنتجات المميزة بنجاح" :
                        language === 'en' ? "Special products retrieved successfully" :
                            "بەرهەمە تایبەتەکان بە سەرکەوتووی وەرگیران";

                    return {
                        error: false,
                        message: successMessage,
                        language,
                        results: {
                            items: localizedSpecialProducts,
                            pagination: specialProducts.pagination
                        }
                    };

                } catch (error) {
                    const language = (query.lang as SupportedLanguage) || 'ar';
                    set.status = 500;
                    return {
                        error: true,
                        message: language === 'ar' ? "خطأ في استرجاع المنتجات المميزة" :
                            language === 'en' ? "Error retrieving special products" :
                                "هەڵەیەک لە وەرگرتنەوەی بەرهەمە تایبەتەکاندا ڕوویدا",
                    };
                }
            }, {
                query: t.Object({
                    lang: t.Optional(t.Union([
                        t.Literal('ar'),
                        t.Literal('en'),
                        t.Literal('ku')
                    ])),
                    page: t.Optional(t.String()),
                    limit: t.Optional(t.String()),
                })
            })
            .get("/manage-items", async ({ query, set }) => {
                try {
                    const language = (query.lang as SupportedLanguage) || 'ar';

                    // Validate language
                    if (!['ar', 'en', 'ku'].includes(language)) {
                        set.status = 400;
                        return {
                            error: true,
                            message: "Unsupported language. Use: ar, en, or ku",
                        };
                    }

                    // Fetch manage items
                    const manageItemsData = await ManageItemsService.getAllManageItems();

                    // Helper function to localize multi-language text
                    const localizeText = (text: any) => {
                        if (!text || typeof text !== 'object') return text;
                        return text[language] || text.ar || text.en || text.ku || null;
                    };

                    // Localize manage items with localized images
                    const localizedManageItems = manageItemsData.items.map((item: any) => ({
                        _id: item._id,
                        title: localizeText(item.title),
                        images: item.images.map((image: any) => ({
                            _id: image._id,
                            title: localizeText(image.title),
                            stars: image.stars,
                            weight: image.weight,
                            weight_unite: localizeText(image.weight_unite),
                            image: image.image,
                        })),
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt
                    }));

                    // Prepare success message based on language
                    const successMessage = language === 'ar' ? "تم استرجاع عناصر الإدارة بنجاح" :
                        language === 'en' ? "Manage items retrieved successfully" :
                            "بابەتە بەڕێوەبردنی بە سەرکەوتووی وەرگیران";

                    return {
                        error: false,
                        message: successMessage,
                        language,
                        results: localizedManageItems
                    };

                } catch (error) {
                    const language = (query.lang as SupportedLanguage) || 'ar';
                    set.status = 500;
                    return {
                        error: true,
                        message: language === 'ar' ? "خطأ في استرجاع عناصر الإدارة" :
                            language === 'en' ? "Error retrieving manage items" :
                                "هەڵەیەک لە وەرگرتنەوەی بابەتە بەڕێوەبردنی دا ڕوویدا",
                    };
                }
            }, {
                query: t.Object({
                    lang: t.Optional(t.Union([
                        t.Literal('ar'),
                        t.Literal('en'),
                        t.Literal('ku')
                    ])),
                })
            })
            .post("/reports", async ({ body, set }) => {
                try {
                    await ReportService.createReport({
                        data: body,
                    });

                    return {
                        error: false,
                        message: "تم استلام التقرير بنجاح",
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        error: true,
                        message: "خطأ في تقديم التقرير",
                    };
                }
            }, {
                body: t.Object({
                    full_name: t.String(),
                    phone: t.String(),
                    message: t.String(),
                })
            }
            )
    );
