// ─── helpImage.js ──────────────────────────────────────────────────────────
// Utilidad para redimensionar y comprimir imágenes en el cliente (Canvas API).
// Ayuda a evitar errores 413 (Payload Too Large).

/**
 * Redimensiona una imagen si supera ciertas dimensiones o tamaño.
 * @param {File} file - El archivo original.
 * @param {object} options - Opciones de redimensionado.
 * @returns {Promise<File>} - El archivo procesado.
 */
export const resizeImage = (file, options = {}) => {
  const { 
    maxWidth = 1000, 
    maxHeight = 1000, 
    quality = 0.8,
    compressOnlyIfLargerThan = 1 * 1024 * 1024 // default 1MB
  } = options;

  return new Promise((resolve, reject) => {
    // 1. Solo procesar si es una imagen
    if (!file || !file.type.startsWith('image/')) {
      return resolve(file);
    }

    // 2. Si el archivo ya es pequeño, no procesar (opcional)
    if (file.size <= compressOnlyIfLargerThan) {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Mantener relación de aspecto
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(file);
            const resizedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
};

export const helpImage = { resizeImage };
