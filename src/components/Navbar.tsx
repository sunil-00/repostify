import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  username: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ username, onLogout }) => {
  const navigate = useNavigate();
  
  return (
    <nav className="w-full flex items-center justify-between">
      <span className="px-3 py-1 bg-blue-600 text-white rounded-full font-semibold">
        {username}
      </span>
      <Button
        onClick={()=> navigate('/docs')}
        variant="outline"
        className="ml-4"
      >
        Docs
      </Button>
      <Button
        onClick={onLogout}
        variant="destructive"
        className="ml-4"
      >
        Logout
      </Button>
    </nav>
  );
};

export default Navbar;
