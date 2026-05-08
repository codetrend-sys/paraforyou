import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { type Product } from "@/data/products";
import { useProducts } from "@/hooks/useData";

type CartItem = { id: string; quantity: number };

type ShopContextValue = {
  cart: CartItem[];
  favorites: string[];
  cartCount: number;
  cartTotal: number;
  favoritesCount: number;
  addToCart: (id: string, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  getProduct: (id: string) => any;
  getCartProducts: () => Array<{ product: any; quantity: number }>;
  getFavoriteProducts: () => any[];
};

const ShopContext = createContext<ShopContextValue | null>(null);

const CART_KEY = "4youpara_cart";
const FAV_KEY = "4youpara_favorites";

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  
  const { data: asyncProducts = [] } = useProducts();

  useEffect(() => {
    setCart(readLS<CartItem[]>(CART_KEY, []));
    setFavorites(readLS<string[]>(FAV_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  const getProduct = (id: string) => asyncProducts.find((p: any) => p.id === id);

  const addToCart = (id: string, quantity = 1) => {
    const product = getProduct(id);
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) {
        return prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + quantity } : c));
      }
      return [...prev, { id, quantity }];
    });
    if (product) toast.success(`${product.name} ajouté au panier`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(id);
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, quantity } : c)));
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (id: string) => {
    const product = getProduct(id);
    setFavorites((prev) => {
      if (prev.includes(id)) {
        if (product) toast(`${product.name} retiré des favoris`);
        return prev.filter((f) => f !== id);
      }
      if (product) toast.success(`${product.name} ajouté aux favoris`);
      return [...prev, id];
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const getCartProducts = () =>
    cart
      .map((c) => {
        const product = getProduct(c.id);
        return product ? { product, quantity: c.quantity } : null;
      })
      .filter((x): x is { product: Product; quantity: number } => x !== null);

  const getFavoriteProducts = () =>
    favorites.map((id) => getProduct(id)).filter((p): p is Product => !!p);

  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);
  const cartTotal = getCartProducts().reduce((s, { product, quantity }) => s + product.price * quantity, 0);
  const favoritesCount = favorites.length;

  return (
    <ShopContext.Provider
      value={{
        cart,
        favorites,
        cartCount,
        cartTotal,
        favoritesCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
        isFavorite,
        getProduct,
        getCartProducts,
        getFavoriteProducts,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
