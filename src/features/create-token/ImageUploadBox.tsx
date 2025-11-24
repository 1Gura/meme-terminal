"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { X } from "lucide-react"; // крестик (любой icon pack можно)

export function ImageUploadBox() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
  const maxSize = 5 * 1024 * 1024;

  const selectFile = () => fileInputRef.current?.click();

  const validateFile = (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Use JPG/PNG/GIF/SVG");
      return false;
    }
    if (file.size > maxSize) {
      setError("Maximum file size is 5 MB");
      return false;
    }
    return true;
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!validateFile(file)) return;

    setError(null);
    setPreview(URL.createObjectURL(file));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => setDragActive(false);

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const clearImage = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-[#0f141d] w-full flex flex-col items-center justify-center p-2">
      <div
        className={`
          w-full h-[340px] border-2 border-dashed rounded-xl
          flex flex-col items-center justify-center px-4
          text-zinc-400 relative overflow-hidden transition-colors
          ${dragActive ? "border-orange-400 bg-orange-500/10" : "border-zinc-700"}
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {/* === PREVIEW MODE === */}
        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center bg-[#0f141d] rounded-xl">
            {/* IMAGE INSIDE SAFE CONTAINER */}
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-xl p-1"
            />

            {/* CLEAR BUTTON */}
            <Button
              variant="orange"
              size="icon-sm"
              onClick={clearImage}
              className="
                absolute top-3 right-3
                rounded-full
                bg-black/40 hover:bg-black/60
                backdrop-blur-sm
                text-white
              "
            >
              <X className="size-4" />
            </Button>
          </div>
        ) : (
          // === DEFAULT UPLOAD STATE ===
          <>
            <p className="text-lg mb-2">Upload an image</p>
            <p className="mb-4 text-sm">Drag & drop or select from your PC</p>

            <p className="text-xs mb-1">Allowed types: JPG, PNG, GIF, SVG</p>
            <p className="text-xs mb-6">Max size: 5 Mb</p>

            <Button variant="orange" onClick={selectFile}>
              Select the file
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </>
        )}
      </div>

      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
}
