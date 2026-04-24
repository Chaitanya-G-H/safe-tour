import { useState, useEffect } from "react";
import { Phone, MessageCircle, MapPin, AlertTriangle, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function SOS() {
  const [phone, setPhone] = useState(() => localStorage.getItem("sos_phone") || "");
  const [customMsg, setCustomMsg] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loadingLoc, setLoadingLoc] = useState(false);

  const savePhone = () => {
    if (!phone.trim()) return toast.error("Enter a phone number first");
    localStorage.setItem("sos_phone", phone.trim());
    toast.success("SOS number saved!");
  };

  const getLocation = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not supported");
    setLoadingLoc(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoadingLoc(false);
        toast.success("Location captured!");
      },
      () => {
        setLoadingLoc(false);
        toast.error("Could not get location. Please enable GPS.");
      }
    );
  };

  const buildMessage = () => {
    let msg = "🚨 EMERGENCY SOS — TourSafe Bangalore\n\n";
    if (customMsg.trim()) msg += customMsg.trim() + "\n\n";
    else msg += "I need immediate help! Please reach out.\n\n";
    if (location) {
      msg += `📍 My Location:\nhttps://www.google.com/maps?q=${location.lat},${location.lng}\n`;
    }
    msg += `\nSent via TourSafe at ${new Date().toLocaleString()}`;
    return msg;
  };

  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  const sendWhatsApp = () => {
    if (!cleanPhone) return toast.error("Set your SOS phone number first");
    const url = `https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank");
  };

  const sendSMS = () => {
    if (!cleanPhone) return toast.error("Set your SOS phone number first");
    const url = `sms:${cleanPhone}?body=${encodeURIComponent(buildMessage())}`;
    window.location.href = url;
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="container max-w-lg py-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
          <AlertTriangle className="h-8 w-8 text-danger" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Emergency SOS</h1>
        <p className="text-muted-foreground text-sm">
          Send an instant emergency message via WhatsApp or SMS with your live location.
        </p>
      </motion.div>

      {/* Phone number */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">SOS Phone Number (with country code)</label>
        <div className="flex gap-2">
          <Input
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" size="icon" onClick={savePhone} title="Save number">
            <Save className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Custom message */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Custom Message (optional)</label>
        <Textarea
          placeholder="e.g., I'm at Majestic bus station, someone is following me..."
          value={customMsg}
          onChange={(e) => setCustomMsg(e.target.value)}
          rows={3}
        />
      </div>

      {/* Location status */}
      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm">
        <MapPin className="h-4 w-4 text-primary" />
        {loadingLoc ? (
          <span className="text-muted-foreground">Getting location...</span>
        ) : location ? (
          <span className="text-foreground">
            Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </span>
        ) : (
          <button onClick={getLocation} className="text-primary underline">
            Tap to enable location
          </button>
        )}
      </div>

      {/* Action buttons */}
      <div className="grid gap-3">
        <Button
          onClick={sendWhatsApp}
          className="h-14 text-lg font-semibold bg-success hover:bg-success/90 text-success-foreground"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Send via WhatsApp
        </Button>
        <Button
          onClick={sendSMS}
          variant="outline"
          className="h-14 text-lg font-semibold border-primary text-primary hover:bg-primary/10"
        >
          <Phone className="mr-2 h-5 w-5" />
          Send via SMS
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Messages are sent from your own WhatsApp/SIM. No external charges from TourSafe.
      </p>
    </div>
  );
}
