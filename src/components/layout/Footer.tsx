import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-semibold text-lg tracking-tight">PulsePoint</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors duration-200">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors duration-200">
              How it works
            </a>
            <a href="#pricing" className="hover:text-foreground transition-colors duration-200">
              Pricing
            </a>
            <a href="#" className="hover:text-foreground transition-colors duration-200">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors duration-200">
              Terms
            </a>
          </nav>

          <p className="text-sm text-muted-foreground">
            © 2024 PulsePoint AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
