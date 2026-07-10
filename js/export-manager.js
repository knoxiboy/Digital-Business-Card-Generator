/**
 * Digital Business Card Generator - Export Manager
 */

const ExportManager = {
  /**
   * Initialize export handlers
   */
  init() {
    document.getElementById('downloadImage').addEventListener('click', () => this.downloadAsImage());
    document.getElementById('downloadPDF').addEventListener('click', () => this.downloadAsPDF());
  },

  /**
   * Download card as PNG image
   */
  async downloadAsImage() {
    try {
      const button = document.getElementById('downloadImage');
      button.disabled = true;
      button.classList.add('loading');

      const cardPreview = document.getElementById('cardPreview');
      const cardData = FormHandler.getFormData();

      // Use dom-to-image to capture card (better gradient support)
      const dataUrl = await domtoimage.toPng(cardPreview, {
        quality: 1.0,
        width: cardPreview.offsetWidth * 3,
        height: cardPreview.offsetHeight * 3,
        style: {
          transform: 'scale(3)',
          transformOrigin: 'top left',
          width: cardPreview.offsetWidth + 'px',
          height: cardPreview.offsetHeight + 'px'
        }
      });

      // Create download link
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${cardData.fullName}-business-card.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      Utils.showNotification('Card downloaded as PNG', 'success');
    } catch (error) {
      console.error('Error downloading image:', error);
      Utils.showNotification('Failed to download image', 'error');
    } finally {
      const button = document.getElementById('downloadImage');
      button.disabled = false;
      button.classList.remove('loading');
    }
  },

  /**
   * Download card as PDF
   */
  async downloadAsPDF() {
    try {
      const button = document.getElementById('downloadPDF');
      button.disabled = true;
      button.classList.add('loading');

      const cardPreview = document.getElementById('cardPreview');
      const cardData = FormHandler.getFormData();

      // Use dom-to-image to capture card (better gradient support)
      const dataUrl = await domtoimage.toPng(cardPreview, {
        quality: 1.0,
        width: cardPreview.offsetWidth * 3,
        height: cardPreview.offsetHeight * 3,
        style: {
          transform: 'scale(3)',
          transformOrigin: 'top left',
          width: cardPreview.offsetWidth + 'px',
          height: cardPreview.offsetHeight + 'px'
        }
      });

      // Create PDF
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'A6' // Business card size
      });

      // Calculate dimensions to fit in A6
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = 105; // 105mm for A6 landscape
      const imgHeight = (cardPreview.offsetHeight * imgWidth) / cardPreview.offsetWidth;

      // Center the image
      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      pdf.addImage(dataUrl, 'PNG', x, y, imgWidth, imgHeight);

      // Save PDF
      pdf.save(`${cardData.fullName}-business-card.pdf`);

      Utils.showNotification('Card downloaded as PDF', 'success');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      Utils.showNotification('Failed to download PDF', 'error');
    } finally {
      const button = document.getElementById('downloadPDF');
      button.disabled = false;
      button.classList.remove('loading');
    }
  },

  /**
   * Generate multiple cards for printing (optional)
   */
  async downloadMultipleCardsAsPDF(count = 10) {
    try {
      const cardPreview = document.getElementById('cardPreview');
      const cardData = FormHandler.getFormData();

      // Use html2canvas to capture card
      const canvas = await html2canvas(cardPreview, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
        logging: false
      });

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'A4'
      });

      const imgData = canvas.toDataURL('image/png');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // A6 card dimensions
      const cardWidth = 105;
      const cardHeight = 74;

      let cardsAdded = 0;
      let currentPage = 0;

      while (cardsAdded < count) {
        if (cardsAdded > 0 && cardsAdded % 2 === 0) {
          pdf.addPage();
          currentPage++;
        }

        const xPos = cardsAdded % 2 === 0 ? 2 : 107;
        const yPos = 10;

        pdf.addImage(imgData, 'PNG', xPos, yPos, cardWidth, cardHeight);
        cardsAdded++;
      }

      pdf.save(`${cardData.fullName}-business-cards-print.pdf`);
      Utils.showNotification(`${count} cards downloaded as PDF`, 'success');
    } catch (error) {
      console.error('Error downloading print PDF:', error);
      Utils.showNotification('Failed to download print PDF', 'error');
    }
  },

  /**
   * Share card via URL (if backend is available)
   */
  async shareCard() {
    try {
      const cardData = FormHandler.getFormData();
      const cardJson = JSON.stringify(cardData);
      const encodedCard = btoa(cardJson);

      const shareUrl = `${window.location.origin}${window.location.pathname}?card=${encodedCard}`;

      if (navigator.share) {
        await navigator.share({
          title: `${cardData.fullName}'s Business Card`,
          text: `${cardData.title} at ${cardData.company}`,
          url: shareUrl
        });
      } else {
        // Fallback: copy to clipboard
        await Utils.copyToClipboard(shareUrl);
        Utils.showNotification('Share link copied to clipboard', 'success');
      }
    } catch (error) {
      console.error('Error sharing card:', error);
      Utils.showNotification('Failed to share card', 'error');
    }
  },

  /**
   * Load card from URL parameter
   */
  loadCardFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const cardParam = params.get('card');

    if (!cardParam) return;

    try {
      const cardJson = atob(cardParam);
      const cardData = JSON.parse(cardJson);

      // Populate form
      document.getElementById('fullName').value = cardData.fullName || '';
      document.getElementById('title').value = cardData.title || '';
      document.getElementById('company').value = cardData.company || '';
      document.getElementById('email').value = cardData.email || '';
      document.getElementById('phone').value = cardData.phone || '';
      document.getElementById('website').value = cardData.website || '';

      if (cardData.profileImage) {
        document.getElementById('profileImage').dataset.base64 = cardData.profileImage;
      }

      if (cardData.socialLinks) {
        document.getElementById('twitter').value = cardData.socialLinks.twitter || '';
        document.getElementById('linkedin').value = cardData.socialLinks.linkedin || '';
        document.getElementById('facebook').value = cardData.socialLinks.facebook || '';
        document.getElementById('instagram').value = cardData.socialLinks.instagram || '';
        document.getElementById('github').value = cardData.socialLinks.github || '';
      }

      FormHandler.updatePreview();
      FormHandler.enableDownloads();
      Utils.showNotification('Card loaded from URL', 'success');
    } catch (error) {
      console.error('Error loading card from URL:', error);
    }
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExportManager;
}
