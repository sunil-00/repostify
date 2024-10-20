import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  email: string | null;
  username: string | null;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error checking session:', error.message);
        setLoading(false);
        return;
      }

      const session: Session | null = data.session;

      if (session) {
        const supabaseUser: SupabaseUser | null = session.user;
        setUser({ id: supabaseUser?.id ?? '', email: supabaseUser?.email ?? '', username: supabaseUser?.user_metadata?.name ?? '' });
      } else {
        navigate('/login');
      }

      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/login');
  };

  return { user, loading, signOut };
};
