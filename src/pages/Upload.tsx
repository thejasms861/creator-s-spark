import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VideoUpload from "@/components/upload/VideoUpload";
import { Sparkles, Shield, Clock } from "lucide-react";

const Upload = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center pt-16">
        <div className="container px-6 py-24">
          <div className="max-w-2xl mx-auto">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                Upload your video
              </h1>
              <p className="text-lg text-muted-foreground">
                Drop your lecture, podcast, or workshop. We'll find the moments that resonate.
              </p>
            </motion.div>

            {/* Upload component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <VideoUpload />
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-10"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Secure upload</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>~2 min processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4" />
                <span>AI-powered</span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Upload;
