/**
 * Digital Business Card Generator - Configuration
 */

const CONFIG = {
  // Default values
  DEFAULTS: {
    template: 'centered',
    primaryColor: '#1a5a7b'
  },

  // Card dimensions (in pixels)
  CARD: {
    width: 350,
    height: 220,
    dpi: 300
  },

  // Templates configuration - 4 distinct layouts that work with any color
  TEMPLATES: {
    minimal: {
      name: 'Minimal White',
      className: 'minimal',
      layout: 'minimal',
      defaultColor: '#ffffff',
      description: 'Minimalist white design with black text'
    },
    split: {
      name: 'Split Design',
      className: 'split',
      layout: 'split',
      defaultColor: '#2c3e50',
      description: 'Vertical split with sidebar accent'
    },
    centered: {
      name: 'Centered Classic',
      className: 'centered',
      layout: 'centered',
      defaultColor: '#1a5a7b',
      description: 'Classic centered layout with circular avatar'
    },
    creative: {
      name: 'Creative Bold',
      className: 'creative',
      layout: 'creative',
      defaultColor: '#2385af',
      description: 'Bold asymmetric design with floating elements'
    }
  },

  // Social media platforms
  SOCIAL_PLATFORMS: {
    twitter: { icon: '𝕏', name: 'Twitter', color: '#1DA1F2' },
    linkedin: { icon: '𝗶𝗻', name: 'LinkedIn', color: '#0A66C2' },
    facebook: { icon: '𝗳', name: 'Facebook', color: '#1877F2' },
    instagram: { icon: '◉', name: 'Instagram', color: '#E1306C' },
    github: { icon: '◉', name: 'GitHub', color: '#333333' }
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
