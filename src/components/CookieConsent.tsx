import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Settings, Check, X, ArrowRight, ExternalLink } from "lucide-react";

interface CookieConsentProps {
  isDarkMode: boolean;
  onOpenPrivacyPolicy: () => void;
}

export default function CookieConsent({ isDarkMode, onOpenPrivacyPolicy }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Custom states for settings toggles
  const [essential, setEssential] = useState(true); // Always true & disabled
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true); // AdSense personalized ads

  useEffect(() => {
    // Check if user has already made a selection
    const consent = localStorage.getItem("cookie_consent_status");
    if (!consent) {
      // Show banner after a slight 1.5 second delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie_consent_status", "accepted_all");
    localStorage.setItem("cookie_consent_analytics", "true");
    localStorage.setItem("cookie_consent_marketing", "true");
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem("cookie_consent_status", "rejected_all");
    localStorage.setItem("cookie_consent_analytics", "false");
    localStorage.setItem("cookie_consent_marketing", "false");
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie_consent_status", "custom");
    localStorage.setItem("cookie_consent_analytics", analytics ? "true" : "false");
    localStorage.setItem("cookie_consent_marketing", marketing ? "true" : "false");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          id="cookie-consent-container"
          className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 p-5 rounded-2xl border shadow-2xl ${
            isDarkMode 
              ? "bg-[#0B0F19]/95 border-slate-800 text-slate-100 backdrop-blur-md" 
              : "bg-white/95 border-slate-150 text-slate-900 backdrop-blur-md"
          }`}
        >
          {!showSettings ? (
            <div className="space-y-4" id="cookie-summary-view">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl shrink-0 ${isDarkMode ? "bg-[#14B8A6]/10 text-[#14B8A6]" : "bg-teal-50 text-teal-600"}`}>
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight">We value your privacy</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    We and third-party vendors (including <strong>Google AdSense</strong>) use cookies to analyze web traffic, remember preferences, and deliver personalized ads based on your visits to this and other websites.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={onOpenPrivacyPolicy}
                  className="text-[11px] font-bold text-[#14B8A6] hover:underline flex items-center gap-1 cursor-pointer"
                  id="cookie-privacy-link"
                >
                  <span>Read Privacy Policy</span>
                  <ExternalLink size={11} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <button
                  onClick={handleAcceptAll}
                  className="px-3 py-2.5 rounded-xl bg-[#14B8A6] hover:bg-[#0D9488] active:scale-[0.98] transition-all text-xs font-bold text-white shadow-md shadow-teal-500/10 cursor-pointer min-h-[44px]"
                  id="cookie-accept-all"
                >
                  Accept All
                </button>
                <button
                  onClick={handleRejectAll}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all active:scale-[0.98] cursor-pointer min-h-[44px] ${
                    isDarkMode 
                      ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800" 
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                  id="cookie-reject-all"
                >
                  Reject Optional
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] ${
                    isDarkMode 
                      ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800" 
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                  id="cookie-manage-settings"
                >
                  <Settings size={13} />
                  <span>Configure</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in" id="cookie-preferences-view">
              <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Cookie Preferences</span>
                <button 
                  onClick={() => setShowSettings(false)}
                  className={`p-1 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer`}
                  title="Go back"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {/* Essential Cookies */}
                <div className="flex items-start justify-between gap-3 p-2.5 rounded-xl border border-slate-150 dark:border-slate-800/60 bg-slate-50/40 dark:bg-slate-900/10">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <span>Strictly Necessary</span>
                      <span className="text-[9px] uppercase tracking-widest bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded-full text-slate-500 font-bold">Required</span>
                    </span>
                    <p className={`text-[10px] leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                      Required for basic core features, theme options, security validation, and saving cookie preferences.
                    </p>
                  </div>
                  <div className="relative inline-flex items-center">
                    <input 
                      type="checkbox" 
                      checked={essential} 
                      disabled 
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-[#14B8A6] rounded-full peer peer-disabled:opacity-50"></div>
                  </div>
                </div>

                {/* Analytical Cookies */}
                <div className="flex items-start justify-between gap-3 p-2.5 rounded-xl border border-slate-150 dark:border-slate-800/60">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold">Analytical &amp; Performance</span>
                    <p className={`text-[10px] leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                      Helps us analyze web traffic, utility success ratios, and monitor tool performance to debug downloader APIs.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={analytics} 
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-slate-300 dark:bg-slate-850 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#14B8A6]"></div>
                  </label>
                </div>

                {/* Marketing & AdSense Cookies */}
                <div className="flex items-start justify-between gap-3 p-2.5 rounded-xl border border-slate-150 dark:border-slate-800/60">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold">AdSense &amp; Advertising</span>
                    <p className={`text-[10px] leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                      Allows Google and third-party advertising partners to serve customized, relevant ads to you based on your interests.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={marketing} 
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-slate-300 dark:bg-slate-850 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#14B8A6]"></div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setShowSettings(false)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer min-h-[44px] ${
                    isDarkMode 
                      ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800" 
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                  id="cookie-preferences-cancel"
                >
                  Back
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-3 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-[0.98] transition-all text-xs font-bold text-white shadow-md shadow-purple-500/10 cursor-pointer min-h-[44px]"
                  id="cookie-save-preferences"
                >
                  Save Choices
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
