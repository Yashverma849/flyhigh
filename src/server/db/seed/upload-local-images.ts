import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Manually parse .env to avoid dependency issues in script running
const envPath = path.resolve(process.cwd(), ".env");
if (!fs.existsSync(envPath)) {
  console.error(".env file not found at", envPath);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf-8");
const envVars: Record<string, string> = {};
envContent.split(/\r?\n/).forEach((line) => {
  const cleanLine = line.trim();
  if (!cleanLine || cleanLine.startsWith("#")) return;
  const parts = cleanLine.split("=");
  if (parts.length >= 2) {
    const key = parts[0]?.trim();
    const value = parts.slice(1).join("=").trim();
    if (key) {
      // Remove optional wrapping quotes
      envVars[key] = value.replace(/^['"]|['"]$/g, "");
    }
  }
});

const supabaseUrl = envVars["supabase_url"] || envVars["SUPABASE_URL"];
const supabaseServiceKey = envVars["supabase_service_key"] || envVars["SUPABASE_SERVICE_KEY"];

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Supabase credentials missing in .env. Needed: supabase_url and supabase_service_key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false }
});

async function uploadFile(bucket: string, localFilePath: string) {
  const filename = path.basename(localFilePath);
  const fileBuffer = fs.readFileSync(localFilePath);

  console.log(`Uploading ${filename} to bucket [${bucket}]...`);
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filename, fileBuffer, {
      contentType: "image/png",
      upsert: true,
    });

  if (error) {
    console.error(`Error uploading ${filename} to ${bucket}:`, error.message);
    throw error;
  }

  // Format public URL
  const publicUrl = `${supabaseUrl}/storage/v1/object/public/${encodeURIComponent(bucket)}/${filename}`;
  console.log(`Success! URL: ${publicUrl}`);
  return publicUrl;
}

async function main() {
  const results = {
    caseStudies: {} as Record<string, string>,
    insights: {} as Record<string, string>
  };

  try {
    // 1. Upload case studies images
    const csDir = path.join(process.cwd(), "public", "case-studies");
    if (fs.existsSync(csDir)) {
      const files = fs.readdirSync(csDir).filter(f => f.endsWith(".png"));
      for (const file of files) {
        const localPath = path.join(csDir, file);
        const url = await uploadFile("case study", localPath);
        results.caseStudies[file] = url;
      }
    }

    // 2. Upload insights images
    const insightsDir = path.join(process.cwd(), "public", "insights");
    if (fs.existsSync(insightsDir)) {
      const files = fs.readdirSync(insightsDir).filter(f => f.endsWith(".png"));
      for (const file of files) {
        const localPath = path.join(insightsDir, file);
        const url = await uploadFile("Insights", localPath);
        results.insights[file] = url;
      }
    }

    // Save results mapping to a JSON file so that it can be read in next step
    const outPath = path.join(process.cwd(), "public", "uploaded-images-map.json");
    fs.writeFileSync(outPath, JSON.stringify(results, null, 2), "utf-8");
    console.log("\nAll images uploaded successfully!");
    console.log("Mapping written to", outPath);
  } catch (err) {
    console.error("Upload process failed:", err);
    process.exit(1);
  }
}

main();
