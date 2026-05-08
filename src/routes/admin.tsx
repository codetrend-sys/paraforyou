import { 
  Plus, Search, Edit2, Trash2, Package, Tag, 
  FileText, LayoutDashboard, ChevronRight, Save, X, Upload, ImageIcon, Loader2,
  LogOut, ArrowLeft, ExternalLink, Star, Check, Megaphone,Percent,Sparkles,Gift, LayoutTemplate
} from "lucide-react";
import { Link, useNavigate, createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts, useCategories, useBrands, useAnnouncements, useHomepageSections } from "@/hooks/useData";
import { 
  createProduct, updateProduct, deleteProduct,
  createCategory, updateCategory, deleteCategory,
  uploadProductImage, updateAnnouncements, createHomepageSection, updateHomepageSection, deleteHomepageSection
} from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react"; 

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ context }: any) => {
  },
  component: AdminDashboard,
});

function AdminDashboard() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "announcements" | "homepage_sections">("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  const queryClient = useQueryClient();
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: brands = [], isLoading: brandsLoading } = useBrands();
  const { data: announcementsData } = useAnnouncements();
  const announcements = announcementsData?.data;
  const { data: homepageSections = [] } = useHomepageSections();

  // Auto-hide notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (authLoading) return <div className="p-20 text-center animate-pulse text-muted-foreground italic">Vérification des accès...</div>;
  
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 text-center shadow-xl border border-slate-100">
          <div className="h-20 w-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Accès Refusé</h1>
          <p className="mt-4 text-slate-500 mb-8">Vous n'avez pas les permissions nécessaires pour accéder à cet espace.</p>
          <Link to="/" className="inline-flex items-center gap-2 text-rose font-bold hover:underline">
            <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut?.();
    navigate({ to: "/" });
  };

  const handleDeleteCategory = async (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    
    // On vérifie si on supprime un produit ou une catégorie
    const isCategory = activeTab === "categories";
    const { error } = isCategory 
      ? await deleteCategory(deleteConfirmId)
      : await deleteProduct(deleteConfirmId);

    if (!error) {
      queryClient.invalidateQueries({ queryKey: [isCategory ? "categories" : "products"] });
      // Si c'est une catégorie, on rafraîchit aussi les produits car ils ont pu être supprimés en cascade
      if (isCategory) queryClient.invalidateQueries({ queryKey: ["products"] });
      
      setNotification({ 
        message: `${isCategory ? "Catégorie" : "Produit"} supprimé avec succès`, 
        type: "success" 
      });
    } else {
      setNotification({ message: "Erreur lors de la suppression", type: "error" });
    }
    setDeleteConfirmId(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Filtrage des produits
  const filteredProducts = products.filter((p: any) => {
    const productName = p.name || "";
    const productBrand = p.brand || "";
    const matchesSearch = productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         productBrand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory || p.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Groupement par catégorie
  const groupedProducts = filteredProducts.reduce((acc: any, product: any) => {
    const cat = product.category || product.categories?.name || "Sans catégorie";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  const sortedCategories = Object.keys(groupedProducts).sort();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* Admin TopBar */}
      <header className="sticky top-0 z-[60] bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-rose transition-colors text-sm font-semibold group">
            <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-rose-soft transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Retour au site
          </Link>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-rose text-white flex items-center justify-center shadow-soft">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <span className="font-bold tracking-tight">Admin 4YouPara</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900 leading-none">{user.email}</p>
            <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-wider">Administrateur</p>
          </div>
          <button 
            onClick={handleLogout}
            className="h-10 w-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center border border-slate-100"
            title="Déconnexion"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Mini */}
        <aside className="w-64 border-r border-slate-200 h-[calc(100vh-64px)] sticky top-16 bg-white hidden lg:block overflow-y-auto">
          <div className="p-6 space-y-8">
            <nav className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">Navigation</p>
              <button
                onClick={() => setActiveTab("products")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "products" ? "bg-rose text-white shadow-glow-rose" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Package className="h-5 w-5" /> Produits
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "categories" ? "bg-rose text-white shadow-glow-rose" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Tag className="h-5 w-5" /> Catégories
              </button>
              <button
                onClick={() => setActiveTab("announcements")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "announcements" ? "bg-rose text-white shadow-glow-rose" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Megaphone className="h-5 w-5" /> Annonces
              </button>
              <button
                onClick={() => setActiveTab("homepage_sections")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "homepage_sections" ? "bg-rose text-white shadow-glow-rose" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <LayoutTemplate className="h-5 w-5" /> Sections Accueil
              </button>
            </nav>

            {activeTab === "products" && (
              <div className="pt-6 border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">Filtrer</p>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      selectedCategory === "all" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    Tous les articles
                  </button>
                  {categories.map((c: any) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        selectedCategory === c.id ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {c.emoji} {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 min-w-0">
          <div className="max-w-6xl mx-auto">
            {activeTab !== "announcements" && activeTab !== "homepage_sections" && (
              <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
                <div className="relative flex-1 max-w-md group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-rose transition-colors" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher par nom ou marque..."
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-rose focus:ring-4 focus:ring-rose/5 transition-all shadow-sm"
                  />
                </div>
                <button 
                  onClick={() => { setIsAdding(true); setPreviewImage(null); }}
                  className="bg-slate-900 text-white rounded-2xl px-6 py-3 text-sm font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                  <Plus className="h-5 w-5" /> {activeTab === "products" ? "Nouveau produit" : "Nouvelle catégorie"}
                </button>
              </div>
            )}

            {activeTab === "announcements" ? (
              <div className="max-w-4xl mx-auto py-10 space-y-12">
                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 italic">📢 Barre d'Annonces</h2>
                      <p className="text-sm text-slate-400 font-medium">Configurez le bandeau défilant de la page d'accueil.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Visibilité</span>
                      <button 
                        onClick={async () => {
                          if (announcements) {
                            await updateAnnouncements(announcements.id, { is_visible: !announcements.is_visible });
                            queryClient.invalidateQueries({ queryKey: ['announcements'] });
                            setNotification({ message: "Visibilité mise à jour", type: "success" });
                          }
                        }}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${
                          announcements?.is_visible ? 'bg-green-500' : 'bg-slate-300'
                        }`}
                      >
                        <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          announcements?.is_visible ? 'translate-x-7' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  <form className="space-y-10" onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const updates = {
                      text1: formData.get('text1'),
                      subtext1: formData.get('subtext1'),
                      text2: formData.get('text2'),
                      subtext2: formData.get('subtext2'),
                      text3: formData.get('text3'),
                      subtext3: formData.get('subtext3'),
                      card1_title: formData.get('card1_title'),
                      card1_sub: formData.get('card1_sub'),
                      card2_title: formData.get('card2_title'),
                      card2_sub: formData.get('card2_sub'),
                      card3_title: formData.get('card3_title'),
                      card3_sub: formData.get('card3_sub'),
                      animation_duration: parseInt(formData.get('animation_duration') as string)
                    };
                    if (announcements) {
                      await updateAnnouncements(announcements.id, updates);
                      queryClient.invalidateQueries({ queryKey: ['announcements'] });
                      setNotification({ message: "Annonces enregistrées avec succès !", type: "success" });
                    }
                  }}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Block 1 */}
                      <div className="space-y-4 p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                        <div className="flex items-center gap-2 text-rose mb-2">
                          <Percent className="h-5 w-5" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Bloc 1</span>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Titre</label>
                          <input name="text1" defaultValue={announcements?.text1} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-rose outline-none font-bold" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Sous-titre</label>
                          <textarea name="subtext1" defaultValue={announcements?.subtext1} rows={2} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-rose outline-none resize-none" />
                        </div>
                      </div>

                      {/* Block 2 */}
                      <div className="space-y-4 p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                        <div className="flex items-center gap-2 text-rose mb-2">
                          <Sparkles className="h-5 w-5" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Bloc 2</span>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Titre</label>
                          <input name="text2" defaultValue={announcements?.text2} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-rose outline-none font-bold" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Sous-titre</label>
                          <textarea name="subtext2" defaultValue={announcements?.subtext2} rows={2} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-rose outline-none resize-none" />
                        </div>
                      </div>

                      {/* Block 3 */}
                      <div className="space-y-4 p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                        <div className="flex items-center gap-2 text-rose mb-2">
                          <Gift className="h-5 w-5" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Bloc 3</span>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Titre</label>
                          <input name="text3" defaultValue={announcements?.text3} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-rose outline-none font-bold" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Sous-titre</label>
                          <textarea name="subtext3" defaultValue={announcements?.subtext3} rows={2} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-rose outline-none resize-none" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-10 border-t border-slate-100">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4 text-rose" /> Cartes Promotionnelles (Grille)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="space-y-4 p-6 bg-rose/5 rounded-3xl border border-rose/10">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Carte 1 - Titre</label>
                            <input name="card1_title" defaultValue={announcements?.card1_title} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-rose outline-none font-bold" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Carte 1 - Sous-titre</label>
                            <input name="card1_sub" defaultValue={announcements?.card1_sub} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-rose outline-none" />
                          </div>
                        </div>

                        {/* Card 2 */}
                        <div className="space-y-4 p-6 bg-rose/5 rounded-3xl border border-rose/10">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Carte 2 - Titre</label>
                            <input name="card2_title" defaultValue={announcements?.card2_title} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-rose outline-none font-bold" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Carte 2 - Sous-titre</label>
                            <input name="card2_sub" defaultValue={announcements?.card2_sub} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-rose outline-none" />
                          </div>
                        </div>

                        {/* Card 3 */}
                        <div className="space-y-4 p-6 bg-rose/5 rounded-3xl border border-rose/10">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Carte 3 - Titre</label>
                            <input name="card3_title" defaultValue={announcements?.card3_title} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-rose outline-none font-bold" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Carte 3 - Sous-titre</label>
                            <input name="card3_sub" defaultValue={announcements?.card3_sub} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-rose outline-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Vitesse de défilement (secondes)</label>
                        <div className="flex items-center gap-4">
                          <input type="range" name="animation_duration" min="10" max="100" defaultValue={announcements?.animation_duration || 45} className="accent-rose" />
                          <span className="text-sm font-bold text-slate-600">{announcements?.animation_duration || 45}s</span>
                        </div>
                      </div>
                      <button type="submit" className="bg-rose text-white rounded-2xl px-10 py-4 text-sm font-black uppercase tracking-widest shadow-xl hover:bg-rose-400 transition-all flex items-center gap-3">
                        <Save className="h-5 w-5" /> Enregistrer les changements
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : activeTab === "homepage_sections" ? (
              <div className="max-w-4xl mx-auto py-10 space-y-12">
                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2"><LayoutTemplate className="h-6 w-6 text-rose" /> Sections d'Accueil</h2>
                      <p className="text-sm text-slate-400 font-medium mt-1">Gérez les blocs de produits affichés sur la page d'accueil.</p>
                    </div>
                    <button 
                      onClick={() => { setIsAdding(true); setEditingItem(null); setPreviewImage(null); }}
                      className="bg-slate-900 text-white rounded-2xl px-6 py-3 text-sm font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
                    >
                      <Plus className="h-5 w-5" /> Ajouter une section
                    </button>
                  </div>

                  <div className="space-y-4">
                    {homepageSections.map((section: any) => (
                      <div key={section.id} className="bg-slate-50 rounded-3xl p-6 border border-slate-200 flex items-center gap-6 group hover:border-rose transition-colors">
                        <div className="h-20 w-20 rounded-2xl overflow-hidden shrink-0 bg-white border border-slate-200 shadow-sm">
                          {section.image_url ? (
                            <img src={section.image_url} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-slate-300">
                              <ImageIcon className="h-8 w-8" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-rose">{section.eyebrow}</span>
                            {!section.is_visible && <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-2 py-0.5 rounded">Masqué</span>}
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 truncate">{section.title}</h3>
                          <div className="flex items-center gap-4 mt-2 text-xs font-bold text-slate-500">
                            <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> Catégorie: {section.categories?.name || 'Aucune'}</span>
                            <span>Ordre: {section.order_index}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={async () => {
                              await updateHomepageSection(section.id, { is_visible: !section.is_visible });
                              queryClient.invalidateQueries({ queryKey: ["homepage-sections"] });
                            }}
                            className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                              section.is_visible ? 'bg-white text-slate-600 hover:bg-slate-200' : 'bg-green-500 text-white shadow-lg'
                            }`}
                            title={section.is_visible ? "Masquer" : "Afficher"}
                          >
                            {section.is_visible ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                          </button>
                          <button 
                            onClick={() => {
                              setEditingItem(section);
                              setIsAdding(false);
                              setPreviewImage(section.image_url);
                            }}
                            className="h-10 w-10 rounded-xl bg-white text-slate-600 hover:bg-rose hover:text-white transition-colors flex items-center justify-center shadow-sm"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={async () => {
                              if (confirm("Supprimer cette section ?")) {
                                await deleteHomepageSection(section.id);
                                queryClient.invalidateQueries({ queryKey: ["homepage-sections"] });
                                setNotification({ message: "Section supprimée", type: "success" });
                              }
                            }}
                            className="h-10 w-10 rounded-xl bg-white text-slate-600 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center shadow-sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {homepageSections.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-slate-500 text-sm font-medium">Aucune section configurée.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : activeTab === "products" ? (
              <div className="space-y-12">
                {sortedCategories.map((categoryName) => (
                  <section key={categoryName}>
                    <div className="flex items-center gap-4 mb-6 px-2">
                      <h2 className="text-xl font-black text-slate-900 capitalize flex items-center gap-2">
                        <span className="text-2xl">{categories.find(c => c.name === categoryName || c.slug === categoryName)?.emoji || "📦"}</span>
                        {categoryName}
                      </h2>
                      <div className="h-px flex-1 bg-slate-200" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                        {groupedProducts[categoryName].length} articles
                      </span>
                    </div>

                    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Produit</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Marque</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Prix</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {groupedProducts[categoryName].map((p: any) => (
                              <tr key={p.id} className="hover:bg-slate-50/30 transition-colors group">
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl overflow-hidden shrink-0 bg-slate-50 border border-slate-200 shadow-sm group-hover:scale-105 transition-transform">
                                      <img src={p.image_url || p.image} alt="" className="h-full w-full object-cover" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-sm font-bold text-slate-900 truncate">{p.name}</p>
                                      {p.badge && (
                                        <span className={`inline-block mt-1 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                                          p.badge === 'Promo' ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                          {p.badge}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-500">
                                  {p.brand}
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <div className="flex flex-col items-center">
                                    <span className="text-sm font-bold text-slate-900">{p.price} DH</span>
                                    {(p.old_price || p.oldPrice) && <span className="text-[10px] text-slate-400 line-through">{(p.old_price || p.oldPrice)} DH</span>}
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                      onClick={() => { setEditingItem(p); setPreviewImage(p.image_url || p.image); }}
                                      className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
                                    >
                                      <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button 
                                      onClick={() => setDeleteConfirmId(p.id)}
                                      className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-500 hover:text-white transition-all"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Icône</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom de la catégorie</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {categories.map((c: any) => (
                      <tr key={c.id} className="hover:bg-slate-50/30 transition-colors group">
                        <td className="px-8 py-5">
                          <span className="text-3xl">{c.emoji}</span>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-sm font-bold text-slate-900">{c.name}</span>
                        </td>
                        <td className="px-8 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center justify-end gap-1">
                            <button 
                              onClick={() => setEditingItem(c)}
                              className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteCategory(c.id)}
                              className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-500 hover:text-white transition-all"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modern Compact Modal Form */}
      {(editingItem || isAdding) && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-rose text-white flex items-center justify-center shadow-glow-rose">
                  {isAdding ? <Plus className="h-6 w-6" /> : <Edit2 className="h-6 w-6" />}
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    {isAdding 
                      ? (activeTab === "products" ? "Nouveau Produit" : activeTab === "categories" ? "Nouvelle Catégorie" : "Nouvelle Section") 
                      : (activeTab === "products" ? "Édition du Produit" : activeTab === "categories" ? "Édition de la Catégorie" : "Édition de la Section")
                    }
                  </h2>
                  <p className="text-xs text-slate-400 font-medium tracking-tight">Remplissez les détails ci-dessous pour mettre à jour la boutique.</p>
                </div>
              </div>
              <button 
                onClick={() => { setEditingItem(null); setIsAdding(false); setPreviewImage(null); }}
                className="h-10 w-10 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center justify-center"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form className="flex-1 overflow-y-auto p-8" onSubmit={async (e) => {
              e.preventDefault();
              setIsUploading(true);
              try {
                const formData = new FormData(e.currentTarget);

                if (activeTab === "homepage_sections") {
                  const file = (e.currentTarget.elements.namedItem('imageFile') as HTMLInputElement).files?.[0];
                  let imageUrl = editingItem?.image_url;
                  if (file) {
                    const { publicUrl, error } = await uploadProductImage(file);
                    if (error) throw error;
                    imageUrl = publicUrl;
                  }
                  
                  const sectionData = {
                    eyebrow: formData.get('eyebrow')?.toString() || "",
                    title: formData.get('title')?.toString() || "",
                    description: formData.get('description')?.toString() || "",
                    cta_label: formData.get('cta_label')?.toString() || "Explorer",
                    cta_to: formData.get('cta_to')?.toString() || "",
                    category_id: formData.get('category_id')?.toString() || null,
                    accent: formData.get('accent')?.toString() || "rose",
                    order_index: parseInt(formData.get('order_index')?.toString() || "0"),
                    image_url: imageUrl || "",
                  };
                  
                  if (isAdding) {
                    const { error } = await createHomepageSection(sectionData);
                    if (error) throw new Error(error.message);
                  } else {
                    const { error } = await updateHomepageSection(editingItem.id, sectionData);
                    if (error) throw new Error(error.message);
                  }
                  queryClient.invalidateQueries({ queryKey: ["homepage-sections"] });
                } else if (activeTab === "categories") {
                  const catData = {
                    name: formData.get('name')?.toString() || "",
                    emoji: formData.get('emoji')?.toString() || "📦",
                    slug: formData.get('name')?.toString().toLowerCase().replace(/ /g, '-') || ""
                  };
                  
                  if (isAdding) {
                    const { error } = await createCategory(catData);
                    if (error) throw new Error(error.message);
                  } else {
                    const { error } = await updateCategory(editingItem.id, catData);
                    if (error) throw new Error(error.message);
                  }
                  queryClient.invalidateQueries({ queryKey: ["categories"] });
                } else {
                  const file = (e.currentTarget.elements.namedItem('imageFile') as HTMLInputElement).files?.[0];
                  let imageUrl = editingItem?.image_url || editingItem?.image;
                  if (file) {
                    const { publicUrl, error } = await uploadProductImage(file);
                    if (error) throw error;
                    imageUrl = publicUrl;
                  }
                  const rawPrice = formData.get('price') as string;
                  const rawOldPrice = formData.get('old_price') as string;
                  const rawRating = formData.get('rating') as string;

                  const productData = {
                    name: formData.get('name')?.toString() || "",
                    brand_id: formData.get('brand_id')?.toString() || null, 
                    category_id: formData.get('category_id')?.toString() || null,
                    price: parseFloat(rawPrice) || 0,
                    old_price: rawOldPrice ? parseFloat(rawOldPrice) : null,
                    rating: rawRating ? parseFloat(rawRating) : 5,
                    reviews: parseInt(formData.get('reviews')?.toString() || "0") || 0,
                    badge: formData.get('badge')?.toString() || null,
                    image_url: imageUrl || "",
                    description: formData.get('description')?.toString() || "",
                    ingredients: formData.get('ingredients')?.toString() || "",
                    usage: formData.get('usage')?.toString() || "",
                  };
                  
                  if (isAdding) {
                    const { error } = await createProduct(productData);
                    if (error) throw new Error(error.message);
                  } else {
                    const { error } = await updateProduct(editingItem.id, productData);
                    if (error) throw new Error(error.message);
                  }
                  queryClient.invalidateQueries({ queryKey: ["products"] });
                  await queryClient.refetchQueries({ queryKey: ["products"] });
                }
                
                setEditingItem(null);
                setIsAdding(false);
                setPreviewImage(null);
                setNotification({ message: "Enregistré avec succès !", type: "success" });
              } catch (err: any) {
                console.error('Erreur détaillée:', err);
                setNotification({ message: "Erreur : " + err.message, type: "error" });
              } finally {
                setIsUploading(false);
              }
            }}>
              {activeTab === "homepage_sections" ? (
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-12 lg:col-span-4 space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Image de la section</label>
                    <div className="relative group aspect-square rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-rose transition-all flex flex-col items-center justify-center overflow-hidden">
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <div className="text-center p-6">
                          <Upload className="h-8 w-8 text-slate-300 mx-auto mb-2 group-hover:text-rose transition-colors" />
                          <p className="text-[10px] font-bold text-slate-400 leading-tight">Glissez ou cliquez</p>
                        </div>
                      )}
                      <input type="file" name="imageFile" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>
                  
                  <div className="col-span-12 lg:col-span-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Surtitre (Eyebrow)</label>
                        <input name="eyebrow" defaultValue={editingItem?.eyebrow} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white outline-none" placeholder="Ex: Collection K-Beauty" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Titre principal</label>
                        <input name="title" defaultValue={editingItem?.title} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:bg-white outline-none" placeholder="Ex: Le rituel glass-skin" />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Description courte</label>
                      <textarea name="description" defaultValue={editingItem?.description} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white outline-none resize-none" placeholder="..." />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Catégorie associée</label>
                        <select name="category_id" defaultValue={editingItem?.category_id} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white outline-none appearance-none">
                          <option value="">Sélectionner...</option>
                          {categories.map((c: any) => (
                            <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Texte du bouton</label>
                        <input name="cta_label" defaultValue={editingItem?.cta_label || "Explorer"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white outline-none" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Ordre d'affichage</label>
                      <input name="order_index" type="number" defaultValue={editingItem?.order_index || 0} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white outline-none" />
                    </div>
                    
                    <div className="pt-4 border-t border-slate-100">
                      <button type="submit" disabled={isUploading} className="w-full bg-rose text-white rounded-2xl py-4 text-sm font-black uppercase tracking-widest shadow-xl hover:bg-rose-400 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                        {isUploading ? <><Loader2 className="h-5 w-5 animate-spin" /> Enregistrement...</> : <><Save className="h-5 w-5" /> Enregistrer la section</>}
                      </button>
                    </div>
                  </div>
                </div>
              ) : activeTab === "categories" ? (
                <div className="space-y-8 max-w-lg mx-auto py-10">
                  <div className="space-y-4 text-center mb-10">
                    <div className="h-24 w-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex items-center justify-center mx-auto text-5xl">
                      {editingItem?.emoji || "📦"}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aperçu de l'icône</p>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1 space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Emoji</label>
                      <input name="emoji" defaultValue={editingItem?.emoji} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center text-2xl focus:bg-white focus:border-rose outline-none" placeholder="📦" />
                    </div>
                    <div className="col-span-3 space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Nom de la catégorie</label>
                      <input name="name" defaultValue={editingItem?.name} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-rose outline-none font-bold" placeholder="Ex: Solaire, Bébé..." />
                    </div>
                  </div>

                  <div className="mt-12">
                    <button 
                      type="submit" 
                      className="w-full bg-slate-900 text-white rounded-2xl py-4 text-sm font-black uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                    >
                      {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save className="h-5 w-5" /> Enregistrer la catégorie</>}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-12 lg:col-span-4 space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Photo du produit</label>
                    <div className="relative group aspect-square rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-rose transition-all flex flex-col items-center justify-center overflow-hidden">
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <div className="text-center p-6">
                          <Upload className="h-8 w-8 text-slate-300 mx-auto mb-2 group-hover:text-rose transition-colors" />
                          <p className="text-[10px] font-bold text-slate-400 leading-tight">Glissez ou cliquez pour uploader</p>
                        </div>
                      )}
                      <input type="file" name="imageFile" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      {previewImage && (
                        <button type="button" onClick={() => setPreviewImage(null)} className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/90 shadow-md text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all scale-0 group-hover:scale-100">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-8 space-y-8">
                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-rose uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-rose" /> Fiche Descriptive
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Nom du produit</label>
                          <input name="name" defaultValue={editingItem?.name} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-rose transition-all outline-none" placeholder="Ex: Eau Thermale 300ml" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Laboratoire / Marque</label>
                          <select name="brand_id" defaultValue={editingItem?.brand_id} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-rose transition-all outline-none appearance-none">
                            <option value="">Sélectionner une marque</option>
                            {brands.map((b: any) => (
                              <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5 text-relative">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Catégorie</label>
                          <select name="category_id" defaultValue={editingItem?.category_id} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-rose transition-all outline-none appearance-none">
                            <option value="">Sélectionner une catégorie</option>
                            {categories.map((c: any) => (
                              <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-rose uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-rose" /> Prix & Performance
                      </p>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Prix (DH)</label>
                          <input name="price" type="number" step="0.01" defaultValue={editingItem?.price} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:bg-white outline-none" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Old Price</label>
                          <input name="old_price" type="number" step="0.01" defaultValue={editingItem?.old_price} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-400 focus:bg-white outline-none" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Note ⭐</label>
                          <input name="rating" type="number" step="0.1" max="5" defaultValue={editingItem?.rating || 5} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white outline-none" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Badge</label>
                          <select name="badge" defaultValue={editingItem?.badge} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white outline-none appearance-none">
                            <option value="">Aucun</option>
                            <option value="Nouveau">Nouveau</option>
                            <option value="Best-seller">Best-seller</option>
                            <option value="Promo">Promo</option>
                            <option value="Bio">Bio</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-12 space-y-6 pt-4 border-t border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <FileText className="h-3 w-3" /> Description & Ingrédients
                        </label>
                        <textarea name="description" placeholder="Description courte du produit..." defaultValue={editingItem?.description} rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-rose outline-none resize-none" />
                        <textarea name="ingredients" placeholder="Liste des ingrédients (INCI)..." defaultValue={editingItem?.ingredients} rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-rose outline-none resize-none" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Star className="h-3 w-3" /> Conseils d'utilisation
                        </label>
                        <textarea name="usage" placeholder="Comment utiliser ce produit ?" defaultValue={editingItem?.usage} rows={7.5} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-rose outline-none resize-none" />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 mt-4 flex gap-4">
                    <button 
                      type="submit" 
                      disabled={isUploading}
                      className="w-full bg-rose text-white rounded-2xl py-4 text-sm font-black uppercase tracking-widest shadow-xl hover:bg-rose-400 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isUploading ? <><Loader2 className="h-5 w-5 animate-spin" /> Enregistrement...</> : <><Save className="h-5 w-5" /> Valider et Publier</>}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
      {/* Notifications Toast */}
      {notification && (
        <div className={`fixed bottom-8 right-8 z-[200] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-10 duration-300 border border-white/10 ${
          notification.type === 'success' ? 'bg-slate-900 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
            notification.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-white/20'
          }`}>
            {notification.type === 'success' ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </div>
          <p className="text-sm font-bold">{notification.message}</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[150] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="h-20 w-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Supprimer ?</h3>
            <p className="mt-2 text-slate-500 text-sm font-medium">Cette action est irréversible. Êtes-vous certain de vouloir supprimer ce produit ?</p>
            <div className="mt-8 flex gap-3">
              <button 
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-6 py-3 rounded-xl bg-slate-100 text-slate-600 text-sm font-bold hover:bg-slate-200 transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
