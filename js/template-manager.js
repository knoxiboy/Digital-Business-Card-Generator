/**
 * Digital Business Card Generator - Template Manager
 */

const TemplateManager = {
  /**
   * Get template information
   */
  getTemplate(templateName) {
    return CONFIG.TEMPLATES[templateName] || CONFIG.TEMPLATES.modern;
  },

  /**
   * Get all templates
   */
  getAllTemplates() {
    return Object.entries(CONFIG.TEMPLATES).map(([key, value]) => ({
      id: key,
      ...value
    }));
  },

  /**
   * Apply template to card
   */
  applyTemplate(templateName, primaryColor) {
    const preview = document.getElementById('cardPreview');
    const template = this.getTemplate(templateName);

    // Remove all template classes
    preview.className = 'card-preview ' + template.className;

    // Apply primary color
    if (primaryColor && primaryColor !== template.defaultColor) {
      const color2 = CardGenerator.adjustColor(primaryColor, -30);
      preview.style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${color2} 100%)`;
    } else {
      // Use default template color
      const color2 = CardGenerator.adjustColor(template.defaultColor, -30);
      preview.style.background = `linear-gradient(135deg, ${template.defaultColor} 0%, ${color2} 100%)`;
    }

    return preview;
  },

  /**
   * Apply template colors
   */
  applyTemplateColors(element, templateName, primaryColor) {
    const template = this.getTemplate(templateName);

    // Apply primary color gradient
    const color1 = primaryColor || template.defaultColor;
    const color2 = CardGenerator.adjustColor(color1, -30);
    element.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
  },

  /**
   * Get template preview HTML
   */
  getTemplatePreviewHTML(templateName) {
    const template = this.getTemplate(templateName);
    return `
      <div style="
        width: 100px;
        height: 60px;
        border-radius: 6px;
        background: linear-gradient(135deg, ${template.colors[0]} 0%, ${template.colors[1]} 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 0.7rem;
        font-weight: 600;
        text-align: center;
        padding: 5px;
      ">
        ${template.name}
      </div>
    `;
  },

  /**
   * Get template list for dropdown
   */
  getTemplateOptions() {
    return Object.entries(CONFIG.TEMPLATES).map(([key, value]) => ({
      value: key,
      label: value.name
    }));
  },

  /**
   * Save template preference
   */
  saveTemplatePreference(templateName) {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEYS.settings, JSON.stringify({
        template: templateName
      }));
    } catch (error) {
      console.error('Failed to save template preference:', error);
    }
  },

  /**
   * Load template preference
   */
  loadTemplatePreference() {
    try {
      const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.settings);
      if (saved) {
        const settings = JSON.parse(saved);
        return settings.template || CONFIG.DEFAULTS.template;
      }
    } catch (error) {
      console.error('Failed to load template preference:', error);
    }
    return CONFIG.DEFAULTS.template;
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TemplateManager;
}
