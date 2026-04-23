import { supabase } from '../lib/supabase';

const IMG_PFX = 'trava_img_';
const BUCKET = 'trava-images';

// Compress image file to base64 JPEG
export function compressImage(file, maxWidth = 1200, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let w = img.width, h = img.height;
        if (w > maxWidth) { h = Math.round(h * maxWidth / w); w = maxWidth; }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        canvas.toBlob(blob => resolve(blob), 'image/jpeg', quality);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Upload image to Supabase Storage, return public URL
export async function uploadImageToSupabase(file) {
  const blob = await compressImage(file);
  const ext = 'jpg';
  const path = `uploads/${Date.now()}_${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: 'image/jpeg',
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

// Delete image from Supabase Storage by its public URL
export async function deleteImageFromSupabase(publicUrl) {
  if (!publicUrl) return;
  try {
    const url = new URL(publicUrl);
    // path after /object/public/trava-images/
    const marker = `/object/public/${BUCKET}/`;
    const idx = url.pathname.indexOf(marker);
    if (idx === -1) return;
    const filePath = url.pathname.slice(idx + marker.length);
    await supabase.storage.from(BUCKET).remove([filePath]);
  } catch {}
}

// Legacy localStorage helpers (kept for backwards compat, no longer primary)
export function saveImageData(imageId, base64) {
  try { localStorage.setItem(IMG_PFX + imageId, base64); return true; }
  catch { return false; }
}

export function getImageData(imageId) {
  if (!imageId) return null;
  return localStorage.getItem(IMG_PFX + imageId) || null;
}

export function deleteImageData(imageId) {
  if (imageId) localStorage.removeItem(IMG_PFX + imageId);
}

// Returns best available src: Supabase URL (imageUrl) > legacy localStorage (imageId) > null
export function resolveImageSrc(item) {
  if (!item) return null;
  if (item.imageUrl) return item.imageUrl;
  if (item.imageId) return getImageData(item.imageId) || null;
  return null;
}

export function getImageStorageUsedMB() {
  let bytes = 0;
  for (const key of Object.keys(localStorage)) {
    if (key.startsWith(IMG_PFX)) bytes += (localStorage.getItem(key)?.length ?? 0) * 2;
  }
  return (bytes / 1024 / 1024).toFixed(1);
}

export function generateImageId() {
  return 'img_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}
