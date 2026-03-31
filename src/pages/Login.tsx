import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { VintageCard } from "@/components/VintageCard";
import { VintageInput } from "@/components/VintageInput";
import { VintageButton } from "@/components/VintageButton";
import { PenTool, Eye, EyeOff } from "lucide-react"; // Added Eye icons
import { api } from "@/lib/api";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New State
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.login({ userName, userPassword: password });
      if (data.token) api.setToken(data.token);
      setLocation("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <VintageCard className="w-full max-w-md my-12" delay={0.1}>
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6 text-primary">
            <PenTool size={36} strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-3xl font-bold uppercase tracking-widest border-b border-foreground pb-4 inline-block text-foreground">
            Reader Login
          </h2>
          <p className="font-body text-muted-foreground mt-4 text-sm italic">
            Present your credentials to access the archives.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <VintageInput
            placeholder="Chosen Username"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            required
          />
          
          {/* Updated Password Field with Reveal Toggle */}
          <div className="relative">
            <VintageInput
              type={showPassword ? "text" : "password"}
              placeholder="Secret Cipher (Password)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <div className="text-primary font-body text-sm font-bold text-center bg-primary/10 p-3 rounded-sm border border-primary/20">
              {error}
            </div>
          )}

          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-primary italic transition-colors">
              Forgot your cipher?
            </Link>
          </div>

          <div className="text-center pt-2">
            <VintageButton type="submit" disabled={loading} className="w-full">
              {loading ? "Authenticating..." : "Unlock Archives"}
            </VintageButton>
          </div>

          <div className="text-center mt-8 font-body text-foreground text-sm border-t border-dashed border-foreground/30 pt-6">
            A new reader?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline tracking-wide uppercase">
              Subscribe Here
            </Link>
          </div>
        </form>
      </VintageCard>
    </div>
  );
}