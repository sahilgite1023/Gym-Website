# 🚀 Quick Start Guide - Health N More Fitness

## Prerequisites Check

Before starting, make sure you have:
- ✅ Node.js (v14+) installed
- ✅ MongoDB installed and running
- ✅ npm or yarn package manager

## Step-by-Step Setup

### 1. Install Dependencies

#### Backend (Server)
```bash
cd server
npm install
```

#### Frontend (Client)
```bash
cd client
npm install
```

### 2. Start MongoDB

**Windows:**
```powershell
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 3. Start the Application

#### Option A: Using the Automated Script (Windows)
```powershell
.\start-dev.ps1
```

#### Option B: Manual Start

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### 4. Access the Application

- **Website:** http://localhost:5173
- **Admin Panel:** http://localhost:5173/admin/login

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

## 🎯 What to Do Next

1. **Browse the Website**
   - Check out the hero section
   - View gym timings
   - Explore membership packages
   - Check services offered
   - View the gallery
   - Test WhatsApp integration

2. **Try the Admin Panel**
   - Login at `/admin/login`
   - Update hero section text
   - Modify timings
   - Edit packages and prices
   - Upload workout photos
   - Update contact information
   - Click "Save All Changes" to persist updates

3. **Test Features**
   - Click the WhatsApp button (floating bottom-right)
   - Try click-to-call buttons
   - Test responsive design on mobile
   - Upload/delete gallery images in admin

## 📝 Common Tasks

### Update Hero Section
1. Go to Admin Panel → General Tab
2. Modify Title, Subtitle, or CTA Text
3. Click "Save All Changes"

### Add New Package
1. Go to Admin Panel → Packages Tab
2. Click "Add Package"
3. Fill in name, price, and features
4. Click "Save All Changes"

### Upload Gallery Photos
1. Go to Admin Panel → Gallery Tab
2. Choose image file (max 5MB)
3. Click "Upload"
4. Image appears in gallery immediately

### Update Contact Info
1. Go to Admin Panel → Contact Tab
2. Update owner name, phones, or address
3. Click "Save All Changes"

## 🐛 Troubleshooting

### MongoDB Not Starting
```bash
# Check if MongoDB is installed
mongod --version

# Check MongoDB status
# Windows
sc query MongoDB

# macOS/Linux
brew services list
# or
systemctl status mongod
```

### Port Already in Use
If port 5000 or 5173 is busy:

**Backend (server/.env):**
```env
PORT=5001
```

**Frontend (client/vite.config.js):**
```javascript
export default {
  server: {
    port: 3000
  }
}
```

### Dependencies Issue
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Can't Access Admin Panel
1. Check backend is running on port 5000
2. Verify MongoDB connection
3. Check browser console for errors
4. Try clearing browser cache

## 🔐 Security Reminders

- ⚠️ Change default admin password after first login
- ⚠️ Update JWT_SECRET in production
- ⚠️ Use environment variables for sensitive data
- ⚠️ Enable HTTPS in production

## 📚 More Information

For detailed documentation, see [README.md](README.md)

---

**Need Help?** Check the main README or review the code comments for guidance.
