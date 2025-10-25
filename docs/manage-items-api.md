# Manage Items API

## إدارة عناصر الإدارة مع دعم اللغات المتعددة

### الوصف

API لإدارة عناصر الإدارة التي تحتوي على عنوان رئيسي ومجموعة من الصور مع معلوماتها. يدعم اللغات المتعددة ونظام التقييم بالنجوم والأوزان.

#### المميزات
- **استجابات محلية**: دعم اللغات المتعددة مع إرجاع المحتوى باللغة المطلوبة
- **بنية هرمية**: عنوان رئيسي مع مجموعة صور فرعية
- **نظام التقييم**: تقييم بالنجوم (1-5) لكل صورة
- **نظام الأوزان**: إمكانية إضافة وزن لكل صورة
- **بدون pagination**: عرض جميع البيانات في استجابة واحدة

### اللغات المدعومة

- `ar` - العربية (الافتراضية)
- `en` - الإنجليزية  
- `ku` - الكردية

---

## Endpoints

### Base URL

```text
http://localhost:3001/api
```

---

## Public Endpoints (بدون مصادقة)

### 1. استرجاع عناصر الإدارة

```http
GET /api/manage-items?lang={language}
```

#### المعاملات

- `lang` (اختياري): اللغة المطلوبة (`ar`, `en`, `ku`)، القيمة الافتراضية: `ar`

#### أمثلة

```http
GET /api/manage-items                # العربية (افتراضي)
GET /api/manage-items?lang=en        # الإنجليزية
GET /api/manage-items?lang=ku        # الكردية
```

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "تم استرجاع عناصر الإدارة بنجاح",
  "results": {
    "_id": "manage_items_id",
    "title": "عنوان إدارة العناصر",
    "images": [
      {
        "_id": "image_item_1",
        "title": "عنوان الصورة الأولى",
        "description": "وصف الصورة الأولى",
        "stars": 5,
        "weight": 100,
        "image": {
          "id": "image_id_1",
          "url": "https://example.com/manage_image1.jpg",
          "width": 400,
          "height": 300
        }
      },
      {
        "_id": "image_item_2",
        "title": "عنوان الصورة الثانية",
        "description": "وصف الصورة الثانية",
        "stars": 4,
        "weight": null,
        "image": {
          "id": "image_id_2",
          "url": "https://example.com/manage_image2.jpg",
          "width": 500,
          "height": 400
        }
      }
    ],
    "language": "ar",
    "createdAt": "2025-10-21T12:00:00.000Z",
    "updatedAt": "2025-10-21T12:00:00.000Z"
  }
}
```

#### استجابة الخطأ - عناصر غير موجودة (404)

```json
{
  "error": true,
  "message": "لم يتم العثور على عناصر الإدارة"
}
```

### 2. استرجاع عدد العناصر

```http
GET /api/manage-items/count?lang={language}
```

#### المعاملات

- `lang` (اختياري): اللغة المطلوبة (`ar`, `en`, `ku`)، القيمة الافتراضية: `ar`

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "تم استرجاع عدد العناصر بنجاح",
  "results": {
    "count": 1
  }
}
```

### 3. استرجاع جميع اللغات

```http
GET /api/manage-items/all-languages
```

#### الوصف

