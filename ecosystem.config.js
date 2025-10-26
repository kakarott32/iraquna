module.exports = {
  apps: [
    {
      name: 'iraquna',      // A name for your application
      script: 'bun',            // The interpreter to use
      args: 'run src/index.ts', // The script to run with Bun
      watch: true,              // Automatically restart on file changes
      autorestart: true,        // Automatically restart if the app crashes
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        // Add other production-specific environment variables here
        // PORT: 8080,
      },
    },
  ],
};
