# Special Product Items API

## إدارة عناصر المنتجات المميزة مع نظام التقييم

### الوصف

API لإدارة عناصر المنتجات المميزة مع دعم اللغات المتعددة ونظام التقييم بالنجوم، مع عمليات CRUD كاملة للإدارة وإمكانية الوصول العام للقراءة فقط.

#### المميزات الجديدة
- **استجابات محلية**: كل endpoint يدعم معامل `lang` لإرجاع المحتوى باللغة المطلوبة
- **رسائل متعددة اللغات**: رسائل النجاح والخطأ باللغة المطلوبة
- **مرونة في العرض**: يمكن الحصول على لغة واحدة أو جميع اللغات
- **تحسين الأداء**: إرجاع البيانات المطلوبة فقط حسب اللغة

### اللغات المدعومة

- `ar` - العربية
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

### 1. استرجاع جميع عناصر المنتجات المميزة

```http
GET /api/special-product-items?page={page}&limit={limit}&lang={language}
```

#### المعاملات

- `page` (اختياري): رقم الصفحة، القيمة الافتراضية: 1
- `limit` (اختياري): عدد العناصر في الصفحة، القيمة الافتراضية: 10، الحد الأقصى: 100
- `lang` (اختياري): اللغة المطلوبة (`ar`, `en`, `ku`)، القيمة الافتراضية: `ar`

#### أمثلة

