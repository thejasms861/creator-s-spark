import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Check, X, Sparkles, Clock, TrendingUp, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Clip {
  id: string;
  duration: string;
  emotionalTag: string;
  tagColor: "accent" | "violet" | "success";
  confidence: number;
  preview: string;
  approved: boolean | null;
}

const Clips = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [videoName, setVideoName] = useState("Your video");
  const [clips, setClips] = useState<Clip[]>([
    {
      id: "1",
      duration: "0:42",
      emotionalTag: "Inspiring",
      tagColor: "violet",
      confidence: 94,
      preview: "The moment you realize that failure isn't the opposite of success—it's part of it. Every setback teaches you something you couldn't learn any other way.",
      approved: null,
    },
    {
      id: "2",
      duration: "0:28",
      emotionalTag: "High Energy",
      tagColor: "accent",
      confidence: 91,
      preview: "This is exactly why I tell every creator to start before they're ready. Perfection is the enemy of progress, and your audience doesn't need perfect—they need real.",
      approved: null,
    },
    {
      id: "3",
      duration: "0:35",
      emotionalTag: "Key Insight",
      tagColor: "success",
      confidence: 88,
      preview: "The algorithm doesn't reward perfection. It rewards consistency and connection. Show up every day, even when you don't feel like it.",
      approved: null,
    },
    {
      id: "4",
      duration: "0:51",
      emotionalTag: "Reflective",
      tagColor: "violet",
      confidence: 85,
      preview: "I spent years chasing metrics when I should have been chasing meaning. The numbers will come—but only after you find your voice.",
      approved: null,
    },
    {
      id: "5",
      duration: "0:33",
      emotionalTag: "High Energy",
      tagColor: "accent",
      confidence: 82,
      preview: "Stop waiting for the 'right moment' to share your story. The right moment is now. Someone out there needs to hear exactly what you have to say.",
      approved: null,
    },
  ]);

  useEffect(() => {
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
  }, [videoId]);

  const handleApprove = (clipId: string) => {
    setClips(clips.map(clip => 
      clip.id === clipId ? { ...clip, approved: true } : clip
    ));
  };

  const handleDiscard = (clipId: string) => {
    setClips(clips.map(clip => 
      clip.id === clipId ? { ...clip, approved: false } : clip
    ));
  };

  const approvedCount = clips.filter(c => c.approved === true).length;
  const pendingCount = clips.filter(c => c.approved === null).length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-16">
        <div className="container px-6 py-12">
          {/* Back button and title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </button>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                  We found {clips.length} moments that land
                </h1>
                <p className="text-muted-foreground">
                  From: <span className="text-foreground">{videoName}</span>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  <span className="text-success font-medium">{approvedCount}</span> approved
                  {pendingCount > 0 && (
                    <span> • <span className="font-medium">{pendingCount}</span> pending</span>
                  )}
                </div>
                {approvedCount > 0 && (
                  <Button variant="hero" size="default">
                    <Download className="w-4 h-4" />
                    Export {approvedCount} clips
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Clips grid */}
          <div className="grid gap-4">
            {clips.map((clip, index) => (
              <motion.div
                key={clip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`
                  group transition-all duration-300
                  ${clip.approved === false ? "opacity-40" : ""}
                `}
              >
                <div className={`
                  flex flex-col sm:flex-row gap-4 p-4 rounded-xl border bg-card transition-all duration-300
                  ${clip.approved === true ? "border-success/50 bg-success/5" : "border-border"}
                  ${clip.approved === null ? "card-hover" : ""}
                `}>
                  {/* Video thumbnail */}
                  <div className="relative w-full sm:w-32 h-44 sm:h-auto rounded-lg bg-primary/5 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                    <Play className="w-8 h-8 text-muted-foreground group-hover:text-accent transition-colors duration-200" />
                    <div className="absolute bottom-2 left-2 text-2xs text-muted-foreground bg-background/80 px-1.5 py-0.5 rounded">
                      9:16
                    </div>
                  </div>

                  {/* Clip details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
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
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {clip.duration}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="w-3 h-3" />
                        {clip.confidence}% match
                      </span>
                    </div>

                    <p className="text-sm text-foreground leading-relaxed mb-4">
                      "{clip.preview}"
                    </p>

                    {/* Actions */}
                    {clip.approved === null ? (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="success"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleApprove(clip.id)}
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-muted-foreground"
                          onClick={() => handleDiscard(clip.id)}
                        >
                          <X className="w-4 h-4" />
                          Discard
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          Trim
                        </Button>
                      </div>
                    ) : clip.approved ? (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-sm text-success">
                          <Check className="w-4 h-4" />
                          Approved
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground text-xs"
                          onClick={() => setClips(clips.map(c => c.id === clip.id ? { ...c, approved: null } : c))}
                        >
                          Undo
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground text-xs"
                        onClick={() => setClips(clips.map(c => c.id === clip.id ? { ...c, approved: null } : c))}
                      >
                        Restore
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Helper text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            These moments carry the strongest emotional signal from your video.
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Clips;
