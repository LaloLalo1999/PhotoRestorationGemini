import Link from "next/link";
import { Sparkles, Zap, Shield, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Photo Restoration AI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/sign-in"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Restore Your Precious
            <span className="block text-blue-600">Memories with AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform old, damaged, or low-quality photos into stunning 4K resolution images
            using Gemini 3 Pro (Nano Banana Pro) - professional AI restoration
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg flex items-center justify-center gap-2"
            >
              Start Restoring Now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/dashboard"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 font-semibold text-lg border-2 border-blue-600"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Demo Image Preview */}
        <div className="mt-16 bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Upload your photo to see the magic happen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Powered by Nano Banana Pro Preview
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Enhancement</h3>
              <p className="text-gray-600">
                Gemini 3 Pro (Nano Banana Pro) delivers professional-grade restoration with 
                Google Search grounding and built-in thinking process for optimal results
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Get your restored photos in seconds, not hours. Our optimized pipeline ensures
                quick turnaround times
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                Your photos are processed securely and never stored permanently. Your privacy is
                our top priority
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Simple 3-Step Process
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Your Photo</h3>
              <p className="text-gray-600">
                Simply drag and drop or select your old or damaged photo. We support all major
                image formats
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Processing</h3>
              <p className="text-gray-600">
                Advanced AI thinks through the restoration process, then generates stunning 
                4K quality images with enhanced colors, sharpness, and damage repair
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Download Result</h3>
              <p className="text-gray-600">
                Review your beautifully restored photo and download it in high quality for
                printing or sharing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Restore Your Memories?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who have already brought their precious photos back to life
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 font-semibold text-lg"
          >
            Get Started Free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Sparkles className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-semibold">Photo Restoration AI</span>
            </div>
            <p className="text-gray-400">
              Powered by Nano Banana Pro Preview &copy; 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
