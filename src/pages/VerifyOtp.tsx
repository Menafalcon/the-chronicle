import React, { useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { VintageCard } from "@/components/VintageCard";
import { VintageInput } from "@/components/VintageInput";
import { VintageButton } from "@/components/VintageButton";
import { KeyRound } from "lucide-react";
import { api } from "@/lib/api";

export default function VerifyOtp() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const email = params.get("email") || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.verifyOtp(email, code);
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
            <KeyRound size={36} strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-3xl font-bold uppercase tracking-widest border-b border-foreground pb-4 inline-block text-foreground">
            Verify Cipher
          </h2>
          <p className="font-body text-muted-foreground mt-4 text-sm italic">
            Enter the secret code dispatched to{" "}
            <span className="font-semibold not-italic text-foreground">{email || "your electronic mail"}</span>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <VintageInput
            placeholder="One-Time Cipher Code"
            value={code}
            onChange={e => setCode(e.target.value)}
            required
            maxLength={10}
            className="text-center tracking-[0.5em] text-xl"
          />

          {error && (
            <div className="text-primary font-body text-sm font-bold text-center bg-primary/10 p-3 rounded-sm border border-primary/20">
              {error}
            </div>
          )}

          <div className="text-center pt-2">
            <VintageButton type="submit" disabled={loading} className="w-full">
              {loading ? "Verifying..." : "Confirm Code"}
            </VintageButton>
          </div>

          <div className="text-center mt-8 font-body text-foreground text-sm border-t border-dashed border-foreground/30 pt-6">
            Did not receive a code?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline tracking-wide uppercase">
              Re-inscribe
            </Link>
          </div>
        </form>
      </VintageCard>
    </div>
  );
}