```http
GET /api/special-product-items                        # الصفحة الأولى، 10 عناصر، عربي
GET /api/special-product-items?lang=en                # الصفحة الأولى، إنجليزي
GET /api/special-product-items?lang=ku                # الصفحة الأولى، كردي
GET /api/special-product-items?page=2&lang=ar         # الصفحة الثانية، عربي
GET /api/special-product-items?page=1&limit=5&lang=en # الصفحة الأولى، 5 عناصر، إنجليزي
```

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "تم استرجاع عناصر المنتجات المميزة بنجاح",
  "results": {
    "items": [
      {
        "_id": "item_id_1",
        "title": "منتج مميز باللغة العربية",
        "stars": 5,
        "image": {
          "id": "image_id_1",
          "url": "https://example.com/special_product1.jpg",
          "width": 400,
          "height": 300
        },
        "language": "ar",
        "createdAt": "2025-10-21T12:00:00.000Z",
        "updatedAt": "2025-10-21T12:00:00.000Z"
      },
      {
        "_id": "item_id_2", 
        "title": "منتج مميز آخر",
        "stars": 4,
        "image": {
          "id": "image_id_2",
          "url": "https://example.com/special_product2.jpg",
          "width": 400,
          "height": 300
        },
        "language": "ar",
        "createdAt": "2025-10-21T12:30:00.000Z",
        "updatedAt": "2025-10-21T12:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25,
      "itemsPerPage": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### 2. استرجاع عنصر واحد حسب المعرف

```http
GET /api/special-product-items/{id}?lang={language}
```

#### المعاملات

- `id` (مطلوب): معرف العنصر
- `lang` (اختياري): اللغة المطلوبة (`ar`, `en`, `ku`)، القيمة الافتراضية: `ar`

#### أمثلة

```http
GET /api/special-product-items/673123456789abcdef123456           # عربي
GET /api/special-product-items/673123456789abcdef123456?lang=en   # إنجليزي  
GET /api/special-product-items/673123456789abcdef123456?lang=ku   # كردي
```

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "تم استرجاع العنصر بنجاح",
  "results": {
    "_id": "item_id_1",
    "title": "منتج مميز",
    "stars": 5,
    "image": {
      "id": "image_id_1",
      "url": "https://example.com/special_product.jpg",
      "width": 400,
      "height": 300
    },
    "language": "ar",
    "createdAt": "2025-10-21T12:00:00.000Z",
    "updatedAt": "2025-10-21T12:00:00.000Z"
  }
}
```

#### استجابة الخطأ - عنصر غير موجود (404)

```json
{
  "error": true,
  "message": "لم يتم العثور على العنصر"
}
```

### 3. استرجاع عدد العناصر

```http
GET /api/special-product-items/count?lang={language}
```

#### المعاملات

- `lang` (اختياري): اللغة المطلوبة (`ar`, `en`, `ku`)، القيمة الافتراضية: `ar`

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "تم استرجاع عدد العناصر بنجاح",
  "results": {
    "count": 5
  }
}
```

### 4. استرجاع جميع اللغات

```http
GET /api/special-product-items/all-languages
```

#### الوصف

يسترجع جميع العناصر مع عرض جميع اللغات في كل عنصر. مفيد للتطوير أو الإدارة.

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "Special product items retrieved successfully with all languages",
  "results": {
    "items": [
      {
        "_id": "item_id_1",
        "title": {
          "ar": "منتج مميز",
          "en": "Special Product",
          "ku": "بەرهەمی تایبەت"
        },
        "stars": 5,
        "image": {
          "id": "image_id_1",
          "url": "https://example.com/special_product.jpg",
          "width": 400,
          "height": 300
        },
        "createdAt": "2025-10-21T12:00:00.000Z",
        "updatedAt": "2025-10-21T12:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalItems": 1,
      "itemsPerPage": 10,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}
```

---

## Admin Endpoints (يتطلب مصادقة)

### 4. استرجاع جميع العناصر (إدارة)

```http
GET /api/admin/special-product-items?page={page}&limit={limit}
```

#### المتطلبات

- **Authentication**: مطلوب

#### الهيدر المطلوب

```text
Authorization: Bearer <jwt_token>
```

#### الاستجابة

نفس استجابة `/api/special-product-items` مع جميع العناصر

### 5. إنشاء عنصر جديد

```http
POST /api/admin/special-product-items
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
    "ar": "منتج مميز جديد",
    "en": "New Special Product",
    "ku": "بەرهەمی تایبەتی نوێ"
  },
  "stars": 5,
  "image": {
    "id": "new_image_id",
    "url": "https://example.com/new_special_product.jpg",
    "width": 400,
    "height": 300
  }
}
```

#### التحقق من الصحة

- **title**: اختياري، كائن يحتوي على النصوص بثلاث لغات
- **stars**: مطلوب، رقم بين 1 و 5
- **image**: مطلوب، كائن يحتوي على المعرف والرابط والأبعاد
  - **id**: مطلوب، نص (معرف الصورة)  
  - **url**: مطلوب، نص (رابط الصورة)
  - **width**: مطلوب، رقم (عرض الصورة)
  - **height**: مطلوب، رقم (ارتفاع الصورة)

#### الاستجابة الناجحة (201)

```json
{
  "error": false,
  "message": "تم إنشاء العنصر المميز بنجاح",
  "results": {
    "_id": "new_item_id",
    "title": {
      "ar": "منتج مميز جديد",
      "en": "New Special Product",
      "ku": "بەرهەمی تایبەتی نوێ"
    },
    "stars": 5,
    "image": {
      "id": "new_image_id",
      "url": "https://example.com/new_special_product.jpg",
      "width": 400,
      "height": 300
    },
    "createdAt": "2025-10-21T14:00:00.000Z",
    "updatedAt": "2025-10-21T14:00:00.000Z"
  }
}
```

### 6. تحديث عنصر موجود

```http
PUT /api/admin/special-product-items/{id}
```

#### المتطلبات

- **Authentication**: مطلوب

#### الهيدر المطلوب

```text
Authorization: Bearer <jwt_token>
```

#### المعاملات

- `id` (مطلوب): معرف العنصر المراد تحديثه

#### البيانات المطلوبة

```json
{
  "title": {
    "ar": "منتج مميز محدث",
    "en": "Updated Special Product",
    "ku": "بەرهەمی تایبەتی نوێکراوە"
  },
  "stars": 4,
  "image": {
    "id": "updated_image_id",
    "url": "https://example.com/updated_special_product.jpg",
    "width": 500,
    "height": 400
  }
}
```

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "تم تحديث العنصر المميز بنجاح",
  "results": {
    "_id": "item_id",
    "title": {
      "ar": "منتج مميز محدث",
      "en": "Updated Special Product",
      "ku": "بەرهەمی تایبەتی نوێکراوە"
    },
    "stars": 4,
    "image": {
      "id": "updated_image_id",
      "url": "https://example.com/updated_special_product.jpg",
      "width": 500,
      "height": 400
    },
    "createdAt": "2025-10-21T12:00:00.000Z",
    "updatedAt": "2025-10-21T14:30:00.000Z"
  }
}
```

#### استجابة الخطأ - عنصر غير موجود (404)

```json
{
  "error": true,
  "message": "لم يتم العثور على العنصر للتحديث"
}
```

### 7. حذف عنصر

```http
DELETE /api/admin/special-product-items/{id}
```

#### المتطلبات

- **Authentication**: مطلوب

#### الهيدر المطلوب

```text
Authorization: Bearer <jwt_token>
```

#### المعاملات

- `id` (مطلوب): معرف العنصر المراد حذفه

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "تم حذف العنصر المميز بنجاح"
}
```

#### استجابة الخطأ - عنصر غير موجود (404)

```json
{
  "error": true,
  "message": "لم يتم العثور على العنصر للحذف"
}
```

---

## أمثلة عملية

### استرجاع جميع العناصر

```bash
# الصفحة الأولى مع الإعدادات الافتراضية (10 عناصر، عربي)
curl -X GET "http://localhost:3001/api/special-product-items"

# الصفحة الأولى بالإنجليزية
curl -X GET "http://localhost:3001/api/special-product-items?lang=en"

# الصفحة الأولى بالكردية
curl -X GET "http://localhost:3001/api/special-product-items?lang=ku"

# الصفحة الثانية بالعربية
curl -X GET "http://localhost:3001/api/special-product-items?page=2&lang=ar"

# الصفحة الأولى مع 5 عناصر بالإنجليزية
curl -X GET "http://localhost:3001/api/special-product-items?page=1&limit=5&lang=en"

# الصفحة الثالثة مع 20 عنصر بالكردية
curl -X GET "http://localhost:3001/api/special-product-items?page=3&limit=20&lang=ku"
```

### استرجاع عنصر واحد

```bash
# بالعربية (افتراضي)
curl -X GET "http://localhost:3001/api/special-product-items/673123456789abcdef123456"

# بالإنجليزية
curl -X GET "http://localhost:3001/api/special-product-items/673123456789abcdef123456?lang=en"

# بالكردية
curl -X GET "http://localhost:3001/api/special-product-items/673123456789abcdef123456?lang=ku"
```

### استرجاع عدد العناصر

```bash
# بالعربية (افتراضي)
curl -X GET "http://localhost:3001/api/special-product-items/count"

# بالإنجليزية
curl -X GET "http://localhost:3001/api/special-product-items/count?lang=en"

# بالكردية  
curl -X GET "http://localhost:3001/api/special-product-items/count?lang=ku"
```

### استرجاع جميع اللغات

```bash
curl -X GET "http://localhost:3001/api/special-product-items/all-languages"
```

### إنشاء عنصر جديد (إدارة)

```bash
curl -X POST http://localhost:3001/api/admin/special-product-items \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": {
      "ar": "منتج مميز جديد",
      "en": "New Special Product",
      "ku": "بەرهەمی تایبەتی نوێ"
    },
    "stars": 5,
    "image": {
      "id": "img_123",
      "url": "https://example.com/special_product.jpg",
      "width": 400,
      "height": 300
    }
  }'
