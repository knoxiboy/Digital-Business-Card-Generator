/**
 * Digital Business Card Generator - Utility Functions
 */

const Utils = {
  /**
   * Validate email format
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate URL format
   */
  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Get initials from name
   */
  getInitials(name) {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  },

  /**
   * Convert file to base64
   */
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  },

  /**
   * Validate image file
   */
  isValidImageFile(file) {
    if (!file) return false;
    
    const isValidType = CONFIG.VALIDATION.allowedImageFormats.includes(file.type);
    const isValidSize = file.size <= CONFIG.VALIDATION.imageMaxSize;
    
    return isValidType && isValidSize;
  },

  /**
   * Format phone number
   */
  formatPhoneNumber(phone) {
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length === 10) {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
    }
    return phone;
  },

  /**
   * Extract domain from URL
   */
  extractDomain(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  },

  /**
   * Truncate text with ellipsis
   */
  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  },

  /**
   * Escape HTML characters
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  /**
   * Get contrasting text color
   */
  getContrastColor(hexColor) {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  },

  /**
   * Debounce function
   */
  debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  },

  /**
   * Get current date formatted
   */
  getCurrentDateFormatted() {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },

  /**
   * Copy text to clipboard
   */
  copyToClipboard(text) {
    return navigator.clipboard.writeText(text);
  },

  /**
   * Show notification
   */
  showNotification(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `${type}-message`;
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.animation = 'slideIn 0.3s ease-out';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, duration);
  },

  /**
   * Validate form data
   */
  validateFormData(data) {
    const errors = [];

    // Validate name
    if (!data.fullName || data.fullName.length < CONFIG.VALIDATION.minNameLength) {
      errors.push('Full name is required');
    }

    // Validate title
    if (!data.title || data.title.length < CONFIG.VALIDATION.minTitleLength) {
      errors.push('Title/Position is required');
    }

    // Validate email
    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push('Valid email is required');
    }

    // Validate optional URL fields
    if (data.website && !this.isValidUrl(data.website)) {
      errors.push('Website URL is invalid');
    }

    if (data.twitter && !this.isValidUrl(data.twitter)) {
      errors.push('Twitter URL is invalid');
    }

    if (data.linkedin && !this.isValidUrl(data.linkedin)) {
      errors.push('LinkedIn URL is invalid');
    }

    if (data.facebook && !this.isValidUrl(data.facebook)) {
      errors.push('Facebook URL is invalid');
    }

    if (data.instagram && !this.isValidUrl(data.instagram)) {
      errors.push('Instagram URL is invalid');
    }

    if (data.github && !this.isValidUrl(data.github)) {
      errors.push('GitHub URL is invalid');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}
