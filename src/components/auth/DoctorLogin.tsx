
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DoctorLoginProps {
  onLogin: (token: string) => void;
}

const DoctorLogin = ({ onLogin }: DoctorLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const AUTHORIZED_EMAIL = "garrisonhealth147@gmail.com";
  const CORRECT_PASSWORD = "Kasule@206";

  const generateToken = (email: string) => {
    const timestamp = Date.now();
    const tokenData = { email, timestamp };
    return btoa(JSON.stringify(tokenData));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === AUTHORIZED_EMAIL && password === CORRECT_PASSWORD) {
      const token = generateToken(email);
      localStorage.setItem('doctor_auth_token', token);
      localStorage.setItem('doctor_email', email);
      
      toast({
        title: "Login Successful",
        description: `Welcome to the Doctor Dashboard, ${email}`,
      });
      onLogin(token);
    } else if (email !== AUTHORIZED_EMAIL) {
      toast({
        title: "Access Denied",
        description: "This email is not authorized to access the dashboard.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password. Please try again.",
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
            <User className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Doctor Portal Access</CardTitle>
          <p className="text-gray-600">Enter your authorized credentials to access the dashboard</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter authorized email"
                  className="pl-10"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                  placeholder="Enter dashboard password"
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

export default DoctorLogin;
