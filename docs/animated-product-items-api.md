# Animated Product Items API

## إدارة عناصر المنتجات المتحركة

### الوصف

API لإدارة عناصر المنتجات المتحركة مع عمليات CRUD كاملة للإدارة وإمكانية الوصول العام للقراءة فقط.

---

## Endpoints

### Base URL

```text
http://localhost:3001/api
```

---

## Public Endpoints (بدون مصادقة)

### 1. استرجاع جميع عناصر المنتجات المتحركة

```http
GET /api/animated-product-items?page={page}&limit={limit}
```

#### المعاملات

- `page` (اختياري): رقم الصفحة، القيمة الافتراضية: 1
- `limit` (اختياري): عدد العناصر في الصفحة، القيمة الافتراضية: 10، الحد الأقصى: 100

#### أمثلة

```http
GET /api/animated-product-items                 # الصفحة الأولى، 10 عناصر
GET /api/animated-product-items?page=2          # الصفحة الثانية، 10 عناصر
GET /api/animated-product-items?page=1&limit=5  # الصفحة الأولى، 5 عناصر
GET /api/animated-product-items?limit=20        # الصفحة الأولى، 20 عنصر
```

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "Items retrieved successfully",
  "results": {
    "items": [
      {
        "_id": "item_id_1",
        "image": {
          "id": "image_id_1",
          "url": "https://example.com/product1.jpg",
          "width": 400,
          "height": 300
        },
        "createdAt": "2025-10-20T12:00:00.000Z",
        "updatedAt": "2025-10-20T12:00:00.000Z"
      },
      {
        "_id": "item_id_2", 
        "image": {
          "id": "image_id_2",
          "url": "https://example.com/product2.jpg",
          "width": 400,
          "height": 300
        },
        "createdAt": "2025-10-20T12:30:00.000Z",
        "updatedAt": "2025-10-20T12:30:00.000Z"
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
GET /api/animated-product-items/{id}
```

#### المعاملات

- `id` (مطلوب): معرف العنصر

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "Item retrieved successfully",
  "results": {
    "_id": "item_id_1",
    "image": {
      "id": "image_id_1",
      "url": "https://example.com/product.jpg",
      "width": 400,
      "height": 300
    },
    "createdAt": "2025-10-20T12:00:00.000Z",
    "updatedAt": "2025-10-20T12:00:00.000Z"
  }
}
```

#### استجابة الخطأ - عنصر غير موجود (404)

```json
{
  "error": true,
  "message": "Item not found"
}
```

### 3. استرجاع عدد العناصر

```http
GET /api/animated-product-items/count
```

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "Count retrieved successfully",
  "results": {
    "count": 5
  }
}
```

---

## Admin Endpoints (يتطلب مصادقة)

### 4. استرجاع جميع العناصر (إدارة)

```http
GET /api/admin/animated-product-items
```

#### المتطلبات

- **Authentication**: مطلوب

#### الهيدر المطلوب

```text
Authorization: Bearer <jwt_token>
```

#### الاستجابة

نفس استجابة `/api/animated-product-items` مع جميع العناصر

### 5. إنشاء عنصر جديد

```http
POST /api/admin/animated-product-items
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
  "image": {
    "id": "new_image_id",
    "url": "https://example.com/new_product.jpg",
    "width": 400,
    "height": 300
  }
}
```

#### التحقق من الصحة

- **image**: مطلوب، كائن يحتوي على المعرف والرابط والأبعاد
  - **id**: مطلوب، نص (معرف الصورة)  
  - **url**: مطلوب، نص (رابط الصورة)
  - **width**: مطلوب، رقم (عرض الصورة)
  - **height**: مطلوب، رقم (ارتفاع الصورة)

#### الاستجابة الناجحة (201)

```json
{
  "error": false,
  "message": "Item created successfully",
  "results": {
    "_id": "new_item_id",
    "image": {
      "id": "new_image_id",
      "url": "https://example.com/new_product.jpg",
      "width": 400,
      "height": 300
    },
    "createdAt": "2025-10-20T14:00:00.000Z",
    "updatedAt": "2025-10-20T14:00:00.000Z"
  }
}
```

### 6. تحديث عنصر موجود

```http
PUT /api/admin/animated-product-items/{id}
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
  "title": "عنوان المنتج المحدث",
  "description": "وصف المنتج المحدث",
  "image": {
    "id": "updated_image_id",
    "url": "https://example.com/updated_product.jpg",
    "width": 500,
    "height": 400
  }
}
```

#### الاستجابة الناجحة (200)

```json
{
  "error": false,
  "message": "Item updated successfully",
  "results": {
    "_id": "item_id",
    "title": "عنوان المنتج المحدث",
    "description": "وصف المنتج المحدث",
    "image": {
      "id": "updated_image_id",
      "url": "https://example.com/updated_product.jpg",
      "width": 500,
      "height": 400
    },
    "createdAt": "2025-10-20T12:00:00.000Z",
    "updatedAt": "2025-10-20T14:30:00.000Z"
  }
}
```

#### استجابة الخطأ - عنصر غير موجود (404)

```json
{
  "error": true,
  "message": "Item not found"
}
```

### 7. حذف عنصر

```http
DELETE /api/admin/animated-product-items/{id}
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
  "message": "Item deleted successfully"
}
```

#### استجابة الخطأ - عنصر غير موجود (404)

```json
{
  "error": true,
  "message": "Item not found"
}
```

---

## أمثلة عملية

### استرجاع جميع العناصر

```bash
# الصفحة الأولى مع الإعدادات الافتراضية (10 عناصر)
curl -X GET "http://localhost:3001/api/animated-product-items"

