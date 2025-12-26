# 🚀 Deployment Guide - Health N More Fitness

## Deployment Options

### Option 1: Deploy to Heroku (Full-Stack)

#### Prerequisites
- Heroku account
- Heroku CLI installed
- MongoDB Atlas account (free tier)

#### Steps

1. **Setup MongoDB Atlas**
   ```bash
   # Go to https://www.mongodb.com/cloud/atlas
   # Create a free cluster
   # Get your connection string
   # Whitelist all IPs (0.0.0.0/0) for development
   ```

2. **Prepare for Deployment**
   ```bash
   # In project root, create Procfile
   echo "web: cd server && npm start" > Procfile
   ```

3. **Login to Heroku**
   ```bash
   heroku login
   ```

4. **Create Heroku App**
   ```bash
   heroku create your-gym-name
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"
   heroku config:set JWT_SECRET="your-super-secret-random-string-here"
   heroku config:set NODE_ENV="production"
   ```

6. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

7. **Build and Deploy Frontend Separately**
   ```bash
   # Build frontend
   cd client
   npm run build
   
   # Deploy dist folder to Netlify/Vercel
   # Update API base URL in client/src/utils/api.js to Heroku URL
   ```

---

### Option 2: Netlify (Frontend) + Render (Backend)

#### Frontend on Netlify

1. **Build Frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to netlify.com
   - Drag and drop `client/dist` folder
   - Or connect GitHub repo and auto-deploy

3. **Configure Environment**
   - Update `client/src/utils/api.js`:
   ```javascript
   baseURL: 'https://your-backend-url.onrender.com/api'
   ```

#### Backend on Render

1. **Create Render Account**
   - Go to render.com
   - Create new Web Service

2. **Configure Service**
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   
3. **Environment Variables**
   ```
   MONGODB_URI=your-mongodb-atlas-uri
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   PORT=5000
   ```

4. **Deploy**
   - Connect GitHub repo
   - Auto-deploy on push

---

### Option 3: Vercel (Frontend) + Railway (Backend)

#### Frontend on Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd client
   vercel
   ```

3. **Update API URL**
   ```javascript
   // client/src/utils/api.js
   baseURL: 'https://your-app.railway.app/api'
   ```

#### Backend on Railway

1. **Create Railway Account**
   - Go to railway.app
   - Create new project

2. **Add MongoDB**
   - Add MongoDB plugin
   - Copy connection string

3. **Deploy Backend**
   - Connect GitHub repo
   - Set root directory to `server`
   - Add environment variables

---

### Option 4: DigitalOcean Droplet (Full Control)

#### Setup Droplet

1. **Create Ubuntu Droplet**
   - 1GB RAM minimum
   - Ubuntu 20.04 LTS

2. **SSH into Droplet**
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Install MongoDB**
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

5. **Install PM2**
   ```bash
   sudo npm install -g pm2
   ```

6. **Clone Repository**
   ```bash
   cd /var/www
   git clone your-repo-url gym-website
   cd gym-website
   ```

7. **Setup Backend**
   ```bash
   cd server
   npm install
   
   # Create .env file
   nano .env
   # Add your environment variables
   
   # Start with PM2
   pm2 start server.js --name gym-api
   pm2 save
   pm2 startup
   ```

8. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   npm run build
   ```

9. **Install Nginx**
   ```bash
   sudo apt-get install nginx
   ```

10. **Configure Nginx**
    ```bash
    sudo nano /etc/nginx/sites-available/gym
    ```
    
    ```nginx
    server {
        listen 80;
        server_name your-domain.com;
        
        # Frontend
        location / {
            root /var/www/gym-website/client/dist;
            try_files $uri $uri/ /index.html;
        }
        
        # Backend API
        location /api {
            proxy_pass http://localhost:5000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

11. **Enable Site**
    ```bash
    sudo ln -s /etc/nginx/sites-available/gym /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    ```

12. **Setup SSL (Let's Encrypt)**
    ```bash
    sudo apt-get install certbot python3-certbot-nginx
    sudo certbot --nginx -d your-domain.com
    ```

---

## Pre-Deployment Checklist

### Security
- [ ] Change default admin password
- [ ] Update JWT_SECRET to strong random value
- [ ] Use environment variables for all secrets
- [ ] Enable CORS only for your domain
- [ ] Add rate limiting middleware
- [ ] Validate all user inputs
- [ ] Use HTTPS in production

### Configuration
- [ ] Update MongoDB URI to cloud database
- [ ] Set NODE_ENV to 'production'
- [ ] Configure correct API base URL in frontend
- [ ] Test all API endpoints
- [ ] Verify image uploads work
- [ ] Check responsive design on multiple devices

### Performance
- [ ] Enable Gzip compression
- [ ] Optimize images (compress before upload)
- [ ] Minify CSS/JS (Vite does this automatically)
- [ ] Enable caching headers
- [ ] Use CDN for static assets (optional)

### Monitoring
- [ ] Setup error logging (e.g., Sentry)
- [ ] Monitor uptime (e.g., UptimeRobot)
- [ ] Track analytics (e.g., Google Analytics)
- [ ] Setup backup strategy for MongoDB
- [ ] Monitor server resources

---

## Environment Variables for Production

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/gymdb?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-random-secret-key-min-32-chars
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

### Frontend
Update `client/src/utils/api.js`:
```javascript
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://your-api-domain.com/api'
    : 'http://localhost:5000/api',
});
```

---

## Post-Deployment Tasks

1. **Test Everything**
   - Browse all pages
   - Test admin login
   - Update content via admin panel
   - Upload and delete images
   - Test WhatsApp and call buttons
   - Check mobile responsiveness

2. **Setup Monitoring**
   - Configure uptime monitoring
   - Setup error tracking
   - Enable analytics

3. **Create Backups**
   - Backup MongoDB database
   - Backup uploaded images
   - Document restoration process

4. **Update DNS**
   - Point domain to server/hosting
   - Wait for DNS propagation (24-48 hours)
   - Test with domain name

5. **Inform Client**
   - Provide admin credentials
   - Share documentation
   - Provide support contact

---

## Troubleshooting Production Issues

### API Not Responding
```bash
# Check server logs
pm2 logs gym-api

# Restart server
pm2 restart gym-api

# Check server status
pm2 status
```

### MongoDB Connection Failed
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure MongoDB service is running
- Check credentials

### Images Not Loading
- Verify uploads directory exists
- Check file permissions (chmod 755)
- Ensure static file middleware is configured
- Check image paths in database

### CORS Errors
- Update CORS configuration in server.js
- Allow your frontend domain
- Check browser console for exact error

---

## Cost Estimates

### Free Tier Option
- **MongoDB Atlas**: Free (512MB)
- **Netlify**: Free (100GB bandwidth)
- **Render**: Free (750 hours/month)
- **Total**: $0/month

### Recommended Production
- **MongoDB Atlas**: $9/month (2GB)
- **Vercel Pro**: $20/month
- **Railway**: $5/month
- **Domain**: $10-15/year
- **Total**: ~$35/month

### Full Control
- **DigitalOcean Droplet**: $12/month (2GB RAM)
- **Domain**: $10-15/year
- **Total**: ~$12/month

---

## Support & Maintenance

### Regular Updates
- Update npm packages monthly
- Monitor security vulnerabilities
- Backup database weekly
- Review error logs weekly

### Scaling Considerations
- Add Redis for session management
- Implement CDN for images
- Use load balancer for traffic
- Optimize database queries
- Add caching layer

---

**Deployment Date:** _____________  
**Domain:** _____________  
**Hosting Provider:** _____________  
**Database:** _____________
