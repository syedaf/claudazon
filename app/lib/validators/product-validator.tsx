export function validateCreateProduct(data: any) {
  const errors: string[] = [];

  if (!data.title || data.title.length < 3) {
    errors.push('Title must be at least 3 characters');
  }
  if (!data.description || data.description.length < 10) {
    errors.push('Description must be at least 10 characters');
  }
  if (!data.price || data.price <= 0) {
    errors.push('Price must be positive');
  }
  if (!data.category) {
    errors.push('Category is required');
  }
  if (!data.image || !data.image.startsWith('http')) {
    errors.push('Valid image URL required');
  }
  if (data.stock < 0) {
    errors.push('Stock cannot be negative');
  }

  return { isValid: errors.length === 0, errors };
}
