import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Background card */}
          <div className="relative rounded-3xl bg-primary p-8 md:p-12 lg:p-16 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet/20 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-primary-foreground/80">
                  Start free today
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-primary-foreground mb-4">
                Unlock a week of content
                <br />
                in minutes
              </h2>

              <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto mb-8">
                Stop grinding through hours of footage. Let AI find the moments that matter,
                so you can focus on what you do best—creating.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="hero"
                  size="xl"
                  className="w-full sm:w-auto shadow-lg"
                >
                  Get started for free
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <p className="text-sm text-primary-foreground/50">
                  No credit card required
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
