import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { VintageCard } from "@/components/VintageCard";
import { VintageInput } from "@/components/VintageInput";
import { VintageButton } from "@/components/VintageButton";
import { Feather, Eye, EyeOff } from "lucide-react"; // Added icons
import { api } from "@/lib/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Matching state
  const [showPassword, setShowPassword] = useState(false);    // Toggle state
  const [tel, setTel] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1. Username length check
    if (name.length < 8) {
      setError("Username must be at least 8 characters.");
      return;
    }

    // 2. Password complexity check (@, #, !, _)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#!_])[A-Za-z\d@#!_]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password requires 8+ chars, 1 uppercase, 1 number, and 1 special (@#!_).");
      return;
    }

    // 3. Password match check
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
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
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <VintageInput placeholder="Chosen Username" value={name} onChange={e => setName(e.target.value)} required />
          <VintageInput type="email" placeholder="Electronic Mail" value={email} onChange={e => setEmail(e.target.value)} required />
          
          {/* Main Password with Toggle */}
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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

          <VintageInput type="tel" placeholder="Contact Number (Optional)" value={tel} onChange={e => setTel(e.target.value)} />

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
        </form>
      </VintageCard>
    </div>
  );
}