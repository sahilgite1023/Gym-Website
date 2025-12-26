const express = require('express');
const Content = require('../models/Content');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all content (public route)
router.get('/', async (req, res) => {
  try {
    let content = await Content.findOne();
    
    if (!content) {
      // Create default content if it doesn't exist
      content = await Content.create({
        hero: {
          title: "Health N More Fitness",
          subtitle: "Transform Your Body, Transform Your Life",
          ctaText: "Join Now"
        },
        timings: {
          men: {
            morning: "6:00 AM – 10:00 AM",
            evening: "5:00 PM – 10:00 PM"
          },
          women: {
            afternoon: "11:00 AM – 4:00 PM"
          }
        },
        packages: [
          { name: "One Day", price: "₹100", features: ["1 Day Access", "Basic Equipment"] },
          { name: "1 Month", price: "₹700", features: ["30 Days Access", "All Equipment", "Locker"] },
          { name: "3 Months", price: "₹1800", features: ["90 Days Access", "All Equipment", "Locker", "Free WiFi"] },
          { name: "6 Months", price: "₹3000", features: ["180 Days Access", "All Equipment", "Locker", "Free WiFi", "Free Trial PT Session"] },
          { name: "Yearly", price: "₹5500", features: ["365 Days Access", "All Equipment", "Locker", "Free WiFi", "Free Trial PT Session", "Discount on Services"] }
        ],
        services: [
          { name: "Personal Training", price: "₹300 (One Day Trial)", description: "Experience personalized training with our certified trainers." },
          { name: "Per Month Personal Training", price: "₹9000", description: "Consistent guidance and customized workout plans." },
          { name: "Steam Bath", price: "₹100", description: "Relax and detoxify after your workout." },
          { name: "Massage", price: "Available", description: "Recover and relax with our professional massage services." },
          { name: "Diet Plan", price: "₹2000", description: "Customized nutrition plans by our experts." }
        ],
        contact: {
          owner: "Nitesh Tayade",
          phones: ["8087575415", "8600181828"],
          address: "Location: 19.993031, 73.786399"
        }
      });
    }
    
    res.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update content (protected route)
router.post('/', auth, async (req, res) => {
  try {
    const { section, data } = req.body;
    
    // Find or create content document
    let content = await Content.findOne();
    
    if (!content) {
      content = new Content();
    }
    
    // Update the specified section
    if (content[section]) {
      content[section] = { ...content[section], ...data };
    } else {
      return res.status(400).json({ success: false, message: 'Invalid section' });
    }
    
    await content.save();
    res.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update packages (protected route)
router.put('/packages', auth, async (req, res) => {
  try {
    const { packages } = req.body;
    
    let content = await Content.findOne();
    
    if (!content) {
      content = new Content();
    }
    
    content.packages = packages;
    await content.save();
    
    res.json({ success: true, message: 'Packages updated successfully' });
  } catch (error) {
    console.error('Error updating packages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update services (protected route)
router.put('/services', auth, async (req, res) => {
  try {
    const { services } = req.body;
    
    let content = await Content.findOne();
    
    if (!content) {
      content = new Content();
    }
    
    content.services = services;
    await content.save();
    
    res.json({ success: true, message: 'Services updated successfully' });
  } catch (error) {
    console.error('Error updating services:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update hero content (protected route)
router.put('/hero', auth, async (req, res) => {
  try {
    const { hero } = req.body;
    
    let content = await Content.findOne();
    
    if (!content) {
      content = new Content();
    }
    
    content.hero = hero;
    await content.save();
    
    res.json({ success: true, message: 'Hero content updated successfully' });
  } catch (error) {
    console.error('Error updating hero:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update timings (protected route)
router.put('/timings', auth, async (req, res) => {
  try {
    const { timings } = req.body;
    
    let content = await Content.findOne();
    
    if (!content) {
      content = new Content();
    }
    
    content.timings = timings;
    await content.save();
    
    res.json({ success: true, message: 'Timings updated successfully' });
  } catch (error) {
    console.error('Error updating timings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update contact (protected route)
router.put('/contact', auth, async (req, res) => {
  try {
    const { contact } = req.body;
    
    let content = await Content.findOne();
    
    if (!content) {
      content = new Content();
    }
    
    content.contact = contact;
    await content.save();
    
    res.json({ success: true, message: 'Contact updated successfully' });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;