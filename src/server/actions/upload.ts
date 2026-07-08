"use server";

import { supabase } from "@/server/db/client";

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const bucket = formData.get("bucket") as string;

    if (!file) {
      return { error: "No file provided" };
    }

    if (!bucket) {
      return { error: "No bucket specified" };
    }

    if (!supabase) {
      return { error: "Supabase client is not configured." };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const fileExtension = file.name.split(".").pop() || "png";
    const cleanFileName = file.name
      .replace(/\.[^/.]+$/, "") // Remove extension
      .replace(/[^a-zA-Z0-9]/g, "-") // Keep only safe chars
      .toLowerCase();
    const filename = `${Date.now()}-${cleanFileName}.${fileExtension}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error("Storage upload error:", error);
      return { error: error.message };
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filename);

    return { url: urlData.publicUrl };
  } catch (err: any) {
    console.error("Image upload failed:", err);
    return { error: err.message || "Failed to upload image." };
  }
}
