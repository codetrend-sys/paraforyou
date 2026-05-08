import { supabase } from './supabase';

export async function getProducts() {
  if (!supabase) return [];
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brands (name, logo_url, gradient, accent),
      categories (name, slug)
    `);
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  // Transform data to match the frontend expected format if necessary
  return data.map(p => ({
    ...p,
    brand: p.brands?.name || p.brand,
    category: p.categories?.slug || p.category,
    image: p.image_url || p.image,
    oldPrice: p.old_price || p.oldPrice
  }));
}

export async function getCategories() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('categories').select('*').order('name');
  if (error) return [];
  return data.map(c => ({
    ...c,
    image: c.image_url || c.image
  }));
}

export async function getBrands() {
  if (!supabase) return [];
  
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name');
    
  if (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
  
  return data.map((b: any) => ({
    ...b,
    image: b.logo_url || b.image_url || b.image,
    bgImage: b.bg_image_url || b.bgImage || b.bg_image,
  }));
}

export async function getAnnouncements() {
  if (!supabase) return null;
  const { data, error } = await supabase.from('announcements').select('*').single();
  return { data, error };
}

export async function updateAnnouncements(id: string, updates: any) {
  if (!supabase) return { error: 'Supabase not initialized' };
  return supabase.from('announcements').update(updates).eq('id', id).select().single();
}

export async function getHomepageSections() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('homepage_sections')
    .select('*, categories(id, name, slug)')
    .order('order_index');
  if (error) return [];
  return data;
}

export async function createHomepageSection(section: any) {
  return supabase.from('homepage_sections').insert([section]).select();
}

export async function updateHomepageSection(id: string, section: any) {
  return supabase.from('homepage_sections').update(section).eq('id', id).select();
}

export async function deleteHomepageSection(id: string) {
  return supabase.from('homepage_sections').delete().eq('id', id);
}

export async function getBlogPosts() {
  if (!supabase) {
    console.error('Supabase client is null');
    return [];
  }
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_date', { ascending: false });
    
  if (error) {
    console.error('Error fetching blog posts from Supabase:', error);
    return [];
  }
  
  console.log('Blog posts fetched:', data);
  
  return data.map(post => ({
    ...post,
    image: post.image_url || post.image,
    date: post.published_date || post.date,
    readTime: post.read_time || post.readTime
  }));
}

export async function getBlogPostBySlug(slug: string) {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
    
  if (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
  
  return {
    ...data,
    image: data.image_url || data.image,
    date: data.published_date || data.date,
    readTime: data.read_time || data.readTime
  };
}

// ADMIN CRUD OPERATIONS

export async function createProduct(product: any) {
  if (!supabase) return { error: 'Supabase not initialized' };
  
  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        ...product
      }
    ])
    .select();
    
  return { data, error };
}

export async function updateProduct(id: string, product: any) {
  if (!supabase) return { error: 'Supabase not initialized' };
  
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select();
    
  return { data, error };
}

export async function deleteProduct(id: string) {
  if (!supabase) return { error: 'Supabase not initialized' };
  const { error } = await supabase.from('products').delete().eq('id', id);
  return { error };
}

export async function createCategory(category: any) {
  if (!supabase) return { error: 'Supabase not initialized' };
  const { data, error } = await supabase.from('categories').insert([category]).select();
  return { data, error };
}

export async function updateCategory(id: string, category: any) {
  if (!supabase) return { error: 'Supabase not initialized' };
  const { data, error } = await supabase.from('categories').update(category).eq('id', id).select();
  return { data, error };
}

export async function deleteCategory(id: string) {
  if (!supabase) return { error: 'Supabase not initialized' };
  const { error } = await supabase.from('categories').delete().eq('id', id);
  return { error };
}
export const uploadProductImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `product-images/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('products')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Upload error:', uploadError);
    return { error: uploadError };
  }

  const { data } = supabase.storage
    .from('products')
    .getPublicUrl(filePath);

  return { publicUrl: data.publicUrl };
};
