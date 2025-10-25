// Test script for special product items API with pagination and language support
const BASE_URL = 'http://localhost:3001/api';

async function testSpecialProductItemsAPI() {
    console.log('🧪 Testing Special Product Items API with Pagination & Language Support\n');
    
    try {
        // Test 1: Get all items with default settings (Arabic)
        console.log('📝 Test 1: Get all special product items (default - Arabic)');
        const response1 = await fetch(`${BASE_URL}/special-product-items`);
        const data1 = await response1.json();
        console.log('✅ Status:', response1.status);
        console.log('📊 Response structure:', {
            error: data1.error,
            hasItems: !!data1.results?.items,
            hasPagination: !!data1.results?.pagination,
            itemsCount: data1.results?.items?.length || 0,
            language: data1.results?.items?.[0]?.language || 'N/A'
        });
        console.log();

        // Test 2: Get items in English
        console.log('📝 Test 2: Get items in English');
        const response2 = await fetch(`${BASE_URL}/special-product-items?lang=en`);
        const data2 = await response2.json();
        console.log('✅ Status:', response2.status);
        console.log('🌍 Language:', data2.results?.items?.[0]?.language || 'N/A');
        console.log('📄 Message:', data2.message);
        console.log();

        // Test 3: Get items in Kurdish
        console.log('📝 Test 3: Get items in Kurdish');
        const response3 = await fetch(`${BASE_URL}/special-product-items?lang=ku`);
        const data3 = await response3.json();
        console.log('✅ Status:', response3.status);
        console.log('🌍 Language:', data3.results?.items?.[0]?.language || 'N/A');
        console.log('📄 Message:', data3.message);
        console.log();

        // Test 4: Get items with pagination and language
        console.log('📝 Test 4: Custom pagination with English (page 1, limit 3)');
        const response4 = await fetch(`${BASE_URL}/special-product-items?page=1&limit=3&lang=en`);
        const data4 = await response4.json();
        console.log('✅ Status:', response4.status);
        console.log('📊 Items count:', data4.results?.items?.length || 0);
        console.log('🌍 Language:', data4.results?.items?.[0]?.language || 'N/A');
        console.log('📄 Pagination:', data4.results?.pagination);
        console.log();

        // Test 5: Get count in different languages
        console.log('📝 Test 5: Get count in Arabic');
        const response5 = await fetch(`${BASE_URL}/special-product-items/count?lang=ar`);
        const data5 = await response5.json();
        console.log('✅ Status:', response5.status);
        console.log('🔢 Total count:', data5.results?.count);
        console.log('📄 Message (AR):', data5.message);
        console.log();

        console.log('📝 Test 6: Get count in English');
        const response6 = await fetch(`${BASE_URL}/special-product-items/count?lang=en`);
        const data6 = await response6.json();
        console.log('✅ Status:', response6.status);
        console.log('� Message (EN):', data6.message);
        console.log();

        console.log('📝 Test 7: Get count in Kurdish');
        const response7 = await fetch(`${BASE_URL}/special-product-items/count?lang=ku`);
        const data7 = await response7.json();
        console.log('✅ Status:', response7.status);
        console.log('📄 Message (KU):', data7.message);
        console.log();

        // Test 8: Get all languages
        console.log('📝 Test 8: Get all languages');
        const response8 = await fetch(`${BASE_URL}/special-product-items/all-languages`);
        const data8 = await response8.json();
        console.log('✅ Status:', response8.status);
        console.log('📊 Items structure:', {
            hasItems: !!data8.results?.items,
            hasMultiLangTitles: !!data8.results?.items?.[0]?.title?.ar,
            itemsCount: data8.results?.items?.length || 0
        });
        console.log();

        // Test 9: Get single item in different languages
        console.log('📝 Test 9: Get single item by ID (different languages)');
        const testId = '673123456789abcdef123456'; // Sample ObjectId
        
        // Arabic
        const responseAr = await fetch(`${BASE_URL}/special-product-items/${testId}?lang=ar`);
        const dataAr = await responseAr.json();
        console.log('❌ Status (AR):', responseAr.status, '(Expected 404 - no data yet)');
        console.log('📄 Message (AR):', dataAr.message);
        
        // English
        const responseEn = await fetch(`${BASE_URL}/special-product-items/${testId}?lang=en`);
        const dataEn = await responseEn.json();
        console.log('❌ Status (EN):', responseEn.status, '(Expected 404)');
        console.log('📄 Message (EN):', dataEn.message);
        
        // Kurdish
        const responseKu = await fetch(`${BASE_URL}/special-product-items/${testId}?lang=ku`);
        const dataKu = await responseKu.json();
        console.log('❌ Status (KU):', responseKu.status, '(Expected 404)');
        console.log('� Message (KU):', dataKu.message);
        console.log();

        // Test 10: Invalid language
        console.log('📝 Test 10: Invalid language parameter');
        const response10 = await fetch(`${BASE_URL}/special-product-items?lang=fr`);
        const data10 = await response10.json();
        console.log('❌ Status:', response10.status);
        console.log('📄 Error message:', data10.message);
        console.log();

        // Test 11: Invalid pagination with language
        console.log('📝 Test 11: Invalid pagination with English language');
        const response11 = await fetch(`${BASE_URL}/special-product-items?page=0&lang=en`);
        const data11 = await response11.json();
        console.log('❌ Status:', response11.status);
        console.log('📄 Error message (EN):', data11.message);
        console.log();

        // Note: Admin endpoints testing would require authentication
        console.log('ℹ️  Note: Admin endpoints (POST/PUT/DELETE) require JWT authentication');
        console.log('🔐 Admin endpoints are available at: /api/admin/special-product-items');
        console.log('🌍 Language support: Arabic (ar), English (en), Kurdish (ku)');
        console.log();

        console.log('🎉 All language-aware endpoint tests completed!');
        console.log('📚 Check the updated documentation at docs/special-product-items-api.md');
        console.log();
        
        console.log('🌟 New Language Features:');
        console.log('   ✅ Language-specific responses (ar/en/ku)');
        console.log('   ✅ Localized error messages');
        console.log('   ✅ Title field returned in requested language only');
        console.log('   ✅ Language indicator in response');
        console.log('   ✅ All-languages endpoint for full data');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run tests
testSpecialProductItemsAPI();