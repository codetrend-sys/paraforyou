import { useQuery } from '@tanstack/react-query';
import { getProducts, getCategories, getBrands, getProductBySlug, getBlogPosts, getBlogPostBySlug, getAnnouncements, getHomepageSections } from '@/lib/api';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
}

export function useAnnouncements() {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: getAnnouncements,
  });
}

export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });
}

export function useHomepageSections() {
  return useQuery({
    queryKey: ['homepage-sections'],
    queryFn: getHomepageSections,
  });
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: getBlogPosts,
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => getBlogPostBySlug(slug),
  });
}
