import { useState, useMemo } from "react";
import { Search, MapPin, Compass } from "lucide-react";
import { Input } from "@/components/ui/input";
import { touristPlaces, categories } from "@/data/touristPlaces";
import PlaceCard from "@/components/PlaceCard";
import { motion } from "framer-motion";

export default function Index() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return touristPlaces.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.area.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = !activeCategory || p.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(24_85%_52%/0.15),transparent_60%)]" />
        <div className="container relative py-16 md:py-24 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary-foreground/80">
              <Compass className="h-4 w-4" />
              Your Safe Travel Companion
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-secondary-foreground leading-tight">
              Explore <span className="text-gradient-primary">Bangalore</span>
              <br />
              Safely & Confidently
            </h1>
            <p className="mx-auto max-w-xl text-secondary-foreground/70 text-lg">
              Discover the best places to visit, stay alert with our safety map, and
              travel smart with fare estimates and emergency tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="container -mt-6 relative z-10">
        <div className="rounded-xl border border-border bg-card p-4 shadow-card space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search places, areas, or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                !activeCategory
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Places Grid */}
      <section className="container py-10">
        <div className="mb-6 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Top Tourist Places
          </h2>
          <span className="ml-auto text-sm text-muted-foreground">
            {filtered.length} places
          </span>
        </div>
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            No places match your search. Try a different keyword.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((place, i) => (
              <PlaceCard key={place.id} place={place} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
