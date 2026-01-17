import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileVideo, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

type UploadState = "idle" | "dragging" | "uploading" | "success" | "error";

interface UploadProgress {
  loaded: number;
  total: number;
}

const VideoUpload = () => {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState<UploadProgress>({ loaded: 0, total: 0 });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setUploadState("dragging");
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setUploadState("idle");
  }, []);

  const validateFile = (file: File): boolean => {
    const validTypes = ["video/mp4", "video/quicktime", "video/webm", "video/x-msvideo", "video/mpeg"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid video file (MP4, MOV, WebM, AVI, or MPEG)");
      return false;
    }
    if (file.size > 500 * 1024 * 1024) {
      setError("File size must be less than 500MB");
      return false;
    }
    return true;
  };

  const uploadFile = async (file: File) => {
    setUploadState("uploading");
    setError(null);
    setSelectedFile(file);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const storagePath = `uploads/${fileName}`;

      // Upload to storage with progress tracking
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("videos")
        .upload(storagePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Simulate progress (Supabase doesn't expose real-time upload progress)
      const simulateProgress = () => {
        let loaded = 0;
        const interval = setInterval(() => {
          loaded += file.size * 0.1;
          if (loaded >= file.size) {
            loaded = file.size;
            clearInterval(interval);
          }
          setProgress({ loaded, total: file.size });
        }, 200);
        return interval;
      };
      const progressInterval = simulateProgress();

      // Create video record in database
      const { data: videoData, error: videoError } = await supabase
        .from("videos")
        .insert({
          filename: fileName,
          original_name: file.name,
          file_size: file.size,
          status: "processing",
          storage_path: storagePath,
        })
        .select()
        .single();

      clearInterval(progressInterval);
      setProgress({ loaded: file.size, total: file.size });

      if (videoError) throw videoError;

      setUploadState("success");

      // Navigate to processing page after brief delay
      setTimeout(() => {
        navigate(`/processing/${videoData.id}`);
      }, 1500);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
      setUploadState("error");
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      uploadFile(file);
    } else {
      setUploadState("idle");
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      uploadFile(file);
    }
  };

  const resetUpload = () => {
    setUploadState("idle");
    setSelectedFile(null);
    setProgress({ loaded: 0, total: 0 });
    setError(null);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const progressPercent = progress.total > 0 ? (progress.loaded / progress.total) * 100 : 0;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {uploadState === "idle" || uploadState === "dragging" ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <label
              htmlFor="video-upload"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                relative flex flex-col items-center justify-center
                w-full h-64 md:h-80 rounded-2xl border-2 border-dashed
                cursor-pointer transition-all duration-300
                ${
                  uploadState === "dragging"
                    ? "border-accent bg-accent/5 scale-[1.02]"
                    : "border-border bg-card hover:border-accent/50 hover:bg-card/80"
                }
              `}
            >
              <div className="flex flex-col items-center gap-4 p-6 text-center">
                <div
                  className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center
                    transition-all duration-300
                    ${uploadState === "dragging" ? "bg-accent text-accent-foreground scale-110" : "bg-secondary text-muted-foreground"}
                  `}
                >
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-lg font-medium mb-1">
                    {uploadState === "dragging" ? "Drop your video here" : "Drag & drop your video"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse • MP4, MOV, WebM up to 500MB
                  </p>
                </div>
                <Button variant="soft" size="sm" className="mt-2">
                  Select file
                </Button>
              </div>
              <input
                id="video-upload"
                type="file"
                accept="video/mp4,video/quicktime,video/webm,video/x-msvideo,video/mpeg"
                onChange={handleFileSelect}
                className="sr-only"
              />
            </label>
          </motion.div>
        ) : (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-start gap-4">
              {/* File icon */}
              <div
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                  ${uploadState === "error" ? "bg-destructive/10 text-destructive" : ""}
                  ${uploadState === "success" ? "bg-success/10 text-success" : ""}
                  ${uploadState === "uploading" ? "bg-accent/10 text-accent" : ""}
                `}
              >
                {uploadState === "error" && <AlertCircle className="w-6 h-6" />}
                {uploadState === "success" && <CheckCircle2 className="w-6 h-6" />}
                {uploadState === "uploading" && <FileVideo className="w-6 h-6" />}
              </div>

              {/* File info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium truncate">{selectedFile?.name}</p>
                  {uploadState !== "success" && (
                    <button
                      onClick={resetUpload}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {selectedFile && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {formatBytes(selectedFile.size)}
                  </p>
                )}

                {/* Progress bar */}
                {uploadState === "uploading" && (
                  <div className="space-y-2">
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Uploading... {Math.round(progressPercent)}%
                    </p>
                  </div>
                )}

                {/* Success message */}
                {uploadState === "success" && (
                  <p className="text-sm text-success">
                    Upload complete! Redirecting to processing...
                  </p>
                )}

                {/* Error message */}
                {uploadState === "error" && (
                  <div className="space-y-3">
                    <p className="text-sm text-destructive">{error}</p>
                    <Button variant="soft" size="sm" onClick={resetUpload}>
                      Try again
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoUpload;
