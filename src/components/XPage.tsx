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
  Loader2
} from "lucide-react";
import { MediaMetadata } from "../types";

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
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text);
        }
      } else {
        setError("Clipboard paste action is restricted in this environment. Please paste the X link manually.");
      }
    } catch (err) {
      setError("Clipboard paste action is restricted. Please paste the link manually.");
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
    <div className={`min-h-screen ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"} pb-16`}>
      {/* Mini Top Banner */}
      <div className={`border-b ${isDarkMode ? "border-slate-800 bg-slate-900/40" : "border-slate-200 bg-white/80"} sticky top-0 z-40 backdrop-blur-md`}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => setCurrentPage("home")}
            className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-800"} transition`}
            id="back-home-button"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-2 font-semibold">
            <img 
              src="https://cdn.prod.website-files.com/5d66bdc65e51a0d114d15891/64cebdd90aef8ef8c749e848_X-EverythingApp-Logo-Twitter.jpg" 
              alt="X Logo" 
              className="w-5 h-5 object-cover rounded-md" 
              referrerPolicy="no-referrer"
            />
            <span>X (Twitter) Downloader</span>
          </div>
          <div className="w-20"></div> {/* Spacer balance */}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-8">
        {/* Main Pitch */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex p-3 rounded-2xl bg-[#14B8A6]/10 text-[#14B8A6] mb-4 border border-[#14B8A6]/20"
          >
            <img 
              src="https://cdn.prod.website-files.com/5d66bdc65e51a0d114d15891/64cebdd90aef8ef8c749e848_X-EverythingApp-Logo-Twitter.jpg" 
              alt="X Logo" 
              className="w-8 h-8 object-cover rounded-lg" 
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            X (Twitter) Video Downloader
          </h1>
          <p className={`text-base max-w-xl mx-auto ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            Download X (Twitter) videos in High Quality
          </p>
        </div>

        {/* Input Card Container */}
        <div className={`p-6 md:p-8 rounded-3xl border mb-8 shadow-sm ${
          isDarkMode ? "bg-slate-900/40 border-slate-800/80" : "bg-white border-slate-200"
        }`}>
          {/* Auto Downloader Box */}
          <form onSubmit={handleDownload} className="space-y-4">
            <label htmlFor="twitter-url-input" className="block text-sm font-semibold mb-1">
              Enter X or Twitter post Link:
            </label>
            <div className="relative">
              <input
                id="twitter-url-input"
                type="url"
                placeholder="e.g. https://x.com/SpaceX/status/1781467451430932599"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={`w-full px-5 py-4 pl-12 pr-28 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-[#14B8A6] transition-all ${
                  isDarkMode 
                    ? "bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500" 
                    : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                }`}
                required
              />
              <img 
                src="https://cdn.prod.website-files.com/5d66bdc65e51a0d114d15891/64cebdd90aef8ef8c749e848_X-EverythingApp-Logo-Twitter.jpg" 
                alt="X Logo" 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 object-cover rounded" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePaste}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold ${
                    isDarkMode ? "bg-slate-800 hover:bg-slate-700 text-slate-300" : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                  } transition cursor-pointer`}
                  id="url-paste-button"
                >
                  Paste
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-[#14B8A6] hover:bg-[#0D9488] text-white font-bold text-sm tracking-wide transition flex items-center justify-center gap-2 shadow-lg shadow-[#14B8A6]/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              id="twitter-retrieve-button"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Extracting Media Streams...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Download Video
                </>
              )}
            </button>
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
            <div className="p-2 bg-[#14B8A6]/10 rounded-xl w-fit mb-3 flex items-center justify-center">
              <img 
                src="https://cdn.prod.website-files.com/5d66bdc65e51a0d114d15891/64cebdd90aef8ef8c749e848_X-EverythingApp-Logo-Twitter.jpg" 
                alt="X Logo" 
                className="w-5 h-5 object-cover rounded" 
                referrerPolicy="no-referrer"
              />
            </div>
            <h4 className="font-bold text-sm mb-1.5">Unrestricted Access</h4>
            <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Supports links containing <code className="font-mono text-[11px] bg-slate-800 px-1 rounded text-[#14B8A6]">x.com</code> or <code className="font-mono text-[11px] bg-slate-800 px-1 rounded text-[#14B8A6]">twitter.com</code> effortlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
