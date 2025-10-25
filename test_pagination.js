// Test script for animated product items pagination
const BASE_URL = 'http://localhost:3001/api';

async function testPagination() {
    console.log('🧪 Testing Animated Product Items Pagination\n');
    
    try {
        // Test 1: Default pagination (page 1, limit 10)
        console.log('📝 Test 1: Default pagination');
        const response1 = await fetch(`${BASE_URL}/animated-product-items`);
        const data1 = await response1.json();
        console.log('✅ Status:', response1.status);
        console.log('📊 Response structure:', {
            error: data1.error,
            hasItems: !!data1.results?.items,
            hasPagination: !!data1.results?.pagination,
            itemsCount: data1.results?.items?.length || 0,
            pagination: data1.results?.pagination
        });
        console.log();

        // Test 2: Custom pagination (page 1, limit 5)  
        console.log('📝 Test 2: Custom pagination (page 1, limit 5)');
        const response2 = await fetch(`${BASE_URL}/animated-product-items?page=1&limit=5`);
        const data2 = await response2.json();
        console.log('✅ Status:', response2.status);
        console.log('📊 Items count:', data2.results?.items?.length || 0);
        console.log('📄 Pagination:', data2.results?.pagination);
        console.log();

        // Test 3: Second page
        console.log('📝 Test 3: Second page');
        const response3 = await fetch(`${BASE_URL}/animated-product-items?page=2&limit=5`);
        const data3 = await response3.json();
        console.log('✅ Status:', response3.status);
        console.log('📊 Items count:', data3.results?.items?.length || 0);
        console.log('📄 Pagination:', data3.results?.pagination);
        console.log();

        // Test 4: Invalid pagination parameters
        console.log('📝 Test 4: Invalid pagination (page 0)');
        const response4 = await fetch(`${BASE_URL}/animated-product-items?page=0`);
        const data4 = await response4.json();
        console.log('❌ Status:', response4.status);
        console.log('📄 Error message:', data4.message);
        console.log();

        // Test 5: Too high limit
        console.log('📝 Test 5: Too high limit (limit 150)');
        const response5 = await fetch(`${BASE_URL}/animated-product-items?limit=150`);
        const data5 = await response5.json();
        console.log('❌ Status:', response5.status);
        console.log('📄 Error message:', data5.message);
        console.log();

        // Test 6: Count endpoint
        console.log('📝 Test 6: Count endpoint');
        const response6 = await fetch(`${BASE_URL}/animated-product-items/count`);
        const data6 = await response6.json();
        console.log('✅ Status:', response6.status);
        console.log('🔢 Total count:', data6.results?.count);
        console.log();

        console.log('🎉 All tests completed!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run tests
testPagination();