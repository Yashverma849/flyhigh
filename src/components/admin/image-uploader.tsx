"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { uploadImageAction } from "@/server/actions/upload";

type Props = {
  value: string;
  onChange: (url: string) => void;
  bucket: "Insights" | "case study";
  label?: string;
  error?: string;
  name?: string;
};

export function ImageUploader({ value, onChange, bucket, label, error, name }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);

      const res = await uploadImageAction(formData);
      if ("error" in res && res.error) {
        setUploadError(res.error);
      } else if ("url" in res && res.url) {
        onChange(res.url);
      }
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="caption block" style={{ color: "var(--brass)" }}>
          {label}
        </label>
      )}

      {/* Hidden input to pass the image URL back in form action submission */}
      <input type="hidden" name={name} value={value} />

      <div
        className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border items-center w-full"
        style={{ borderColor: "var(--line)", background: "var(--surface-tint-2)" }}
      >
        {value ? (
          <div className="relative h-20 w-32 shrink-0 rounded-lg overflow-hidden border border-[var(--line)]">
            <img src={value} alt="Preview" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-black/85 transition-colors"
              title="Remove image"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div
            className="h-20 w-32 shrink-0 rounded-lg border border-dashed flex flex-col items-center justify-center text-[var(--ash)]"
            style={{ borderColor: "var(--line)", background: "var(--surface-tint-1)" }}
          >
            <ImageIcon size={20} className="mb-1" />
            <span className="text-[10px]">No image</span>
          </div>
        )}

        <div className="flex flex-col gap-1.5 w-full min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <label
              className="caption text-xs h-9 px-4 flex items-center gap-2 rounded-xl border border-dashed hover:bg-[var(--surface-tint-6)] cursor-pointer select-none shrink-0"
              style={{ borderColor: "var(--line)", color: "var(--ash)" }}
            >
              {uploading ? (
                <>
                  <Loader2 size={12} className="animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload size={12} /> Upload File
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                ref={fileInputRef}
                className="hidden"
              />
            </label>

            <span className="text-[10px]" style={{ color: "var(--ash)" }}>
              JPG, PNG or WebP. Saves to Supabase storage.
            </span>
          </div>

          <div className="relative w-full mt-1">
            <input
              type="text"
              placeholder="Or paste an image URL directly..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="input w-full text-xs py-1.5 px-3 h-8"
              style={{ fontSize: "11px" }}
            />
          </div>

          {(error || uploadError) && (
            <p className="caption text-[11px] mt-1" style={{ color: "var(--rust)" }}>
              {error || uploadError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
