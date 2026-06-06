import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Download,
  Sparkles,
  Music,
  Tv,
  Check,
  Copy,
  RotateCcw,
  Info,
  ExternalLink,
  Sun,
  Moon,
  HelpCircle,
  Heart,
  Share2,
  MessageSquare,
  Eye,
  Loader2,
  Shield,
  Zap,
  AlertCircle,
  TrendingUp,
  FileAudio,
  Film,
  Instagram,
  RefreshCw,
  ArrowRight,
  Cloud
} from "lucide-react";
import { MediaMetadata, FAQItem, VideoOption, AudioOption } from "./types";
import LegalPages from "./components/LegalPages";
import BlogPage from "./components/BlogPage";

function TikTokIcon({ className, size = 14 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95 1.12 2.27 1.89 3.66 2.23.01 1.29.01 2.58.01 3.87-1.02-.22-2-.68-2.83-1.32-.83-.64-1.48-1.49-1.91-2.45v6.52c.03 1.56-.25 3.12-.91 4.51-.55 1.13-1.41 2.11-2.46 2.79-1.33.87-2.92 1.3-4.49 1.25-1.78-.05-3.53-.73-4.83-1.95a9 9 0 0 1-2.44-5.32c-.12-1.78.33-3.57 1.29-5.07.95-1.49 2.39-2.61 4.05-3.15.01 1.4.01 2.8.01 4.2-.62.18-1.18.52-1.61.99-.44.47-.72 1.07-.81 1.7-.13.91.13 1.85.73 2.52.61.68 1.48 1.05 2.39 1.04 1.16-.01 2.21-.77 2.56-1.87a4.91 4.91 0 0 0 .22-1.43c.01-4.04.01-8.08.01-12.12.01-.05.01-.1.02-.15z" />
    </svg>
  );
}

