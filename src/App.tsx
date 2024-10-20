import { useAuth } from '@/hooks/useAuth';
import Home from '@/pages/Home';
import Navbar from '@/components/Navbar';
import { Spinner} from '@/components/ui/spinner';

const App = () => {
  const { user, loading, signOut } = useAuth();

  if (loading) return <Spinner>Loading...</Spinner>;

  return (
   
    <div className="w-full h-screen flex flex-col p-4">
      {user ? (
        <>
          <Navbar username={user.username ?? ''} onLogout={signOut} />
          <Home user={user} />
        </>
      ) : (
        <Spinner>Redirecting to login...</Spinner>
      )}
    </div>
  );
};

export default App;