يسترجع عناصر الإدارة مع عرض جميع اللغات في كل حقل. مفيد للتطوير أو الإدارة.

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "Manage items retrieved successfully with all languages",
  "results": {
    "_id": "manage_items_id",
    "title": {
      "ar": "عنوان إدارة العناصر",
      "en": "Manage Items Title",
      "ku": "ناونیشانی بەڕێوەبردنی بەرهەمەکان"
    },
    "images": [
      {
        "_id": "image_item_1",
        "title": {
          "ar": "عنوان الصورة الأولى",
          "en": "First Image Title",
          "ku": "ناونیشانی یەکەم وێنە"
        },
        "description": {
          "ar": "وصف الصورة الأولى",
          "en": "First image description",
          "ku": "باسکردنی یەکەم وێنە"
        },
        "stars": 5,
        "weight": 100,
        "image": {
          "id": "image_id_1",
          "url": "https://example.com/manage_image1.jpg",
          "width": 400,
          "height": 300
        }
      }
    ],
    "createdAt": "2025-10-21T12:00:00.000Z",
    "updatedAt": "2025-10-21T12:00:00.000Z"
  }
}
```

---

## Admin Endpoints (يتطلب مصادقة)

### 4. استرجاع عناصر الإدارة (إدارة)

```http
GET /api/admin/manage-items
```

#### المتطلبات

- **Authentication**: مطلوب

#### الهيدر المطلوب

```text
Authorization: Bearer <jwt_token>
```

#### الاستجابة

نفس استجابة `/api/manage-items/all-languages` مع جميع اللغات

### 5. تحديث أو إنشاء عناصر الإدارة

```http
PUT /api/admin/manage-items
```

#### المتطلبات

- **Authentication**: مطلوب

#### الهيدر المطلوب

```text
Authorization: Bearer <jwt_token>
```

#### البيانات المطلوبة

```json
{
  "title": {
    "ar": "عنوان إدارة العناصر الجديد",
    "en": "New Manage Items Title",
    "ku": "ناونیشانی نوێی بەڕێوەبردنی بەرهەمەکان"
  },
  "images": [
    {
      "title": {
        "ar": "عنوان الصورة الأولى",
        "en": "First Image Title",
        "ku": "ناونیشانی یەکەم وێنە"
      },
      "description": {
        "ar": "وصف الصورة الأولى",
        "en": "First image description",
        "ku": "باسکردنی یەکەم وێنە"
      },
      "stars": 5,
      "weight": 100,
      "image": {
        "id": "image_id_1",
        "url": "https://example.com/manage_image1.jpg",
        "width": 400,
        "height": 300
      }
    },
    {
      "title": {
        "ar": "عنوان الصورة الثانية",
        "en": "Second Image Title",
        "ku": "ناونیشانی دووەم وێنە"
      },
      "description": {
        "ar": "وصف الصورة الثانية",
        "en": "Second image description",
        "ku": "باسکردنی دووەم وێنە"
      },
      "stars": 4,
      "weight": null,
      "image": {
        "id": "image_id_2",
        "url": "https://example.com/manage_image2.jpg",
        "width": 500,
        "height": 400
      }
    }
  ]
}
```

#### التحقق من الصحة

- **title**: مطلوب، كائن يحتوي على النصوص بثلاث لغات
- **images**: مطلوب، مصفوفة من عناصر الصور
  - **title**: مطلوب، كائن يحتوي على النصوص بثلاث لغات
  - **description**: مطلوب، كائن يحتوي على النصوص بثلاث لغات
  - **stars**: مطلوب، رقم بين 1 و 5
  - **weight**: اختياري، رقم أو null
  - **image**: مطلوب، كائن الصورة مع المعرف والرابط والأبعاد

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "تم تحديث عناصر الإدارة بنجاح",
  "results": {
    "_id": "manage_items_id",
    "title": {
      "ar": "عنوان إدارة العناصر الجديد",
      "en": "New Manage Items Title",
      "ku": "ناونیشانی نوێی بەڕێوەبردنی بەرهەمەکان"
    },
    "images": [
      // ... البيانات المحدثة
    ],
    "createdAt": "2025-10-21T12:00:00.000Z",
    "updatedAt": "2025-10-21T14:30:00.000Z"
  }
}
```

### 6. إنشاء عناصر الإدارة

```http
POST /api/admin/manage-items
```

#### المتطلبات

- **Authentication**: مطلوب

#### الهيدر المطلوب

```text
Authorization: Bearer <jwt_token>
```

#### البيانات المطلوبة

نفس بيانات PUT /api/admin/manage-items

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "تم حفظ عناصر الإدارة بنجاح",
  "results": {
    "_id": "manage_items_id",
    // ... البيانات المحفوظة
  }
}
```

### 7. حذف عناصر الإدارة

```http
DELETE /api/admin/manage-items
```

#### المتطلبات

- **Authentication**: مطلوب

#### الهيدر المطلوب

```text
Authorization: Bearer <jwt_token>
```

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "تم حذف عناصر الإدارة بنجاح"
}
```

#### استجابة الخطأ - عناصر غير موجودة (404)

```json
{
  "error": true,
  "message": "لم يتم العثور على عناصر الإدارة للحذف"
}
```

---

## إدارة الصور الفردية

### 8. إضافة صورة واحدة

```http
POST /api/admin/manage-items/images
```

#### المتطلبات

- **Authentication**: مطلوب

#### الهيدر المطلوب

```text
Authorization: Bearer <jwt_token>
```

#### البيانات المطلوبة

