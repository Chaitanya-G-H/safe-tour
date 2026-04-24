import { Clock, MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { TouristPlace } from "@/data/touristPlaces";

export default function PlaceCard({
  place,
  index,
}: {
  place: TouristPlace;
  index: number;
}) {
  const navigate = useNavigate();
  const fallbackImage =
    "https://via.placeholder.com/800x500?text=Image+Not+Available";

  const [imgSrc, setImgSrc] = useState(place.image);

  const handleImageClick = () => {
    navigate("/safety-map", { state: { place } });
  };

  const handleGetDirections = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}&destination_place_id=${place.name}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      {/* Image Section */}
      <div 
        className="aspect-[16/10] overflow-hidden bg-muted cursor-pointer relative"
        onClick={handleImageClick}
      >
        <img
          src={imgSrc}
          alt={place.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgSrc(fallbackImage)}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="text-white text-sm font-semibold">Click to view on map</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {place.category}
          </span>

          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {place.avgTime}
          </span>
        </div>

        <h3 className="font-heading text-lg font-semibold text-card-foreground leading-tight">
          {place.name}
        </h3>

        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {place.area}
        </p>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {place.description}
        </p>

        <Button
          onClick={handleGetDirections}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Navigation className="h-3.5 w-3.5 mr-2" />
          Get Directions
        </Button>
      </div>
    </motion.div>
  );
}