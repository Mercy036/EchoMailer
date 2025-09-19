import express from 'express'
import cors from 'cors'
import cron from 'node-cron';
import dotenv from 'dotenv';
import { registerRouter } from './routes/register.route.js'
import router from './routes/cron.route.js';

dotenv.config();

export const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const RENDER_URL = 'https://echomailer.onrender.com';

console.log('🚀 ECHOMAILER STARTING...');
console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`⏰ IST Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);

app.get('/api/health', (req, res) => {
  const currentTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  console.log(`💓 Health check at ${currentTime}`);
  
  res.json({ 
    status: 'alive',
    timestamp: new Date().toISOString(),
    istTime: currentTime,
    timezone: 'Asia/Kolkata',
    environment: process.env.NODE_ENV || 'development',
    uptime: Math.floor(process.uptime()),
    pid: process.pid,
    app: 'EchoMailer'
  });
});

app.use('/api', registerRouter);
app.use('/api', router);

if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
  console.log('🌐 Production environment detected - Setting up keep-alive...');
  
  cron.schedule('*/10 * * * *', async () => {
    try {
      console.log(`🏓 Keep-alive ping at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
      
      const response = await fetch(`${RENDER_URL}/api/health`, {
        method: 'GET',
        headers: { 'User-Agent': 'EchoMailer-KeepAlive' }
      });
      
      if (response.ok) {
        console.log(`✅ Keep-alive successful: ${response.status}`);
      } else {
        console.log(`⚠️ Keep-alive response: ${response.status}`);
      }
      
    } catch (error) {
      console.log(`🔄 Keep-alive ping (${error.message.substring(0, 50)}...)`);
    }
  });

  cron.schedule('*/12 * * * *', async () => {
    try {
      console.log(`🔄 Auto-triggering email cron at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
      
      const response = await fetch(`${RENDER_URL}/api/run-cron`, {
        method: 'GET',
        headers: { 'User-Agent': 'EchoMailer-AutoCron' }
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`🎯 Auto-cron completed: ${result.mailsProcessed} sent, ${result.totalFound} total`);
      }
      
    } catch (error) {
      console.log(`⚠️ Auto-cron trigger: ${error.message.substring(0, 50)}...`);
    }
  });

  console.log('✅ Keep-alive mechanism activated for production');
} else {
  console.log('🏠 Development environment - Keep-alive disabled');
}

console.log('📥 Loading email scheduler...');
import("./Cron/scheduler.js").then(() => {
  console.log('✅ Email scheduler loaded successfully');
}).catch((error) => {
  console.error('❌ Failed to load scheduler:', error.message);
});

console.log('🎉 ECHOMAILER SETUP COMPLETE!');