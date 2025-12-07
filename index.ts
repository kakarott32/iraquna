import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { connectDB } from './src/config/database';
import { authController } from './src/controller/admin/auth.controller';
import { videoSectionAdminController } from './src/controller/admin/video_section.controller';
import { dashboardLandingController } from './src/controller/landing/dashboard.controller';
import { animatedProductItemsAdminController } from './src/controller/admin/animated_product_items.controller';
import { specialProductItemsAdminController } from './src/controller/admin/special_product_items.controller';
import { manageItemsAdminController } from './src/controller/admin/manage_items.controller';
import galleryAdminController from './src/controller/admin/gallery.controller';
import reportAdminController from './src/controller/admin/report.controller';
import connectUsAdminController from './src/controller/admin/connect_us.controller';
import jobRequestAdminController from './src/controller/admin/job_request.controller';
import jobRequestLandingController from './src/controller/landing/job_request.controller';

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();

    const port = process.env.PORT || 3020;
    // console.log(`🚀 Server is running on port ${port}`);
    // console.log(`📡 API Base URL: http://localhost:${port}/api`);
    // console.log(`🔐 Auth endpoints: http://localhost:${port}/api/auth`);
    // console.log(`🎥 Video Section Admin: http://localhost:${port}/api/admin/video-section`);
    // console.log(`📱 Dashboard Public: http://localhost:${port}/api/dashboard`);
    // console.log(`🎨 Animated Products Admin: http://localhost:${port}/api/admin/animated-product-items`);
    // console.log(`🛍️ Animated Products Public: http://localhost:${port}/api/animated-product-items`);
    // console.log(`⭐ Special Products Admin: http://localhost:${port}/api/admin/special-product-items`);
    // console.log(`🌟 Special Products Public: http://localhost:${port}/api/special-product-items`);
    // console.log(`📋 Manage Items Admin: http://localhost:${port}/api/admin/manage-items`);
    // console.log(`🛠️ Manage Items Public: http://localhost:${port}/api/manage-items`);
    // console.log(`🖼️ Gallery Admin: http://localhost:${port}/api/admin/gallery`);
    // console.log(`📋 Reports Admin: http://localhost:${port}/api/admin/reports`);
    // console.log(`📞 Connect Us Admin: http://localhost:${port}/api/admin/connect-us`);

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

const app = new Elysia()
  // CORS middleware
  .use(cors({
    origin: '*',
    // origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:3020' , 'http://192.168.0.14:3020'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }))

  // Health check endpoint
  .get('/', () => ({
    message: 'Iraquna Dashboard API',
    version: '1.0.0',
    status: 'Active'
  }))

  // Mount routes
  .group('/api', (app) => app
    .use(authController)
    .use(videoSectionAdminController)
    .use(dashboardLandingController)
    .use(animatedProductItemsAdminController)
    .use(specialProductItemsAdminController)
    .use(manageItemsAdminController)
    .use(galleryAdminController)
    .use(reportAdminController)
    .use(connectUsAdminController)
    .use(jobRequestAdminController)
    .use(jobRequestLandingController)
  )

  // Error handling
  .onError(({ code, error, set }) => {
    console.error('Unhandled error:', error);

    if (code === 'NOT_FOUND') {
      set.status = 404;
      return { error: 'Route not found' };
    }

    if (code === 'VALIDATION') {
      set.status = 400;
      return { error: 'Validation error', details: error.message };
    }

    set.status = 500;
    return { error: 'Internal server error' };
  })

  .listen(process.env.PORT || 3001);

// Initialize server
startServer();

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);