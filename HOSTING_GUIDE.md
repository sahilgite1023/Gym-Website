# Hosting Guide 🚀

## Overview
This guide will help you deploy your Health N More Fitness website to production. We'll cover multiple hosting options.

---

## 📋 Pre-Deployment Checklist

### 1. **Complete Testing**
- ✅ All features tested (see TESTING_CHECKLIST.md)
- ✅ No console errors
- ✅ Mobile responsive
- ✅ Admin panel working

### 2. **Security**
- ✅ Change admin password from default
- ✅ Update JWT_SECRET to strong random value
- ✅ MongoDB Atlas IP whitelist configured
- ✅ Cloudinary credentials secure

### 3. **Content**
- ✅ Upload real gym photos
- ✅ Verify contact information
- ✅ Test WhatsApp links
- ✅ Confirm Google Maps location

---

## 🌐 Hosting Options

### **Option 1: Vercel (Frontend) + Render (Backend) - RECOMMENDED** ⭐

**Best For:** Quick deployment, free tier available, automatic HTTPS

#### **A. Frontend Deployment (Vercel)**

1. **Prepare for Deployment:**
   ```bash
   cd client
   npm run build
   ```

2. **Sign up for Vercel:**
   - Go to https://vercel.com
   - Sign up with GitHub/GitLab/Bitbucket

3. **Deploy:**
   
   **Method 1: GitHub (Recommended)**
   - Push code to GitHub repository
   - Import repository in Vercel
   - Select `client` folder as root directory
   - Click "Deploy"
   
   **Method 2: Vercel CLI**
   ```bash
   npm i -g vercel
   cd client
   vercel
   ```

4. **Environment Variables:**
   - Add in Vercel Dashboard → Settings → Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

#### **B. Backend Deployment (Render)**

1. **Sign up for Render:**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service:**
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Configure:
     - **Name:** health-n-more-api
     - **Root Directory:** `server`
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`

3. **Add Environment Variables:**
   ```
   PORT=4001
   MONGODB_URI=mongodb+srv://codewithsahil00_db_user:3dJtefgBKZav11q8@cluster0.5vckilz.mongodb.net/?appName=Cluster0
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   CLOUDINARY_CLOUD_NAME=dnaortucw
   CLOUDINARY_API_KEY=458982579476752
   CLOUDINARY_API_SECRET=2tuYDXAioilErG5A7a1MmZDq3bg
   ```

4. **Update CORS in server.js:**
   ```javascript
   app.use(cors({
     origin: ['https://your-vercel-app.vercel.app', 'http://localhost:3000'],
     credentials: true
   }));
   ```

5. **Deploy** - Render will automatically deploy

**URLs After Deployment:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`

---

### **Option 2: Netlify (Frontend) + Railway (Backend)**

#### **A. Frontend Deployment (Netlify)**

1. **Build the app:**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy:**
   - Go to https://netlify.com
   - Drag & drop `client/dist` folder
   - OR connect GitHub repository

3. **Environment Variables:**
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```

#### **B. Backend Deployment (Railway)**

1. **Sign up:**
   - Go to https://railway.app
   - Sign in with GitHub

2. **Deploy:**
   - New Project → Deploy from GitHub
   - Select repository → Select `server` folder
   - Add environment variables (same as Render)

---

### **Option 3: Single Server Deployment (VPS)**

**Providers:** DigitalOcean, AWS EC2, Google Cloud, Azure

#### **Setup Steps:**

1. **Get a VPS** (Ubuntu 22.04 recommended)

2. **SSH into server:**
   ```bash
   ssh root@your-server-ip
   ```

3. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

4. **Install Nginx:**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

5. **Clone your repository:**
   ```bash
   git clone https://github.com/yourusername/gym-react-project.git
   cd gym-react-project
   ```

6. **Setup Backend:**
   ```bash
   cd server
   npm install
   # Create .env file with your credentials
   pm2 start server.js --name gym-backend
   pm2 save
   pm2 startup
   ```

7. **Build Frontend:**
   ```bash
   cd ../client
   npm install
   npm run build
   ```

8. **Configure Nginx:**
   ```bash
   sudo nano /etc/nginx/sites-available/gym
   ```
   
   Add:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       # Frontend
       location / {
           root /path/to/gym-react-project/client/dist;
           try_files $uri $uri/ /index.html;
       }

       # Backend API
       location /api {
           proxy_pass http://localhost:4001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

9. **Enable site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/gym /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

10. **Setup SSL (Free with Let's Encrypt):**
    ```bash
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d your-domain.com
    ```

---

## 📝 Post-Deployment Steps

### 1. **Update Frontend API URL**
In `client/src/utils/api.js`:
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://your-backend-url.com/api',
  headers: {
    'Content-Type': 'application/json',
  }
});
```

