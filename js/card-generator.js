/**
 * Digital Business Card Generator - Card Generator Module
 */

const CardGenerator = {
  /**
   * Generate card HTML
   */
  generateCardHTML(cardData, template, primaryColor) {
    const { fullName, title, company, email, phone, website, profileImage, socialLinks } = cardData;

    let html = `
      <div class="card-header">
    `;

    // Add profile image if available
    if (profileImage) {
      html += `<img src="${profileImage}" alt="${fullName}" class="card-avatar">`;
    } else {
      // Show initials if no image
      const initials = Utils.getInitials(fullName || 'NA');
      html += `<div class="card-avatar card-avatar-initials">${initials}</div>`;
    }

    html += `
        <div class="card-info">
          <div class="card-name">${Utils.escapeHtml(fullName)}</div>
          <div class="card-title">${Utils.escapeHtml(title)}</div>
          ${company ? `<div class="card-company">${Utils.escapeHtml(company)}</div>` : ''}
        </div>
      </div>

      <div class="card-contact">
    `;

    // Add email
    if (email) {
      html += `<div class="card-contact-item">
        <span class="card-contact-icon">✉</span>
        <span>${Utils.escapeHtml(email)}</span>
      </div>`;
    }

    // Add phone
    if (phone) {
      html += `<div class="card-contact-item">
        <span class="card-contact-icon">📱</span>
        <span>${Utils.escapeHtml(phone)}</span>
      </div>`;
    }

    // Add website
    if (website) {
      const domain = Utils.extractDomain(website);
      html += `<div class="card-contact-item">
        <span class="card-contact-icon">🌐</span>
        <span>${Utils.escapeHtml(domain)}</span>
      </div>`;
    }

    html += '</div>';

    // Add social links - FIXED: Now they will show
    const hasSocialLinks = Object.values(socialLinks).some(link => link && Utils.isValidUrl(link));
    
    if (hasSocialLinks) {
      html += '<div class="card-social">';

      Object.entries(socialLinks).forEach(([platform, url]) => {
        if (url && Utils.isValidUrl(url)) {
          const platformConfig = CONFIG.SOCIAL_PLATFORMS[platform];
          if (platformConfig) {
            html += `
              <a href="${Utils.escapeHtml(url)}" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="social-link social-link-${platform}" 
                 title="${platformConfig.name}">
                ${platformConfig.icon}
              </a>
            `;
          }
        }
      });

      html += '</div>';
    }

    return html;
  },

  /**
   * Update card preview
   */
  updateCardPreview(cardData, template, primaryColor) {
    const preview = document.getElementById('cardPreview');
    
    // Update template class
    preview.className = `card-preview ${template}`;

    // Apply primary color dynamically
    if (primaryColor && primaryColor !== '#2c3e50') {
      const color2 = this.adjustColor(primaryColor, -30);
      preview.style.setProperty('--primary-color', primaryColor);
      preview.style.setProperty('--secondary-color', color2);
      preview.style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${color2} 100%)`;
    } else {
      preview.style.removeProperty('--primary-color');
      preview.style.removeProperty('--secondary-color');
      preview.style.background = '';
    }

    // Generate and update card HTML
    const cardHTML = this.generateCardHTML(cardData, template, primaryColor);
    preview.innerHTML = cardHTML;

    return preview;
  },

  /**
   * Adjust color brightness
   */
  adjustColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255))
      .toString(16).slice(1);
  },

  /**
   * Get card data from form
   */
  getCardDataFromForm() {
    return {
      fullName: document.getElementById('fullName').value || '',
      title: document.getElementById('title').value || '',
      company: document.getElementById('company').value || '',
      email: document.getElementById('email').value || '',
      phone: document.getElementById('phone').value || '',
      website: document.getElementById('website').value || '',
      profileImage: document.getElementById('profileImage').dataset.base64 || '',
      socialLinks: {
        twitter: document.getElementById('twitter').value || '',
        linkedin: document.getElementById('linkedin').value || '',
        facebook: document.getElementById('facebook').value || '',
        instagram: document.getElementById('instagram').value || '',
        github: document.getElementById('github').value || ''
      }
    };
  },

  /**
   * Save card data to local storage
   */
  saveCardData(cardData) {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEYS.cardData, JSON.stringify(cardData));
    } catch (error) {
      console.error('Failed to save card data:', error);
    }
  },

  /**
   * Load card data from local storage
   */
  loadCardData() {
    try {
      const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.cardData);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to load card data:', error);
      return null;
    }
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CardGenerator;
}
