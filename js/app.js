/**
 * Digital Business Card Generator - Main Application Entry Point
 */

class BusinessCardApp {
  constructor() {
    this.isInitialized = false;
  }

  /**
   * Initialize the application
   */
  async initialize() {
    try {
      console.log('Initializing Digital Business Card Generator...');

      // Check if required libraries are loaded
      if (!window.html2canvas || !window.jspdf) {
        console.warn('External libraries not yet loaded, waiting...');
        setTimeout(() => this.initialize(), 100);
        return;
      }

      // Initialize form handlers
      FormHandler.init();

      // Initialize export handlers
      ExportManager.init();

      // Load saved card data
      FormHandler.loadSavedData();

      // Load card from URL if shared
      ExportManager.loadCardFromUrl();

      // Initial preview generation
      FormHandler.updatePreview();

      // Mark as initialized
      this.isInitialized = true;

      console.log('✅ Digital Business Card Generator initialized successfully');
      Utils.showNotification('Welcome! Create your business card', 'success');
    } catch (error) {
      console.error('Failed to initialize application:', error);
      Utils.showNotification('Failed to initialize application', 'error');
    }
  }

  /**
   * Get app status
   */
  getStatus() {
    return {
      initialized: this.isInitialized,
      timestamp: new Date().toISOString()
    };
  }
}

// Create global app instance
let businessCardApp = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  businessCardApp = new BusinessCardApp();
  businessCardApp.initialize();
});

// Handle visibility changes
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    console.log('Application is now visible');
  }
});

// Handle beforeunload to save data
window.addEventListener('beforeunload', () => {
  const formData = FormHandler.getFormData();
  CardGenerator.saveCardData(formData);
});

// Export for debugging
window.businessCardApp = () => businessCardApp;
window.businessCardUtils = () => ({
  FormHandler,
  CardGenerator,
  TemplateManager,
  ExportManager
});
