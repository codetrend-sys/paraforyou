import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X, Search, Heart, ShoppingBag, User as UserIcon, LogOut ,Sparkles } from "lucide-react";
import { useProducts, useCategories } from "@/hooks/useData";
import { useShop } from "@/contexts/ShopContext";
import { useAuth } from "@/contexts/AuthContext";
import { CartDrawer } from "./CartDrawer";
import logo from "@/assets/logo-4youpara.jpeg";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/categories", label: "Catégories" },
  { to: "/marques", label: "Marques" },
  { to: "/promotions", label: "Promotions" },
  { to: "/blog", label: "Conseils" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { cartCount, favoritesCount } = useShop();
  const { user, signOut, isAdmin } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p: any) =>
          p.name.toLowerCase().includes(q) ||
          (typeof p.brand === 'string' ? p.brand : p.brand?.name)?.toLowerCase().includes(q) ||
          (typeof p.category === 'string' ? p.category : p.category?.name)?.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div
            className={`glass-strong rounded-full flex items-center justify-between px-4 md:px-6 py-2.5 transition-all duration-500 relative z-50 ${
              scrolled ? "shadow-elevated" : "shadow-soft"
            }`}
          >
            <Link to="/" className="flex items-center gap-2 shrink-0 group">
              <img
                src={logo}
                alt="4YouPara"
                className="h-10 w-10 md:h-11 md:w-11 rounded-full object-cover ring-1 ring-rose-soft transition-transform group-hover:scale-105"
              />
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-display text-lg font-bold tracking-wide text-rose">
                 <span className="text-sage">Para</span> 4<span className="text-sage">You</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Parapharmacie & Cosmétiques
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="relative px-3 py-1.5 text-sm text-foreground/80 hover:text-foreground transition-colors rounded-full"
                  activeProps={{ className: "text-foreground bg-rose-soft/50" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSearchOpen(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-rose-soft/40 transition-colors text-foreground/70 hover:text-foreground"
                aria-label="Recherche"
              >
                <Search className="h-4 w-4" />
              </button>
              <Link
                to="/favoris"
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-rose-soft/40 transition-colors text-foreground/70 hover:text-foreground"
                aria-label="Favoris"
              >
                <Heart className="h-4 w-4" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-secondary text-[10px] font-semibold text-secondary-foreground inline-flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-rose-soft/40 transition-colors text-foreground/70 hover:text-foreground"
                aria-label="Panier"
              >
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-secondary text-[10px] font-semibold text-secondary-foreground inline-flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <div className="relative">
                {user ? (
                  <div className="flex items-center" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen((v) => !v)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-rose-soft/40 transition-colors text-foreground/70 hover:text-foreground overflow-hidden border border-rose-soft"
                    >
                      {user.user_metadata?.avatar_url ? (
                        <img src={user.user_metadata.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-rose-soft text-rose font-bold text-xs">
                          {user.email?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </button>
                    {userMenuOpen && (
                      <div className="absolute right-0 top-11 z-50 w-48 glass-strong rounded-2xl shadow-elevated py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-2 border-b border-foreground/5 mb-1">
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                          {isAdmin && (
                            <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mt-1">Administrateur</p>
                          )}
                        </div>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-rose-soft/40 transition-colors"
                          >
                            <Sparkles className="h-4 w-4 text-secondary" /> Dashboard Admin
                          </Link>
                        )}
                        <button
                          onClick={() => { signOut(); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose hover:bg-rose-soft/40 transition-colors"
                        >
                          <LogOut className="h-4 w-4" /> Se déconnecter
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-rose-soft/40 transition-colors text-foreground/70 hover:text-foreground"
                    aria-label="Connexion"
                  >
                    <UserIcon className="h-4 w-4" />
                  </Link>
                )}
              </div>
              
              <button
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-rose-soft/40 text-foreground"
                aria-label="Menu"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mini Navbar for Categories */}
          <div className="hidden lg:flex justify-center transition-all duration-500 mt-2 relative z-40">
            <nav className="glass-strong rounded-full px-6 py-2 flex items-center gap-6 shadow-soft">
              {categories.map((c: any) => (
                <Link
                  key={c.slug}
                  to="/categories/$slug"
                  params={{ slug: c.slug }}
                  className="flex items-center gap-1.5 text-[13px] font-medium text-foreground/80 hover:text-rose transition-colors"
                  activeProps={{ className: "text-rose" }}
                >
                  <span>{c.emoji}</span>
                  <span>{c.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {open && (
            <div className="lg:hidden mt-2 glass-strong rounded-3xl p-3 shadow-elevated animate-in fade-in slide-in-from-top-2 duration-300">
              <nav className="flex flex-col">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-2xl text-sm text-foreground/85 hover:bg-rose-soft/40"
                    activeProps={{ className: "bg-rose-soft/60 text-foreground" }}
                    activeOptions={{ exact: n.to === "/" }}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="container mx-auto px-4 pt-24"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-strong rounded-3xl shadow-elevated overflow-hidden max-w-2xl mx-auto animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-foreground/5">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher un produit, une marque, une catégorie…"
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-full glass"
                >
                  ESC
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {query && results.length === 0 && (
                  <div className="p-8 text-center text-sm text-muted-foreground">
                    Aucun résultat pour « {query} »
                  </div>
                )}
                {!query && (
                  <div className="p-6 text-sm text-muted-foreground">
                    <p className="text-xs uppercase tracking-[0.2em] mb-3">Suggestions</p>
                    <div className="flex flex-wrap gap-2">
                      {["Sérum", "Solaire", "Argan", "Bébé", "Vitamines"].map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="px-3 py-1.5 rounded-full glass text-xs text-foreground hover:bg-rose-soft/50"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {results.map((p: any) => (
                  <Link
                    key={p.id}
                    to="/produit/$id"
                    params={{ id: p.id }}
                    onClick={() => { setSearchOpen(false); setQuery(""); }}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-rose-soft/30 transition-colors"
                  >
                    <div
                      className="h-12 w-12 rounded-xl overflow-hidden shrink-0"
                      style={{ background: p.gradient }}
                    >
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {typeof p.brand === 'string' ? p.brand : p.brand?.name}
                      </p>
                      <p className="text-sm text-foreground truncate">{p.name}</p>
                    </div>
                    <div className="text-sm font-semibold text-foreground shrink-0">{p.price} DH</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
