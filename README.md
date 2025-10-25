# Iraquna Dashboard API

## وصف المشروع

API متطور لإدارة الداشبورد مبني باستخدام Elysia.js مع نظام مصادقة محمي وإدارة الحسابات للمدراء.

## التقنيات المستخدمة

- **Framework**: Elysia.js v1.4.12
- **Runtime**: Bun.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Cloud Storage**: Cloudinary
- **Language**: TypeScript

## المتطلبات

- Bun.js (latest version)
- MongoDB (local or Atlas)
- Node.js (for compatibility)

## التثبيت والإعداد

### 1. تنزيل المشروع
```bash
git clone <repository-url>
cd iraquna
```

### 2. تثبيت التبعيات
```bash
bun install
```

### 3. إعداد متغيرات البيئة
أنشئ ملف `.env` في المجلد الجذر وأضف المتغيرات التالية:

```env
# Server Configuration
PORT=3001

# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017/iraquna
# Or for production:
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/iraquna

# JWT Configuration
ACCESS_TOKEN_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration (if using file uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. تشغيل التطبيق

```bash
# تطوير (Development mode)
bun dev

# إنتاج (Production mode)
bun start

# تشغيل البذور (Seeding database)
bun run seed
```

## بنية المشروع

```
├── index.ts                     # نقطة دخول التطبيق
├── src/
│   ├── config/
│   │   ├── database.ts          # إعداد قاعدة البيانات
│   │   └── cloudinary.ts        # إعداد Cloudinary
│   ├── constants/
│   │   └── jwt.ts               # وظائف JWT
│   ├── controller/
│   │   ├── admin/               # تحكم المدراء
│   │   └── landing/             # تحكم عام
│   ├── interface/
│   │   └── *.interface.ts       # أنواع البيانات
│   ├── middleware/
│   │   └── auth.middleware.ts   # حماية المسارات
│   ├── models/
│   │   └── *.model.ts           # نماذج قاعدة البيانات
│   └── services/
│       └── *.service.ts         # خدمات الأعمال
```

## فهرس APIs

### 🔐 [Authentication API](./docs/auth-api.md)
نظام المصادقة وإدارة الجلسات

### 🎥 [Video Section API](./docs/video-section-api.md)
إدارة أقسام الفيديو مع دعم اللغات المتعددة

### 🎨 [Animated Product Items API](./docs/animated-product-items-api.md)
إدارة عناصر المنتجات المتحركة

### ⭐ [Special Product Items API](./docs/special-product-items-api.md)
إدارة عناصر المنتجات المميزة مع نظام التقييم

### 📋 [Manage Items API](./docs/manage-items-api.md)
إدارة عناصر الإدارة مع البنية الهرمية والصور المتعددة

---

## الأمان والحماية

### 1. JWT Authentication
- استخدام JWT tokens لحماية المسارات
- انتهاء صلاحية الرموز تلقائياً
- تخزين آمن للرموز في قاعدة البيانات

### 2. Input Validation
- التحقق من صحة جميع البيانات المدخلة
- رسائل خطأ مفصلة باللغة العربية
- حماية من SQL Injection و XSS

### 3. CORS Configuration
- تحديد المصادر المسموحة للوصول
- حماية من Cross-Site Request Forgery
- دعم أوراق الاعتماد (Credentials)

## معالجة الأخطاء

### رموز الاستجابة
- `200` - نجح الطلب
- `400` - خطأ في البيانات المرسلة
- `401` - غير مصرح بالدخول
- `404` - لم يتم العثور على المورد
- `500` - خطأ داخلي في الخادم

### أمثلة على رسائل الخطأ
```json
{
  "error": "Validation error",
  "details": "Email is required"
}
```

## التطوير والمساهمة

### إضافة endpoints جديدة
1. أنشئ controller جديد في `src/controller/`
2. أضف المسار إلى `index.ts`
3. أضف التحقق من الصحة والحماية المناسبة

### إضافة نماذج بيانات جديدة
1. أنشئ النموذج في `src/models/`
2. أضف الواجهة في `src/interface/`
3. أنشئ الخدمة في `src/services/`

## البيئة والنشر

### Development
```
URL: http://localhost:3001
Database: MongoDB Local
Logs: Enabled
Hot Reload: Enabled
```

### Production
```
URL: https://your-domain.com
Database: MongoDB Atlas
Logs: Error only
Optimization: Enabled
```

## الإصدار الحالي
**Version**: 1.0.0  
**Last Updated**: October 2025  
**Framework**: Elysia.js with Bun runtime

---

هذا المشروع تم إنشاؤه باستخدام Elysia.js وBun.js لضمان الأداء العالي والكتابة الآمنة للكود.
