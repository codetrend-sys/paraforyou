import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { SiteShell } from '@/components/site/SiteShell';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/register')({
  component: RegisterPage,
});

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!supabase) {
      toast.error("Supabase n'est pas configuré");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Inscription réussie ! Veuillez vérifier votre email.');
      navigate({ to: '/login' });
    }
    setLoading(false);
  };

  return (
    <SiteShell>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 relative overflow-hidden">
        <div className="blob blob-rose w-[500px] h-[500px] -top-20 -right-20 opacity-30 animate-blob" />
        <div className="blob blob-sage w-[500px] h-[500px] -bottom-20 -left-20 opacity-30 animate-blob-2" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="glass-strong rounded-[2.5rem] p-8 md:p-10 shadow-elevated">
            <div className="text-center mb-10">
              <div className="h-16 w-16 rounded-2xl gradient-hero flex items-center justify-center text-white mx-auto mb-4 shadow-soft">
                <UserPlus className="h-8 w-8" />
              </div>
              <h1 className="text-display text-3xl font-semibold text-foreground">Créer un compte</h1>
              <p className="mt-2 text-muted-foreground text-sm">Rejoignez l'univers 4YouPara</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium ml-1">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jean Dupont"
                    className="w-full glass rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full glass rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium ml-1">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full glass rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-button text-white rounded-2xl py-4 text-sm font-semibold shadow-soft hover:shadow-glow-rose transition-all flex items-center justify-center gap-2 mt-4"
              >
                {loading ? 'Inscription en cours...' : "S'inscrire"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground">
                Déjà un compte ?{' '}
                <Link to="/login" className="text-secondary font-semibold hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </SiteShell>
  );
}
