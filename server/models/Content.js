const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  hero: {
    title: { type: String, default: "Health N More Fitness" },
    subtitle: { type: String, default: "Transform Your Body, Transform Your Life" },
    ctaText: { type: String, default: "Join Now" }
  },
  timings: {
    men: {
      morning: { type: String, default: "6:00 AM – 10:00 AM" },
      evening: { type: String, default: "5:00 PM – 10:00 PM" }
    },
    women: {
      afternoon: { type: String, default: "11:00 AM – 4:00 PM" }
    }
  },
  packages: [{
    name: String,
    price: String,
    features: [String]
  }],
  services: [{
    name: String,
    price: String,
    description: String
  }],
  contact: {
    owner: { type: String, default: "Nitesh Tayade" },
    phones: [String],
    address: { type: String, default: "Location: 19.993031, 73.786399" }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Content', contentSchema);