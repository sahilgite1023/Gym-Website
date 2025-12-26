const mongoose = require('mongoose');
const Content = require('./models/Content');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const initializeDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gymdb');
    console.log('Connected to MongoDB');

    // Initialize Admin User
    const existingAdmin = await User.findOne({ username: 'admin' });
    
    if (!existingAdmin) {
      const adminUser = new User({
        username: 'admin',
        password: 'admin123',
        role: 'admin'
      });
      await adminUser.save();
      console.log('✅ Admin user created successfully (username: admin, password: admin123)');
    } else {
      console.log('Admin user already exists');
    }

    // Initialize Default Content
    const existingContent = await Content.findOne();
    
    if (!existingContent) {
      const defaultContent = new Content({
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

      await defaultContent.save();
      console.log('✅ Default content created successfully');
    } else {
      console.log('Content already exists, skipping initialization');
    }

    mongoose.connection.close();
    console.log('\n🎉 Database initialization completed successfully!');
    console.log('📌 Admin Login Credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('\n⚠️  Please change the password after first login!\n');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
};

initializeDatabase();