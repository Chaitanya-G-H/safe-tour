import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Compass, Lock } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("Valid email is required");
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      toast.error("Valid phone number is required");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate login delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create user with unique ID based on email
      const user = {
        id: `user_${Date.now()}`,
        name,
        email,
        phone,
      };

      login(user);
      toast.success(`Welcome, ${name}!`);
      navigate("/");
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(24_85%_52%/0.15),transparent_60%)]" />

      <div className="container relative z-10 max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Compass className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-secondary-foreground">
              Safe Tour
            </h1>
            <p className="text-secondary-foreground/70 text-sm">
              Your trusted companion for safe travels in Bangalore
            </p>
          </div>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4 bg-card rounded-xl border border-border p-6 shadow-card"
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
                className="h-10"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 font-semibold"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin inline-block mr-2">⟳</span>
                  Signing in...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              We'll protect your information with the utmost care
            </p>
          </motion.form>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-primary/5 rounded-xl border border-primary/20 p-4 space-y-2"
          >
            <p className="text-xs font-semibold text-primary">What you get:</p>
            <ul className="text-xs text-secondary-foreground/70 space-y-1">
              <li>✓ Access to tourist attractions with safe routes</li>
              <li>✓ Real-time safety alerts and danger zones</li>
              <li>✓ Cab fare estimates and SOS features</li>
              <li>✓ Digital locker for important documents</li>
            </ul>
          </motion.div>

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  );
}
