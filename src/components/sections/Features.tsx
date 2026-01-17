import { motion } from "framer-motion";
import { Zap, Brain, Smartphone, Type, Wand2, Clock } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Emotional Peak Detection",
    description:
      "Our AI analyzes audio energy, sentiment, and cadence to surface the moments that truly resonate with your audience.",
    tag: "Core Feature",
  },
  {
    icon: Smartphone,
    title: "Smart Vertical Crop",
    description:
      "Automatically converts 16:9 to 9:16 with intelligent face tracking. The speaker stays centered, always.",
    tag: "Automated",
  },
  {
    icon: Type,
    title: "Dynamic Captions",
    description:
      "High-contrast, karaoke-style captions that boost engagement. Edit inline to match your voice perfectly.",
    tag: "Customizable",
  },
  {
    icon: Wand2,
    title: "AI-Generated Hooks",
    description:
      "Scroll-stopping headlines crafted from your content. Bold but tasteful—never clickbait.",
    tag: "AI-Powered",
  },
  {
    icon: Zap,
    title: "Batch Processing",
    description:
      "Upload multiple videos and let PulsePoint work through them. Come back to a week's worth of content.",
    tag: "Efficiency",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description:
      "Most videos are processed in under 10 minutes. Step away and trust that it's handled.",
    tag: "Fast",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Everything you need to go viral
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features that stay out of your way. The AI handles the complexity—you focus on your message.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl bg-card border border-border card-hover"
              >
                {/* Tag */}
                <div className="absolute top-4 right-4">
                  <span className="text-2xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                    {feature.tag}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
