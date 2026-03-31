import React, { useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { VintageCard } from "@/components/VintageCard";
import { VintageInput } from "@/components/VintageInput";
import { VintageButton } from "@/components/VintageButton";
import { LockKeyhole } from "lucide-react";
import { api } from "@/lib/api";

export default function ResetPassword() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const resetToken = params.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirm) {
      setError("The ciphers do not match. Pray, try again.");
      return;
    }
    setLoading(true);
    try {
      await api.resetPassword(resetToken, newPassword);
      setSuccess("Your cipher has been renewed. Redirecting to login...");
      setTimeout(() => setLocation("/login"), 2000);
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
            <LockKeyhole size={36} strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-3xl font-bold uppercase tracking-widest border-b border-foreground pb-4 inline-block text-foreground">
            New Cipher
          </h2>
          <p className="font-body text-muted-foreground mt-4 text-sm italic">
            Compose your new secret cipher below to restore access.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <VintageInput
            type="password"
            placeholder="New Secret Cipher"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
            minLength={8}
          />
          <VintageInput
            type="password"
            placeholder="Confirm New Cipher"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            minLength={8}
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
            <VintageButton type="submit" disabled={loading || !!success} className="w-full">
              {loading ? "Renewing..." : "Set New Cipher"}
            </VintageButton>
          </div>

          <div className="text-center mt-8 font-body text-foreground text-sm border-t border-dashed border-foreground/30 pt-6">
            <Link href="/login" className="text-primary font-bold hover:underline tracking-wide uppercase">
              Return to Login
            </Link>
          </div>
        </form>
      </VintageCard>
    </div>
  );
}
