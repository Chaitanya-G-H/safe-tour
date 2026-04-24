import { useState, useRef } from "react";
import { FolderOpen, Upload, Trash2, FileText, Image, File, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface StoredDoc {
  id: string;
  userId: string;
  name: string;
  type: string;
  size: number;
  dataUrl: string;
  uploadedAt: string;
}

function getStoredDocs(): StoredDoc[] {
  try {
    return JSON.parse(localStorage.getItem("digilocker_docs") || "[]");
  } catch {
    return [];
  }
}

function saveDocs(docs: StoredDoc[]) {
  localStorage.setItem("digilocker_docs", JSON.stringify(docs));
}

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

function getIcon(type: string) {
  if (type.startsWith("image")) return Image;
  if (type.includes("pdf")) return FileText;
  return File;
}

export default function DigiLocker() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [docs, setDocs] = useState<StoredDoc[]>(getStoredDocs);
  const fileRef = useRef<HTMLInputElement>(null);

  // Filter docs for current user
  const userDocs = docs.filter((doc) => doc.userId === user?.id);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const newDoc: StoredDoc = {
          id: crypto.randomUUID(),
          userId: user?.id || "",
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl: reader.result as string,
          uploadedAt: new Date().toLocaleString(),
        };
        setDocs((prev) => {
          const updated = [newDoc, ...prev];
          saveDocs(updated);
          return updated;
        });
        toast.success(`${file.name} uploaded!`);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const deleteDoc = (id: string) => {
    setDocs((prev) => {
      const updated = prev.filter((d) => d.id !== id);
      saveDocs(updated);
      return updated;
    });
    toast.success("Document deleted");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="container max-w-2xl py-8 space-y-6">
      {/* Header with Logout */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <FolderOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground text-center">DigiLocker</h1>
          <p className="text-muted-foreground text-sm text-center">
            {user?.name}, store your important travel documents locally.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="text-xs"
        >
          <LogOut className="h-3.5 w-3.5 mr-1" />
          Logout
        </Button>
      </motion.div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*,.pdf,.doc,.docx"
        multiple
        onChange={handleUpload}
        className="hidden"
      />
      <Button onClick={() => fileRef.current?.click()} className="w-full h-12 text-base font-semibold">
        <Upload className="mr-2 h-4 w-4" />
        Upload Documents
      </Button>

      {userDocs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
          <FolderOpen className="mx-auto h-10 w-10 mb-3 opacity-40" />
          <p className="text-sm">No documents yet. Upload your passport, visa, tickets, or IDs.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{userDocs.length} document{userDocs.length !== 1 ? 's' : ''}</p>
          <AnimatePresence>
            {userDocs.map((doc) => {
              const Icon = getIcon(doc.type);
              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 shadow-card"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatSize(doc.size)} • {doc.uploadedAt}
                    </p>
                  </div>
                  <a
                    href={doc.dataUrl}
                    download={doc.name}
                    className="text-xs text-primary hover:underline shrink-0"
                  >
                    Download
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteDoc(doc.id)}
                    className="text-muted-foreground hover:text-danger shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
