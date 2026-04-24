import { useState } from "react";
import { Car, IndianRupee, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const pricing = {
  auto: { base: 30, perKm: 15, minKm: 1.8, label: "Auto Rickshaw" },
  cab: { base: 100, perKm: 18, minKm: 4, label: "Cab (Sedan)" },
  cabPremium: { base: 150, perKm: 22, minKm: 4, label: "Cab (SUV/Premium)" },
};

type VehicleType = keyof typeof pricing;

export default function CabFare() {
  const [distance, setDistance] = useState("");
  const [vehicle, setVehicle] = useState<VehicleType>("auto");
  const [fare, setFare] = useState<number | null>(null);

  const calculate = () => {
    const km = parseFloat(distance);
    if (!km || km <= 0) return;
    const p = pricing[vehicle];
    const chargeableKm = Math.max(km - p.minKm, 0);
    const total = p.base + chargeableKm * p.perKm;
    setFare(Math.round(total));
  };

  return (
    <div className="container max-w-lg py-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Car className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Cab Fare Estimator</h1>
        <p className="text-muted-foreground text-sm">Estimate auto & cab fares using Bangalore-style pricing</p>
      </motion.div>

      {/* Vehicle type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Vehicle Type</label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(pricing) as VehicleType[]).map((key) => (
            <button
              key={key}
              onClick={() => { setVehicle(key); setFare(null); }}
              className={`rounded-lg border px-3 py-3 text-center text-xs font-medium transition-colors ${
                vehicle === key
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              }`}
            >
              {pricing[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* Distance */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Distance (km)</label>
        <Input
          type="number"
          placeholder="e.g., 12"
          value={distance}
          onChange={(e) => { setDistance(e.target.value); setFare(null); }}
          min={0}
        />
      </div>

      <Button onClick={calculate} className="w-full h-12 text-base font-semibold">
        <IndianRupee className="mr-2 h-4 w-4" />
        Calculate Fare
      </Button>

      {fare !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border border-border bg-card p-6 text-center shadow-card"
        >
          <p className="text-sm text-muted-foreground mb-1">Estimated Fare</p>
          <p className="font-heading text-5xl font-bold text-foreground">
            ₹{fare}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {pricing[vehicle].label} • {distance} km
          </p>
          <div className="mt-3 text-xs text-muted-foreground">
            Base: ₹{pricing[vehicle].base} (first {pricing[vehicle].minKm} km) + ₹{pricing[vehicle].perKm}/km
          </div>
        </motion.div>
      )}

      <div className="flex gap-2 items-start rounded-lg bg-warning/10 border border-warning/30 p-3 text-xs text-warning-foreground">
        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-warning" />
        <span>
          Fares are approximate estimates based on Bangalore meter rates. Actual fares may vary due to traffic, surge pricing, waiting time, and route.
          Always prefer ride-hailing apps (Ola, Uber, Namma Yatri) for transparent pricing.
        </span>
      </div>
    </div>
  );
}
