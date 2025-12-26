# Controllers Directory

This directory is reserved for future controller implementations.

Currently, all route handlers are defined directly in the route files:
- `/routes/auth.js` - Authentication controllers
- `/routes/content.js` - Content management controllers
- `/routes/upload.js` - Upload controllers

If the application grows, you can refactor route handlers into this directory for better organization.

## Example Controller Structure

```javascript
// controllers/contentController.js
exports.getAllContent = async (req, res) => {
  // Handle get all content
};

exports.updateHero = async (req, res) => {
  // Handle hero update
};
```
