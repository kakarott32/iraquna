// Test script for manage items API with language support (no pagination)
const BASE_URL = 'http://localhost:3001/api';

async function testManageItemsAPI() {
    console.log('🧪 Testing Manage Items API with Language Support (No Pagination)\n');
    
    try {
        // Test 1: Get manage items with default settings (Arabic)
        console.log('📝 Test 1: Get manage items (default - Arabic)');
        const response1 = await fetch(`${BASE_URL}/manage-items`);
        const data1 = await response1.json();
        console.log('✅ Status:', response1.status);
        console.log('📊 Response structure:', {
            error: data1.error,
            hasTitle: !!data1.results?.title,
            hasImages: !!data1.results?.images,
            imagesCount: data1.results?.images?.length || 0,
            language: data1.results?.language || 'N/A'
        });
        console.log();

        // Test 2: Get items in English
        console.log('📝 Test 2: Get manage items in English');
        const response2 = await fetch(`${BASE_URL}/manage-items?lang=en`);
        const data2 = await response2.json();
        console.log('✅ Status:', response2.status);
        console.log('🌍 Language:', data2.results?.language || 'N/A');
        console.log('📄 Message:', data2.message);
        console.log('📊 Sample image title:', data2.results?.images?.[0]?.title || 'N/A');
        console.log();

        // Test 3: Get items in Kurdish
        console.log('📝 Test 3: Get manage items in Kurdish');
        const response3 = await fetch(`${BASE_URL}/manage-items?lang=ku`);
        const data3 = await response3.json();
        console.log('✅ Status:', response3.status);
        console.log('🌍 Language:', data3.results?.language || 'N/A');
        console.log('📄 Message:', data3.message);
        console.log();

        // Test 4: Get count in different languages
        console.log('📝 Test 4: Get count in Arabic');
        const response4 = await fetch(`${BASE_URL}/manage-items/count?lang=ar`);
        const data4 = await response4.json();
        console.log('✅ Status:', response4.status);
        console.log('🔢 Total count:', data4.results?.count);
        console.log('📄 Message (AR):', data4.message);
        console.log();

        console.log('📝 Test 5: Get count in English');
        const response5 = await fetch(`${BASE_URL}/manage-items/count?lang=en`);
        const data5 = await response5.json();
        console.log('✅ Status:', response5.status);
        console.log('📄 Message (EN):', data5.message);
        console.log();

        console.log('📝 Test 6: Get count in Kurdish');
        const response6 = await fetch(`${BASE_URL}/manage-items/count?lang=ku`);
        const data6 = await response6.json();
        console.log('✅ Status:', response6.status);
        console.log('📄 Message (KU):', data6.message);
        console.log();

        // Test 7: Get all languages
        console.log('📝 Test 7: Get all languages');
        const response7 = await fetch(`${BASE_URL}/manage-items/all-languages`);
        const data7 = await response7.json();
        console.log('✅ Status:', response7.status);
        console.log('📊 Structure:', {
            hasTitle: !!data7.results?.title,
            hasMultiLangTitle: !!data7.results?.title?.ar,
            hasImages: !!data7.results?.images,
            imagesCount: data7.results?.images?.length || 0,
            firstImageMultiLang: !!data7.results?.images?.[0]?.title?.ar
        });
        console.log();

        // Test 8: Invalid language
        console.log('📝 Test 8: Invalid language parameter');
        const response8 = await fetch(`${BASE_URL}/manage-items?lang=fr`);
        const data8 = await response8.json();
        console.log('❌ Status:', response8.status);
        console.log('📄 Error message:', data8.message);
        console.log();

        // Test 9: Test expected 404 (no data yet)
        console.log('📝 Test 9: Test expected responses with no data');
        if (response1.status === 404) {
            console.log('📄 Expected 404 - No manage items found yet');
            console.log('📄 Message:', data1.message);
        } else if (response1.status === 200) {
            console.log('📄 Data found - showing structure:');
            console.log('   - Title structure:', typeof data1.results?.title);
            console.log('   - Images array length:', data1.results?.images?.length);
            console.log('   - First image stars:', data1.results?.images?.[0]?.stars);
            console.log('   - First image weight:', data1.results?.images?.[0]?.weight);
        }
        console.log();

        // Note: Admin endpoints testing would require authentication
        console.log('ℹ️  Note: Admin endpoints (PUT/DELETE) require JWT authentication');
        console.log('🔐 Admin endpoints are available at: /api/admin/manage-items');
        console.log('🌍 Language support: Arabic (ar), English (en), Kurdish (ku)');
        console.log();

        console.log('🎉 All language-aware endpoint tests completed!');
        console.log('📚 Check the documentation at docs/manage-items-api.md');
        console.log();
        
        console.log('🌟 Manage Items API Features:');
        console.log('   ✅ Hierarchical structure (title + images array)');
        console.log('   ✅ Language-specific responses (ar/en/ku)');
        console.log('   ✅ Localized error messages');
        console.log('   ✅ Star rating system (1-5) for each image');
        console.log('   ✅ Optional weight system for images');
        console.log('   ✅ Multi-language support for titles and descriptions');
        console.log('   ✅ Singleton pattern (one manage item)');
        console.log('   ✅ No pagination - all data in one response');
        console.log('   ✅ All-languages endpoint for full data');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run tests
testManageItemsAPI();