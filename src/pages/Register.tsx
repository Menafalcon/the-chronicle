import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { VintageCard } from "@/components/VintageCard";
import { VintageInput } from "@/components/VintageInput";
import { VintageButton } from "@/components/VintageButton";
import { Feather, Eye, EyeOff } from "lucide-react"; // Added Eye icons
import { api } from "@/lib/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New State
  const [showPassword, setShowPassword] = useState(false);    // New State
  const [tel, setTel] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1. Username Validation (Min 8 characters)
    if (name.length < 8) {
      setError("The Chosen Username must be at least 8 characters long.");
      return;
    }

    // 2. Password Matching
    if (password !== confirmPassword) {
      setError("The Secret Ciphers do not match.");
      return;
    }

    // 3. Password Complexity (8+ chars, 1 Capital, 1 Number, 1 Special @#!_)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#!_])[A-Za-z\d@#!_]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be 8+ characters with 1 uppercase, 1 number, and 1 special character (@, #, !, _).");
      return;
    }

    setLoading(true);
    try {
      const data = await api.register({ 
        userName: name, 
        userEmail: email, 
        userPassword: password, 
        userTel: tel 
      });
      if (data.token) api.setToken(data.token);
      setLocation(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 py-12">
      <VintageCard className="w-full max-w-lg" delay={0.1}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6 text-foreground">
            <Feather size={40} strokeWidth={1} />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold uppercase tracking-widest border-b border-foreground pb-4 inline-block text-foreground">
            Begin Your Chapter
          </h2>
          <p className="font-body text-muted-foreground mt-6 text-sm italic">
            Inscribe your details below to subscribe to the daily dispatches.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Updated Username Input */}
          <VintageInput 
            placeholder="Chosen Username (Min 8 chars)" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
          />
          
          <VintageInput 
            type="email" 
            placeholder="Electronic Mail" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />

          {/* Primary Password with Toggle */}
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <VintageInput 
            type={showPassword ? "text" : "password"} 
            placeholder="Repeat Secret Cipher" 
            value={confirmPassword} 
            onChange={e => setConfirmPassword(e.target.value)} 
            required 
          />

          <VintageInput 
            type="tel" 
            placeholder="Contact Number (Optional)" 
            value={tel} 
            onChange={e => setTel(e.target.value)} 
          />

          {error && (
            <div className="text-primary font-body text-sm font-bold text-center bg-primary/10 p-3 rounded-sm border border-primary/20">
              {error}
            </div>
          )}

          <div className="text-center pt-8">
            <VintageButton type="submit" disabled={loading} className="w-full">
              {loading ? "Inscribing..." : "Create Account"}
            </VintageButton>
          </div>

          <div className="text-center mt-8 font-body text-foreground text-sm border-t border-dashed border-foreground/30 pt-6">
            Returning reader?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline tracking-wide uppercase">
              Login here
            </Link>
          </div>
        </form>
      </VintageCard>
    </div>
  );
}