### 2. **MongoDB Atlas - Whitelist Deployment IPs**
- Go to MongoDB Atlas → Network Access
- Add IP addresses of your hosting servers
- Or allow all IPs: `0.0.0.0/0` (less secure but works)

### 3. **Test Production Site**
- Visit your live URL
- Test all features from TESTING_CHECKLIST.md
- Check browser console for errors
- Test on mobile devices

### 4. **Setup Custom Domain (Optional)**

**For Vercel:**
- Domains → Add Domain → Follow instructions

**For Render:**
- Settings → Custom Domain → Add your domain

**DNS Configuration:**
- Point A record to server IP (for VPS)
- Point CNAME to hosting provider (for Vercel/Netlify)

### 5. **Monitor Your Site**

**Free Monitoring Tools:**
- **Uptime:** https://uptimerobot.com
- **Analytics:** Google Analytics
- **Error Tracking:** Sentry.io (free tier)

---

## 🔒 Security Best Practices

1. **Change Default Credentials:**
   ```bash
   # Login to admin panel
   # Go to Settings → Change Password
   ```

2. **Secure Environment Variables:**
   - Never commit `.env` files
   - Use strong JWT_SECRET
   - Rotate secrets periodically

3. **MongoDB Security:**
   - Use strong password
   - Enable IP whitelist
   - Use latest MongoDB version

4. **HTTPS Only:**
   - Always use SSL/TLS certificates
   - Redirect HTTP to HTTPS

5. **Rate Limiting (Optional):**
   In `server/server.js`:
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

---

## 💰 Estimated Costs

### Free Tier (Perfect for Small Gym Website):
- **Frontend:** Vercel (Free)
- **Backend:** Render (Free, with sleep after inactivity)
- **Database:** MongoDB Atlas (512MB free)
- **Images:** Cloudinary (25GB free)
- **Domain:** ~₹500-800/year (.in or .com)
- **Total:** ~₹500-800/year (just domain cost!)

### Paid Options (For better performance):
- **Backend:** Render Starter ($7/month) or Railway Hobby ($5/month)
- **VPS:** DigitalOcean Droplet ($6/month)
- **Total:** ~₹500-1000/month

---

## 🚨 Troubleshooting

### Issue: "Failed to fetch" or CORS errors
**Solution:** 
- Check `VITE_API_URL` environment variable
- Update CORS settings in backend
- Verify backend is running

### Issue: 404 on page refresh
**Solution:** Add `_redirects` file in `client/public/`:
```
/*    /index.html   200
```

### Issue: MongoDB connection timeout
**Solution:**
- Whitelist IP in MongoDB Atlas
- Check MONGODB_URI format
- Verify network access

### Issue: Images not loading
**Solution:**
- Check Cloudinary credentials
- Verify API key and secret
- Check browser console for 401 errors

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
- **Cloudinary:** https://cloudinary.com/documentation

---

## ✅ Quick Deployment Summary

**Fastest Way to Go Live (5 minutes):**

1. **Backend:**
   ```bash
   # Push to GitHub
   # Deploy on Render (free)
   # Add environment variables
   ```

2. **Frontend:**
   ```bash
   # Update VITE_API_URL in Vercel
   # Deploy on Vercel (free)
   ```

3. **Test:** Visit your Vercel URL!

**Your website is now LIVE! 🎉**

---

## 🎯 Recommended Workflow

1. ✅ Complete all testing
2. ✅ Deploy backend to Render
3. ✅ Deploy frontend to Vercel
4. ✅ Test production site
5. ✅ Add custom domain (optional)
6. ✅ Share with Nitesh Tayade! 🎊

**Need help?** Check deployment logs and console errors first!
