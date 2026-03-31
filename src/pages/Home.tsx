import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { useGetMe } from "@/lib/hooks";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";

const MOCK_ARTICLES = [
  { id: 1, title: "The Industrial Marvels of Our Age: Steam Power Revolutions", excerpt: "As the great engines of progress continue to churn, observers note an unprecedented surge in automated manufactories across the continent. The transition from manual labor to steam-driven machineries has sparked both awe and apprehension among the working populace.", date: "October 14th, 1893", author: "Archibald Sterling", imageUrl: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=800&q=80" },
  { id: 2, title: "Expedition Returns from the Uncharted Amazon", excerpt: "Dr. Bartholomew Finch and his intrepid crew have finally arrived at port, bringing with them tales of flora and fauna previously unrecorded by civilized science. Their sketches of enormous carnivorous flora have captivated the Royal Society.", date: "October 12th, 1893", author: "Eleanor Vance" },
  { id: 3, title: "Mystery on the Orient Express: A Missing Heirloom", excerpt: "Authorities remain baffled by the sudden disappearance of the Duchess of Cornwall's prized sapphire necklace during her transit to Constantinople. Investigators suspect a master thief known only as 'The Phantom' may be involved.", date: "October 10th, 1893", author: "Inspector J. Higgins", imageUrl: "https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?w=800&q=80" },
  { id: 4, title: "New Astronomical Discoveries: Canals on Mars?", excerpt: "Recent observations through the grand telescope at Greenwich Observatory reveal what appear to be distinct, linear formations across the Martian surface. Scholars are vigorously debating the possibility of an advanced extraterrestrial civilization.", date: "October 8th, 1893", author: "Prof. H. G. Wells" },
  { id: 5, title: "The Queen's Jubilee Preparations Underway", excerpt: "The capital is awash with bunting and celebratory spirits as preparations for the grand Jubilee enter their final stages. Artisans and bakers alike report record demands for their finest wares.", date: "October 7th, 1893", author: "Staff Reporter" },
];

export default function Home() {
  const { data: user, isLoading, error } = useGetMe({ query: { retry: 0 } });
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (error) setLocation("/login");
  }, [error, setLocation]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center font-serif text-2xl md:text-3xl text-foreground animate-pulse italic tracking-widest">
          Consulting the archives...
        </div>
      </div>
    );
  }

  return (
    <Layout user={user}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-16 text-center border-b border-foreground/20 pb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-foreground italic">Welcome back to the presses, {user.userName}.</h2>
        <p className="text-muted-foreground mt-4 font-body text-lg max-w-2xl mx-auto">We present the latest global dispatches, carefully curated for your evening perusal.</p>
      </motion.div>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
        {MOCK_ARTICLES.map((article, i) => (
          <motion.article key={article.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: i * 0.1 }} className="break-inside-avoid border-b-[3px] border-double border-border pb-10 mb-10 last:border-0">
            {article.imageUrl && (
              <div className="mb-6 grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden border-4 border-double border-border p-1 bg-card">
                <img src={article.imageUrl} alt={article.title} className="w-full h-auto object-cover aspect-[4/3] hover:scale-105 transition-transform duration-1000" />
              </div>
            )}
            <h3 className="font-serif text-2xl md:text-3xl font-black mb-3 leading-tight text-foreground tracking-tight">{article.title}</h3>
            <div className="flex flex-wrap items-center gap-2 mb-5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary font-body">
              <span>{article.date}</span><span className="text-foreground">&bull;</span><span>By {article.author}</span>
            </div>
            <p className="font-body text-base md:text-lg leading-relaxed text-foreground/90 text-justify">
              <span className="float-left text-6xl md:text-7xl font-serif font-black leading-[0.8] mr-3 mt-1 text-foreground">{article.excerpt.charAt(0)}</span>
              {article.excerpt.substring(1)}
            </p>
            <button className="mt-6 font-body font-bold uppercase tracking-widest text-xs border-b border-primary text-primary hover:text-primary/80 transition-colors pb-1">Read Full Dispatch &rarr;</button>
          </motion.article>
        ))}
      </div>
    </Layout>
  );
}