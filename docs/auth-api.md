# Authentication API

## نظام المصادقة وإدارة الجلسات

### الوصف
نظام مصادقة آمن باستخدام JWT tokens مع إدارة تسجيل الدخول والخروج للمدراء.

---

## Endpoints

### Base URL
```
http://localhost:3001/api/auth
```

---

### 1. تسجيل الدخول
```http
POST /api/auth/login
```

#### البيانات المطلوبة:
```json
{
  "email": "admin@example.com",
  "password": "your_password"
}
```

#### التحقق من الصحة:
- **email**: مطلوب، يجب أن يكون بصيغة بريد إلكتروني صالحة
- **password**: مطلوب، كلمة المرور

#### الاستجابة الناجحة (200):
```json
{
  "error": false,
  "message": "تم تسجيل الدخول بنجاح",
  "results": {
    "name": "اسم المدير",
    "email": "admin@example.com",
    "type": "admin",
    "token": "jwt_access_token_here"
  }
}
```

#### الاستجابة عند فشل تسجيل الدخول (404):
```json
{
  "error": true,
  "message": "الايميل او كلمة المرور غير صحيحة"
}
```

---

### 2. تسجيل الخروج
```http
GET /api/auth/logout
```

#### المتطلبات:
- **Authentication**: مطلوب

#### الهيدر المطلوب:
```
Authorization: Bearer <jwt_token>
```

#### الاستجابة الناجحة (200):
```json
{
  "error": false,
  "message": "تم تسجيل الخروج بنجاح"
}
```

#### الاستجابة عند فشل المصادقة (401):
```json
{
  "error": true,
  "message": "Authorization is required"
}
```

---

## أمثلة عملية

### تسجيل الدخول
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### تسجيل الخروج
```bash
curl -X GET http://localhost:3001/api/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## نموذج البيانات

### Account Schema
```typescript
{
  name: string;           // اسم المدير
  email: string;          // البريد الإلكتروني
  password: string;       // كلمة المرور المشفرة
  password_show: string;  // كلمة المرور الأصلية (للتطوير)
  type: "admin";          // نوع الحساب
  auth_token: string;     // رمز الدخول
  createdAt: Date;        // تاريخ الإنشاء
  updatedAt: Date;        // تاريخ آخر تحديث
}
```

---

## الأمان

### JWT Token
- **الخوارزمية**: HS256
- **انتهاء الصلاحية**: حسب إعدادات الخادم
- **التخزين**: يتم تخزين الرمز في قاعدة البيانات لكل مستخدم

### كلمات المرور
- **التشفير**: تستخدم bcrypt لتشفير كلمات المرور
- **الحماية**: لا يتم إرجاع كلمات المرور في الاستجابات

### الحماية من الهجمات
- **Brute Force**: حماية من محاولات تسجيل الدخول المتكررة
- **SQL Injection**: استخدام Mongoose ODM للحماية
- **XSS**: تنظيف البيانات المدخلة

---

## رموز الأخطاء

| الرمز | الوصف |
|------|--------|
| 200 | نجح الطلب |
| 400 | خطأ في البيانات المرسلة |
| 401 | غير مصرح بالدخول |
| 404 | المستخدم غير موجود أو كلمة مرور خاطئة |
| 500 | خطأ داخلي في الخادم |

---

## ملاحظات مهمة

1. **الحفاظ على الأمان**: احفظ JWT token في مكان آمن
2. **انتهاء الصلاحية**: تحقق من صلاحية الرمز قبل كل طلب
3. **تسجيل الخروج**: استخدم endpoint تسجيل الخروج لإلغاء الرمز
4. **بيئة الإنتاج**: تأكد من استخدام HTTPS في بيئة الإنتاج

---

[← العودة إلى الصفحة الرئيسية](../README.md)