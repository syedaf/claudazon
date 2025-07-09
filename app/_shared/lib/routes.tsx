// lib/routes.ts - Centralized route management
export const ROUTES = {
  // Static routes
  HOME: '/',
  PRODUCTS: '/products',

  // Dynamic route builders
  PRODUCT_CATEGORY: (slug: string) => `/products/category/${slug}`,
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,

  // Future routes (easy to add)
  USER_PROFILE: (username: string) => `/users/${username}`,
  BLOG_POST: (slug: string) => `/blog/${slug}`,
  SEARCH: (query?: string) =>
    query ? `/search?q=${encodeURIComponent(query)}` : '/search',
} as const;

// Route validation helpers
export function validateProductId(id: string): boolean {
  return /^[a-zA-Z0-9-]{1,50}$/.test(id);
}

export function validateSlug(slug: string): boolean {
  return /^[a-z0-9-]{1,100}$/.test(slug);
}

// Type-safe route builder with validation
export const buildRoute = {
  productCategory: (slug: string) => {
    if (!validateSlug(slug)) {
      throw new Error(`Invalid category slug: ${slug}`);
    }
    return ROUTES.PRODUCT_CATEGORY(slug);
  },

  productDetail: (id: string) => {
    if (!validateProductId(id)) {
      throw new Error(`Invalid product ID: ${id}`);
    }
    return ROUTES.PRODUCT_DETAIL(id);
  },
};
