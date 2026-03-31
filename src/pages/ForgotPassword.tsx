import React, { useState } from "react";
import { Link } from "wouter";
import { VintageCard } from "@/components/VintageCard";
import { VintageInput } from "@/components/VintageInput";
import { VintageButton } from "@/components/VintageButton";
import { Mail } from "lucide-react";
import { api } from "@/lib/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await api.forgotPassword(email);
      setSuccess("A recovery cipher has been dispatched to your electronic mail.");
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
            <Mail size={36} strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-3xl font-bold uppercase tracking-widest border-b border-foreground pb-4 inline-block text-foreground">
            Recover Access
          </h2>
          <p className="font-body text-muted-foreground mt-4 text-sm italic">
            Furnish your electronic mail to receive a recovery cipher.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <VintageInput
            type="email"
            placeholder="Electronic Mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          {error && (
            <div className="text-primary font-body text-sm font-bold text-center bg-primary/10 p-3 rounded-sm border border-primary/20">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-800 font-body text-sm font-bold text-center bg-green-50 p-3 rounded-sm border border-green-200">
              {success}
            </div>
          )}

          <div className="text-center pt-2">
            <VintageButton type="submit" disabled={loading} className="w-full">
              {loading ? "Dispatching..." : "Send Recovery Cipher"}
            </VintageButton>
          </div>

          <div className="text-center mt-8 font-body text-foreground text-sm border-t border-dashed border-foreground/30 pt-6">
            Remembered your cipher?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline tracking-wide uppercase">
              Return to Login
            </Link>
          </div>
        </form>
      </VintageCard>
    </div>
  );
}
