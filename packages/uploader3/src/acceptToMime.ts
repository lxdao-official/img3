/**
 * Convert ['.jpg', '.jpeg', '.svg'] to { 'image/jpg': ['.jpg', '.jpeg'], 'image/svg+xml': ['.svg']}
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 */

const mimeTypeCategory = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/svg+xml': ['.svg'],
  'image/gif': ['.gif'],
  'image/png': ['.png'],
};
export const acceptToMime = (extensions: string[]) => {
  const mimeTypes: Record<string, string[]> = {};
  extensions.forEach((ext) => {
    Object.entries(mimeTypeCategory).forEach(([mimeKey, exts]) => {
      if (exts.includes(ext)) {
        mimeTypes[mimeKey] = mimeTypes[mimeKey] || [];
        mimeTypes[mimeKey].push(ext);
      }
    });
  });
  return mimeTypes;
};
