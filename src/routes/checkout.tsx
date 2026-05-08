import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Truck, CreditCard, Wallet, ShieldCheck, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
import { useShop } from "@/contexts/ShopContext";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Commande — 4YouPara" },
      { name: "description", content: "Finalisez votre commande 4YouPara en quelques étapes sécurisées." },
    ],
  }),
  component: CheckoutPage,
});

type Step = 0 | 1 | 2 | 3;

const steps = [
  { label: "Livraison", icon: Truck },
  { label: "Paiement", icon: CreditCard },
  { label: "Confirmation", icon: ShieldCheck },
];

function CheckoutPage() {
  const { getCartProducts, cartTotal, clearCart } = useShop();
  const navigate = useNavigate();
  const items = getCartProducts();

  const [step, setStep] = useState<Step>(0);
  const [shipping, setShipping] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "Casablanca", postalCode: "", notes: "",
    method: "standard" as "standard" | "express",
  });
  const [payment, setPayment] = useState<"cod" | "card">("cod");
  const [orderId, setOrderId] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const shippingCost = cartTotal === 0 ? 0 : shipping.method === "express" ? 60 : cartTotal > 500 ? 0 : 35;
  const total = cartTotal + shippingCost;

  if (items.length === 0 && step < 3) {
    return (
      <SiteShell>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-display text-4xl">Votre panier est vide</h1>
          <p className="mt-2 text-muted-foreground">Ajoutez des produits pour passer commande.</p>
          <Link to="/categories" className="mt-6 inline-flex items-center gap-2 gradient-button text-white rounded-full px-6 py-3 text-sm font-medium">
            Explorer les soins <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </SiteShell>
    );
  }

  const validateShipping = () => {
    const required = ["firstName", "lastName", "email", "phone", "address", "city", "postalCode"] as const;
    let valid = true;
    const newErrors: Record<string, boolean> = {};

    for (const k of required) {
      if (!shipping[k].trim()) {
        newErrors[k] = true;
        valid = false;
      }
    }
    if (shipping.email.trim() && !/^\S+@\S+\.\S+$/.test(shipping.email)) {
      newErrors.email = true;
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      toast.error("Veuillez vérifier les champs en rouge");
      setTimeout(() => {
        const firstErrorElement = document.querySelector('[data-error-label="true"]');
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
      return false;
    }
    return true;
  };

  const placeOrder = () => {
    const id = "4YP-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setOrderId(id);
    clearCart();
    setStep(3);
    toast.success("Commande confirmée !");
  };

  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-10">
        <nav className="text-xs uppercase tracking-wider text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Accueil</Link> ·{" "}
          <Link to="/panier" className="hover:text-foreground">Panier</Link> ·{" "}
          <span className="text-foreground">Commande</span>
        </nav>

        <h1 className="mt-6 text-display text-4xl md:text-5xl font-semibold">Finaliser ma commande</h1>

        {/* Stepper */}
        <div className="mt-8 glass rounded-full p-2 flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const active = step >= i;
            const done = step > i;
            return (
              <div key={s.label} className="flex-1 flex items-center">
                <div className="flex items-center gap-2 px-3 py-2">
                  <div
                    className={`h-8 w-8 rounded-full inline-flex items-center justify-center transition-all ${
                      active ? "gradient-button text-white shadow-soft" : "glass-strong text-muted-foreground"
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <span className={`text-sm font-medium hidden sm:inline ${active ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-1 transition-colors ${step > i ? "bg-secondary" : "bg-foreground/10"}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-8">
          <div>
            <AnimatePresence mode="wait">
              {/* STEP 0 - Shipping */}
              {step === 0 && (
                <motion.div
                  key="ship"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="glass-strong rounded-3xl p-6 md:p-8 shadow-soft"
                >
                  <h2 className="text-display text-2xl">Adresse de livraison</h2>
                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <Field label="Prénom *" value={shipping.firstName} onChange={(v) => { setShipping({ ...shipping, firstName: v }); setErrors(e => ({ ...e, firstName: false })); }} error={errors.firstName} />
                    <Field label="Nom *" value={shipping.lastName} onChange={(v) => { setShipping({ ...shipping, lastName: v }); setErrors(e => ({ ...e, lastName: false })); }} error={errors.lastName} />
                    <Field label="Email *" type="email" value={shipping.email} onChange={(v) => { setShipping({ ...shipping, email: v }); setErrors(e => ({ ...e, email: false })); }} error={errors.email} />
                    <Field label="Téléphone *" value={shipping.phone} onChange={(v) => { setShipping({ ...shipping, phone: v }); setErrors(e => ({ ...e, phone: false })); }} error={errors.phone} />
                    <div className="sm:col-span-2">
                      <Field label="Adresse *" value={shipping.address} onChange={(v) => { setShipping({ ...shipping, address: v }); setErrors(e => ({ ...e, address: false })); }} error={errors.address} />
                    </div>
                    <Field label="Ville *" value={shipping.city} onChange={(v) => { setShipping({ ...shipping, city: v }); setErrors(e => ({ ...e, city: false })); }} error={errors.city} />
                    <Field label="Code postal *" value={shipping.postalCode} onChange={(v) => { setShipping({ ...shipping, postalCode: v }); setErrors(e => ({ ...e, postalCode: false })); }} error={errors.postalCode} />
                    <div className="sm:col-span-2">
                      <Field label="Notes pour la livraison (optionnel)" value={shipping.notes} onChange={(v) => setShipping({ ...shipping, notes: v })} />
                    </div>
                  </div>

                  <h3 className="mt-8 text-display text-xl">Mode de livraison</h3>
                  <div className="mt-3 grid sm:grid-cols-2 gap-3">
                    <ShipOption
                      active={shipping.method === "standard"}
                      onClick={() => setShipping({ ...shipping, method: "standard" })}
                      title="Standard"
                      desc="3-5 jours ouvrés"
                      price={cartTotal > 500 ? "Offerte" : "35 DH"}
                    />
                    <ShipOption
                      active={shipping.method === "express"}
                      onClick={() => setShipping({ ...shipping, method: "express" })}
                      title="Express"
                      desc="24-48h, suivi inclus"
                      price="60 DH"
                    />
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <Link to="/panier" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                      <ArrowLeft className="h-4 w-4" /> Retour au panier
                    </Link>
                    <button
                      onClick={() => { if (validateShipping()) setStep(1); }}
                      className="inline-flex items-center gap-2 gradient-button text-white rounded-full px-6 py-3 text-sm font-medium shadow-soft hover:shadow-glow-rose transition-all"
                    >
                      Continuer <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 1 - Payment */}
              {step === 1 && (
                <motion.div
                  key="pay"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="glass-strong rounded-3xl p-6 md:p-8 shadow-soft"
                >
                  <h2 className="text-display text-2xl">Mode de paiement</h2>

                  <div className="mt-6 space-y-3">
                    <PayOption
                      active={payment === "cod"}
                      onClick={() => setPayment("cod")}
                      icon={<Wallet className="h-5 w-5" />}
                      title="Paiement à la livraison"
                      desc="Réglez en espèces à la réception de votre commande"
                      badge="Sans frais"
                    />
                    <PayOption
                      active={payment === "card"}
                      onClick={() => setPayment("card")}
                      icon={<CreditCard className="h-5 w-5" />}
                      title="Carte bancaire"
                      desc="Visa, Mastercard — paiement 100% sécurisé"
                      badge="SSL"
                    />
                  </div>

                  {payment === "card" && (
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <Field label="Numéro de carte" value="" onChange={() => {}} placeholder="1234 5678 9012 3456" />
                      </div>
                      <Field label="Expiration" value="" onChange={() => {}} placeholder="MM/AA" />
                      <Field label="CVC" value="" onChange={() => {}} placeholder="123" />
                    </div>
                  )}

                  <div className="mt-6 glass rounded-2xl p-4 flex items-start gap-3 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    <span>Vos données sont protégées par un chiffrement SSL. 4YouPara ne stocke aucune information bancaire.</span>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={() => setStep(0)}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="h-4 w-4" /> Retour
                    </button>
                    <button
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 gradient-button text-white rounded-full px-6 py-3 text-sm font-medium shadow-soft hover:shadow-glow-rose transition-all"
                    >
                      Vérifier <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 - Review */}
              {step === 2 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="glass-strong rounded-3xl p-6 md:p-8 shadow-soft"
                >
                  <h2 className="text-display text-2xl">Récapitulatif</h2>

                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <ReviewBlock title="Livraison">
                      <p className="text-foreground">{shipping.firstName} {shipping.lastName}</p>
                      <p>{shipping.address}</p>
                      <p>{shipping.postalCode} {shipping.city}</p>
                      <p className="mt-2">{shipping.email}</p>
                      <p>{shipping.phone}</p>
                    </ReviewBlock>
                    <ReviewBlock title="Paiement">
                      <p className="text-foreground">
                        {payment === "cod" ? "Paiement à la livraison" : "Carte bancaire"}
                      </p>
                      <p>Mode : {shipping.method === "express" ? "Express 24-48h" : "Standard 3-5j"}</p>
                    </ReviewBlock>
                  </div>

                  <h3 className="mt-8 text-display text-xl">Articles ({items.length})</h3>
                  <div className="mt-3 space-y-2">
                    {items.map(({ product, quantity }) => (
                      <div key={product.id} className="glass rounded-2xl p-3 flex items-center gap-3">
                        <div className="h-14 w-14 rounded-xl overflow-hidden shrink-0" style={{ background: product.gradient }}>
                          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{product.brand}</p>
                          <p className="text-sm text-foreground line-clamp-1">{product.name}</p>
                        </div>
                        <div className="text-right text-sm">
                          <div className="text-foreground font-medium">{product.price * quantity} DH</div>
                          <div className="text-xs text-muted-foreground">× {quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="h-4 w-4" /> Retour
                    </button>
                    <button
                      onClick={placeOrder}
                      className="inline-flex items-center gap-2 gradient-button text-white rounded-full px-7 py-3 text-sm font-medium shadow-soft hover:shadow-glow-rose transition-all"
                    >
                      Confirmer la commande <Check className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 - Success */}
              {step === 3 && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="glass-strong rounded-3xl p-10 text-center shadow-soft lg:col-span-2"
                >
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}
                    className="h-20 w-20 mx-auto rounded-full gradient-button inline-flex items-center justify-center shadow-glow-rose"
                  >
                    <Check className="h-10 w-10 text-white" />
                  </motion.div>
                  <h2 className="mt-6 text-display text-3xl md:text-4xl">Merci pour votre commande !</h2>
                  <p className="mt-2 text-muted-foreground">
                    Un email de confirmation a été envoyé. Numéro de commande :
                  </p>
                  <p className="mt-2 text-display text-2xl text-secondary tracking-wider">{orderId}</p>

                  <div className="mt-6 inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs text-muted-foreground">
                    <Sparkles className="h-3 w-3 text-secondary" />
                    Livraison estimée : {shipping.method === "express" ? "24-48h" : "3-5 jours ouvrés"}
                  </div>

                  <div className="mt-8 flex items-center justify-center gap-3">
                    <Link to="/" className="glass rounded-full px-5 py-2.5 text-sm hover:shadow-soft transition-all">
                      Retour à l'accueil
                    </Link>
                    <button
                      onClick={() => navigate({ to: "/categories" })}
                      className="gradient-button text-white rounded-full px-5 py-2.5 text-sm font-medium shadow-soft hover:shadow-glow-rose transition-all"
                    >
                      Continuer mes achats
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary */}
          {step < 3 && (
            <aside className="glass-strong rounded-3xl p-6 h-fit lg:sticky lg:top-28 shadow-soft">
              <h2 className="text-display text-xl">Résumé</h2>
              <div className="mt-4 space-y-2 max-h-60 overflow-auto pr-1">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3 text-sm">
                    <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0" style={{ background: product.gradient }}>
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground line-clamp-1">{product.name}</p>
                      <p className="text-xs text-muted-foreground">× {quantity}</p>
                    </div>
                    <div className="text-foreground">{product.price * quantity} DH</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-2 text-sm border-t border-foreground/10 pt-4">
                <div className="flex justify-between text-foreground/80">
                  <span>Sous-total</span><span>{cartTotal} DH</span>
                </div>
                <div className="flex justify-between text-foreground/80">
                  <span>Livraison</span>
                  <span>{shippingCost === 0 ? "Offerte" : `${shippingCost} DH`}</span>
                </div>
                <div className="flex justify-between text-display text-xl font-semibold text-foreground pt-2 border-t border-foreground/10 mt-2">
                  <span>Total</span><span>{total} DH</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
                Paiement sécurisé · Retours 14 jours
              </div>
            </aside>
          )}
        </div>
      </div>
    </SiteShell>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder, error
}: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; error?: boolean }) {
  return (
    <label className="block" data-error-label={error ? "true" : undefined}>
      <span className={`text-xs transition-colors ${error ? "text-rose" : "text-muted-foreground"}`}>{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 w-full glass rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all ${
          error ? "!border-rose !ring-2 !ring-rose/40" : "focus:ring-2 focus:ring-secondary/40"
        }`}
      />
    </label>
  );
}

function ShipOption({
  active, onClick, title, desc, price,
}: { active: boolean; onClick: () => void; title: string; desc: string; price: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-left rounded-2xl p-4 transition-all overflow-hidden ${
        active ? "glass-strong ring-2 ring-secondary shadow-soft" : "glass hover:shadow-soft"
      }`}
    >
      {active && <div className="absolute top-0 right-0 p-1.5 bg-secondary rounded-bl-xl text-white"><Check className="h-3 w-3" /></div>}
      <div className="flex items-center justify-between pr-4">
        <span className="text-sm font-medium text-foreground">{title}</span>
        <span className="text-sm text-secondary font-medium">{price}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{desc}</p>
    </button>
  );
}

function PayOption({
  active, onClick, icon, title, desc, badge,
}: { active: boolean; onClick: () => void; icon: React.ReactNode; title: string; desc: string; badge?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-2xl p-4 flex items-center gap-4 transition-all ${
        active ? "glass-strong ring-2 ring-secondary shadow-soft" : "glass hover:shadow-soft"
      }`}
    >
      <div className={`h-10 w-10 rounded-xl inline-flex items-center justify-center ${active ? "gradient-button text-white" : "glass-strong text-foreground/70"}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{title}</span>
          {badge && <span className="text-[10px] uppercase tracking-wider text-secondary glass px-2 py-0.5 rounded-full">{badge}</span>}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${active ? "border-secondary bg-secondary" : "border-foreground/20"}`}>
        {active && <Check className="h-3 w-3 text-white" />}
      </div>
    </button>
  );
}

function ReviewBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-4 text-sm text-muted-foreground">
      <p className="text-[10px] uppercase tracking-wider text-secondary mb-2">{title}</p>
      {children}
    </div>
  );
}
