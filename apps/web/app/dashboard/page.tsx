"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Sparkles, Download, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { user } = useUser();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setRestoredImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles: 1,
  });

  const handleRestore = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/restore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: selectedImage }),
      });

      if (!response.ok) {
        throw new Error("Failed to restore image");
      }

      const data = await response.json();
      setRestoredImage(data.restoredImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!restoredImage) return;

    const link = document.createElement("a");
    link.href = restoredImage;
    link.download = "restored-photo.png";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Photo Restoration</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
            </span>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Photo Restoration
          </h2>
          <p className="text-xl text-gray-600">
            Upload your old or low-quality photos and let Gemini AI restore them to their best quality
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Original Photo</h3>
            
            {!selectedImage ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                {isDragActive ? (
                  <p className="text-lg text-blue-600">Drop your photo here...</p>
                ) : (
                  <div>
                    <p className="text-lg text-gray-600 mb-2">
                      Drag & drop your photo here
                    </p>
                    <p className="text-sm text-gray-400">
                      or click to browse (PNG, JPG, JPEG, WebP)
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <img
                  src={selectedImage}
                  alt="Original"
                  className="w-full h-auto rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setRestoredImage(null);
                    setError(null);
                  }}
                  className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Upload Different Photo
                </button>
              </div>
            )}

            {selectedImage && !restoredImage && (
              <button
                onClick={handleRestore}
                disabled={loading}
                className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Restoring...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Restore Photo
                  </>
                )}
              </button>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>

          {/* Result Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Restored Photo</h3>
            
            {!restoredImage ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Sparkles className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-lg text-gray-400">
                  Your restored photo will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <img
                  src={restoredImage}
                  alt="Restored"
                  className="w-full h-auto rounded-lg border border-gray-200"
                />
                <button
                  onClick={handleDownload}
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download Restored Photo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h4 className="font-semibold text-lg mb-2">Upload Photo</h4>
              <p className="text-gray-600">
                Choose an old or low-quality photo from your device
              </p>
            </div>
            <div>
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold text-xl">2</span>
              </div>
              <h4 className="font-semibold text-lg mb-2">AI Enhancement</h4>
              <p className="text-gray-600">
                Google Gemini AI analyzes and enhances your photo
              </p>
            </div>
            <div>
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold text-xl">3</span>
              </div>
              <h4 className="font-semibold text-lg mb-2">Download Result</h4>
              <p className="text-gray-600">
                Get your restored photo in high quality
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
