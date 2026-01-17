import { motion } from "framer-motion";
import { Play, Check, X, Sparkles, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockClips = [
  {
    id: 1,
    duration: "0:42",
    emotionalTag: "Inspiring",
    tagColor: "violet",
    confidence: 94,
    preview: "The moment you realize that failure isn't the opposite of success—it's part of it...",
  },
  {
    id: 2,
    duration: "0:28",
    emotionalTag: "High Energy",
    tagColor: "accent",
    confidence: 91,
    preview: "This is exactly why I tell every creator to start before they're ready...",
  },
  {
    id: 3,
    duration: "0:35",
    emotionalTag: "Key Insight",
    tagColor: "success",
    confidence: 88,
    preview: "The algorithm doesn't reward perfection. It rewards consistency and connection...",
  },
];

const ClipPreview = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Review clips your way
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each clip comes with context. Approve, discard, or tweak—you're always in control.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            {mockClips.map((clip, index) => (
              <motion.div
                key={clip.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group"
              >
                <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-card border border-border card-hover">
                  {/* Video thumbnail */}
                  <div className="relative w-full sm:w-32 h-44 sm:h-auto rounded-lg bg-primary/5 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                    <Play className="w-8 h-8 text-muted-foreground group-hover:text-accent transition-colors duration-200" />
                    {/* Aspect ratio indicator */}
                    <div className="absolute bottom-2 left-2 text-2xs text-muted-foreground bg-background/80 px-1.5 py-0.5 rounded">
                      9:16
                    </div>
                  </div>

                  {/* Clip details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {/* Emotional tag */}
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                          clip.tagColor === "accent"
                            ? "bg-accent/10 text-accent"
                            : clip.tagColor === "violet"
                            ? "bg-violet/10 text-violet"
                            : "bg-success/10 text-success"
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        {clip.emotionalTag}
                      </span>

                      {/* Duration */}
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {clip.duration}
                      </span>

                      {/* Confidence */}
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="w-3 h-3" />
                        {clip.confidence}% match
                      </span>
                    </div>

                    {/* Preview text */}
                    <p className="text-sm text-foreground leading-relaxed mb-4 line-clamp-2">
                      "{clip.preview}"
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button variant="success" size="sm" className="gap-1">
                        <Check className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                        <X className="w-4 h-4" />
                        Discard
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        Trim
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Helper text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            These moments carry the strongest emotional signal.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ClipPreview;
