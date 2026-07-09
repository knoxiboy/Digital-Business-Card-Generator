/**
 * Digital Business Card Generator - Configuration
 */

const CONFIG = {
  // Default values
  DEFAULTS: {
    template: 'modern',
    primaryColor: '#2c3e50'
  },

  // Card dimensions (in pixels)
  CARD: {
    width: 350,
    height: 220,
    dpi: 300
  },

  // Templates configuration
  TEMPLATES: {
    modern: {
      name: 'Modern Minimal',
      className: 'modern',
      colors: ['#667eea', '#764ba2']
    },
    professional: {
      name: 'Professional Classic',
      className: 'professional',
      colors: ['#2c3e50', '#34495e']
    },
    creative: {
      name: 'Creative Colorful',
      className: 'creative',
      colors: ['#f093fb', '#f5576c']
    },
    elegant: {
      name: 'Elegant Dark',
      className: 'elegant',
      colors: ['#1a1a2e', '#16213e']
    }
  },

  // Social media platforms
  SOCIAL_PLATFORMS: {
    twitter: { icon: '𝕏', name: 'Twitter', color: '#1DA1F2' },
    linkedin: { icon: 'in', name: 'LinkedIn', color: '#0A66C2' },
    facebook: { icon: 'f', name: 'Facebook', color: '#1877F2' },
    instagram: { icon: '📷', name: 'Instagram', color: '#E1306C' },
    github: { icon: '⚙', name: 'GitHub', color: '#333333' }
  },

  // Validation rules
  VALIDATION: {
    minNameLength: 2,
    maxNameLength: 50,
    minTitleLength: 2,
    maxTitleLength: 50,
    minPhoneLength: 7,
    maxPhoneLength: 20,
    imageMaxSize: 5 * 1024 * 1024, // 5MB
    allowedImageFormats: ['image/jpeg', 'image/png', 'image/webp']
  },

  // Storage keys
  STORAGE_KEYS: {
    cardData: 'cardGeneratorData',
    settings: 'cardGeneratorSettings'
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
