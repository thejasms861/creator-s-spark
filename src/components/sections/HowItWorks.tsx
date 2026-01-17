import { motion } from "framer-motion";
import { Upload, Sparkles, Layers, Share2 } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload your video",
    description: "Drop your 30–90 minute lecture, podcast, or workshop. We handle the rest.",
    color: "accent",
  },
  {
    icon: Sparkles,
    title: "AI finds the magic",
    description: "Our model detects high-energy moments, emotional peaks, and key insights automatically.",
    color: "violet",
  },
  {
    icon: Layers,
    title: "Review & refine",
    description: "Preview clips, adjust if needed, or trust our picks. You're always in control.",
    color: "success",
  },
  {
    icon: Share2,
    title: "Export & publish",
    description: "Get vertical clips with captions, ready for TikTok, Reels, and Shorts in minutes.",
    color: "accent",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-secondary/30">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From raw footage to scroll-stopping clips in four simple steps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative p-6 rounded-2xl bg-card border border-border card-hover h-full">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-sm font-semibold text-muted-foreground">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                      step.color === "accent"
                        ? "bg-accent/10 text-accent"
                        : step.color === "violet"
                        ? "bg-violet/10 text-violet"
                        : "bg-success/10 text-success"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
