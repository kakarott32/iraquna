# Video Section API

## إدارة أقسام الفيديو مع دعم اللغات المتعددة

### الوصف
API لإدارة أقسام الفيديو مع دعم ثلاث لغات (العربية، الإنجليزية، الكردية) مع إمكانية الحصول على المحتوى بلغة محددة أو جميع اللغات.

### اللغات المدعومة
- `ar` - العربية (الافتراضية)
- `en` - الإنجليزية  
- `ku` - الكردية

---

## Endpoints

### Base URL
```
http://localhost:3001/api
```

---

## Public Endpoints (بدون مصادقة)

### 1. استرجاع قسم الفيديو بلغة محددة
```http
GET /api/video-section?lang={language}
```

#### المعاملات:
- `lang` (اختياري): اللغة المطلوبة (`ar`, `en`, `ku`)
- القيمة الافتراضية: `ar`

#### أمثلة:
```http
GET /api/video-section?lang=ar    # العربية
GET /api/video-section?lang=en    # الإنجليزية
GET /api/video-section?lang=ku    # الكردية
GET /api/video-section            # العربية (افتراضي)
```

#### الاستجابة الناجحة (200):
```json
{
  "error": false,
  "message": "تم استرجاع قسم الفيديو بنجاح",
  "results": {
    "_id": "video_section_id",
    "title": "عنوان قسم الفيديو باللغة المطلوبة",
    "description": "وصف قسم الفيديو باللغة المطلوبة",
    "video": {
      "id": "video_id",
      "url": "https://example.com/video.mp4",
      "duration": 120
    },
    "image_right_top": {
      "id": "image_id_1",
      "url": "https://example.com/image1.jpg",
      "width": 400,
      "height": 300
    },
    "image_right_bottom": {
      "id": "image_id_2",
      "url": "https://example.com/image2.jpg",
      "width": 400,
      "height": 300
    },
    "image_left_top": {
      "id": "image_id_3",
      "url": "https://example.com/image3.jpg",
      "width": 400,
      "height": 300
    },
    "image_left_bottom": {
      "id": "image_id_4",
      "url": "https://example.com/image4.jpg",
      "width": 400,
      "height": 300
    },
    "language": "ar",
    "createdAt": "2025-10-20T12:00:00.000Z",
    "updatedAt": "2025-10-20T12:00:00.000Z"
  }
}
```

#### استجابة الخطأ - لغة غير مدعومة (400):
```json
{
  "error": true,
  "message": "Unsupported language. Use: ar, en, or ku"
}
```

---

### 2. استرجاع قسم الفيديو بجميع اللغات
```http
GET /api/video-section/all-languages
```

#### الاستجابة الناجحة (200):
```json
{
  "error": false,
  "message": "Video section retrieved successfully with all languages",
  "results": {
    "_id": "video_section_id",
    "title": {
      "ar": "عنوان باللغة العربية",
      "en": "Title in English",
      "ku": "ناونیشان بە کوردی"
    },
    "description": {
      "ar": "وصف باللغة العربية",
      "en": "Description in English", 
      "ku": "باسکردن بە کوردی"
    },
    "video": {
      "id": "video_id",
      "url": "https://example.com/video.mp4",
      "duration": 120
    },
    "image_right_top": {
      "id": "image_id_1",
      "url": "https://example.com/image1.jpg",
      "width": 400,
      "height": 300
    },
    "image_right_bottom": {
      "id": "image_id_2",
      "url": "https://example.com/image2.jpg",
      "width": 400,
      "height": 300
    },
    "image_left_top": {
      "id": "image_id_3",
      "url": "https://example.com/image3.jpg",
      "width": 400,
      "height": 300
    },
    "image_left_bottom": {
      "id": "image_id_4",
      "url": "https://example.com/image4.jpg",
      "width": 400,
      "height": 300
    },
    "createdAt": "2025-10-20T12:00:00.000Z",
    "updatedAt": "2025-10-20T12:00:00.000Z"
  }
}
```

---

## Admin Endpoints (يتطلب مصادقة)

### 3. استرجاع قسم الفيديو (إدارة)
```http
GET /api/admin/video-section
```

#### المتطلبات:
- **Authentication**: مطلوب

#### الهيدر المطلوب:
```
Authorization: Bearer <jwt_token>
```

#### الاستجابة:
نفس استجابة `/api/video-section/all-languages` مع جميع اللغات

---

### 4. تحديث قسم الفيديو
```http
PUT /api/admin/video-section
```

#### المتطلبات:
- **Authentication**: مطلوب

#### الهيدر المطلوب:
```
Authorization: Bearer <jwt_token>
```

#### البيانات المطلوبة:
```json
{
  "title": {
    "ar": "عنوان جديد لقسم الفيديو",
    "en": "New Video Section Title",
    "ku": "ناونیشانی نوێی بەشی ڤیدیۆ"
  },
  "description": {
    "ar": "وصف جديد لقسم الفيديو",
    "en": "New video section description",
    "ku": "پەسەندکردنی نوێی بەشی ڤیدیۆ"
  },
  "video": {
    "id": "new_video_id",
    "url": "https://example.com/new_video.mp4",
    "duration": 180
  },
  "image_right_top": {
    "id": "new_image_id_1",
    "url": "https://example.com/new_image1.jpg",
    "width": 500,
    "height": 400
  },
  "image_right_bottom": {
    "id": "new_image_id_2",
    "url": "https://example.com/new_image2.jpg",
    "width": 500,
    "height": 400
  },
  "image_left_top": {
    "id": "new_image_id_3",
    "url": "https://example.com/new_image3.jpg",
    "width": 500,
    "height": 400
  },
  "image_left_bottom": {
    "id": "new_image_id_4",
    "url": "https://example.com/new_image4.jpg",
    "width": 500,
    "height": 400
  }
}
```

