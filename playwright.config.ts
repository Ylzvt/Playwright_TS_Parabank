import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL ;
const TIMEOUT = Number(process.env.TIMEOUT || 60000);
const CI_RETRIES = Number(process.env.CI_RETRIES || 2);
const CI_PARALLEL = (process.env.CI_PARALLEL || 'true') === 'true';



export default defineConfig({
  testDir: './tests',
  timeout: TIMEOUT,
  expect: {
    timeout: 10000,
  },

  fullyParallel: CI_PARALLEL,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? CI_RETRIES : 0,


  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],


  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1366, height: 768 },
    actionTimeout: 10000,
  },


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]

  
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});