```

### تحديث عنصر (إدارة)

```bash
curl -X PUT http://localhost:3001/api/admin/special-product-items/673123456789abcdef123456 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": {
      "ar": "منتج مميز محدث",
      "en": "Updated Special Product",
      "ku": "بەرهەمی تایبەتی نوێکراوە"
    },
    "stars": 4,
    "image": {
      "id": "img_456",
      "url": "https://example.com/updated_special_product.jpg",
      "width": 500,
      "height": 400
    }
  }'
```

### حذف عنصر (إدارة)

```bash
curl -X DELETE http://localhost:3001/api/admin/special-product-items/673123456789abcdef123456 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## نموذج البيانات

### Special Product Item Schema

```typescript
{
  title?: {
    ar?: string | null;   // العنوان بالعربية
    en?: string | null;   // العنوان بالإنجليزية
    ku?: string | null;   // العنوان بالكردية
  };
  stars: number;          // التقييم بالنجوم (1-5)
  image: {
    id: string;           // معرف الصورة
    url: string;          // رابط الصورة
    width: number;        // عرض الصورة
    height: number;       // ارتفاع الصورة
  };
  createdAt: Date;        // تاريخ الإنشاء
  updatedAt: Date;        // تاريخ آخر تحديث
}
```

### Image Object Structure

