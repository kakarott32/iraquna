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

const port = Number(process.env.PORT || 3001);

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
  .onError(({ code, error, request, set }) => {
    const path = new URL(request.url).pathname;

    if (code === 'NOT_FOUND') {
      set.status = 404;
      console.warn(`Route not found: ${request.method} ${path}`);
      return {
        error: true,
        message: 'Route not found',
        path
      };
    }

    if (code === 'VALIDATION') {
      set.status = 400;
      return { error: true, message: 'Validation error', details: error.message };
    }

    console.error('Unhandled error:', error);
    set.status = 500;
    return { error: true, message: 'Internal server error' };
  });

try {
  await connectDB();
  app.listen(port);
  console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}
