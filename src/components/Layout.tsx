import React from "react";
import { Link, useLocation } from "wouter";
import { format } from "date-fns";
import { useLogout, getGetMeQueryKey, type UserProfile } from "@/lib/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

export function Layout({ children, user }: { children: React.ReactNode; user?: UserProfile }) {
  const logout = useLogout();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
        setLocation("/login");
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
      <header className="relative mb-12">
        {user && (
          <div className="absolute top-0 right-0 hidden md:flex items-center gap-4 text-sm font-body font-bold text-muted-foreground uppercase tracking-widest">
            <span className="text-foreground">Reader: {user.userName}</span>
            <button onClick={handleLogout} className="hover:text-primary transition-colors flex items-center gap-2 border-b border-transparent hover:border-primary pb-0.5">
              <LogOut size={14} /> Logout
            </button>
          </div>
        )}
        <div className="text-center border-b-[6px] border-double border-foreground pb-6 pt-10 md:pt-4">
          <Link href="/" className="inline-block group">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black tracking-widest uppercase text-foreground drop-shadow-sm group-hover:scale-[1.01] transition-transform duration-500 leading-none">
              The Chronicle
            </h1>
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t-2 border-b-2 border-foreground py-2 font-body text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-foreground">
            <span>{format(new Date(), "EEEE, MMMM do, yyyy")}</span>
            <span className="my-3 md:my-0 flex items-center gap-4 text-primary">
              <span className="hidden md:inline text-lg leading-none">&diams;</span>
              Daily Edition
              <span className="hidden md:inline text-lg leading-none">&diams;</span>
            </span>
            <span>Price: Two Pence</span>
          </div>
        </div>
        {user && (
          <div className="md:hidden mt-6 text-center font-body text-xs uppercase tracking-widest">
            <button onClick={handleLogout} className="text-primary border-b border-primary pb-1 font-bold flex items-center justify-center gap-2 mx-auto">
              <LogOut size={12} /> Sign Out {user.userName}
            </button>
          </div>
        )}
      </header>
      <main className="min-h-[50vh]">{children}</main>
      <footer className="mt-32 border-t-4 border-double border-foreground pt-12 pb-16 text-center">
        <p className="font-serif italic text-foreground text-xl">"Veritas vos liberabit"</p>
        <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mt-6">
          &copy; {new Date().getFullYear()} The Chronicle Publishing Company.
          <br />Printed locally via standard typographic press.
        </p>
      </footer>
    </div>
  );
}