```json
{
  "title": {
    "ar": "عنوان الصورة الجديدة",
    "en": "New Image Title",
    "ku": "ناونیشانی وێنەی نوێ"
  },
  "description": {
    "ar": "وصف الصورة الجديدة",
    "en": "New image description",
    "ku": "باسکردنی وێنەی نوێ"
  },
  "stars": 4,
  "weight": 75,
  "image": {
    "id": "new_image_id",
    "url": "https://example.com/new_image.jpg",
    "width": 600,
    "height": 400
  }
}
```

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "تم إضافة الصورة بنجاح",
  "results": {
    "_id": "manage_items_id",
    "title": { "ar": "...", "en": "...", "ku": "..." },
    "images": [
      // ... الصور الموجودة
      {
        "_id": "new_image_item_id",
        "title": { "ar": "عنوان الصورة الجديدة", "en": "New Image Title", "ku": "ناونیشانی وێنەی نوێ" },
        "description": { "ar": "وصف الصورة الجديدة", "en": "New image description", "ku": "باسکردنی وێنەی نوێ" },
        "stars": 4,
        "weight": 75,
        "image": {
          "id": "new_image_id",
          "url": "https://example.com/new_image.jpg",
          "width": 600,
          "height": 400
        }
      }
    ]
  }
}
```

### 9. استرجاع صورة واحدة

```http
GET /api/admin/manage-items/images/:id
```

#### المتطلبات

- **Authentication**: مطلوب

#### المعاملات

- `id`: معرف الصورة

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "تم استرجاع الصورة بنجاح",
  "results": {
    "_id": "image_item_id",
    "title": { "ar": "عنوان الصورة", "en": "Image Title", "ku": "ناونیشانی وێنە" },
    "description": { "ar": "وصف الصورة", "en": "Image description", "ku": "باسکردنی وێنە" },
    "stars": 5,
    "weight": 100,
    "image": {
      "id": "image_id",
      "url": "https://example.com/image.jpg",
      "width": 400,
      "height": 300
    }
  }
}
```

### 10. تحديث صورة واحدة

```http
PUT /api/admin/manage-items/images/:id
```

#### المتطلبات

- **Authentication**: مطلوب

#### المعاملات

- `id`: معرف الصورة

#### البيانات المطلوبة (جميع الحقول اختيارية)

```json
{
  "title": {
    "ar": "عنوان محدث",
    "en": "Updated Title"
  },
  "stars": 3,
  "weight": 50
}
```

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "تم تحديث الصورة بنجاح",
  "results": {
    "_id": "manage_items_id",
    // ... عناصر الإدارة المحدثة مع الصورة المعدلة
  }
}
```

### 11. حذف صورة واحدة

```http
DELETE /api/admin/manage-items/images/:id
```

#### المتطلبات

- **Authentication**: مطلوب

#### المعاملات

- `id`: معرف الصورة

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "تم حذف الصورة بنجاح",
  "results": {
    "_id": "manage_items_id",
    // ... عناصر الإدارة بعد حذف الصورة
  }
}
```

---

## أمثلة عملية

### استرجاع عناصر الإدارة

```bash
# بالعربية (افتراضي)
curl -X GET "http://localhost:3001/api/manage-items"

# بالإنجليزية
curl -X GET "http://localhost:3001/api/manage-items?lang=en"

# بالكردية
curl -X GET "http://localhost:3001/api/manage-items?lang=ku"
```

### استرجاع عدد العناصر

```bash
# بالعربية (افتراضي)
curl -X GET "http://localhost:3001/api/manage-items/count"

# بالإنجليزية
curl -X GET "http://localhost:3001/api/manage-items/count?lang=en"
```

### استرجاع جميع اللغات

```bash
curl -X GET "http://localhost:3001/api/manage-items/all-languages"
```

### تحديث عناصر الإدارة (إدارة)

```bash
curl -X PUT http://localhost:3001/api/admin/manage-items \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": {
      "ar": "عنوان إدارة العناصر الجديد",
      "en": "New Manage Items Title",
      "ku": "ناونیشانی نوێی بەڕێوەبردنی بەرهەمەکان"
    },
    "images": [
      {
        "title": {
          "ar": "عنوان الصورة الأولى",
          "en": "First Image Title",
          "ku": "ناونیشانی یەکەم وێنە"
        },
        "description": {
          "ar": "وصف الصورة الأولى",
          "en": "First image description",
          "ku": "باسکردنی یەکەم وێنە"
        },
        "stars": 5,
        "weight": 100,
        "image": {
          "id": "img_123",
          "url": "https://example.com/image1.jpg",
          "width": 400,
          "height": 300
        }
      }
    ]
  }'
```

### حذف عناصر الإدارة (إدارة)

```bash
curl -X DELETE http://localhost:3001/api/admin/manage-items \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### إنشاء صورة واحدة

```bash
curl -X POST http://localhost:3001/api/admin/manage-items/images \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": {
      "ar": "عنوان الصورة الجديدة",
      "en": "New Image Title",
      "ku": "ناونیشانی وێنەی نوێ"
    },
    "description": {
      "ar": "وصف الصورة الجديدة",
      "en": "New image description",
      "ku": "باسکردنی وێنەی نوێ"
    },
    "stars": 4,
    "weight": 75,
    "image": {
      "id": "new_img_456",
      "url": "https://example.com/new_image.jpg",
      "width": 600,
      "height": 400
    }
  }'
