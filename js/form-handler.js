/**
 * Digital Business Card Generator - Form Handler
 */

const FormHandler = {
  /**
   * Initialize form handlers
   */
  init() {
    const form = document.getElementById('cardForm');
    
    // Form submission
    form.addEventListener('submit', (e) => this.handleFormSubmit(e));

    // Real-time preview updates
    form.addEventListener('input', Utils.debounce(() => this.updatePreview(), 300));
    form.addEventListener('change', (e) => this.handleFormChange(e));

    // Profile image upload
    document.getElementById('profileImage').addEventListener('change', (e) => this.handleImageUpload(e));

    // Template change
    document.getElementById('template').addEventListener('change', (e) => this.handleTemplateChange(e));

    // Color change
    document.getElementById('primaryColor').addEventListener('change', (e) => this.handleColorChange(e));

    console.log('Form handlers initialized');
  },

  /**
   * Handle form submission
   */
  handleFormSubmit(e) {
    e.preventDefault();

    const formData = this.getFormData();
    const validation = Utils.validateFormData(formData);

    if (!validation.isValid) {
      validation.errors.forEach(error => {
        Utils.showNotification(error, 'error');
      });
      return;
    }

    // Save data and enable downloads
    CardGenerator.saveCardData(formData);
    this.enableDownloads();
    Utils.showNotification('Card generated successfully!', 'success');
  },

  /**
   * Handle form changes
   */
  handleFormChange(e) {
    const { id } = e.target;

    if (id === 'template') {
      this.handleTemplateChange(e);
    } else if (id === 'primaryColor') {
      this.handleColorChange(e);
    } else {
      this.updatePreview();
    }
  },

  /**
   * Handle image upload
   */
  async handleImageUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    if (!Utils.isValidImageFile(file)) {
      Utils.showNotification('Invalid image file. Please use JPG, PNG, or WebP (max 5MB)', 'error');
      e.target.value = '';
      return;
    }

    try {
      const base64 = await Utils.fileToBase64(file);
      document.getElementById('profileImage').dataset.base64 = base64;
      this.updatePreview();
      Utils.showNotification('Image uploaded successfully', 'success');
    } catch (error) {
      Utils.showNotification('Failed to upload image', 'error');
      console.error('Image upload error:', error);
    }
  },

  /**
   * Handle template change
   */
  handleTemplateChange(e) {
    const templateName = document.getElementById('template').value;
    const template = TemplateManager.getTemplate(templateName);
    
    // Reset primary color to template default
    const primaryColorInput = document.getElementById('primaryColor');
    primaryColorInput.value = template.defaultColor;
    
    const primaryColor = template.defaultColor;

    TemplateManager.applyTemplate(templateName, primaryColor);
    TemplateManager.saveTemplatePreference(templateName);
    this.updatePreview();
  },

  /**
   * Handle color change
   */
  handleColorChange(e) {
    const primaryColor = e.target.value;
    const templateName = document.getElementById('template').value;

    TemplateManager.applyTemplate(templateName, primaryColor);
    this.updatePreview();
  },

  /**
   * Update preview
   */
  updatePreview() {
    const cardData = this.getFormData();
    const template = document.getElementById('template').value;
    const primaryColor = document.getElementById('primaryColor').value;

    CardGenerator.updateCardPreview(cardData, template, primaryColor);
  },

  /**
   * Get form data
   */
  getFormData() {
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
   * Enable download buttons
   */
  enableDownloads() {
    document.getElementById('downloadImage').disabled = false;
    document.getElementById('downloadPDF').disabled = false;
  },

  /**
   * Load saved data into form
   */
  loadSavedData() {
    const savedData = CardGenerator.loadCardData();
    if (!savedData) return;

    document.getElementById('fullName').value = savedData.fullName || '';
    document.getElementById('title').value = savedData.title || '';
    document.getElementById('company').value = savedData.company || '';
    document.getElementById('email').value = savedData.email || '';
    document.getElementById('phone').value = savedData.phone || '';
    document.getElementById('website').value = savedData.website || '';

    if (savedData.profileImage) {
      document.getElementById('profileImage').dataset.base64 = savedData.profileImage;
    }

    if (savedData.socialLinks) {
      document.getElementById('twitter').value = savedData.socialLinks.twitter || '';
      document.getElementById('linkedin').value = savedData.socialLinks.linkedin || '';
      document.getElementById('facebook').value = savedData.socialLinks.facebook || '';
      document.getElementById('instagram').value = savedData.socialLinks.instagram || '';
      document.getElementById('github').value = savedData.socialLinks.github || '';
    }

    const savedTemplate = TemplateManager.loadTemplatePreference();
    document.getElementById('template').value = savedTemplate;

    this.updatePreview();
  },

  /**
   * Clear all form data
   */
  clearForm() {
    if (confirm('Are you sure you want to clear all form data?')) {
      document.getElementById('cardForm').reset();
      document.getElementById('profileImage').dataset.base64 = '';
      localStorage.removeItem(CONFIG.STORAGE_KEYS.cardData);
      this.updatePreview();
      Utils.showNotification('Form cleared', 'success');
    }
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FormHandler;
}
