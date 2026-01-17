import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Play, Sparkles, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
      
      {/* Soft radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative z-10 px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">
              AI-powered clip extraction
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6"
          >
            Transform long videos into{" "}
            <span className="gradient-text">viral-ready clips</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload your lecture, podcast, or workshop. Our AI finds the moments that resonate—
            so you can publish with confidence, not exhaustion.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button variant="hero" size="xl" className="w-full sm:w-auto">
              <Upload className="w-5 h-5" />
              Upload your video
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button variant="outline" size="xl" className="w-full sm:w-auto">
              <Play className="w-5 h-5" />
              See it in action
            </Button>
          </motion.div>

          {/* Hero visual - Processing preview */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-border bg-card p-6 md:p-8 shadow-lg overflow-hidden">
              {/* Mock video timeline */}
              <div className="space-y-6">
                {/* Video preview bar */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-12 md:w-28 md:h-16 rounded-lg bg-secondary flex items-center justify-center">
                    <Play className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-2 bg-secondary rounded-full" />
                    <div className="h-2 bg-secondary rounded-full w-3/4" />
                  </div>
                </div>

                {/* Timeline with emotional peaks */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>0:00</span>
                    <span className="font-medium text-foreground">Emotional peaks detected</span>
                    <span>45:23</span>
                  </div>
                  <div className="relative h-12 bg-secondary/50 rounded-xl overflow-hidden">
                    {/* Timeline bars representing audio/emotion levels */}
                    <div className="absolute inset-0 flex items-end gap-[2px] px-2 py-2">
                      {Array.from({ length: 60 }).map((_, i) => {
                        const height = Math.random() * 100;
                        const isHighlight = [12, 13, 28, 29, 30, 45, 46].includes(i);
                        return (
                          <div
                            key={i}
                            className={`flex-1 rounded-full transition-all duration-200 ${
                              isHighlight
                                ? "bg-accent"
                                : "bg-muted-foreground/20"
                            }`}
                            style={{ height: `${Math.max(15, height)}%` }}
                          />
                        );
                      })}
                    </div>
                    {/* Highlight markers */}
                    <div className="absolute top-1 left-[20%] px-2 py-0.5 bg-accent text-accent-foreground text-2xs rounded-full font-medium">
                      High Energy
                    </div>
                    <div className="absolute top-1 left-[47%] px-2 py-0.5 bg-violet text-violet-foreground text-2xs rounded-full font-medium">
                      Inspiring
                    </div>
                    <div className="absolute top-1 left-[75%] px-2 py-0.5 bg-success text-success-foreground text-2xs rounded-full font-medium">
                      Key Insight
                    </div>
                  </div>
                </div>

                {/* Status message */}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span>We found 8 moments that really land.</span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-violet/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
