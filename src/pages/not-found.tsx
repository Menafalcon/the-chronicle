import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="w-full max-w-md mx-4 bg-card border border-border p-8 shadow">
        <div className="flex mb-4 gap-2 items-center">
          <AlertCircle className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-serif font-bold text-foreground">404 — Page Not Found</h1>
        </div>
        <p className="mt-4 text-sm font-body text-muted-foreground">
          This dispatch could not be located in the archives.
        </p>
      </div>
    </div>
  );
}