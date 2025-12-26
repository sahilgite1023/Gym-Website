import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [content, setContent] = useState({
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
    contact: {
      owner: "Nitesh Tayade",
      phones: ["8087575415", "8600181828"],
      address: "Your Gym Address Here"
    }
  });
  
  const [packages, setPackages] = useState([
    { name: "One Day", price: "₹100", features: ["1 Day Access", "Basic Equipment"] },
    { name: "1 Month", price: "₹700", features: ["30 Days Access", "All Equipment", "Locker"] },
    { name: "3 Months", price: "₹1800", features: ["90 Days Access", "All Equipment", "Locker", "Free WiFi"] },
    { name: "6 Months", price: "₹3000", features: ["180 Days Access", "All Equipment", "Locker", "Free WiFi", "Free Trial PT Session"] },
    { name: "Yearly", price: "₹5500", features: ["365 Days Access", "All Equipment", "Locker", "Free WiFi", "Free Trial PT Session", "Discount on Services"] }
  ]);
  
  const [services, setServices] = useState([
    { name: "Personal Training", price: "₹300 (One Day Trial)", description: "Experience personalized training with our certified trainers." },
    { name: "Per Month Personal Training", price: "₹9000", description: "Consistent guidance and customized workout plans." },
    { name: "Steam Bath", price: "₹100", description: "Relax and detoxify after your workout." },
    { name: "Massage", price: "Available", description: "Recover and relax with our professional massage services." },
    { name: "Diet Plan", price: "₹2000", description: "Customized nutrition plans by our experts." }
  ]);
  
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordMessage, setPasswordMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    // Load content from backend
    loadContent();
    loadImages();
  }, [navigate]);

  const loadContent = async () => {
    try {
      const response = await api.get('/content');
      setContent({
        hero: response.data.hero,
        timings: response.data.timings,
        contact: response.data.contact
      });
      setPackages(response.data.packages);
      setServices(response.data.services);
    } catch (error) {
      console.error('Error loading content:', error);
      alert('Failed to load content');
    }
  };

  const loadImages = async () => {
    try {
      const response = await api.get('/upload/images');
      setImages(response.data.images);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleSave = async () => {
    try {
      // Update each section separately
      await api.put('/content/hero', { hero: content.hero });
      await api.put('/content/timings', { timings: content.timings });
      await api.put('/content/contact', { contact: content.contact });
      await api.put('/content/packages', { packages });
      await api.put('/content/services', { services });
      
      alert('Content saved successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content');
    }
  };

  const handleAddPackage = () => {
    setPackages([
      ...packages,
      { name: "New Package", price: "₹0", features: ["New Feature"] }
    ]);
  };

  const handleRemovePackage = (index) => {
    const newPackages = [...packages];
    newPackages.splice(index, 1);
    setPackages(newPackages);
  };

  const handleAddService = () => {
    setServices([
      ...services,
      { name: "New Service", price: "₹0", description: "New service description" }
    ]);
  };

  const handleRemoveService = (index) => {
    const newServices = [...services];
    newServices.splice(index, 1);
    setServices(newServices);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  const handleUploadImage = async () => {
    if (!newImage) return;
    
    const formData = new FormData();
    formData.append('image', newImage);
    
    try {
      const response = await api.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setImages([...images, response.data.path]);
      setNewImage(null);
      // Reset file input
      document.getElementById('image-upload').value = '';
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };

  const handleRemoveImage = async (index) => {
    const imagePath = images[index];
    const filename = imagePath.split('/').pop(); // Extract filename from path
    
    try {
      await api.delete(`/upload/image/${filename}`);
      
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
    } catch (error) {
      console.error('Error removing image:', error);
      alert('Failed to remove image');
    }
  };

  const updateContent = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updatePackage = (index, field, value) => {
    const newPackages = [...packages];
    newPackages[index][field] = value;
    setPackages(newPackages);
  };

  const updatePackageFeature = (pkgIndex, featureIndex, value) => {
    const newPackages = [...packages];
    newPackages[pkgIndex].features[featureIndex] = value;
    setPackages(newPackages);
  };

  const addPackageFeature = (pkgIndex) => {
    const newPackages = [...packages];
    newPackages[pkgIndex].features.push("New Feature");
    setPackages(newPackages);
  };

  const removePackageFeature = (pkgIndex, featureIndex) => {
    const newPackages = [...packages];
    if (newPackages[pkgIndex].features.length > 1) {
      newPackages[pkgIndex].features.splice(featureIndex, 1);
    }
    setPackages(newPackages);
  };

  const updateService = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const updateContactPhone = (index, value) => {
    const newContact = { ...content.contact };
    newContact.phones[index] = value;
    updateContent('contact', 'phones', newContact.phones);
  };

  const handleChangePassword = async () => {
    setPasswordMessage('');
    
    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordMessage('All fields are required');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage('New password must be at least 6 characters');
      return;
    }

    try {
      const response = await api.post('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      if (response.data.success) {
        setPasswordMessage('✅ Password changed successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      setPasswordMessage(error.response?.data?.message || 'Failed to change password');
    }
  };

  return (
    <div className="min-h-screen bg-gym-darker">
      {/* Admin Header */}
      <header className="bg-gym-dark shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gym-accent">Admin Dashboard</h1>
              <Link 
                to="/" 
                target="_blank"
                className="flex items-center gap-2 text-gym-light/70 hover:text-gym-accent transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Website
              </Link>
            </div>
            <button 
              onClick={handleLogout}
              className="btn btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-gym-gray mb-8">
          {['general', 'packages', 'services', 'gallery', 'contact', 'settings'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium ${
                activeTab === tab
                  ? 'text-gym-accent border-b-2 border-gym-accent'
                  : 'text-gym-light hover:text-gym-accent'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* General Content Tab */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold text-gym-accent mb-4">Hero Section</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gym-light mb-2">Title</label>
                  <input
                    type="text"
                    value={content.hero.title}
                    onChange={(e) => updateContent('hero', 'title', e.target.value)}
                    className="w-full px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
                  />
                </div>
                <div>
                  <label className="block text-gym-light mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={content.hero.subtitle}
                    onChange={(e) => updateContent('hero', 'subtitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
                  />
                </div>
                <div>
                  <label className="block text-gym-light mb-2">CTA Text</label>
                  <input
                    type="text"
                    value={content.hero.ctaText}
                    onChange={(e) => updateContent('hero', 'ctaText', e.target.value)}
                    className="w-full px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gym-accent mb-4">Timings</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gym-light mb-3">Men's Timings</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-gym-light mb-1">Morning</label>
                      <input
                        type="text"
                        value={content.timings.men.morning}
                        onChange={(e) => updateContent('timings', 'men', { ...content.timings.men, morning: e.target.value })}
                        className="w-full px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-gym-light mb-1">Evening</label>
                      <input
                        type="text"
                        value={content.timings.men.evening}
                        onChange={(e) => updateContent('timings', 'men', { ...content.timings.men, evening: e.target.value })}
                        className="w-full px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gym-light mb-3">Women's Timings</h4>
                  <div>
                    <label className="block text-gym-light mb-1">Afternoon</label>
                    <input
                      type="text"
                      value={content.timings.women.afternoon}
                      onChange={(e) => updateContent('timings', 'women', { ...content.timings.women, afternoon: e.target.value })}
                      className="w-full px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Packages Tab */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gym-accent">Membership Packages</h3>
              <button 
                onClick={handleAddPackage}
                className="btn btn-primary"
              >
                Add Package
              </button>
            </div>
            
            <div className="grid gap-4">
              {packages.map((pkg, index) => (
                <div key={index} className="card">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gym-light">Package {index + 1}</h4>
                    <button 
                      onClick={() => handleRemovePackage(index)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gym-light mb-2">Name</label>
                      <input
                        type="text"
                        value={pkg.name}
                        onChange={(e) => updatePackage(index, 'name', e.target.value)}
                        className="w-full px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-gym-light mb-2">Price</label>
                      <input
                        type="text"
                        value={pkg.price}
                        onChange={(e) => updatePackage(index, 'price', e.target.value)}
                        className="w-full px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-gym-light">Features</label>
                      <button 
                        onClick={() => addPackageFeature(index)}
                        className="text-gym-accent hover:text-gym-light text-sm"
                      >
                        Add Feature
                      </button>
                    </div>
                    <div className="space-y-2">
                      {pkg.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => updatePackageFeature(index, featureIndex, e.target.value)}
                            className="flex-1 px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
                          />
                          {pkg.features.length > 1 && (
                            <button 
                              onClick={() => removePackageFeature(index, featureIndex)}
                              className="ml-2 text-red-500 hover:text-red-400"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gym-accent">Services</h3>
              <button 
                onClick={handleAddService}
                className="btn btn-primary"
              >
                Add Service
              </button>
            </div>
            
            <div className="grid gap-4">
              {services.map((service, index) => (
                <div key={index} className="card">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gym-light">Service {index + 1}</h4>
                    <button 
                      onClick={() => handleRemoveService(index)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gym-light mb-2">Name</label>
                      <input
                        type="text"
                        value={service.name}
                        onChange={(e) => updateService(index, 'name', e.target.value)}
                        className="w-full px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-gym-light mb-2">Price</label>
                      <input
                        type="text"
                        value={service.price}
                        onChange={(e) => updateService(index, 'price', e.target.value)}
                        className="w-full px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gym-light mb-2">Description</label>
                    <textarea
                      value={service.description}
                      onChange={(e) => updateService(index, 'description', e.target.value)}
                      className="w-full px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
                      rows="3"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold text-gym-accent mb-4">Upload New Image</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1 px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
                />
                <button 
                  onClick={handleUploadImage}
                  className="btn btn-primary"
                  disabled={!newImage}
                >
                  Upload
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gym-accent mb-4">Gallery Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={img} 
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300/2d2d2d/ffffff?text=Image';
                      }}
                    />
                    <button 
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'settings' && (
          <div className="bg-gym-gray rounded-lg p-6 max-w-md">
            <h2 className="text-2xl font-bold text-gym-light mb-6">Change Password</h2>
            
            {passwordMessage && (
              <div className={`p-4 rounded-lg mb-6 ${
                passwordMessage.includes('success') 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {passwordMessage}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-gym-light mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 bg-gym-darker text-gym-light rounded-lg border border-gym-gray focus:border-gym-accent focus:outline-none"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-gym-light mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-2 bg-gym-darker text-gym-light rounded-lg border border-gym-gray focus:border-gym-accent focus:outline-none"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-gym-light mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 bg-gym-darker text-gym-light rounded-lg border border-gym-gray focus:border-gym-accent focus:outline-none"
                  placeholder="Confirm new password"
                />
              </div>

              <button
                onClick={handleChangePassword}
                className="w-full btn btn-primary mt-4"
              >
                Change Password
              </button>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold text-gym-accent mb-4">Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gym-light mb-2">Owner Name</label>
                  <input
                    type="text"
                    value={content.contact.owner}
                    onChange={(e) => updateContent('contact', 'owner', e.target.value)}
                    className="w-full px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
                  />
                </div>
                <div>
                  <label className="block text-gym-light mb-2">Address</label>
                  <input
                    type="text"
                    value={content.contact.address}
                    onChange={(e) => updateContent('contact', 'address', e.target.value)}
                    className="w-full px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-gym-light mb-2">Phone Numbers</label>
                <div className="space-y-2">
                  {content.contact.phones.map((phone, index) => (
                    <input
                      key={index}
                      type="text"
                      value={phone}
                      onChange={(e) => updateContactPhone(index, e.target.value)}
                      className="w-full px-4 py-2 bg-gym-gray text-gym-light rounded-lg border border-gym-accent focus:outline-none focus:ring-2 focus:ring-gym-accent"
                    />
                  ))}
                  <button 
                    onClick={() => updateContent('contact', 'phones', [...content.contact.phones, ''])}
                    className="text-gym-accent hover:text-gym-light text-sm"
                  >
                    Add Phone Number
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 text-center">
          <button 
            onClick={handleSave}
            className="btn btn-primary px-8 py-3"
          >
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;