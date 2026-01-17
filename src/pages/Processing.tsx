import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Sparkles, Clock, Zap, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface ProcessingStep {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  status: "pending" | "active" | "complete";
}

const Processing = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [videoName, setVideoName] = useState("Your video");

  const steps: ProcessingStep[] = [
    {
      id: "upload",
      label: "Upload complete",
      description: "Your video is safely stored",
      icon: CheckCircle2,
      status: currentStep > 0 ? "complete" : currentStep === 0 ? "active" : "pending",
    },
    {
      id: "analyze",
      label: "Analyzing audio",
      description: "Detecting speech patterns and energy",
      icon: Zap,
      status: currentStep > 1 ? "complete" : currentStep === 1 ? "active" : "pending",
    },
    {
      id: "detect",
      label: "Finding moments",
      description: "Identifying emotional peaks",
      icon: Sparkles,
      status: currentStep > 2 ? "complete" : currentStep === 2 ? "active" : "pending",
    },
    {
      id: "generate",
      label: "Generating clips",
      description: "Creating vertical versions",
      icon: Clock,
      status: currentStep > 3 ? "complete" : currentStep === 3 ? "active" : "pending",
    },
  ];

  useEffect(() => {
    // Fetch video details
    const fetchVideo = async () => {
      if (!videoId) return;
      
      const { data } = await supabase
        .from("videos")
        .select("original_name")
        .eq("id", videoId)
        .maybeSingle();
      
      if (data) {
        setVideoName(data.original_name);
      }
    };

    fetchVideo();

    // Simulate processing steps
    const stepTimings = [0, 2000, 4500, 7000, 10000];
    const timers = stepTimings.map((delay, index) => {
      return setTimeout(() => {
        setCurrentStep(index);
      }, delay);
    });

    // Complete processing and redirect
    const completeTimer = setTimeout(async () => {
      if (videoId) {
        await supabase
          .from("videos")
          .update({ status: "completed" })
          .eq("id", videoId);
      }
      navigate(`/clips/${videoId}`);
    }, 12000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [videoId, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center pt-16">
        <div className="container px-6 py-24">
          <div className="max-w-xl mx-auto text-center">
            {/* Processing animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="relative inline-flex">
                {/* Outer ring animation */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-24 h-24 rounded-full border-2 border-dashed border-accent/30"
                />
                {/* Inner pulse */}
                <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center"
                  >
                    <Sparkles className="w-8 h-8 text-accent" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-2xl md:text-3xl font-semibold mb-3">
                Processing your video
              </h1>
              <p className="text-muted-foreground">
                You can step away—we'll find the moments that resonate.
              </p>
            </motion.div>

            {/* File name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-10"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                {videoName}
              </span>
            </motion.div>

            {/* Progress steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = step.status === "active";
                const isComplete = step.status === "complete";

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className={`
                      flex items-center gap-4 p-4 rounded-xl border transition-all duration-300
                      ${isActive ? "border-accent bg-accent/5" : "border-border bg-card/50"}
                      ${isComplete ? "opacity-60" : ""}
                    `}
                  >
                    <div
                      className={`
                        w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300
                        ${isComplete ? "bg-success/10 text-success" : ""}
                        ${isActive ? "bg-accent/10 text-accent" : ""}
                        ${step.status === "pending" ? "bg-secondary text-muted-foreground" : ""}
                      `}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`} />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`font-medium ${isComplete ? "text-muted-foreground" : ""}`}>
                        {step.label}
                      </p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    {isActive && (
                      <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Reassurance text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-sm text-muted-foreground mt-10"
            >
              This usually takes 1-2 minutes for every 10 minutes of video.
            </motion.p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Processing;