```typescript
interface IMediaImage {
  id: string;             // معرف الصورة (مطلوب)
  url: string;            // رابط الصورة (مطلوب)
  width: number;          // عرض الصورة بالبكسل (مطلوب)
  height: number;         // ارتفاع الصورة بالبكسل (مطلوب)
}
```

### Multi-Language Text Structure

```typescript
interface IMultiLanguageText {
  ar?: string | null;     // النص بالعربية
  en?: string | null;     // النص بالإنجليزية
  ku?: string | null;     // النص بالكردية
}
```

---

## المميزات

### إدارة شاملة

- **CRUD كامل**: إنشاء، قراءة، تحديث، حذف
- **فصل الصلاحيات**: عمليات عامة وإدارية منفصلة
- **التحقق من البيانات**: التحقق من صحة جميع المدخلات

### دعم اللغات المتعددة

- **المرونة**: يمكن إضافة محتوى بأي من اللغات الثلاث
- **التوافق**: دعم للتطبيقات متعددة اللغات
- **القيم الفارغة**: دعم للقيم الفارغة (null) لكل لغة

### نظام التقييم

- **النجوم**: تقييم من 1 إلى 5 نجوم
- **التحقق**: التحقق من صحة قيم التقييم
- **الفرز**: إمكانية الفرز حسب التقييم

### إدارة الوسائط

- **الصور**: دعم كامل للصور مع الأبعاد
- **التحقق**: التحقق من صحة روابط الصور والأبعاد
- **المرونة**: يمكن تحديث الصور مع المعلومات الأساسية

### الأداء

- **الاستعلامات المُحسنة**: استعلامات سريعة للقراءة
- **العد المباشر**: endpoint منفصل لعد العناصر
- **التخزين المؤقت**: إمكانية التخزين المؤقت للعمليات العامة
- **Pagination**: دعم التقسيم لتحسين الأداء

---

## رموز الأخطاء

| الرمز | الوصف |
|------|--------|
| 200 | نجح الطلب |
| 201 | تم إنشاء العنصر بنجاح |
| 400 | خطأ في البيانات أو التحقق من الصحة |
| 401 | غير مصرح بالدخول |
| 404 | العنصر غير موجود |
| 500 | خطأ داخلي في الخادم |

---

## التحقق من البيانات

### قواعد التحقق

1. **العنوان (title)**
   - اختياري للإنشاء والتحديث
   - نوع البيانات: كائن متعدد اللغات
   - يمكن أن تكون القيم فارغة (null)

2. **النجوم (stars)**
   - مطلوب للإنشاء
   - اختياري للتحديث
   - نوع البيانات: رقم
   - النطاق: من 1 إلى 5

3. **الصورة (image)**
   - مطلوبة للإنشاء
   - اختيارية للتحديث
   - يجب أن تحتوي على: id، url، width، height
   - جميع قيم الصورة مطلوبة

### رسائل الخطأ الشائعة

```json
{
  "error": true,
  "message": "Validation failed",
  "details": {
    "stars": "Stars must be between 1 and 5",
    "image.url": "Image URL is required",
    "image.width": "Image width must be a number"
  }
}
```

---

## الأمان

### حماية المسارات

- **العمليات العامة**: لا تتطلب مصادقة (GET)
- **العمليات الإدارية**: تتطلب JWT صالح
- **التحقق من الهوية**: التحقق من صحة الرمز المميز لكل طلب إداري

### أفضل الممارسات

1. **استخدام HTTPS**: في بيئة الإنتاج
2. **تقييد الحقول**: تحديد الحقول المطلوبة فقط
3. **التحقق من الأذونات**: التأكد من صحة الرمز المميز
4. **معالجة الأخطاء**: إخفاء تفاصيل الأخطاء الحساسة

---

## ملاحظات مهمة

1. **معرفات MongoDB**: استخدم معرفات MongoDB صالحة (24 حرف hex)
2. **تقييم النجوم**: يجب أن يكون بين 1 و 5
3. **أحجام الصور**: تأكد من صحة أبعاد الصور
4. **روابط الوسائط**: تحقق من صحة روابط الصور
5. **المعالجة المتزامنة**: جميع العمليات غير متزامنة (async)
6. **دعم اللغات**: يمكن أن تكون العناوين فارغة لأي لغة

---

[← العودة إلى الصفحة الرئيسية](../README.md)