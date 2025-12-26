# 🏋️ Health N More Fitness - Gym Website

A modern, mobile-first gym website with admin panel built using React, Node.js, and MongoDB.

## ✨ Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Premium Theme**: Professional gym aesthetic with smooth animations
- **Admin Panel**: Secure content management system with JWT authentication
- **Image Gallery**: Upload and delete workout photos with lightbox view
- **Contact Integration**: WhatsApp floating button and click-to-call
- **Content Management**: Update all website content dynamically
- **Real-time Updates**: Changes reflect immediately on the website

## 🛠️ Tech Stack

### Frontend
- React 18 (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Font Awesome Icons

### Backend
- Node.js
- Express.js
- JWT Authentication
- Multer for image uploads
- Bcrypt for password hashing

### Database
- MongoDB with Mongoose

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or use MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Ensure the `.env` file exists with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gymdb
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

4. Start MongoDB (if running locally):
```bash
# Windows
net start MongoDB

# macOS/Linux
brew services start mongodb-community
# or
sudo systemctl start mongod
```

5. Start the server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Install Tailwind CSS and PostCSS (if not already installed):
```bash
npm install -D tailwindcss postcss autoprefixer
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔑 Admin Panel Access

- **URL**: `http://localhost:5173/admin/login`
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin123`

> ⚠️ **Security Note**: Change the default credentials after first login!

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register new admin (optional)

### Content Management
- `GET /api/content` - Get all content (public)
- `PUT /api/content/hero` - Update hero section (protected)
- `PUT /api/content/timings` - Update timings (protected)
- `PUT /api/content/packages` - Update packages (protected)
- `PUT /api/content/services` - Update services (protected)
- `PUT /api/content/contact` - Update contact info (protected)

### Image Upload
- `POST /api/upload/image` - Upload image (protected)
- `DELETE /api/upload/image/:filename` - Delete image (protected)
- `GET /api/upload/images` - Get all images (public)

## 📁 Project Structure

```
gym-react-project/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── admin/         # Admin components
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── components/    # UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Timings.jsx
│   │   │   ├── Packages.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── utils/
│   │   │   └── api.js     # Axios configuration
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
└── server/                # Node.js Backend
    ├── middleware/
    │   └── auth.js        # JWT middleware
    ├── models/
    │   ├── User.js        # User schema
    │   └── Content.js     # Content schema
    ├── routes/
    │   ├── auth.js        # Auth routes
    │   ├── content.js     # Content routes
    │   └── upload.js      # Upload routes
    ├── uploads/           # Image storage
    ├── .env              # Environment variables
    ├── server.js         # Main server file
    ├── initializeDB.js   # DB initialization
    └── package.json
```

## 🎨 Admin Panel Features

The admin dashboard provides complete control over:

### General Tab
- Update hero section title, subtitle, and CTA text
- Modify gym timings for men and women

### Packages Tab
- Add/remove membership packages
- Edit package names, prices, and features
- Customize feature lists for each package

### Services Tab
- Add/remove services
- Update service names, prices, and descriptions

### Gallery Tab
- Upload new workout photos (JPG, PNG, GIF, WEBP)
- Delete existing images
- Maximum file size: 5MB

### Contact Tab
- Update owner name
- Modify phone numbers
- Change gym address

## 📱 Mobile Responsiveness

The website is built with a mobile-first approach:
- Responsive navigation with hamburger menu
- Optimized card layouts for different screen sizes
- Touch-friendly buttons and interactions
- Sticky WhatsApp button on mobile

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Admin-only endpoints with middleware
- **Password Hashing**: Bcrypt for secure password storage
- **Input Validation**: File type and size validation
- **CORS Configuration**: Cross-origin request handling

## 🚀 Production Deployment

### Build Frontend
```bash
cd client
npm run build
```

### Deploy Options
1. **Static Hosting** (Netlify, Vercel): Deploy `client/dist/` folder
2. **Full Stack Hosting** (Heroku, DigitalOcean):
   - Set environment variables
   - Update MongoDB URI to cloud database
   - Change JWT_SECRET to secure value
   - Configure CORS for production domain

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/gymdb
JWT_SECRET=your-super-secure-random-secret-key-here
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB is running: `mongod --version`
- Check connection string in `.env`
- Ensure port 27017 is not blocked

### Port Already in Use
- Change PORT in `server/.env`
- Update Vite port in `client/vite.config.js`

### Image Upload Fails
- Check `server/uploads/` directory exists
- Verify file size under 5MB
- Ensure correct file format

### CORS Errors
- Verify frontend URL matches in `server/server.js`
- Check axios baseURL in `client/src/utils/api.js`

## 🏋️ Gym Information

**Health N More Fitness**

**Timings:**
- **Men**: Morning 6:00 AM – 10:00 AM, Evening 5:00 PM – 10:00 PM
- **Women**: Afternoon 11:00 AM – 4:00 PM

**Membership Packages:**
- One Day – ₹100
- 1 Month – ₹700
- 3 Months – ₹1800
- 6 Months – ₹3000
- Yearly – ₹5500

**Services:**
- Personal Training (Trial) – ₹300
- Monthly Personal Training – ₹9000
- Steam Bath – ₹100
- Massage
- Diet Plan – ₹2000

**Contact:**
- Owner: Nitesh Tayade
- Phone: 8087575415, 8600181828

## 📄 License

This project is available for educational and commercial use.

---

**Made with ❤️ for Health N More Fitness**