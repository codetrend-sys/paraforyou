import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { SiteShell } from '@/components/site/SiteShell';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!supabase) {
      toast.error("Supabase n'est pas configuré");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Bienvenue !');
      navigate({ to: '/' });
    }
    setLoading(false);
  };

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    if (!supabase) {
      toast.error("Supabase n'est pas configuré");
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    if (error) toast.error(error.message);
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
                <LogIn className="h-8 w-8" />
              </div>
              <h1 className="text-display text-3xl font-semibold text-foreground">Bon retour</h1>
              <p className="mt-2 text-muted-foreground text-sm">Connectez-vous pour accéder à votre compte</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
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
                {loading ? 'Connexion en cours...' : 'Se connecter'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* <div className="mt-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-foreground/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest">
                  <span className="bg-background/80 px-4 text-muted-foreground backdrop-blur-sm">Ou continuer avec</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handleSocialLogin('google')}
                  className="flex items-center justify-center gap-2 glass rounded-2xl py-3 text-sm font-medium hover:bg-white dark:hover:bg-black/40 transition-all"
                >
                  <Chrome className="h-4 w-4" /> Google
                </button>
                <button 
                  onClick={() => handleSocialLogin('github')}
                  className="flex items-center justify-center gap-2 glass rounded-2xl py-3 text-sm font-medium hover:bg-white dark:hover:bg-black/40 transition-all"
                >
                  <Github className="h-4 w-4" /> GitHub
                </button>
              </div>
            </div> */}

            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground">
                Pas encore de compte ?{' '}
                <Link to="/register" className="text-secondary font-semibold hover:underline">
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </SiteShell>
  );
}
