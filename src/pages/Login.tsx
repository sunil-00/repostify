import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { supabase } from '@/lib/supabaseClient';
import { GitHubLogoIcon, EnvelopeOpenIcon } from "@radix-ui/react-icons"

const Login = () => {
    const handleLogin = async (provider: 'google' | 'github') => {
        const { error } = await supabase.auth.signInWithOAuth({ provider });
        if (error) console.error('Login error:', error.message);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-lavender-300 to-green-400">
            <Card className="w-[350px] bg-white shadow-lg rounded-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-800">Welcome to Repostify</CardTitle>
                    <CardDescription className="text-gray-600">Please login to continue</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex flex-col">
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 transition" onClick={() => handleLogin('google')}>
                        <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Google
                    </Button>
                    <Button className="w-full bg-gray-800 text-white hover:bg-gray-700 transition" onClick={() => handleLogin('github')}>
                        <GitHubLogoIcon className="mr-2 h-4 w-4" /> Login with GitHub
                    </Button>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-500">Unlock the magic of sharing and inspire the world.</p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