#### التحقق من الصحة:
- **title**: اختياري، كائن يحتوي على النصوص بثلاث لغات
- **description**: اختياري، كائن يحتوي على النصوص بثلاث لغات
- **video**: مطلوب، كائن الفيديو مع المعرف والرابط والمدة
- **images**: مطلوبة، كائنات الصور الأربع مع المعرف والرابط والأبعاد

#### الاستجابة الناجحة (200):
```json
{
  "error": false,
  "message": "تم تحديث قسم الفيديو بنجاح",
  "results": {
    // البيانات المحدثة بجميع اللغات
  }
}
```

#### الاستجابة في حالة الإنشاء (201):
```json
{
  "error": false,
  "message": "تم إنشاء قسم الفيديو بنجاح",
  "results": {
    // البيانات الجديدة
  }
}
```

---

## أمثلة عملية

### استرجاع المحتوى بالعربية
```bash
curl -X GET "http://localhost:3001/api/video-section?lang=ar"
```

### استرجاع المحتوى بالإنجليزية
```bash
curl -X GET "http://localhost:3001/api/video-section?lang=en"
```

### استرجاع المحتوى بالكردية
```bash
curl -X GET "http://localhost:3001/api/video-section?lang=ku"
```

### استرجاع جميع اللغات
```bash
curl -X GET "http://localhost:3001/api/video-section/all-languages"
```

### تحديث قسم الفيديو (إدارة)
```bash
curl -X PUT http://localhost:3001/api/admin/video-section \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": {
      "ar": "عنوان قسم الفيديو الجديد",
      "en": "New Video Section Title", 
      "ku": "ناونیشانی نوێی بەشی ڤیدیۆ"
    },
    "description": {
      "ar": "وصف قسم الفيديو الجديد",
      "en": "New video section description",
      "ku": "پەسەندکردنی نوێی بەشی ڤیدیۆ"
    },
    "video": {
      "id": "video_123",
      "url": "https://example.com/video.mp4",
      "duration": 180
    },
    "image_right_top": {
      "id": "img_1",
      "url": "https://example.com/image1.jpg",
      "width": 400,
      "height": 300
    },
    "image_right_bottom": {
      "id": "img_2",
      "url": "https://example.com/image2.jpg",
      "width": 400,
      "height": 300
    },
    "image_left_top": {
      "id": "img_3",
      "url": "https://example.com/image3.jpg",
      "width": 400,
      "height": 300
    },
    "image_left_bottom": {
      "id": "img_4",
      "url": "https://example.com/image4.jpg",
      "width": 400,
      "height": 300
    }
  }'
```

---

## نموذج البيانات

### Video Section Schema
```typescript
{
  title?: {
    ar?: string | null;   // العنوان بالعربية
    en?: string | null;   // العنوان بالإنجليزية  
    ku?: string | null;   // العنوان بالكردية
  };
  description?: {
    ar?: string | null;   // الوصف بالعربية
    en?: string | null;   // الوصف بالإنجليزية
    ku?: string | null;   // الوصف بالكردية
  };
  video: {
    id: string;           // معرف الفيديو
    url: string;          // رابط الفيديو
    duration: number;     // مدة الفيديو بالثواني
  };
  image_right_top: {
    id: string;           // معرف الصورة
    url: string;          // رابط الصورة
    width: number;        // عرض الصورة
    height: number;       // ارتفاع الصورة
  };
  image_right_bottom: IMediaImage;
  image_left_top: IMediaImage;
  image_left_bottom: IMediaImage;
  createdAt: Date;        // تاريخ الإنشاء
  updatedAt: Date;        // تاريخ آخر تحديث
}
```

---

## المميزات

### دعم اللغات المتعددة
- **المرونة**: يمكن إضافة محتوى بأي من اللغات الثلاث
- **الاسترجاع المُحسن**: إرجاع المحتوى بالغة المطلوبة فقط
- **التوافق**: دعم للتطبيقات متعددة اللغات

### إدارة الوسائط
- **الفيديو**: دعم كامل لملفات الفيديو مع المدة
- **الصور**: إدارة أربع صور مع الأبعاد
- **التحقق**: التحقق من صحة روابط الوسائط والأبعاد

### الأمان
- **الحماية**: endpoints الإدارة محمية بـ JWT
- **التحقق**: التحقق من صحة جميع البيانات المدخلة
- **المصادقة**: فصل واضح بين العمليات العامة والإدارية

---

## رموز الأخطاء

| الرمز | الوصف |
|------|--------|
| 200 | نجح الطلب |
| 400 | خطأ في البيانات أو لغة غير مدعومة |
| 401 | غير مصرح بالدخول |
| 404 | قسم الفيديو غير موجود |
| 500 | خطأ داخلي في الخادم |

---

## ملاحظات مهمة

1. **نظام اللغات**: إذا لم تكن اللغة المطلوبة متاحة، سيتم إرجاع `null`
2. **الإنشاء التلقائي**: إذا لم يكن هناك قسم فيديو، سيتم إنشاء واحد جديد عند التحديث
3. **التحديث الجزئي**: يمكن تحديث بعض اللغات فقط دون الحاجة لإرسال جميع اللغات
4. **الأداء**: استخدم endpoint اللغة المحددة للحصول على أداء أفضل

---

[← العودة إلى الصفحة الرئيسية](../README.md)