const express = require('express');
const auth = require('../middleware/auth');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'gym-gallery',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }]
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Upload image (protected route)
router.post('/image', auth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  res.json({
    success: true,
    message: 'Image uploaded successfully',
    filename: req.file.filename,
    path: req.file.path // Cloudinary URL
  });
});

// Delete image (protected route)
router.delete('/image/:filename', auth, async (req, res) => {
  try {
    const publicId = req.params.filename;
    // Extract public_id from Cloudinary URL if full path is provided
    const extractedId = publicId.includes('/') 
      ? publicId.split('/').slice(-1)[0].split('.')[0]
      : publicId.split('.')[0];
    
    // Delete from Cloudinary
    await cloudinary.uploader.destroy(`gym-gallery/${extractedId}`);
    
    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ success: false, message: 'Failed to delete image' });
  }
});

// Get all images (public route)
router.get('/images', async (req, res) => {
  try {
    // Fetch images from Cloudinary
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'gym-gallery/',
      max_results: 100
    });
    
    const imagePaths = result.resources.map(resource => resource.secure_url);
    
    res.json({
      success: true,
      images: imagePaths
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch images' });
  }
});

module.exports = router;