# الصفحة الثانية
curl -X GET "http://localhost:3001/api/animated-product-items?page=2"

# الصفحة الأولى مع 5 عناصر
curl -X GET "http://localhost:3001/api/animated-product-items?page=1&limit=5"

# الصفحة الثالثة مع 20 عنصر
curl -X GET "http://localhost:3001/api/animated-product-items?page=3&limit=20"
```

### استرجاع عنصر واحد

```bash
curl -X GET "http://localhost:3001/api/animated-product-items/673123456789abcdef123456"
```

### استرجاع عدد العناصر

```bash
curl -X GET "http://localhost:3001/api/animated-product-items/count"
```

### إنشاء عنصر جديد (إدارة)

```bash
curl -X POST http://localhost:3001/api/admin/animated-product-items \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "image": {
      "id": "img_123",
      "url": "https://example.com/product.jpg",  
      "width": 400,
      "height": 300
    }
  }'
```

### تحديث عنصر (إدارة)

```bash
curl -X PUT http://localhost:3001/api/admin/animated-product-items/673123456789abcdef123456 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "منتج متحرك محدث",
    "description": "وصف محدث للمنتج المتحرك",
    "image": {
      "id": "img_456",
      "url": "https://example.com/updated_product.jpg",
      "width": 500,
      "height": 400
    }
  }'
```

### حذف عنصر (إدارة)

```bash
curl -X DELETE http://localhost:3001/api/admin/animated-product-items/673123456789abcdef123456 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## نموذج البيانات

### Animated Product Item Schema

```typescript
{
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

---

## المميزات

### إدارة شاملة

- **CRUD كامل**: إنشاء، قراءة، تحديث، حذف
- **فصل الصلاحيات**: عمليات عامة وإدارية منفصلة
- **التحقق من البيانات**: التحقق من صحة جميع المدخلات

### إدارة الوسائط

- **الصور**: دعم كامل للصور مع الأبعاد
- **التحقق**: التحقق من صحة روابط الصور والأبعاد
- **المرونة**: يمكن تحديث الصور مع المعلومات الأساسية

### الأداء

- **الاستعلامات المُحسنة**: استعلامات سريعة للقراءة
- **العد المباشر**: endpoint منفصل لعد العناصر
- **التخزين المؤقت**: إمكانية التخزين المؤقت للعمليات العامة

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
   - مطلوب للإنشاء والتحديث
   - نوع البيانات: نص (string)
   - لا يمكن أن يكون فارغًا

2. **الوصف (description)**
   - مطلوب للإنشاء والتحديث
   - نوع البيانات: نص (string)
   - لا يمكن أن يكون فارغًا

3. **الصورة (image)**
   - مطلوبة للإنشاء والتحديث
   - يجب أن تحتوي على: id، url، width، height
   - جميع قيم الصورة مطلوبة

### رسائل الخطأ الشائعة

```json
{
  "error": true,
  "message": "Validation failed",
  "details": {
    "title": "Title is required",
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
2. **أحجام الصور**: تأكد من صحة أبعاد الصور
3. **روابط الوسائط**: تحقق من صحة روابط الصور
4. **المعالجة المتزامنة**: جميع العمليات غير متزامنة (async)

---

[← العودة إلى الصفحة الرئيسية](../README.md)