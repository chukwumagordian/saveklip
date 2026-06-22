import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Download, 
  Play, 
  Volume2, 
  Info, 
  Copy, 
  Check, 
  HelpCircle, 
  RefreshCw, 
  Sparkles, 
  Video, 
  ShieldCheck, 
  CheckCircle,
  AlertCircle,
  Loader2,
  Clipboard
} from "lucide-react";
import { MediaMetadata } from "../types";
import { BrushHighlight } from "./BrushHighlight";

interface XPageProps {
  isDarkMode: boolean;
  setCurrentPage: (page: any) => void;
}

export default function XPage({ isDarkMode, setCurrentPage }: XPageProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MediaMetadata | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [playerMode, setPlayerMode] = useState<"original" | "stream">("original");

  // Interactive downloader states
  const [activeDownloadId, setActiveDownloadId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handlePaste = async () => {
    try {
      setError(null);
      // Focus the input first so user pointer is placed in the input box immediately
      const inputEl = document.getElementById("twitter-url-input");
      if (inputEl) {
        (inputEl as HTMLInputElement).focus();
      }

      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text);
        }
      } else {
        // Fallback info if API is completely unavailable
        console.warn("Clipboard read text API is not supported in this browser context.");
      }
    } catch (err) {
      // Catch DOMException on denied clipboard permissions gracefully without a loud error toast/text
      console.log("Clipboard API access was restricted or denied by browser security. Reverted to standard manual paste focus.", err);
    }
  };

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/x/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || "Failed to extract video links. Please verify the X (Twitter) URL and try again.");
      } else {
        setResult(data.metadata);
        setPlayerMode("original");
      }
    } catch (err) {
      setError("A networking anomaly occurred. Unable to contact the standalone X extractor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      // fallback
    }
  };

  const sanitizeFilename = (name: string) => {
    return name
      .replace(/[\/\\]/g, "-") // Replace slashes with dash
      .replace(/[<>:"|?*]/g, "") // Remove Windows invalid characters
      .replace(/\s+/g, "_") // Replace spaces with underscores
      .trim();
  };

  const getProxyDownloadUrl = (mediaUrl: string, resolution: string) => {
    const cleanResolution = sanitizeFilename(resolution);
    const cleanTitle = sanitizeFilename(result?.title || "x_video");
    const filename = `${cleanTitle}_${cleanResolution}.mp4`;
    return `/api/download?url=${encodeURIComponent(mediaUrl)}&filename=${encodeURIComponent(filename)}`;
  };

  const getProxyAudioUrl = (mediaUrl: string) => {
    const cleanTitle = sanitizeFilename(result?.title || "x_audio");
    const filename = `${cleanTitle}.mp3`;
    return `/api/download?url=${encodeURIComponent(mediaUrl)}&filename=${encodeURIComponent(filename)}&extractAudio=true`;
  };

  const executeDownload = (proxyUrl: string, filename: string, optionId: string) => {
    setActiveDownloadId(optionId);
    setDownloadProgress(0);
    setDownloadSuccess(false);

    // Try to extract the raw URL if it is wrapped in `/api/download?url=...`
    let targetUrl = proxyUrl;
    if (proxyUrl.startsWith("/api/download")) {
      try {
        const urlParams = new URLSearchParams(proxyUrl.split("?")[1]);
        const extracted = urlParams.get("url");
        if (extracted) {
          targetUrl = extracted;
        }
      } catch (e) {}
    }

    const isTwitter = targetUrl.includes("twimg.com") || targetUrl.includes("twitter.com") || targetUrl.includes("x.com");

    if (isTwitter) {
      console.log("[Download] Opening Twitter/X media URL directly with no-referrer to bypass proxy block and hotlinking Referer protection.");
      try {
        const link = document.createElement("a");
        link.href = targetUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.setAttribute("referrerpolicy", "no-referrer");
        document.body.appendChild(link);
        link.click();
        setTimeout(() => link.remove(), 100);
      } catch (err) {
        console.warn("[Download] Blocker bypassed click failed, falling back to window.open", err);
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      }

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 20) + 15;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setDownloadSuccess(true);
          setTimeout(() => {
            setDownloadSuccess(false);
            setActiveDownloadId(null);
          }, 3000);
        }
        setDownloadProgress(currentProgress);
      }, 80);
      return;
    }

    try {
      console.log("[Download] Initializing same-origin streaming download for URL:", proxyUrl);
      
      // Create a temporary highly-isolated download link and click it
      const link = document.createElement("a");
      link.href = proxyUrl;
      link.setAttribute("download", filename);
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        link.remove();
        try {
          // Use hidden iframe as a highly secure same-origin browser trigger to download without page reflashes
          let iframe = document.getElementById("download-iframe") as HTMLIFrameElement;
          if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.id = "download-iframe";
            iframe.style.display = "none";
            document.body.appendChild(iframe);
          }
          iframe.src = proxyUrl;
        } catch (iframeErr) {
          console.warn("[Download] Iframe trigger issue, falling back to location.href:", iframeErr);
          window.location.href = proxyUrl;
        }
      }, 150);
    } catch (err) {
      console.warn("[Download] Native anchor/iframe dispatch rejected, executing active window location rewrite:", err);
      window.location.href = proxyUrl;
    }

    // Simultaneously, run a smooth and responsive visual loading animation to offer excellent immediate feedback.
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 12;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setDownloadSuccess(true);
        setTimeout(() => {
          setDownloadSuccess(false);
          setActiveDownloadId(null);
        }, 3000);
      }
      setDownloadProgress(currentProgress);
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-4 pb-16">
      {/* Main Pitch */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`block w-fit mx-auto items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 border ${isDarkMode ? "bg-slate-900 border-slate-800 text-[#14B8A6]" : "bg-[#14B8A6]/10 border-[#14B8A6]/20 text-[#14B8A6]"}`}
        >
          <span className="font-semibold">Zero Watermarks • Full HD MP4</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-4xl sm:text-5xl lg:text-3xl font-extrabold tracking-tight mb-5 ${isDarkMode ? "text-slate-100" : "text-[#0F172A]"}`}
        >
          <BrushHighlight text="Download X / Twitter Videos in High Quality" isDarkMode={isDarkMode} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-base sm:text-sm ${isDarkMode ? "text-slate-400" : "text-slate-550"} max-w-2xl mx-auto font-medium leading-relaxed`}
        >
          Looking for a fast, free, and secure way to download X videos and save Twitter GIFs? Our advanced X video downloader extracts full high-definition (HD) MP4 video tracks directly from the official content delivery network. Bypassing stream blockages, hotlinking protections, and regional redirects has never been simpler. Just paste your link above to convert and save X videos in seconds!
        </motion.p>
      </div>

        {/* Input Card Container */}
        <div className={`p-6 rounded-3xl border mb-12 shadow-sm ${
          isDarkMode ? "bg-[#101626] border-slate-800/85 backdrop-blur-xl" : "bg-[#F8FAFC] border-slate-200/80 shadow-md shadow-slate-200/20"
        }`}>
          {/* Auto Downloader Box */}
          <form onSubmit={handleDownload} className="space-y-4">
            <label htmlFor="twitter-url-input" className={`block text-xs font-semibold uppercase tracking-wider mb-2.5 ml-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Paste X (Twitter) URL Link
            </label>
            <div className="relative flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  id="twitter-url-input"
                  type="url"
                  placeholder="e.g. https://x.com/SpaceX/status/1781467451430932599"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className={`w-full pl-5 pr-20 sm:pr-28 py-4 rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 border ${
                    isDarkMode
                      ? "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-100 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-900 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6]"
                  }`}
                  required
                />

                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePaste}
                    className={`p-2 rounded-lg text-xs font-semibold ${
                      isDarkMode ? "bg-slate-800 hover:bg-slate-700 text-slate-300" : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                    } transition cursor-pointer`}
                    id="url-paste-button"
                    title="Paste Link"
                  >
                    <Clipboard className="w-4 h-4" />
                  </button>

                  {url && (
                    <button
                      type="button"
                      onClick={() => { setUrl(""); setResult(null); }}
                      className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${
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
              </div>

              <button
                type="submit"
                id="twitter-retrieve-button"
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
          </form>
        </div>

        {/* Error State Banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className={`p-4 mb-8 rounded-2xl border flex items-start gap-3 ${
                isDarkMode ? "bg-rose-500/10 border-rose-500/20 text-rose-400" : "bg-rose-50 border-rose-200 text-rose-700"
              }`}
              id="error-block"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm">Download Fault Experienced</h4>
                <p className="text-xs mt-1 leading-relaxed">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Extraction Result Showcase */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`border rounded-3xl overflow-hidden shadow-md ${
                isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
              }`}
              id="result-display-block"
            >
              {/* Media Preview & Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8 border-b border-dashed border-slate-800/20">
                <div className="md:col-span-5 relative flex flex-col items-center justify-center rounded-2xl overflow-hidden bg-black aspect-video group">
                  <img 
                    src={result.thumbnail} 
                    alt={result.title}
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <span className="text-xs bg-[#14B8A6] text-white px-2.5 py-1 rounded-full font-bold self-start mb-2 uppercase tracking-widest text-[9px]">
                      {result.platform} Video
                    </span>
                    <span className="text-white text-xs font-mono font-bold">
                      {result.id ? `ID: ${result.id}` : "X Premium Media"}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold leading-snug tracking-tight mb-2">
                      {result.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
                      <span className={`px-2.5 py-1 rounded-lg font-bold ${
                        isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"
                      }`}>
                        Creator: {result.creator}
                      </span>
                      {result.views && result.views !== "Unknown" && (
                        <span className={`px-2.5 py-1 rounded-lg font-bold ${
                          isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"
                        }`}>
                          {result.views}
                        </span>
                      )}
                      {result.likes && result.likes !== "Unknown" && (
                        <span className={`px-2.5 py-1 rounded-lg font-bold ${
                          isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"
                        }`}>
                          {result.likes}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl flex items-start gap-2 text-xs ${
                    isDarkMode ? "bg-slate-800/40 text-slate-400" : "bg-slate-100 text-slate-600"
                  }`}>
                    <ShieldCheck className="w-4 h-4 text-[#14B8A6] shrink-0" />
                    <span>Extracted secure link successfully. Ready to store offline.</span>
                  </div>
                </div>
              </div>

              {/* Download Streams Layout */}
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  {/* Twitter/X Download Helper Instructions */}
                  <div className={`mb-6 p-4 rounded-2xl border text-xs leading-relaxed ${
                    isDarkMode 
                      ? "bg-[#14B8A6]/10 border-[#14B8A6]/20 text-teal-200" 
                      : "bg-[#14B8A6]/5 border-[#14B8A6]/10 text-teal-800"
                  }`}>
                    <p>
                      💡 Downloads are redirected directly to Twitter's secure media network. 
                      <strong> If the video plays in a new tab:</strong> right-click the video and select <strong>"Save Video As..."</strong> (or on mobile, long-press the video or tap the three dots icon in the video player and select <strong>"Download Video"</strong>) to save it with full quality!
                    </p>
                  </div>

                  <h4 className="text-sm font-bold flex items-center gap-2 mb-4">
                    <Video className="w-4 h-4 text-[#14B8A6]" />
                    Available Offline Video Tracks:
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {result.videoOptions.map((opt, i) => (
                      <div 
                        key={i}
                        className={`p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border transition-all ${
                          isDarkMode 
                            ? "bg-slate-900/60 border-slate-800/80 hover:border-[#14B8A6]/30" 
                            : "bg-slate-50 border-slate-200 hover:border-[#14B8A6]/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-xl bg-[#14B8A6]/10 text-[#14B8A6] shrink-0`}>
                            <Play className="w-5 h-5 fill-[#14B8A6]/20" />
                          </div>
                          <div>
                            <span className="font-bold text-sm block sm:inline mr-2">
                              {opt.resolution}
                            </span>
                            {opt.size && opt.size !== "Direct High-Speed Link" && (
                              <span className={`text-[11px] px-2 py-0.5 rounded-md font-mono ${
                                isDarkMode ? "bg-slate-800 text-slate-400" : "bg-slate-200 text-slate-600"
                              }`}>
                                Size: {opt.size}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => {
                              const cleanResolution = sanitizeFilename(opt.resolution);
                              const cleanTitle = sanitizeFilename(result?.title || "x_video");
                              const filename = `${cleanTitle}_${cleanResolution}.mp4`;
                              executeDownload(getProxyDownloadUrl(opt.url, opt.resolution), filename, `video-${i}`);
                            }}
                            disabled={!!activeDownloadId}
                            className={`w-full sm:w-auto px-5 py-3 rounded-xl text-white text-xs font-bold transition flex items-center justify-center gap-1.5 hover:scale-105 shadow-md cursor-pointer ${
                              activeDownloadId === `video-${i}`
                                ? (downloadSuccess ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/10" : "bg-[#0D9488] shadow-[#0D9488]/10")
                                : !!activeDownloadId
                                ? "bg-slate-400 cursor-not-allowed opacity-50 shadow-none pointer-events-none"
                                : "bg-[#14B8A6] hover:bg-[#0D9488] shadow-[#14B8A6]/10"
                            }`}
                            id={`download-video-btn-${i}`}
                          >
                            {activeDownloadId === `video-${i}` && downloadSuccess ? (
                              <>
                                <Check className="w-4 h-4 text-white font-bold" />
                                <span>Saved!</span>
                              </>
                            ) : activeDownloadId === `video-${i}` ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Saving {downloadProgress}%</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4" />
                                <span>Download MP4</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Informational Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-slate-900/40 border-slate-800/60" : "bg-white border-slate-200"}`}>
            <div className="p-2.5 rounded-xl bg-[#14B8A6]/10 text-[#14B8A6] w-fit mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm mb-1.5">No Credential Required</h4>
            <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              We do not ask for your Twitter credentials. Standard links are parsed entirely using secure server-side wrappers.
            </p>
          </div>
          <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-slate-900/40 border-slate-800/60" : "bg-white border-slate-200"}`}>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit mb-3">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm mb-1.5">Highest HD Resolutions</h4>
            <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Extract the highest quality video qualities (720p, 1080p, streams) available, directly hosted by the official X content net.
            </p>
          </div>
          <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-slate-900/40 border-slate-800/60" : "bg-white border-slate-200"}`}>
            <div className="p-2.5 bg-[#14B8A6]/10 text-[#14B8A6] rounded-xl w-fit mb-3 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm mb-1.5">Unrestricted Access</h4>
            <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Supports links containing <code className="font-mono text-[11px] bg-slate-800 px-1 rounded text-[#14B8A6]">x.com</code> or <code className="font-mono text-[11px] bg-slate-800 px-1 rounded text-[#14B8A6]">twitter.com</code> effortlessly.
            </p>
          </div>
        </div>
      </div>
  );
}