```

### استرجاع صورة واحدة

```bash
curl -X GET http://localhost:3001/api/admin/manage-items/images/IMAGE_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### تحديث صورة واحدة

```bash
curl -X PUT http://localhost:3001/api/admin/manage-items/images/IMAGE_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": {
      "ar": "عنوان محدث"
    },
    "stars": 3
  }'
```

### حذف صورة واحدة

```bash
curl -X DELETE http://localhost:3001/api/admin/manage-items/images/IMAGE_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### إنشاء عناصر الإدارة بـ POST

```bash
curl -X POST http://localhost:3001/api/admin/manage-items \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": {
      "ar": "عنوان إدارة العناصر",
      "en": "Manage Items Title",
      "ku": "ناونیشانی بەڕێوەبردنی بەرهەمەکان"
    },
    "images": [
      {
        "title": {
          "ar": "عنوان الصورة الأولى",
          "en": "First Image Title",
          "ku": "ناونیشانی یەکەم وێنە"
        },
        "description": {
          "ar": "وصف الصورة الأولى",
          "en": "First image description",
          "ku": "باسکردنی یەکەم وێنە"
        },
        "stars": 5,
        "weight": 100,
        "image": {
          "id": "img_123",
          "url": "https://example.com/image1.jpg",
          "width": 400,
          "height": 300
        }
      }
    ]
  }'
```

---

## نموذج البيانات

### Manage Items Schema

```typescript
{
  title: {
    ar?: string | null;   // العنوان بالعربية
    en?: string | null;   // العنوان بالإنجليزية
    ku?: string | null;   // العنوان بالكردية
  };
  images: {
    title: {
      ar?: string | null;   // عنوان الصورة بالعربية
      en?: string | null;   // عنوان الصورة بالإنجليزية
      ku?: string | null;   // عنوان الصورة بالكردية
    };
    description: {
      ar?: string | null;   // وصف الصورة بالعربية
      en?: string | null;   // وصف الصورة بالإنجليزية
      ku?: string | null;   // وصف الصورة بالكردية
    };
    stars: number;          // التقييم بالنجوم (1-5)
    weight?: number | null; // الوزن (اختياري)
    image: {
      id: string;           // معرف الصورة
      url: string;          // رابط الصورة
      width: number;        // عرض الصورة
      height: number;       // ارتفاع الصورة
    };
  }[];
  createdAt: Date;          // تاريخ الإنشاء
  updatedAt: Date;          // تاريخ آخر تحديث
}
```

---

## المميزات

### البنية الهرمية

- **عنوان رئيسي**: عنوان للمجموعة بأكملها
- **صور متعددة**: مجموعة من الصور مع معلوماتها
- **مرونة في التنظيم**: يمكن إضافة أو حذف الصور حسب الحاجة

### دعم اللغات المتعددة

- **المرونة**: دعم ثلاث لغات لكل نص
- **الاستجابات المحلية**: إرجاع المحتوى بالغة المطلوبة فقط
- **التوافق**: دعم للتطبيقات متعددة اللغات

### نظام التقييم والوزن

- **النجوم**: تقييم من 1 إلى 5 نجوم لكل صورة
- **الأوزان**: نظام وزن اختياري لترتيب الصور
- **المرونة**: يمكن ترك الوزن فارغ (null)

### إدارة مبسطة

- **عنصر واحد**: يدير عنصر واحد فقط (singleton pattern)
- **تحديث شامل**: استبدال كامل للبيانات عند التحديث
- **بدون pagination**: عرض جميع البيانات في استجابة واحدة

---

## رموز الأخطاء

| الرمز | الوصف |
|------|--------|
| 200 | نجح الطلب |
| 400 | خطأ في البيانات أو لغة غير مدعومة |
| 401 | غير مصرح بالدخول |
| 404 | عناصر الإدارة غير موجودة |
| 500 | خطأ داخلي في الخادم |

---

## ملاحظات مهمة

1. **نمط Singleton**: هذا API يدير عنصر واحد فقط من عناصر الإدارة
2. **التحديث الشامل**: عند التحديث، يتم استبدال جميع البيانات
3. **الأوزان**: يمكن أن تكون الأوزان null أو أرقام
4. **التقييم**: يجب أن يكون التقييم بين 1 و 5
5. **اللغات**: يمكن أن تكون النصوص فارغة (null) لأي لغة
6. **بدون pagination**: جميع البيانات تظهر في استجابة واحدة

---

[← العودة إلى الصفحة الرئيسية](../README.md)