
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginProps {
  onLogin: (token: string, name: string) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const AUTHORIZED_USERS = [
    { name: "Dr. Isiah", password: "Nalunda@206" },
    { name: "Immaculate Nakamya", password: "Immy@2" }
  ];

  const generateToken = (name: string) => {
    const timestamp = Date.now();
    const tokenData = { name, timestamp };
    return btoa(JSON.stringify(tokenData));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = AUTHORIZED_USERS.find(u => u.name === name && u.password === password);

    if (user) {
      const token = generateToken(name);
      localStorage.setItem('admin_auth_token', token);
      localStorage.setItem('admin_name', name);
      
      toast({
        title: "Login Successful",
        description: `Welcome to the Admin Dashboard, ${name}`,
      });
      onLogin(token, name);
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid name or password. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-garrison-teal/10 to-garrison-teal-dark/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-garrison-teal rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Admin Portal Access</CardTitle>
          <p className="text-gray-600">Enter your authorized credentials to access the dashboard</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="pl-10"
                  required
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full garrison-btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Lock className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Access Dashboard
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Authorized personnel only. All access attempts are logged.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Contact support if you need access authorization.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