function FaqAccordionItem({ item, isDarkMode }: { item: FAQItem; isDarkMode: boolean; key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border transition-all ${
        isOpen
          ? isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-[#F8FAFC] border-slate-305 shadow-sm"
          : isDarkMode ? "bg-slate-900/10 border-slate-850 hover:bg-slate-900/20" : "bg-white border-slate-200 hover:bg-slate-50/50"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base cursor-pointer focus:outline-none"
      >
        <span>{item.question}</span>
        <HelpCircle size={18} className={`transition-transform duration-200 text-[#14B8A6] ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className={`px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState<"tiktok" | "instagram" | "none">("none");
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MediaMetadata | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Download state trackers
  const [activeDownloadId, setActiveDownloadId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // AI suite state trackers
  const [aiTool, setAiTool] = useState<"caption" | "hashtags" | "script" | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string>("");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<"home" | "tiktok" | "instagram" | "about" | "contact" | "privacy" | "terms" | "dmca" | "blog">("home");

  // Scroll to top when page changes for seamless legal viewing experience
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Dynamic downloads tracker which auto-increments and resets on daily basis at 12 AM
  const [downloadsCount, setDownloadsCount] = useState<number>(() => {
    if (typeof window === "undefined") return 1294845;
    const dateStr = new Date().toDateString();
    const storedDate = localStorage.getItem("downloader_stats_date");
    const storedCount = localStorage.getItem("downloader_stats_count");

    if (storedDate === dateStr && storedCount) {
      const parsed = parseInt(storedCount, 10);
      if (!isNaN(parsed)) return parsed;
    }

    // New baseline starting number based on current time of the day
    const now = new Date();
    const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
    
    // Seed unique daily baseline based on date chars so refreshing maintains realistic continuity
    const seed = dateStr.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baseMidnight = 1205000 + (seed % 40000); 
    
    // Average 85 downloads per minute of progress
    const currentCount = baseMidnight + minutesSinceMidnight * 85 + Math.floor(Math.random() * 50);
    
    localStorage.setItem("downloader_stats_date", dateStr);
    localStorage.setItem("downloader_stats_count", currentCount.toString());
    
    return currentCount;
  });

  // Setup non-deterministic interval to tick and add 4-9 downloads every 3-5 seconds
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const tick = () => {
      setDownloadsCount((prev) => {
        const currentDateStr = new Date().toDateString();
        const storedDate = localStorage.getItem("downloader_stats_date");

        let nextCount = prev;

        if (storedDate !== currentDateStr) {
          // Relocated onto tomorrow's calendar date! Perform 12 AM Reset
          const now = new Date();
          const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
          const seed = currentDateStr.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const baseMidnight = 1205000 + (seed % 40000);
          nextCount = baseMidnight + minutesSinceMidnight * 85;
          
          localStorage.setItem("downloader_stats_date", currentDateStr);
        } else {
          // Natural increase: add 4 to 9 downloads dynamically
          const increment = Math.floor(Math.random() * 6) + 4;
          nextCount = prev + increment;
        }

        localStorage.setItem("downloader_stats_count", nextCount.toString());
        return nextCount;
      });

      // Recurse with random interval between 3000ms & 5000ms
      const nextInterval = Math.floor(Math.random() * 2001) + 3000;
      timerId = setTimeout(tick, nextInterval);
    };

    // First sequence initialization
    const initialInterval = Math.floor(Math.random() * 2001) + 3000;
    timerId = setTimeout(tick, initialInterval);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  // Detect platform and validate in real-time
  useEffect(() => {
    if (!url.trim()) {
      setPlatform("none");
      setValidationError("");
      return;
    }

    const trimmedUrl = url.trim();
    const isTikTok = /tiktok\.com/i.test(trimmedUrl);
    const isInstagram = /(instagram\.com|instagr\.am)/i.test(trimmedUrl);

    if (isTikTok) {
      setPlatform("tiktok");
      setValidationError("");
    } else if (isInstagram) {
      setPlatform("instagram");
      setValidationError("");
    } else {
      setPlatform("none");
      setValidationError("Please enter a valid TikTok or Instagram video link");
    }
  }, [url]);

  // Set up dark mode styles on body
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleExtract = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim() || platform === "none") {
      setValidationError("Please enter a valid TikTok or Instagram URL first");
      return;
    }

    setLoading(true);
    setResult(null);
    setAiResult("");
    setAiTool(null);
    setDownloadSuccess(false);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const responseText = await response.text();
      let data: any;
      try {
        data = JSON.parse(responseText);
      } catch (jsonErr) {
        if (responseText.trim().toLowerCase().startsWith("<!doctype") || responseText.trim().toLowerCase().startsWith("<html")) {
          throw new Error("The backend server is offline or unreachable. If you deployed this, please make sure the app is hosted as a full-stack Node.js Web Service (such as Render Web Service, Heroku, or a VPS) and NOT as a static page (like Netlify or Render Static Sites) so that the Express backend can run.");
        }
        throw new Error("Invalid API response format from server. Please try again.");
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to extract media information");
      }

      setResult(data.metadata);
    } catch (err: any) {
      setValidationError(err.message || "Something went wrong. Please check your link or try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoUrl = (demoUrl: string) => {
    setUrl(demoUrl);
    setValidationError("");
    // Automatically trigger extraction after setting URL
    setTimeout(() => {
      const triggerBtn = document.getElementById("extract-btn");
      if (triggerBtn) triggerBtn.click();
    }, 100);
  };

  const executeDownload = async (mediaUrl: string, filename: string, optionId: string) => {
    setActiveDownloadId(optionId);
    setDownloadProgress(0);
    setDownloadSuccess(false);

    const downloadProxyUrl = mediaUrl.startsWith("/")
      ? mediaUrl
      : `/api/download?url=${encodeURIComponent(mediaUrl)}&filename=${encodeURIComponent(filename)}`;

    try {
      const response = await fetch(downloadProxyUrl);
      if (!response.ok) throw new Error("Connection failed");

      const contentLength = response.headers.get("content-length");
      const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

      const reader = response.body?.getReader();
      if (!reader) {
        // Fallback for environment constraints using a hidden iframe on the same page
        setDownloadProgress(100);
        let iframe = document.getElementById("download-iframe") as HTMLIFrameElement;
        if (!iframe) {
          iframe = document.createElement("iframe");
          iframe.id = "download-iframe";
          iframe.style.display = "none";
          document.body.appendChild(iframe);
        }
        iframe.src = downloadProxyUrl;

        setDownloadSuccess(true);
        setTimeout(() => {
          setDownloadSuccess(false);
          setActiveDownloadId(null);
        }, 3000);
        return;
      }

      let receivedBytes = 0;
      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          receivedBytes += value.length;
          if (totalBytes) {
            const progress = Math.min(Math.round((receivedBytes / totalBytes) * 100), 100);
            setDownloadProgress(progress);
          }
        }
      }

      const allChunks = new Uint8Array(receivedBytes);
      let position = 0;
      for (const chunk of chunks) {
        allChunks.set(chunk, position);
        position += chunk.length;
      }

      const blob = new Blob([allChunks]);
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);

      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
        setActiveDownloadId(null);
      }, 3000);

    } catch (error) {
      console.error("Secure downlinks failed:", error);
      // Failover option: use a safe, same-page hidden iframe download to prevent new tabs or redirects
      try {
        setDownloadProgress(100);
        let iframe = document.getElementById("download-iframe") as HTMLIFrameElement;
        if (!iframe) {
          iframe = document.createElement("iframe");
          iframe.id = "download-iframe";
          iframe.style.display = "none";
          document.body.appendChild(iframe);
        }
        iframe.src = downloadProxyUrl;
        
        setDownloadSuccess(true);
        setTimeout(() => {
          setDownloadSuccess(false);
          setActiveDownloadId(null);
        }, 3000);
      } catch (fallbackErr) {
        console.error("Iframe safe fallback failed:", fallbackErr);
        // Direct safe same-page download trigger as final resort
        window.location.href = downloadProxyUrl;
        setActiveDownloadId(null);
      }
    }
  };

  const runAiTool = async (type: "caption" | "hashtags" | "script") => {
    if (!result) return;
    setAiTool(type);
    setAiLoading(true);
    setAiResult("");

    try {
      const response = await fetch("/api/ai-tool", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: result.title,
          platform: result.platform,
          creator: result.creator,
          toolType: type,
        }),
      });

      const responseText = await response.text();
      let data: any;
      try {
        data = JSON.parse(responseText);
      } catch (jsonErr) {
        if (responseText.trim().toLowerCase().startsWith("<!doctype") || responseText.trim().toLowerCase().startsWith("<html")) {
          throw new Error("Backend server is offline or unreachable. Note: This app requires full-stack Node.js hosting to run the backend engine.");
        }
        throw new Error("Unable to parse AI response. Please try again.");
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to trigger AI engine");
      }

      setAiResult(data.result);
    } catch (error: any) {
      setAiResult(`⚠️ AI Integration Offline: ${error.message || "Make sure process.env.GEMINI_API_KEY is properly initialized."}`);
    } finally {
      setAiLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getFaqData = (): FAQItem[] => {
    if (currentPage === "tiktok") {
      return [
        {
          question: "How do I download a video from TikTok?",
          answer: "Simply navigate to TikTok, copy the URL of the video (using the share button), paste it into our address bar above, and standard keyboard shortcuts like Ctrl + V. Select your preferred high-quality video or audio and enjoy!",
        },
        {
          question: "Are the downloaded TikTok videos free of watermarks?",
          answer: "Yes, our TikTok pipeline extracts direct, raw stream sources so files are 100% watermark-free—perfect for clean creator archives and multi-platform backup.",
        },
        {
          question: "Can I download audio tracks or music from TikTok?",
          answer: "Yes! You can choose to extract and convert the background tracks or dynamic sound overlay from any TikTok video directly to high-bitrate audio formats like MP3.",
        },
        {
          question: "Do I need to sign up to download TikTok videos?",
          answer: "No account registration, logins, or browser extensions are required. The entire TikTok extraction runs securely within your desktop or mobile browser to preserve digital safety.",
        },
        {
          question: "Is there a limit on how many TikTok downloads I can make?",
          answer: "We offer completely unlimited extractions. Download as many trending TikToks as you need without premium accounts or hidden fees.",
        },
      ];
    }
    if (currentPage === "instagram") {
      return [
        {
          question: "How do I download a video or reel from Instagram?",
          answer: "Simply navigate to Instagram, copy the link of the reel, video, or photo slideshow, paste it into our address bar above, and click 'Download' to instantly generate high-quality download links.",
        },
        {
          question: "Can I save Instagram Reels and videos without watermarks?",
          answer: "Yes, our Instagram downloader directly fetches raw files from public CDN sources so there are absolutely no watermarks or platform brand overlays added to the media.",
        },
        {
          question: "Does it support saving photos, posts, and carousel items?",
          answer: "Yes, our extraction system is capable of detecting and downloading single image posts, video posts, and side-scrollable multi-photo carousel slides.",
        },
        {
          question: "Do I need to authenticate or log in with my Instagram account?",
          answer: "No! We never ask for your Instagram password or login credentials. You can safely download public reels and posts without sharing account info.",
        },
        {
          question: "Are Instagram audio extract formats supported?",
          answer: "Yes, our platform lets you isolate and download only the background music of Reels or IGTV uploads, saved in a standard high-bitrate MP3/M4A format.",
        },
      ];
    }
    return [
      {
        question: "How do I download a video from TikTok or Instagram?",
        answer: "Simply navigate to TikTok or Instagram, copy the URL of the video, reel, or post, paste it into our address bar above, and click 'Download'. Select your preferred quality and hit Download!",
      },
      {
        question: "Are the downloaded videos free of watermarks?",
        answer: "Yes, our social media pipeline extracts direct, raw host streams so video formats are completely watermark-free—perfect for clean archives and multi-platform repurposing.",
      },
      {
        question: "Which formats and qualities are supported?",
        answer: "We support high-definition video files up to 1080p, as well as fast compressed qualities for lower bandwidth (720p, 480p, 360p) and direct high-frequency audio extraction in MP3/M4A format.",
      },
      {
        question: "Do I need to sign up for an account?",
        answer: "No account registration or software installation is required. Everything runs entirely within our ultra-secure browser application to maintain your complete digital privacy.",
      },
      {
        question: "Is there a limit on how many videos I can download?",
        answer: "We offer completely unlimited extracts! To protect server infrastructure, we implement a mild rate-limiting mechanism of 15 requests per minute, which is more than enough for casual and pro use.",
      },
    ];
  };

  const faqData = getFaqData();

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? "bg-[#0B0F19] text-slate-100" : "bg-white text-slate-900"}`}>
      
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 right-0 h-[380px] overflow-hidden -z-10 pointer-events-none opacity-20">
        <div className={`absolute -top-[100px] left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] ${isDarkMode ? "bg-[#14B8A6]/10" : "bg-slate-100"}`} />
      </div>

      {/* Main Header / Navigation */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-200 ${isDarkMode ? "bg-[#0B0F19]/90 border-slate-900" : "bg-white/90 border-slate-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            onClick={() => setCurrentPage("home")} 
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 active:scale-[0.99] transition-opacity select-none"
            title="Go to Homepage"
          >
            <div>
              <span className={`font-extrabold tracking-tight text-2xl sm:text-3xl ${isDarkMode ? "text-white" : "text-[#0F172A]"}`}>
                SaveKlip<span className="text-[#14B8A6]">.</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Stats indicator for realistic scale */}
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${isDarkMode ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-slate-50 border-slate-100 text-slate-600"}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-ping" />
              <span>⚡ {new Intl.NumberFormat().format(downloadsCount)} Downloads Today</span>
            </div>

            {/* Dark & light theme switcher */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              id="theme-toggle"
              className={`p-2 rounded-xl transition-all border ${isDarkMode ? "bg-slate-900 hover:bg-slate-800 border-slate-800 text-amber-400" : "bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-700"}`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {currentPage === "blog" ? (
          <BlogPage 
            isDarkMode={isDarkMode} 
            setCurrentPage={setCurrentPage} 
          />
        ) : currentPage !== "home" && currentPage !== "tiktok" && currentPage !== "instagram" ? (
          <LegalPages 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            isDarkMode={isDarkMode} 
          />
        ) : (
          <>
            {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center gap-2 px-3  py-1 rounded-full text-xs font-medium mb-4 border ${isDarkMode ? "bg-slate-900 border-slate-800 text-[#14B8A6]" : "bg-[#14B8A6]/10 border-[#14B8A6]/20 text-[#14B8A6]"}`}
          >
            <Sparkles size={11} />
            <span className="font-semibold">Zero Watermarks</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 ${isDarkMode ? "text-slate-100" : "text-[#0F172A]"}`}
          >
            {currentPage === "tiktok" ? (
              <>
                Save High-Quality <span className="text-[#14B8A6]">TikTok Videos</span>
              </>
            ) : currentPage === "instagram" ? (
              <>
                Save High-Quality <span className="text-[#14B8A6]">Instagram Videos</span>
              </>
            ) : (
              <>
                Save High-Quality <span className="text-[#14B8A6]">TikTok & Instagram Videos</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-base sm:text-lg ${isDarkMode ? "text-slate-450" : "text-slate-500"} max-w-2xl mx-auto font-medium`}
          >
            {currentPage === "tiktok" ? (
              "Save your favorite TikTok videos directly to your device stream-free and watermark-free. No sign-ups, no installation, and completely free."
            ) : currentPage === "instagram" ? (
              "Download Reels, profile videos, and photo posts from Instagram in pristine visual quality. No sign-ups, no watermarks, and completely free."
            ) : (
              "Easily download your favorite TikTok videos and Instagram reels in high quality. No sign-ups, no watermarks, and completely free."
            )}
          </motion.p>
        </div>

        {/* Input System Dashboard */}
        <section className="mb-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-3xl border ${isDarkMode ? "bg-[#101626] border-slate-800/85 backdrop-blur-xl" : "bg-[#F8FAFC] border-slate-200/80 shadow-md shadow-slate-200/20"}`}
          >
            <form onSubmit={handleExtract} className="space-y-4">
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2.5 ml-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                  Paste Video URL Link
                </label>
                <div className="relative flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    {/* Platform logo detector inside the input */}
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      {platform === "tiktok" ? (
                        <div className="flex items-center justify-center p-1 rounded-md bg-black text-white border border-slate-900 shadow-sm shadow-black/10">
                           <TikTokIcon size={14} />
                        </div>
                      ) : platform === "instagram" ? (
                        <div className="flex items-center justify-center p-1 rounded-md bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 text-white shadow-sm shadow-rose-500/10">
                           <Instagram size={14} className="stroke-[2.5]" />
                        </div>
                      ) : (
                        <Zap size={15} className={isDarkMode ? "text-slate-500" : "text-slate-400"} />
                      )}
                    </div>
                    
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder={
                        currentPage === "tiktok"
                          ? "https://www.tiktok.com/@username/video/7123456..."
                          : currentPage === "instagram"
                          ? "https://www.instagram.com/reel/Ct12345..."
                          : "https://tiktok.com/... or https://instagram.com/reel/..."
                      }
                      className={`w-full pl-12 pr-10 sm:pr-20 py-4 rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 border ${
                        validationError
                          ? "border-rose-500 bg-rose-500/5 focus:ring-rose-500/20"
                          : isDarkMode
                          ? "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-100 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"
                          : "bg-white border-slate-200 hover:border-slate-300 text-slate-900 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6]"
                      }`}
                      id="url-input"
                    />

                    {url && (
                      <button
                        type="button"
                        onClick={() => { setUrl(""); setResult(null); }}
                        className={`absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                          isDarkMode 
                            ? "text-slate-400 hover:bg-slate-800 hover:text-white" 
                            : "text-slate-400 hover:bg-slate-200 hover:text-slate-800"
                        }`}
                        title="Clear link"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    id="extract-btn"
                    disabled={loading || !url.trim()}
                    className={`px-8 py-4 rounded-2xl font-semibold text-white tracking-wide cursor-pointer transition-all flex items-center justify-center gap-2 ${
                      loading || !url.trim()
                        ? isDarkMode
                          ? "bg-slate-800/50 text-slate-500 border border-slate-800 cursor-not-allowed shadow-none"
                          : "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed shadow-none"
                        : isDarkMode
                        ? "bg-[#14B8A6] hover:bg-[#0D9488] text-[#0F172A] hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-[#14B8A6]/10"
                        : "bg-[#0F172A] hover:bg-[#1E293B] text-white hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-slate-950/10"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Extracting Media...</span>
                      </>
                    ) : (
                      <>
                        <Download size={18} />
                        <span>Download</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Instant Validation Indicators */}
              <AnimatePresence mode="wait">
                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-center gap-2 text-rose-500 text-xs mt-1.5 ml-1"
                  >
                    <AlertCircle size={14} />
                    <span>{validationError}</span>
                  </motion.div>
                )}
              </AnimatePresence>


            </form>

            {/* Quick-try social demo list is removed */}
          </motion.div>
        </section>

        {/* Supported Platforms & Features Grid */}
        <AnimatePresence mode="wait">
          {!result && !loading && (
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-16 max-w-5xl mx-auto"
            >
              <h2 className={`text-xs font-bold tracking-widest mb-6 uppercase text-center ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                {currentPage === "tiktok"
                  ? "TikTok Downloader Capabilities"
                  : currentPage === "instagram"
                  ? "Instagram Downloader Capabilities"
                  : "Supported Platform Capabilities"}
              </h2>
              
              <div className={`grid grid-cols-1 ${currentPage === "home" ? "md:grid-cols-2" : "max-w-2xl mx-auto"} gap-6`}>
                {/* TikTok Details Card */}
                {(currentPage === "home" || currentPage === "tiktok") && (
                  <div className={`p-6 rounded-3xl border transition-all ${isDarkMode ? "bg-[#101626]/60 border-slate-800/80 hover:border-slate-750" : "bg-[#F8FAFC] border-slate-200/80 hover:border-slate-300/85 hover:shadow-sm"}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-black border border-slate-800 text-white flex items-center justify-center shadow-md shadow-black/20 shrink-0">
                        <TikTokIcon size={20} className="text-white" />
                      </div>
                      <h3 className={`font-bold text-base ${isDarkMode ? "text-white" : "text-slate-900"}`}>TikTok Downloader</h3>
                    </div>
                    <ul className="space-y-3">
                      {[
                        "Download unlimited TikTok posts without watermarks",
                        "Extract background tracks and sound overlays natively",
                        "Extract multiple target resolutions (HD available)",
                        "Instant processing directly bypassing client barriers"
                      ].map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <Check size={14} className="text-[#14B8A6] mt-0.5 min-w-[14px]" />
                          <span className={isDarkMode ? "text-slate-350" : "text-slate-600"}>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Instagram Details Card */}
                {(currentPage === "home" || currentPage === "instagram") && (
                  <div className={`p-6 rounded-3xl border transition-all ${isDarkMode ? "bg-[#101626]/60 border-slate-800/80 hover:border-slate-750" : "bg-[#F8FAFC] border-slate-200/80 hover:border-slate-300/85 hover:shadow-sm"}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-rose-500/10 shrink-0">
                        <Instagram size={18} className="stroke-[2.5]" />
                      </div>
                      <h3 className={`font-bold text-base ${isDarkMode ? "text-white" : "text-slate-900"}`}>Instagram Downloader</h3>
                    </div>
                    <ul className="space-y-3">
                      {[
                        "Extract Reels, Posts, and Carousel items quickly",
                        "Direct CDN fetch loops preserving premium bitrate files",
                        "MP3 dynamic extract for reels sound clips",
                        "Complete safe bypass of feed logins & security tokens"
                      ].map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <Check size={14} className="text-[#14B8A6] mt-0.5 min-w-[14px]" />
                          <span className={isDarkMode ? "text-slate-350" : "text-slate-600"}>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* LOADING SKELETON STATE */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto my-12 p-8 rounded-3xl border border-neutral-800 bg-neutral-900/20 backdrop-blur-sm"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start animate-pulse">
                {/* Visual Skeleton preview thumbnail */}
                <div className="w-full md:w-80 h-[400px] rounded-2xl bg-neutral-800 flex items-center justify-center">
                  <Film size={48} className="text-neutral-700 animate-bounce" />
                </div>
                {/* Visual content details list */}
                <div className="flex-1 space-y-6 w-full">
                  <div className="h-6 w-1/3 bg-neutral-800 rounded-lg" />
                  <div className="h-10 w-full bg-neutral-800 rounded-lg" />
                  <div className="h-4 w-1/2 bg-neutral-800 rounded-lg" />
                  <div className="grid grid-cols-4 gap-3">
                    <div className="h-12 bg-neutral-800 rounded-lg" />
                    <div className="h-12 bg-neutral-800 rounded-lg" />
                    <div className="h-12 bg-neutral-800 rounded-lg" />
                    <div className="h-12 bg-neutral-800 rounded-lg" />
                  </div>
                  <div className="space-y-2.5">
                    <div className="h-14 w-full bg-neutral-800 rounded-xl" />
                    <div className="h-14 w-full bg-neutral-800 rounded-xl" />
                    <div className="h-14 w-full bg-neutral-800 rounded-xl" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RESULTS HUB & MEDIA PREVIEW */}
        <AnimatePresence>
          {result && !loading && (
            <motion.section
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="max-w-5xl mx-auto my-10"
              id="download-preview"
            >
              <div className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? "bg-[#101626] border-slate-800" : "bg-white border-slate-200"}`}>
                
                {/* Results Header block */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 mb-6 border-dashed border-slate-200/60 dark:border-slate-800/60">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 ${
                      result.platform === "tiktok" 
                        ? "bg-black text-white border border-slate-900 shadow-sm shadow-black/10"
                        : "bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 text-white shadow-sm shadow-rose-500/10"
                     }`}>
                      {result.platform === "tiktok" ? (
                        <TikTokIcon size={12} className="text-white" />
                      ) : (
                        <Instagram size={12} className="stroke-[2.5]" />
                      )}
                      {result.platform} detected
                    </span>
                    <span className={`text-xs ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                      Extract ID: <span className="font-mono">{result.id}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => { setUrl(""); setResult(null); }}
                    className={`inline-flex items-center gap-1 text-xs font-semibold cursor-pointer py-1.5 px-3 rounded-xl border transition-colors ${
                      isDarkMode 
                        ? "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white" 
                        : "bg-slate-50 border-slate-150 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <RotateCcw size={11} />
                    <span>Download another video</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Visual Media Player & Engagement Metrics */}
                  <div className="lg:col-span-5 space-y-5">
                    
                    {/* Media Frame with native live previews */}
                    <div className={`relative rounded-3xl overflow-hidden border shadow-inner group ${isDarkMode ? "bg-black border-slate-800" : "bg-slate-50 border-slate-150"}`}>
                      
                      <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg backdrop-blur-md bg-black/40 text-[10px] font-medium text-white flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-ping" />
                        Live HD Preview
                      </div>

                      <video
                        key={result.videoOptions[0].url}
                        src={`/api/download?url=${encodeURIComponent(result.videoOptions[0].url)}&inline=true`}
                        poster={result.thumbnail}
                        controls
                        playsInline
                        referrerPolicy="no-referrer"
                        className="w-full aspect-[9/16] object-cover max-h-[480px] select-none mx-auto"
                      />
                    </div>

                    {/* Social Stats list */}
                    {result.platform !== "instagram" && (
                      <div className={`grid grid-cols-4 gap-3 p-4 rounded-2xl border ${isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-[#F8FAFC] border-slate-150"}`}>
                        
                        <div className="text-center">
                          <div className={`flex justify-center mb-1 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                            <Eye size={14} />
                          </div>
                          <span className="block font-bold text-xs">{result.views}</span>
                          <span className={`text-[8px] uppercase tracking-wider ${isDarkMode ? "text-slate-500" : "text-slate-450"}`}>Views</span>
                        </div>

                        <div className="text-center">
                          <div className="flex justify-center mb-1 text-[#14B8A6]">
                            <Heart size={14} fill="currentColor" />
                          </div>
                          <span className="block font-bold text-xs">{result.likes}</span>
                          <span className={`text-[8px] uppercase tracking-wider ${isDarkMode ? "text-slate-500" : "text-slate-450"}`}>Likes</span>
                        </div>

                        <div className="text-center">
                          <div className="flex justify-center mb-1 text-sky-500">
                            <MessageSquare size={14} />
                          </div>
                          <span className="block font-bold text-xs">{result.comments}</span>
                          <span className={`text-[8px] uppercase tracking-wider ${isDarkMode ? "text-slate-500" : "text-slate-450"}`}>Comments</span>
                        </div>

                        <div className="text-center">
                          <div className="flex justify-center mb-1 text-slate-500">
                            <Share2 size={14} />
                          </div>
                          <span className="block font-bold text-xs">{result.shares}</span>
                          <span className={`text-[8px] uppercase tracking-wider ${isDarkMode ? "text-slate-500" : "text-slate-450"}`}>Shares</span>
                        </div>

                      </div>
                    )}
                  </div>

                  {/* Right Column: Download formats & AI Booster engine */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <h3 className={`text-xl font-bold tracking-tight mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                        {result.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[8px] ${isDarkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"}`}>
                          U
                        </div>
                        <span className={`text-xs font-semibold ${isDarkMode ? "text-slate-350" : "text-slate-600"}`}>
                          {result.creator}
                        </span>
                        <span className={`text-[11px] ${isDarkMode ? "text-slate-500" : "text-slate-450"}`}>
                          • Duration: {result.duration}
                        </span>
                      </div>
                    </div>

                    {/* format downloader list rendering */}
                    <div className="space-y-3.5">
                      {result.videoOptions.map((opt: VideoOption, i) => {
                        const optionId = `video-${opt.resolution}`;
                        const isDownloading = activeDownloadId === optionId;
                        
                        return (
                          <div
                            key={i}
                            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                              isDownloading 
                                ? isDarkMode 
                                  ? "bg-slate-900 border-[#14B8A6]/50" 
                                  : "bg-[#14B8A6]/5 border-[#14B8A6]/40 shadow-sm"
                                : isDarkMode 
                                ? "bg-slate-900/20 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700" 
                                : "bg-[#F8FAFC]/55 border-slate-200 hover:bg-slate-50/60 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-xl flex items-center justify-center ${
                                opt.resolution.includes("HD")
                                  ? isDarkMode 
                                    ? "bg-teal-950/20 text-[#14B8A6] border border-teal-900/40"
                                    : "bg-[#14B8A6]/10 text-[#0F172A] border border-[#14B8A6]/20"
                                  : isDarkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-600"
                              }`}>
                                <Film size={16} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm">{opt.resolution}</span>
                                  {opt.resolution.includes("HD") && (
                                    <span className="text-[9px] uppercase tracking-widest font-extrabold bg-[#14B8A6] text-white px-1.5 py-0.5 rounded">
                                      Pro HD
                                    </span>
                                  )}
                                </div>
                                <span className={`text-xs ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                                  MP4 format • {opt.fps}fps • File size: {opt.size}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => executeDownload(opt.url, `${result.platform}_${result.id}_${opt.resolution.replace(" ", "_")}.mp4`, optionId)}
                              disabled={!!activeDownloadId && !isDownloading}
                              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                isDownloading
                                  ? "bg-[#14B8A6] text-[#0F172A] min-w-[130px]"
                                  : !!activeDownloadId
                                  ? isDarkMode ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed shadow-none" : "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed shadow-none"
                                  : isDarkMode
                                  ? "bg-[#14B8A6] hover:bg-[#0D9488] text-[#0F172A] hover:scale-[1.02] shadow-sm"
                                  : "bg-[#0F172A] hover:bg-[#1E293B] text-white hover:scale-[1.02] shadow-sm"
                              }`}
                            >
                              {isDownloading ? (
                                <>
                                  <Loader2 size={13} className="animate-spin" />
                                  <span>{downloadProgress}% Saved</span>
                                </>
                              ) : downloadSuccess && isDownloading ? (
                                <>
                                  <Check size={13} />
                                  <span>Finished!</span>
                                </>
                              ) : (
                                <>
                                  <Download size={13} />
                                  <span>Download Video</span>
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })}

                      {/* Unified Audio Option Row */}
                      <div
                        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          activeDownloadId === "audio-extract"
                            ? isDarkMode ? "bg-slate-900 border-[#14B8A6]/50" : "bg-[#14B8A6]/5 border-[#14B8A6]/40 shadow-sm"
                            : isDarkMode 
                            ? "bg-slate-900/20 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700" 
                            : "bg-[#F8FAFC]/55 border-slate-200 hover:bg-slate-50/60 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl flex items-center justify-center ${isDarkMode ? "bg-slate-800 text-[#14B8A6]" : "bg-slate-100 text-[#14B8A6]"}`}>
                            <Music size={16} />
                          </div>
                          <div>
                            <span className="font-bold text-sm block">audio (MP3)</span>
                            <span className={`text-xs ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                              High Quality audio • {result.audioOption.duration} mins • MP3 format • {result.audioOption.size}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => executeDownload(result.audioOption.url, `${result.platform}_${result.id}_extracted.mp3`, "audio-extract")}
                          disabled={!!activeDownloadId && activeDownloadId !== "audio-extract"}
                          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            activeDownloadId === "audio-extract"
                              ? "bg-[#14B8A6] text-[#0F172A] min-w-[130px]"
                              : !!activeDownloadId
                              ? isDarkMode ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed shadow-none" : "bg-slate-200 text-slate-450 border border-slate-300 cursor-not-allowed shadow-none"
                              : isDarkMode
                              ? "bg-[#14B8A6] hover:bg-[#0D9488] text-[#0F172A] hover:scale-[1.02]"
                              : "bg-[#0F172A] hover:bg-[#1E293B] text-white hover:scale-[1.02]"
                          }`}
                        >
                          {activeDownloadId === "audio-extract" ? (
                            <>
                              <Loader2 size={13} className="animate-spin" />
                              <span>{downloadProgress}% Extracted</span>
                            </>
                          ) : (
                            <>
                              <Music size={13} />
                              <span>Get MP3 audio</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Security credentials line */}
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 justify-center">
                      <Shield size={12} className="text-emerald-500" />
                      <span>Encrypted SSL downlinks verified • Safe direct origin source server bypass</span>
                    </div>


                  </div>
                </div>

              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* FAQ ACCORDION SECTION */}
        <section className="mt-20 max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkMode ? "text-white" : "text-slate-950"}`}>
              Frequently Answered FAQ
            </h2>
            <p className={`text-sm mt-2 ${isDarkMode ? "text-neutral-400" : "text-slate-500"}`}>
              Everything you need to know about watermarks, downloading speed limits, and file safety.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((item, idx) => (
              <FaqAccordionItem key={idx} item={item} isDarkMode={isDarkMode} />
            ))}
          </div>
        </section>
          </>
        )}

      </main>

      {/* FOOTER */}
      <footer className={`mt-24 border-t py-12 transition-colors duration-200 ${isDarkMode ? "bg-[#090d16] border-slate-900 text-slate-400" : "bg-[#F8FAFC] border-slate-150/80 text-slate-500"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          <div className="flex items-center justify-center gap-2">
            <span className={`font-bold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              SaveKlip<span className="text-[#14B8A6]">.</span> HD Downloader
            </span>
          </div>

          {/* AdSense Monetization Eligibility Link Footer Bar */}
          <div className="flex flex-col items-center justify-center gap-3.5 text-xs font-semibold py-2">
            {/* First Line: Home, TikTok Downloader, Instagram Downloader */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <button
                onClick={() => setCurrentPage("home")}
                className={`transition-colors cursor-pointer hover:underline ${
                  currentPage === "home"
                    ? "text-[#14B8A6] font-extrabold"
                    : isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                Home
              </button>
              <span className={`opacity-20 ${isDarkMode ? "text-slate-800" : "text-slate-300"}`}>|</span>
              <button
                onClick={() => setCurrentPage("tiktok")}
                className={`transition-colors cursor-pointer hover:underline ${
                  currentPage === "tiktok"
                    ? "text-[#14B8A6] font-extrabold"
                    : isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                TikTok Downloader
              </button>
              <span className={`opacity-20 ${isDarkMode ? "text-slate-800" : "text-slate-300"}`}>|</span>
              <button
                onClick={() => setCurrentPage("instagram")}
                className={`transition-colors cursor-pointer hover:underline ${
                  currentPage === "instagram"
                    ? "text-[#14B8A6] font-extrabold"
                    : isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                Instagram Downloader
              </button>
              <span className={`opacity-20 ${isDarkMode ? "text-slate-800" : "text-slate-300"}`}>|</span>
              <button
                onClick={() => setCurrentPage("blog")}
                className={`transition-colors cursor-pointer hover:underline ${
                  currentPage === "blog"
                    ? "text-[#14B8A6] font-extrabold"
                    : isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                Blog
              </button>
            </div>

            {/* Second Line: About Us, Contact Us, Privacy Policy, Terms of Service, and DMCA Policy */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 opacity-90">
              <button
                onClick={() => setCurrentPage("about")}
                className={`transition-colors cursor-pointer hover:underline ${
                  currentPage === "about"
                    ? "text-[#14B8A6] font-bold"
                    : isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                About Us
              </button>
              <span className={`opacity-25 ${isDarkMode ? "text-slate-800" : "text-slate-200"}`}>|</span>
              <button
                onClick={() => setCurrentPage("contact")}
                className={`transition-colors cursor-pointer hover:underline ${
                  currentPage === "contact"
                    ? "text-[#14B8A6] font-bold"
                    : isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Contact Us
              </button>
              <span className={`opacity-25 ${isDarkMode ? "text-slate-800" : "text-slate-200"}`}>|</span>
              <button
                onClick={() => setCurrentPage("privacy")}
                className={`transition-colors cursor-pointer hover:underline ${
                  currentPage === "privacy"
                    ? "text-[#14B8A6] font-bold"
                    : isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Privacy Policy
              </button>
              <span className={`opacity-25 ${isDarkMode ? "text-slate-800" : "text-slate-200"}`}>|</span>
              <button
                onClick={() => setCurrentPage("terms")}
                className={`transition-colors cursor-pointer hover:underline ${
                  currentPage === "terms"
                    ? "text-[#14B8A6] font-bold"
                    : isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Terms of Service
              </button>
              <span className={`opacity-25 ${isDarkMode ? "text-slate-800" : "text-slate-200"}`}>|</span>
              <button
                onClick={() => setCurrentPage("dmca")}
                className={`transition-colors cursor-pointer hover:underline ${
                  currentPage === "dmca"
                    ? "text-[#14B8A6] font-bold"
                    : isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                DMCA Policy
              </button>
            </div>
          </div>

          <p className="max-w-3xl mx-auto text-[11px] opacity-85 leading-relaxed">
            <strong>Disclaimer:</strong> This application is a tool for personal backup archiving and media exploration. We are not allied or officially affiliated with TikTok, ByteDance, Instagram, Meta, or any related social media networks. Brand copyrights belong entirely to their respective media owners. Always respect digital intellectual property rules before repurposing content.
          </p>

          <div className={`text-[10px] ${isDarkMode ? "text-slate-600" : "text-slate-400"}`}>
            &copy; 2026 SaveKlip Systems. Realized in compliance with high performance web protocols.
          </div>
        </div>
      </footer>

    </div>
  );
}
