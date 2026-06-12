import React, { useState, useEffect, useRef } from "react";
import { 
  BookOpen, 
  User, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Lock, 
  Unlock, 
  LogOut,
  Edit,
  FileText, 
  Image as ImageIcon, 
  Send, 
  Sparkles, 
  TrendingUp, 
  Newspaper, 
  Hash, 
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Eye,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Quote,
  Palette,
  Upload,
  Search,
  X,
  Filter,
  Menu,
  Link,
  Video,
  Facebook,
  Linkedin,
  Share2,
  MessageCircle,
  List,
  ListOrdered
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BlogPost } from "../types";
import { translations, LanguageCode } from "../translations";

// Helper to extract clean domain name from an external URL for copyright attribution
function getImageSourceText(url: string): string | null {
  if (!url) return null;
  try {
    const trimmed = url.trim();
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      return null;
    }
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.toLowerCase();
    
    // Ignore localhost
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return null;
    }
    
    // For common CDNs or URL formats, strip known system prefixes
    let cleanHost = hostname;
    if (cleanHost.startsWith("www.")) {
      cleanHost = cleanHost.substring(4);
    }
    
    const parts = cleanHost.split(".");
    if (parts.length >= 2) {
      // Get the domain and TLD, e.g., pexels.com, unsplash.com
      return parts.slice(-2).join(".");
    }
    return cleanHost;
  } catch (e) {
    return null;
  }
}

// Compress image helper using HTML5 canvas
function compressImage(file: File, maxWidth: number = 1000, maxHeight: number = 1000, quality: number = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) {
        reject(new Error("Failed to read file"));
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Scale keeping aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(dataUrl); // Fallback to original
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Output as jpeg with custom quality
        const compressed = canvas.toDataURL("image/jpeg", quality);
        resolve(compressed);
      };
      img.onerror = () => {
        resolve(dataUrl); // Fallback on image load error
      };
      img.src = dataUrl;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

interface BlogPageProps {
  isDarkMode: boolean;
  setCurrentPage: (page: any) => void;
  language: LanguageCode;
}

export default function BlogPage({ isDarkMode, setCurrentPage, language }: BlogPageProps) {
  const t = translations[language] || translations["en"];
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [copied, setCopied] = useState(false);

  // Navigation within blog
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [hasInitializedFromUrl, setHasInitializedFromUrl] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminToken, setAdminToken] = useState("");

  // Login form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // New post form state
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newCategory, setNewCategory] = useState("Video Downloading Guides");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newAuthor, setNewAuthor] = useState("Social Ninja");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // References and custom word processing controls
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const [textColor, setTextColor] = useState("");
  const [selectedEditorImg, setSelectedEditorImg] = useState<HTMLImageElement | null>(null);
  const [coverInputMode, setCoverInputMode] = useState<"upload" | "url">("upload");
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  // States for Inline Image Inserter (Upload or URL Options)
  const [isInlineImgModalOpen, setIsInlineImgModalOpen] = useState(false);
  const [inlineImgMode, setInlineImgMode] = useState<"upload" | "url">("upload");
  const [inlineImgUrl, setInlineImgUrl] = useState("");
  const [inlineImgAlt, setInlineImgAlt] = useState("");
  const inlineImgFileInputRef = useRef<HTMLInputElement>(null);

  const openInlineImageEditor = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedSelectionRangeRef.current = selection.getRangeAt(0).cloneRange();
    } else {
      savedSelectionRangeRef.current = null;
    }
    setInlineImgUrl("");
    setInlineImgAlt("");
    setInlineImgMode("upload");
    setIsInlineImgModalOpen(true);
  };

  const handleInlineImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setErrorMessage("Compressing and optimizing inline image...");
    try {
      const compressedDataUrl = await compressImage(file, 1000, 1000, 0.75);
      setInlineImgUrl(compressedDataUrl);
      setSuccessMessage("Inline image optimized successfully!");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (err) {
      setErrorMessage("Failed to process inline image upload.");
    }
  };

  const insertInlineImageUrl = (url: string, altText: string) => {
    if (!url) return;
    
    if (savedSelectionRangeRef.current) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedSelectionRangeRef.current);
      }
    } else if (editorRef.current) {
      editorRef.current.focus();
    }

    const domain = getImageSourceText(url) || "";
    let htmlToInsert = "";
    if (domain) {
      htmlToInsert = `<figure class="my-6 mx-auto block max-w-full text-center">
  <img src="${url.trim()}" class="rounded-2xl max-w-full border border-neutral-850/10 dark:border-neutral-800/40 shadow-md block mx-auto hover:scale-[1.01] transition-transform duration-300 pointer-events-auto display-inline-img" referrerpolicy="no-referrer" alt="${altText || "Blog image"}" />
  <figcaption class="mt-2 text-center text-[10.5px] font-mono text-neutral-400 italic">
    Image source: ${domain}
  </figcaption>
</figure><p><br/></p>`;
    } else {
      htmlToInsert = `<figure class="my-6 mx-auto block max-w-full text-center">
  <img src="${url.trim()}" class="rounded-2xl max-w-full border border-neutral-850/10 dark:border-neutral-800/40 shadow-md block mx-auto hover:scale-[1.01] transition-transform duration-300 pointer-events-auto display-inline-img" referrerpolicy="no-referrer" alt="${altText || "Blog image"}" />
</figure><p><br/></p>`;
    }

    document.execCommand("insertHTML", false, htmlToInsert);
    if (editorRef.current) {
      setNewContent(editorRef.current.innerHTML);
    }
    setIsInlineImgModalOpen(false);
  };

  const insertInlineImageDataUrl = (dataUrl: string, altText: string) => {
    if (!dataUrl) return;

    if (savedSelectionRangeRef.current) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedSelectionRangeRef.current);
      }
    } else if (editorRef.current) {
      editorRef.current.focus();
    }

    const htmlToInsert = `<figure class="my-6 mx-auto block max-w-full text-center">
  <img src="${dataUrl}" class="rounded-2xl max-w-full border border-neutral-850/10 dark:border-neutral-800/40 shadow-md block mx-auto hover:scale-[1.01] transition-transform duration-300 pointer-events-auto display-inline-img" referrerpolicy="no-referrer" alt="${altText || "Uploaded image"}" />
</figure><p><br/></p>`;

    document.execCommand("insertHTML", false, htmlToInsert);
    if (editorRef.current) {
      setNewContent(editorRef.current.innerHTML);
    }
    setIsInlineImgModalOpen(false);
  };

  // Categories List
  const categoriesList = [
    "All Articles",
    "Video Downloading Guides",
    "Social Media Growth",
    "Content Creation",
    "Creator Tools & Reviews",
    "Social Media News & Updates"
  ];

  // States for category-based filtering and search
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  // States for Link Inserter
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [targetLinkUrl, setTargetLinkUrl] = useState("");
  const [targetLinkText, setTargetLinkText] = useState("");
  const [isExternalLink, setIsExternalLink] = useState(true);
  const savedSelectionRangeRef = useRef<Range | null>(null);

  const openLinkEditor = () => {
    const selection = window.getSelection();
    let selectedText = "";
    if (selection && selection.rangeCount > 0) {
      savedSelectionRangeRef.current = selection.getRangeAt(0).cloneRange();
      selectedText = selection.toString();
    } else {
      savedSelectionRangeRef.current = null;
    }
    setTargetLinkText(selectedText);
    setTargetLinkUrl("");
    setIsExternalLink(true);
    setIsLinkModalOpen(true);
  };

  const insertLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetLinkUrl) {
      setIsLinkModalOpen(false);
      return;
    }

    let finalUrl = targetLinkUrl.trim();
    if (isExternalLink) {
      if (!/^https?:\/\//i.test(finalUrl)) {
        finalUrl = `https://${finalUrl}`;
      }
    } else {
      if (!finalUrl.startsWith("/") && !finalUrl.startsWith("#") && !/^https?:\/\//i.test(finalUrl)) {
        finalUrl = `/${finalUrl}`;
      }
    }

    if (savedSelectionRangeRef.current) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedSelectionRangeRef.current);
      }
    } else if (editorRef.current) {
      editorRef.current.focus();
    }

    const displayText = targetLinkText.trim() || targetLinkUrl.trim();
    const linkHTML = `<a href="${finalUrl}" class="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 underline font-semibold transition-colors" target="${isExternalLink ? "_blank" : "_self"}" rel="${isExternalLink ? "nofollow noopener noreferrer" : ""}">${displayText}</a>`;

    document.execCommand("insertHTML", false, linkHTML);
    if (editorRef.current) {
      setNewContent(editorRef.current.innerHTML);
    }

    setIsLinkModalOpen(false);
    setTargetLinkUrl("");
    setTargetLinkText("");
  };

  // States for Video Embedder
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoInput, setVideoInput] = useState("");
  const [videoAspectRatio, setVideoAspectRatio] = useState("16/9");

  const openVideoEditor = () => {
    setVideoInput("");
    setIsVideoModalOpen(true);
  };

  const parseVideoEmbed = (input: string): string => {
    const trimmed = input.trim();
    if (!trimmed) return "";

    // If it's already an iframe or raw video tags
    if (trimmed.startsWith("<iframe") || trimmed.startsWith("<video")) {
      return trimmed;
    }

    // YouTube Match patterns (regular watch link, shorts, youtu.be, embed, etc.)
    const ytMatch = trimmed.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/i);
    if (ytMatch) {
      const videoId = ytMatch[1];
      return `<div class="relative w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800" style="aspect-ratio: ${videoAspectRatio}; max-width: 800px; margin: 1.5rem auto;">
  <iframe 
    src="https://www.youtube.com/embed/${videoId}" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen
    class="absolute top-0 left-0 w-full h-full"
  ></iframe>
</div>`;
    }

    // Vimeo URL match patterns
    const vimeoMatch = trimmed.match(/(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/i);
    if (vimeoMatch) {
      const videoId = vimeoMatch[1];
      return `<div class="relative w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800" style="aspect-ratio: ${videoAspectRatio}; max-width: 800px; margin: 1.5rem auto;">
  <iframe 
    src="https://player.vimeo.com/video/${videoId}" 
    title="Vimeo video player" 
    frameborder="0" 
    allow="autoplay; fullscreen; picture-in-picture" 
    allowfullscreen
    class="absolute top-0 left-0 w-full h-full"
  ></iframe>
</div>`;
    }

    // General Direct MP4 / WebM video link
    if (/\.(mp4|webm|ogg)/i.test(trimmed)) {
      return `<div class="relative w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800" style="aspect-ratio: ${videoAspectRatio}; max-width: 800px; margin: 1.5rem auto;">
  <video controls class="absolute top-0 left-0 w-full h-full object-cover">
    <source src="${trimmed}" type="video/${trimmed.split('.').pop()?.toLowerCase() || 'mp4'}" />
    Your browser does not support the video tag.
  </video>
</div>`;
    }

    // Generic link as an iframe fallback
    if (/^https?:\/\//i.test(trimmed)) {
      return `<div class="relative w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800" style="aspect-ratio: ${videoAspectRatio}; max-width: 800px; margin: 1.5rem auto;">
  <iframe src="${trimmed}" class="absolute top-0 left-0 w-full h-full" frameborder="0" allowfullscreen></iframe>
</div>`;
    }

    return "";
  };

  const insertVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const embedHTML = parseVideoEmbed(videoInput);
    if (!embedHTML) {
      setIsVideoModalOpen(false);
      return;
    }

    if (editorRef.current) {
      editorRef.current.focus();
    }

    // Pad with newline paragraphs so that users can easily click and type after the embed block
    const finalHTML = `<p><br></p>${embedHTML}<p><br></p>`;

    document.execCommand("insertHTML", false, finalHTML);
    if (editorRef.current) {
      setNewContent(editorRef.current.innerHTML);
    }

    setIsVideoModalOpen(false);
    setVideoInput("");
  };

  // Click outside to close category menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditorClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      // Remove visual outlines from older selected images
      if (editorRef.current) {
        editorRef.current.querySelectorAll("img").forEach(img => {
          img.classList.remove("selected-for-resize");
        });
      }
      
      // Select new clicked image
      const clickedImg = target as HTMLImageElement;
      clickedImg.classList.add("selected-for-resize");
      setSelectedEditorImg(clickedImg);
    } else {
      // Clear outline selections on anything else
      if (editorRef.current) {
        editorRef.current.querySelectorAll("img").forEach(img => {
          img.classList.remove("selected-for-resize");
        });
      }
      setSelectedEditorImg(null);
    }
  };

  const resizeSelectedImage = (widthPercent: string) => {
    if (selectedEditorImg) {
      selectedEditorImg.style.width = widthPercent;
      selectedEditorImg.style.maxWidth = "100%";
      selectedEditorImg.style.height = "auto";
      if (editorRef.current) {
        setNewContent(editorRef.current.innerHTML);
      }
    }
  };

  const alignSelectedImage = (align: "left" | "center" | "right") => {
    if (selectedEditorImg) {
      if (align === "left") {
        selectedEditorImg.style.margin = "1.5rem auto 1.5rem 0";
        selectedEditorImg.style.display = "block";
      } else if (align === "right") {
        selectedEditorImg.style.margin = "1.5rem 0 1.5rem auto";
        selectedEditorImg.style.display = "block";
      } else {
        selectedEditorImg.style.margin = "1.5rem auto";
        selectedEditorImg.style.display = "block";
      }
      if (editorRef.current) {
        setNewContent(editorRef.current.innerHTML);
      }
    }
  };

  const deleteSelectedImage = () => {
    if (selectedEditorImg) {
      selectedEditorImg.remove();
      setSelectedEditorImg(null);
      if (editorRef.current) {
        setNewContent(editorRef.current.innerHTML);
      }
    }
  };

  // Suggested high quality unsplash images for fast 1-click inserting
  const COVER_TEMPLATES = [
    { name: "Camera Gear", url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000&auto=format&fit=crop&q=80" },
    { name: "Creator Desk", url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&auto=format&fit=crop&q=80" },
    { name: "Neon Analytics", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80" },
    { name: "Repurposing", url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1000&auto=format&fit=crop&q=80" },
  ];

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blog/posts");
      if (res.ok) {
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (jsonErr) {
          if (text.trim().toLowerCase().startsWith("<!doctype") || text.trim().toLowerCase().startsWith("<html")) {
            setErrorMessage("Backend offline: This blog requires a full-stack Node.js server (e.g., Render Web Service) to host the Express API endpoints correctly.");
            return;
          }
          throw jsonErr;
        }
        setPosts(data);
      } else {
        setErrorMessage("Failed to load blog posts. Please refresh.");
      }
    } catch (e) {
      setErrorMessage("Network error connecting to social blog API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // Check local storage for persistent login token
    const savedToken = localStorage.getItem("blog_admin_token");
    if (savedToken === "SUPER_SECRET_ADMIN_TOKEN_123") {
      setIsLoggedIn(true);
      setAdminToken(savedToken);
    }
  }, []);

  // Synchronize slug from URL Search Params or pathname to automatically open/view activeArticle
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    let slug = params.get("slug");

    // Also look at pathname for clean permalinks: /blog/:slug
    if (!slug) {
      const parts = window.location.pathname.split("/").filter(Boolean);
      if (parts[0] === "blog" && parts[1]) {
        slug = parts[1];
      }
    }

    // If there is no slug in the URL on load, consider initialization complete
    if (!slug) {
      setHasInitializedFromUrl(true);
      return;
    }

    // Wait until posts are successfully loaded
    if (posts.length > 0) {
      const match = posts.find((p) => p.slug === slug);
      if (match) {
        setActiveArticle(match);
      }
      setHasInitializedFromUrl(true);
    }
  }, [posts]);

  // Synchronize URL path with activeArticle changes
  useEffect(() => {
    if (typeof window === "undefined" || !hasInitializedFromUrl) return;
    const params = new URLSearchParams(window.location.search);
    let currentSlug = params.get("slug");
    if (!currentSlug) {
      const parts = window.location.pathname.split("/").filter(Boolean);
      if (parts[0] === "blog" && parts[1]) {
        currentSlug = parts[1];
      }
    }
    
    if (activeArticle) {
      if (currentSlug !== activeArticle.slug) {
        window.history.pushState(null, "", `/blog/${activeArticle.slug}`);
      }
      
      // Dynamic SEO tag injection for dynamic single post view
      document.title = `${activeArticle.title} - SaveKlip Blog`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", activeArticle.excerpt || `${activeArticle.title}. Read the full article on SaveKlip Blog.`);
      }
      let canonical = document.querySelector("link[rel='canonical']");
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", `https://www.saveklip.com/blog/${activeArticle.slug}`);
    } else {
      if (currentSlug || window.location.pathname !== "/blog") {
        window.history.pushState(null, "", "/blog");
      }

      // Return to baseline Blog SEO tags
      document.title = "SaveKlip Blog: Tips, Tools & Tutorials for Video Creators";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", "Explore the SaveKlip blog for up-to-date tutorials, creative strategies, and advice regarding TikTok, Instagram, content creation, and media downloads.");
      }
      let canonical = document.querySelector("link[rel='canonical']");
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", "https://www.saveklip.com/blog");
    }
  }, [activeArticle, hasInitializedFromUrl]);

  // Listen to popstate event to synchronize active article on Back/Forward clicks
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handlePopStateStatus = () => {
      const params = new URLSearchParams(window.location.search);
      let slug = params.get("slug");
      if (!slug) {
        const parts = window.location.pathname.split("/").filter(Boolean);
        if (parts[0] === "blog" && parts[1]) {
          slug = parts[1];
        }
      }
      if (slug && posts.length > 0) {
        const match = posts.find((p) => p.slug === slug);
        if (match) {
          setActiveArticle(match);
          return;
        }
      }
      setActiveArticle(null);
    };
    window.addEventListener("popstate", handlePopStateStatus);
    return () => window.removeEventListener("popstate", handlePopStateStatus);
  }, [posts]);

  // Handle Login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/blog/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        if (text.trim().toLowerCase().startsWith("<!doctype") || text.trim().toLowerCase().startsWith("<html")) {
          setLoginError("Login failed: Backend offline. Ensure full-stack Node.js environment is configured.");
          return;
        }
        throw jsonErr;
      }

      if (res.ok && data.success) {
        setIsLoggedIn(true);
        setAdminToken(data.token);
        localStorage.setItem("blog_admin_token", data.token);
        setUsername("");
        setPassword("");
        setSuccessMessage("Admin authentications verified successfully!");
        setTimeout(() => setSuccessMessage(""), 4000);
      } else {
        setLoginError(data.error || "Invalid credentials. Try again.");
      }
    } catch (err) {
      setLoginError("Failed to communicate with authentication services.");
    }
  };

  // Sign out
  const handleLogout = () => {
    setIsLoggedIn(false);
    setAdminToken("");
    localStorage.removeItem("blog_admin_token");
    localStorage.removeItem("blog_last_active");
    setSuccessMessage("Logged out successfully.");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Automatic logout on 1 hour of overall inactivity
  useEffect(() => {
    if (!isLoggedIn) return;

    const INACTIVITY_LIMIT = 60 * 60 * 1000; // 1 hour in ms
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      
      // Keep state stored in localStorage for multi-tab check
      localStorage.setItem("blog_last_active", Date.now().toString());
      
      timeoutId = setTimeout(() => {
        handleLogout();
        setErrorMessage("Signed out due to 1 hour of inactivity.");
        setTimeout(() => setErrorMessage(""), 5000);
      }, INACTIVITY_LIMIT);
    };

    // Initialize the timer on mount
    resetTimer();

    // Listen to standard trigger events
    const events = ["mousedown", "keydown", "scroll", "touchstart", "mousemove"];
    
    // Throttle helper to avoid spamming localStorage writes
    let lastThrottledWrite = 0;
    const throttledReset = () => {
      const now = Date.now();
      if (now - lastThrottledWrite > 5000) { // throttle write every 5 seconds
        lastThrottledWrite = now;
        resetTimer();
      } else {
        // Just recreate the local web-browser timeout
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          handleLogout();
          setErrorMessage("Signed out due to 1 hour of inactivity.");
          setTimeout(() => setErrorMessage(""), 5000);
        }, INACTIVITY_LIMIT);
      }
    };

    events.forEach(event => {
      window.addEventListener(event, throttledReset);
    });

    // Check last active timestamp every 10 seconds to handle computer sleep states or multi-tab scenarios
    const intervalId = setInterval(() => {
      const lastActiveStr = localStorage.getItem("blog_last_active");
      if (lastActiveStr) {
        const lastActive = parseInt(lastActiveStr, 10);
        if (Date.now() - lastActive >= INACTIVITY_LIMIT) {
          handleLogout();
          setErrorMessage("Signed out due to 1 hour of inactivity.");
          setTimeout(() => setErrorMessage(""), 5000);
        }
      }
    }, 10000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      clearInterval(intervalId);
      events.forEach(event => {
        window.removeEventListener(event, throttledReset);
      });
    };
  }, [isLoggedIn]);

  // Handle start editing a post
  const handleStartEdit = (post: BlogPost) => {
    setEditingPost(post);
    setNewTitle(post.title);
    setNewCategory(post.category);
    setNewAuthor(post.author);
    setNewExcerpt(post.excerpt || "");
    setNewImageUrl(post.imageUrl || "");
    setCoverInputMode(post.imageUrl && post.imageUrl.startsWith("data:") ? "upload" : "url");
    setNewContent(post.content || "");
    
    // Set content in the Rich Text Editor div
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = post.content || "";
        editorRef.current.focus();
      }
    }, 50);

    // Smooth scroll back to top of admin control container so they can see the edit form
    const formElement = document.getElementById("admin-draft-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setNewTitle("");
    setNewContent("");
    setNewExcerpt("");
    setNewImageUrl("");
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
  };

  // Form submit for publishing new article or saving edit
  const handlePublish = async (e: React.FormEvent | null, forceStatus?: "published" | "draft") => {
    if (e) e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const currentEditorContent = editorRef.current ? editorRef.current.innerHTML : newContent;

    if (!newTitle.trim() || !currentEditorContent.trim() || currentEditorContent === "<p><br></p>" || currentEditorContent === "<br>") {
      setErrorMessage("Please fill out the title and content fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const finalStatus = forceStatus || (editingPost?.status) || "published";

      const postPayload = {
        token: adminToken,
        title: newTitle,
        content: currentEditorContent,
        excerpt: newExcerpt,
        category: newCategory,
        imageUrl: newImageUrl || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&auto=format&fit=crop&q=80",
        author: newAuthor,
        status: finalStatus
      };

      const url = editingPost ? `/api/blog/posts/${editingPost.id}` : "/api/blog/posts";
      const method = editingPost ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postPayload)
      });

      const text = await res.text();

      if (!res.ok) {
        let msg = `Failed to ${editingPost ? "update" : "publish"}: `;
        try {
          const errData = JSON.parse(text);
          msg += errData.error || errData.message || `Error ${res.status}`;
        } catch {
          if (res.status === 413) {
            msg += "The uploaded image or content text is too large. Please use an optimized image under 1-2MB.";
          } else if (text.trim().toLowerCase().startsWith("<!doctype") || text.trim().toLowerCase().startsWith("<html")) {
            msg += "Backend offline or returned an HTML error screen.";
          } else {
            msg += text.slice(0, 100) || `Error ${res.status}`;
          }
        }
        setErrorMessage(msg);
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        setErrorMessage("Failed to parse server response format.");
        return;
      }

      if (editingPost) {
        setPosts((prev) => prev.map((p) => p.id === editingPost.id ? data : p));
        setSuccessMessage(finalStatus === "draft" ? "Draft updated successfully!" : "Your article was updated and published successfully!");
        setEditingPost(null);
      } else {
        setPosts((prev) => [data, ...prev]);
        setSuccessMessage(finalStatus === "draft" ? "Draft saved successfully!" : "Your fantastic article was published successfully!");
      }
      // Reset form variables
      setNewTitle("");
      setNewContent("");
      setNewExcerpt("");
      setNewImageUrl("");
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err) {
      setErrorMessage("Network loss during publication dispatch.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle post deletion trigger
  const handleDeletePost = (id: string) => {
    setPostToDelete(id);
  };

  // Perform actual confirmed delete request
  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    const id = postToDelete;
    setPostToDelete(null);
    try {
      const res = await fetch(`/api/blog/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": adminToken
        }
      });
      if (res.ok) {
        setPosts((prev) => prev.filter(p => p.id !== id));
        setSuccessMessage("Post deleted successfully.");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage("Deletion rejected by origin server nodes.");
      }
    } catch (err) {
      setErrorMessage("Network error during deletion.");
    }
  };

  // Utility to convert raw dates to local format
  const formatDate = (isoStr: string) => {
    try {
      const date = new Date(isoStr);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch (e) {
      return "Recently";
    }
  };

  return (
    <div className={`space-y-8 max-w-5xl mx-auto min-h-[600px] transition-all`}>
      {/* Toast Notification */}
      <AnimatePresence>
        {(successMessage || errorMessage) && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 max-w-sm"
          >
            {successMessage && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-950/95 border border-emerald-500/30 text-emerald-300 shadow-xl shadow-emerald-950/20">
                <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold">{successMessage}</span>
              </div>
            )}
            {errorMessage && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-950/95 border border-red-500/30 text-red-300 shadow-xl shadow-red-950/20">
                <AlertCircle size={18} className="text-red-400 shrink-0" />
                <span className="text-xs font-semibold">{errorMessage}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header of Blog Page */}
      <div className={`flex ${activeArticle || isAdminMode ? "flex-row items-center justify-end pb-4 border-b" : "flex-col sm:flex-row sm:items-center justify-between pb-6 border-b"} gap-4 border-neutral-800/10 dark:border-neutral-800/40`}>
        {!activeArticle && !isAdminMode && (
          <div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Grow Faster. Create Better. Reach More People.
            </h2>
            <p className={`text-xs sm:text-sm ${isDarkMode ? "text-neutral-400" : "text-slate-500"} mt-1`}>
              Explore expert guides, creator strategies, and social media insights designed to help your content stand out.
            </p>
          </div>
        )}

        {/* Back, Admin state toggles, and Category Hamburger Dropdown */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Hamburger Category Menu Dropdown */}
          {!isAdminMode && (
            <div className="relative" ref={categoryMenuRef}>
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                  isCategoryMenuOpen
                    ? "bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-500/10"
                    : isDarkMode
                    ? "bg-neutral-900/80 hover:bg-neutral-800 border-neutral-800 text-neutral-300"
                    : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                }`}
                title="Blog Categories Menu"
              >
                <Menu size={13} />
                <span>{selectedCategory === "All Articles" ? "Categories" : selectedCategory}</span>
              </button>

              <AnimatePresence>
                {isCategoryMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.12 }}
                    className={`absolute left-0 mt-2 w-64 max-w-[calc(100vw-32px)] rounded-2xl border p-2 shadow-xl z-50 ${
                      isDarkMode
                        ? "bg-neutral-950 border-neutral-800 text-neutral-300 shadow-purple-950/25"
                        : "bg-white border-slate-200 text-slate-700 shadow-slate-200/50"
                    }`}
                  >
                    <div className={`px-2.5 py-1.5 border-b mb-1.5 text-[10px] font-extrabold uppercase tracking-widest ${
                      isDarkMode ? "border-neutral-850 text-neutral-500" : "border-slate-100 text-slate-400"
                    }`}>
                      Blog Categories
                    </div>
                    <div className="max-h-64 overflow-y-auto space-y-0.5">
                      {categoriesList.map((category) => {
                        const isActive = selectedCategory === category;
                        return (
                          <button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(category);
                              setIsCategoryMenuOpen(false);
                              if (activeArticle) {
                                setActiveArticle(null);
                              }
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                              isActive
                                ? isDarkMode
                                  ? "bg-purple-500/15 border border-purple-500/30 text-purple-400"
                                  : "bg-purple-50 border border-purple-100 text-purple-700 font-extrabold"
                                : isDarkMode
                                ? "border border-transparent hover:bg-neutral-900 text-neutral-400 hover:text-white"
                                : "border border-transparent hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            <span>{category}</span>
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {!isAdminMode && (
            <button
              onClick={() => {
                if (activeArticle) {
                  setActiveArticle(null);
                } else {
                  setCurrentPage("home");
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                isDarkMode 
                  ? "bg-neutral-900/80 hover:bg-neutral-800 border-neutral-800 text-neutral-300" 
                  : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
              }`}
            >
              <ArrowLeft size={13} />
              <span>{activeArticle ? "Back to Articles" : (t.home || "Home Downloader")}</span>
            </button>
          )}

          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
              isAdminMode
                ? "bg-purple-600 border-purple-500 text-white"
                : isDarkMode
                ? "bg-neutral-950 border-neutral-800 hover:bg-neutral-900 text-purple-400 hover:text-purple-300"
                : "bg-purple-50 border-purple-100 hover:bg-purple-100/70 text-purple-700"
            }`}
          >
            {isLoggedIn ? <Unlock size={13} /> : <Lock size={13} />}
            <span>{isAdminMode ? "Exit Admin Panel" : "Admin Dashboard"}</span>
          </button>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                isDarkMode 
                  ? "bg-red-950/40 hover:bg-red-900/30 border-red-500/20 text-red-400 hover:text-red-300 animate-fade-in" 
                  : "bg-red-50 hover:bg-red-100/80 border-red-105 text-red-700 animate-fade-in"
              }`}
              title="Disconnect and log out of admin session"
            >
              <LogOut size={13} />
              <span>Log Out</span>
            </button>
          )}
        </div>
      </div>

      {/* ADMIN CONTROLS CONTAINER */}
      <AnimatePresence mode="wait">
        {isAdminMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className={`p-6 rounded-3xl border mb-8 transition-all ${
              isDarkMode 
                ? "bg-neutral-950/80 border-purple-500/20 shadow-lg shadow-purple-950/10" 
                : "bg-purple-50/45 border-purple-100 shadow-md shadow-purple-500/5"
            }`}>
              
              {!isLoggedIn ? (
                /* Admin Login View */
                <div className="max-w-md mx-auto py-5 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="mx-auto w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center border border-purple-500/25">
                      <Lock size={18} />
                    </div>
                    <h3 className={`text-md font-extrabold ${isDarkMode ? "text-neutral-200" : "text-slate-800"}`}>
                      Admin Portal Authenticate
                    </h3>
                    <p className={`text-[11px] ${isDarkMode ? "text-neutral-500" : "text-slate-500"}`}>
                      Sign in once to publish, modify and maintain the viral creator blog.
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    {loginError && (
                      <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/20 text-red-300 text-xs flex items-center gap-2.5">
                        <AlertCircle size={14} className="shrink-0" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? "text-neutral-500" : "text-slate-500"}`}>
                          Username
                        </label>
                        <input
                          type="text"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Username"
                          className={`w-full py-2.5 px-3.5 text-xs rounded-xl border focus:outline-none focus:ring-1 transition-all ${
                            isDarkMode 
                              ? "bg-neutral-900 border-neutral-800 text-white focus:border-purple-500 focus:ring-purple-500" 
                              : "bg-white border-slate-200 focus:border-purple-500 focus:ring-purple-500 text-slate-850"
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? "text-neutral-500" : "text-slate-500"}`}>
                          Password
                        </label>
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className={`w-full py-2.5 px-3.5 text-xs rounded-xl border focus:outline-none focus:ring-1 transition-all ${
                            isDarkMode 
                              ? "bg-slate-900 border-slate-800 text-white focus:border-[#14B8A6] focus:ring-[#14B8A6]" 
                              : "bg-white border-slate-200 focus:border-[#14B8A6] focus:ring-[#14B8A6] text-slate-850"
                          }`}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-3.5 text-white font-bold rounded-xl text-xs tracking-wider transition-all cursor-pointer active:scale-98 ${
                        isDarkMode
                          ? "bg-[#14B8A6] hover:bg-[#0D9488] text-[#0F172A]"
                          : "bg-[#0F172A] hover:bg-slate-850 text-white"
                      }`}
                    >
                      Authenticate Admin Node
                    </button>
                  </form>
                </div>
              ) : (
                /* Admin Dashboard: Create & Manage Blog Posts */
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b pb-4 border-slate-800/10 dark:border-slate-800/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20">
                        <Unlock size={16} />
                      </div>
                      <div>
                        <h3 className={`text-sm font-extrabold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                          Dashboard • Post Creator Node
                        </h3>
                        <p className="text-[10px] text-purple-500 font-bold uppercase tracking-wider">
                          Logged in under ID: OdogwuChukwuma01
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className={`px-3.5 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer border flex items-center gap-1.5 ${
                        isDarkMode
                          ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-400 hover:text-white"
                          : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <LogOut size={12} />
                      <span>Log Out Admin</span>
                    </button>
                  </div>

                  <div className="space-y-12">
                    {/* Create Form */}
                    <form id="admin-draft-form" onSubmit={handlePublish} className="space-y-4 w-full">
                      <h4 className={`text-xs font-extrabold uppercase tracking-widest ${isDarkMode ? "text-neutral-400" : "text-slate-555"}`}>
                        {editingPost ? "✏️ Edit Blog Article" : "✍️ Draft Fresh Article"}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? "text-neutral-500" : "text-slate-500"}`}>
                            Category
                          </label>
                          <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className={`w-full py-2.5 px-3 rounded-xl border focus:outline-none transition-all text-xs ${
                              isDarkMode 
                                ? "bg-neutral-900 border-neutral-800 text-white focus:border-purple-500" 
                                : "bg-white border-slate-200 focus:border-purple-500 text-slate-850"
                            }`}
                          >
                            <option value="Video Downloading Guides">Video Downloading Guides</option>
                            <option value="Social Media Growth">Social Media Growth</option>
                            <option value="Content Creation">Content Creation</option>
                            <option value="Creator Tools & Reviews">Creator Tools & Reviews</option>
                            <option value="Social Media News & Updates">Social Media News & Updates</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? "text-neutral-500" : "text-slate-500"}`}>
                            Author Name / Pen Name
                          </label>
                          <input
                            type="text"
                            required
                            value={newAuthor}
                            onChange={(e) => setNewAuthor(e.target.value)}
                            placeholder="Social Ninja"
                            className={`w-full py-2.5 px-3 bg-neutral-950 text-xs rounded-xl border focus:outline-none transition-all ${
                              isDarkMode 
                                ? "bg-neutral-900 border-neutral-800 text-white focus:border-purple-500" 
                                : "bg-white border-slate-200 focus:border-purple-500 text-slate-850"
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? "text-neutral-500" : "text-slate-500"}`}>
                          Article Title
                        </label>
                        <input
                          type="text"
                          required
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="e.g. How to Explode Your Reach with a Single Intelligent Video Hook"
                          className={`w-full py-2.5 px-3 bg-neutral-950 text-xs rounded-xl border focus:outline-none transition-all ${
                            isDarkMode 
                              ? "bg-neutral-900 border-neutral-800 text-white focus:border-purple-500" 
                              : "bg-white border-slate-200 focus:border-purple-500 text-slate-850"
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? "text-neutral-500" : "text-slate-500"}`}>
                          Short Excerpt (Summary for card list, optional)
                        </label>
                        <input
                          type="text"
                          value={newExcerpt}
                          onChange={(e) => setNewExcerpt(e.target.value)}
                          placeholder="Short hook to capture interest before user clicks to read..."
                          className={`w-full py-2.5 px-3 bg-neutral-950 text-xs rounded-xl border focus:outline-none transition-all ${
                            isDarkMode 
                              ? "bg-neutral-900 border-neutral-800 text-white focus:border-purple-500" 
                              : "bg-white border-slate-200 focus:border-purple-500 text-slate-850"
                          }`}
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className={`block text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-neutral-400" : "text-slate-600"}`}>
                            Article Cover Image
                          </label>
                          <span className={`text-[9px] font-bold py-0.5 px-2 rounded bg-purple-500/10 ${isDarkMode ? "text-purple-400" : "text-purple-700"}`}>
                            📐 Rec Size: 1200 x 630 px (1.91:1)
                          </span>
                        </div>
                        
                        <p className={`text-[10px] mb-3 leading-relaxed ${isDarkMode ? "text-neutral-500" : "text-slate-500"}`}>
                          Ensure your cover image uses high-resolution landscape proportions so it renders crisp and aligned in the blog feed and as the reader banner.
                        </p>

                        {/* Mode Selection Tabs */}
                        <div className="flex items-center gap-1.5 mb-3 select-none">
                          <button
                            type="button"
                            onClick={() => setCoverInputMode("upload")}
                            className={`py-1.5 px-3 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                              coverInputMode === "upload"
                                ? "bg-purple-600 text-white shadow-sm"
                                : isDarkMode
                                ? "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
                                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`}
                          >
                            Upload File
                          </button>
                          <button
                            type="button"
                            onClick={() => setCoverInputMode("url")}
                            className={`py-1.5 px-3 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                              coverInputMode === "url"
                                ? "bg-purple-600 text-white shadow-sm"
                                : isDarkMode
                                ? "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
                                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`}
                          >
                            Paste URL
                          </button>
                        </div>

                        {/* Input Fields depending on Mode */}
                        {coverInputMode === "upload" ? (
                          <div className="space-y-2">
                            <input
                              type="file"
                              ref={coverFileInputRef}
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setErrorMessage("Optimizing and resizing cover image...");
                                try {
                                  const compressedDataUrl = await compressImage(file, 1200, 800, 0.75);
                                  setNewImageUrl(compressedDataUrl);
                                  setSuccessMessage("Cover image uploaded and optimized successfully!");
                                  setTimeout(() => setSuccessMessage(""), 2500);
                                } catch (err) {
                                  setErrorMessage("Failed to optimize cover image.");
                                }
                              }}
                            />
                            <div
                              onClick={() => coverFileInputRef.current?.click()}
                              className={`py-6 px-4 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all ${
                                newImageUrl && newImageUrl.startsWith("data:")
                                  ? "border-emerald-500/35 bg-emerald-500/5 hover:bg-emerald-500/10"
                                  : isDarkMode
                                  ? "border-neutral-800 bg-neutral-950/40 hover:border-purple-500/40 hover:bg-neutral-900/40"
                                  : "border-slate-200 bg-slate-50/50 hover:border-purple-500/35 hover:bg-slate-100/50"
                              }`}
                            >
                              <div className="flex flex-col items-center justify-center gap-1.5">
                                <Upload size={16} className={isDarkMode ? "text-neutral-400" : "text-slate-500"} />
                                <span className={`text-[11px] font-bold ${isDarkMode ? "text-neutral-300" : "text-slate-700"}`}>
                                  {newImageUrl && newImageUrl.startsWith("data:") ? "✓ Cover Image Uploaded! Click to Replace" : "Click to select cover photo file"}
                                </span>
                                <span className={`text-[9px] ${isDarkMode ? "text-neutral-550" : "text-slate-400"}`}>
                                  Supports PNG, JPG, WEBP formats up to 8MB max
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            placeholder="Paste external image URL (e.g. https://images.unsplash.com/...)"
                            className={`w-full py-2.5 px-3 bg-neutral-950 text-xs rounded-xl border focus:outline-none transition-all ${
                              isDarkMode 
                                ? "bg-neutral-900 border-neutral-800 text-white focus:border-purple-500" 
                                : "bg-white border-slate-200 focus:border-purple-500 text-slate-850"
                            }`}
                          />
                        )}

                        {/* Image Preview & Quick template selections */}
                        {newImageUrl && (
                          <div className="mt-3 relative rounded-xl overflow-hidden border border-neutral-850/20 max-h-32 group">
                            <img
                              src={newImageUrl}
                              alt="Cover preview"
                              referrerPolicy="no-referrer"
                              className="w-full h-24 object-cover filter brightness-75"
                            />
                            {getImageSourceText(newImageUrl) && (
                              <div className="absolute top-2 right-2 z-10 select-none">
                                <span className="font-mono text-[8px] uppercase tracking-wider bg-black/75 backdrop-blur-md text-neutral-350 rounded px-1.5 py-0.5 border border-white/10 shrink-0">
                                  Source: {getImageSourceText(newImageUrl)}
                                </span>
                              </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 bg-neutral-950/80 flex items-center justify-between px-3 py-1.5 whitespace-nowrap">
                              <span className="text-[10px] font-bold text-white truncate max-w-[70%]">
                                Live Cover Thumbnail Preview
                              </span>
                              <button
                                type="button"
                                onClick={() => setNewImageUrl("")}
                                className="p-1 rounded bg-black/60 hover:bg-red-650 hover:text-white text-neutral-300 transition-colors text-[9px] font-extrabold uppercase px-2 cursor-pointer"
                              >
                                Clear Cover
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Covered image quick selects */}
                        <div className="mt-2 text-wrap flex items-center gap-1.5">
                          <span className={`text-[10px] font-semibold tracking-wide ${isDarkMode ? "text-neutral-500" : "text-slate-400"}`}>
                            Quick presets:
                          </span>
                          {COVER_TEMPLATES.map((tmpl) => (
                            <button
                              key={tmpl.name}
                              type="button"
                              onClick={() => {
                                setNewImageUrl(tmpl.url);
                                setCoverInputMode("url");
                              }}
                              className={`text-[9px] font-bold py-1 px-2.5 rounded-lg border transition-all cursor-pointer ${
                                newImageUrl === tmpl.url
                                  ? "bg-purple-950/60 border-purple-500 text-purple-300"
                                  : isDarkMode
                                  ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-400"
                                  : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600"
                              }`}
                            >
                              {tmpl.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className={`block text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-neutral-300" : "text-slate-650"}`}>
                            Main Article Content (Rich WYSIWYG Editor)
                          </label>
                          <span className={`text-[9px] font-semibold ${isDarkMode ? "text-purple-400" : "text-purple-700"}`}>
                            Admin Word Processor Mode Active
                          </span>
                        </div>

                        {/* Custom Formatting Toolbar */}
                        <div className={`p-2.5 rounded-t-2xl border-t border-x flex flex-wrap items-center justify-between gap-3 ${
                          isDarkMode 
                            ? "bg-neutral-950/90 border-neutral-800" 
                            : "bg-slate-50 border-slate-200"
                        }`}>
                          
                          {/* Formatting buttons group */}
                          <div className="flex flex-wrap items-center gap-1">
                            <button
                              type="button"
                              title="Bold text"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                document.execCommand("bold");
                                setNewContent(editorRef.current?.innerHTML || "");
                              }}
                              className={`p-1.5 rounded-lg border transition-all hover:scale-105 cursor-pointer ${
                                isDarkMode 
                                  ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white" 
                                  : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900"
                              }`}
                            >
                              <Bold size={13} className="stroke-[2.5px]" />
                            </button>

                            <button
                              type="button"
                              title="Italic text"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                document.execCommand("italic");
                                setNewContent(editorRef.current?.innerHTML || "");
                              }}
                              className={`p-1.5 rounded-lg border transition-all hover:scale-105 cursor-pointer ${
                                isDarkMode 
                                  ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white" 
                                  : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900"
                              }`}
                            >
                              <Italic size={13} className="stroke-[2.5px]" />
                            </button>

                            <button
                              type="button"
                              title="Underline text"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                document.execCommand("underline");
                                setNewContent(editorRef.current?.innerHTML || "");
                              }}
                              className={`p-1.5 rounded-lg border transition-all hover:scale-105 cursor-pointer ${
                                isDarkMode 
                                  ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white" 
                                  : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900"
                              }`}
                            >
                              <Underline size={13} className="stroke-[2.5px]" />
                            </button>

                            <button
                              type="button"
                              title="Strikethrough text"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                document.execCommand("strikeThrough");
                                setNewContent(editorRef.current?.innerHTML || "");
                              }}
                              className={`p-1.5 rounded-lg border transition-all hover:scale-105 cursor-pointer ${
                                isDarkMode 
                                  ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white" 
                                  : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900"
                              }`}
                            >
                              <Strikethrough size={13} className="stroke-[2.5px]" />
                            </button>

                            <button
                              type="button"
                              title="Quote section"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                document.execCommand("formatBlock", false, "blockquote");
                                setNewContent(editorRef.current?.innerHTML || "");
                              }}
                              className={`p-1.5 rounded-lg border transition-all hover:scale-105 cursor-pointer ${
                                isDarkMode 
                                  ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white" 
                                  : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900"
                              }`}
                            >
                              <Quote size={13} className="stroke-[2.5px]" />
                            </button>

                            <button
                              type="button"
                              title="Bullet List"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                document.execCommand("insertUnorderedList");
                                setNewContent(editorRef.current?.innerHTML || "");
                              }}
                              className={`p-1.5 rounded-lg border transition-all hover:scale-105 cursor-pointer ${
                                isDarkMode 
                                  ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white" 
                                  : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900"
                              }`}
                            >
                              <List size={13} className="stroke-[2.5px]" />
                            </button>

                            <button
                              type="button"
                              title="Numbered List"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                document.execCommand("insertOrderedList");
                                setNewContent(editorRef.current?.innerHTML || "");
                              }}
                              className={`p-1.5 rounded-lg border transition-all hover:scale-105 cursor-pointer ${
                                isDarkMode 
                                  ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white" 
                                  : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900"
                              }`}
                            >
                              <ListOrdered size={13} className="stroke-[2.5px]" />
                            </button>

                            <button
                              type="button"
                              title="Insert Hyperlink"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                openLinkEditor();
                              }}
                              className={`p-1.5 rounded-lg border transition-all hover:scale-105 cursor-pointer flex items-center justify-center ${
                                isDarkMode 
                                  ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white" 
                                  : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900"
                              }`}
                            >
                              <Link size={13} className="stroke-[2.5px]" />
                            </button>

                            <button
                              type="button"
                              title="Embed Video (YouTube, Vimeo, MP4)"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                openVideoEditor();
                              }}
                              className={`p-1.5 rounded-lg border transition-all hover:scale-105 cursor-pointer flex items-center justify-center ${
                                isDarkMode 
                                  ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white" 
                                  : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900"
                              }`}
                            >
                              <Video size={13} className="stroke-[2.5px]" />
                            </button>

                            <button
                              type="button"
                              title="Insert Image (Upload or URL link)"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                openInlineImageEditor();
                              }}
                              className={`p-1.5 rounded-lg border transition-all hover:scale-105 cursor-pointer flex items-center justify-center ${
                                isDarkMode 
                                  ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white" 
                                  : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900"
                              }`}
                            >
                              <ImageIcon size={13} className="stroke-[2.5px]" />
                            </button>
                          </div>

                          {/* Typography styling dropdown inputs */}
                          <div className="flex flex-wrap items-center gap-1.5 border-l border-neutral-800/10 dark:border-neutral-800/30 pl-3.5">
                            {/* Font Select */}
                            <select
                              onChange={(e) => {
                                e.preventDefault();
                                document.execCommand("fontName", false, e.target.value);
                                if (editorRef.current) {
                                  setNewContent(editorRef.current.innerHTML);
                                }
                                e.target.value = "";
                              }}
                              defaultValue=""
                              title="Apply Font Type"
                              className={`py-1 px-2 rounded-lg border text-[10px] font-bold focus:outline-none transition-all cursor-pointer ${
                                isDarkMode 
                                  ? "bg-neutral-900 border-neutral-800 text-neutral-200 focus:border-purple-500 hover:bg-neutral-850" 
                                  : "bg-white border-slate-200 text-slate-700 focus:border-purple-500 hover:bg-slate-50"
                              }`}
                            >
                              <option value="" disabled>Font Type</option>
                              <option value="Inter">Inter (Sans)</option>
                              <option value="Space Grotesk">Space Grotesk</option>
                              <option value="Playfair Display">Playfair (Serif)</option>
                              <option value="JetBrains Mono">JetBrains (Mono)</option>
                              <option value="Cinzel">Cinzel (Classic)</option>
                              <option value="Dancing Script">Dancing Script</option>
                              <option value="Pacifico">Pacifico</option>
                            </select>

                            {/* Heading/Format Select */}
                            <select
                              onChange={(e) => {
                                e.preventDefault();
                                document.execCommand("formatBlock", false, e.target.value);
                                if (editorRef.current) {
                                  setNewContent(editorRef.current.innerHTML);
                                }
                                e.target.value = "";
                              }}
                              defaultValue=""
                              title="Apply Heading Style"
                              className={`py-1 px-2 rounded-lg border text-[10px] font-bold focus:outline-none transition-all cursor-pointer ${
                                isDarkMode 
                                  ? "bg-neutral-900 border-neutral-800 text-neutral-200 focus:border-purple-500 hover:bg-neutral-850" 
                                  : "bg-white border-slate-200 text-slate-700 focus:border-purple-500 hover:bg-slate-50"
                              }`}
                            >
                              <option value="" disabled>Text Block</option>
                              <option value="p">Paragraph</option>
                              <option value="h1">Heading 1</option>
                              <option value="h2">Heading 2</option>
                              <option value="h3">Heading 3</option>
                            </select>

                            {/* Font Size Select */}
                            <select
                              onChange={(e) => {
                                e.preventDefault();
                                document.execCommand("fontSize", false, e.target.value);
                                if (editorRef.current) {
                                  setNewContent(editorRef.current.innerHTML);
                                }
                                e.target.value = "";
                              }}
                              defaultValue=""
                              title="Apply Text Size"
                              className={`py-1 px-2 rounded-lg border text-[10px] font-bold focus:outline-none transition-all cursor-pointer ${
                                isDarkMode 
                                  ? "bg-neutral-900 border-neutral-800 text-neutral-200 focus:border-purple-500 hover:bg-neutral-850" 
                                  : "bg-white border-slate-200 text-slate-700 focus:border-purple-500 hover:bg-slate-50"
                              }`}
                            >
                              <option value="" disabled>Font Size</option>
                              <option value="1">Extra Small</option>
                              <option value="2">Small</option>
                              <option value="3">Medium</option>
                              <option value="4">Large</option>
                              <option value="5">X-Large</option>
                              <option value="6">XX-Large</option>
                              <option value="7">Colossal</option>
                            </select>
                          </div>

                          {/* Interactive text color selections */}
                          <div className="flex items-center gap-1.5 border-l border-neutral-800/10 dark:border-neutral-800/30 pl-3.5">
                            <Palette size={12} className="text-purple-400" />
                            <div className="flex items-center gap-1">
                              {[
                                { name: "Default", hex: isDarkMode ? "#e5e7eb" : "#0f172a" },
                                { name: "Purple", hex: "#c084fc" },
                                { name: "Pink", hex: "#f472b6" },
                                { name: "Orange", hex: "#fb923c" },
                                { name: "Cyan", hex: "#38bdf8" },
                                { name: "Emerald", hex: "#34d399" },
                                { name: "Crimson", hex: "#f87171" }
                              ].map((c) => (
                                <button
                                  key={c.name}
                                  type="button"
                                  title={`Text Color: ${c.name}`}
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    document.execCommand("foreColor", false, c.hex);
                                    setNewContent(editorRef.current?.innerHTML || "");
                                  }}
                                  className="w-3.5 h-3.5 rounded-full border border-neutral-800/15 hover:scale-120 hover:border-purple-500 transition-transform cursor-pointer"
                                  style={{ backgroundColor: c.hex }}
                                />
                              ))}
                            </div>
                          </div>

                        </div>

                        {/* Selected Image Resize Overlay Menu */}
                        {selectedEditorImg && (
                          <div className={`p-3 border-x border-b flex flex-wrap items-center gap-3.5 transition-all text-xs animate-fade-in ${
                            isDarkMode 
                              ? "bg-neutral-900 border-neutral-800" 
                              : "bg-purple-50/70 border-slate-200"
                          }`}>
                            <div className="flex items-center gap-2">
                              <span className={`text-[9px] font-extrabold uppercase tracking-wider py-0.5 px-2 rounded-md ${
                                isDarkMode ? "bg-purple-900/40 text-purple-300 border border-purple-500/10" : "bg-purple-100 text-purple-850"
                              }`}>
                                Image Selected
                              </span>
                            </div>

                            {/* Preset Widths */}
                            <div className="flex items-center gap-1 bg-neutral-950/40 dark:bg-neutral-950 p-1 rounded-xl border border-neutral-800/10 dark:border-neutral-850/40">
                              {[
                                { label: "25%", val: "25%" },
                                { label: "50%", val: "50%" },
                                { label: "75%", val: "75%" },
                                { label: "100%", val: "100%" }
                              ].map((opt) => (
                                <button
                                  key={opt.val}
                                  type="button"
                                  onClick={() => resizeSelectedImage(opt.val)}
                                  className={`text-[9px] font-bold py-1 px-2.5 rounded-lg transition-all cursor-pointer ${
                                    selectedEditorImg.style.width === opt.val
                                      ? "bg-purple-600 text-white shadow-sm"
                                      : isDarkMode
                                      ? "text-neutral-400 hover:text-white hover:bg-neutral-900"
                                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>

                            {/* Slider control */}
                            <div className="flex items-center gap-2 border-l border-neutral-800/10 dark:border-neutral-800/40 pl-3">
                              <span className={`text-[9px] font-bold uppercase tracking-wider ${isDarkMode ? "text-neutral-450" : "text-slate-500"}`}>
                                Custom Width:
                              </span>
                              <input
                                type="range"
                                min="10"
                                max="100"
                                step="5"
                                value={parseInt(selectedEditorImg.style.width) || 100}
                                onChange={(e) => resizeSelectedImage(`${e.target.value}%`)}
                                className="w-24 h-1 cursor-ew-resize bg-purple-200 dark:bg-neutral-900 rounded-lg appearance-none accent-purple-500"
                              />
                              <span className={`font-mono text-[10px] font-bold ${isDarkMode ? "text-purple-450" : "text-purple-750"}`}>
                                {selectedEditorImg.style.width || "100%"}
                              </span>
                            </div>

                            {/* Alignment Controls */}
                            <div className="flex items-center gap-1 bg-neutral-950/40 dark:bg-neutral-950 p-1 rounded-xl border border-neutral-800/10 dark:border-neutral-850/40">
                              {[
                                { label: "Left Align", align: "left" as const },
                                { label: "Center Align", align: "center" as const },
                                { label: "Right Align", align: "right" as const }
                              ].map((opt) => (
                                <button
                                  key={opt.label}
                                  type="button"
                                  onClick={() => alignSelectedImage(opt.align)}
                                  className={`text-[9px] font-bold py-1 px-2.5 rounded-lg transition-all cursor-pointer ${
                                    isDarkMode
                                      ? "text-neutral-400 hover:text-white hover:bg-neutral-900"
                                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>

                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={deleteSelectedImage}
                              className={`p-1.5 rounded-lg border ml-auto transition-all text-[9.5px] font-bold flex items-center gap-1.5 cursor-pointer ${
                                isDarkMode
                                  ? "bg-red-950/40 border-red-500/20 text-red-400 hover:bg-red-900/30"
                                  : "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                              }`}
                            >
                              <Trash2 size={11} />
                              <span>Remove</span>
                            </button>
                          </div>
                        )}

                        {/* Editor Slate Screen */}
                        <div className="relative">
                          {/* Link Inserter Modal / Popover */}
                          <AnimatePresence>
                            {isLinkModalOpen && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className={`absolute border rounded-3xl p-5 shadow-2xl z-50 left-4 right-4 top-4 max-w-lg mx-auto ${
                                  isDarkMode
                                    ? "bg-neutral-950 border-neutral-800 text-neutral-200 shadow-purple-950/25"
                                    : "bg-white border-slate-200 text-slate-800 shadow-slate-200/50"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <Link size={16} className="text-purple-500" />
                                    <h4 className="text-xs font-extrabold uppercase tracking-widest">
                                      Insert Hyperlink
                                    </h4>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => setIsLinkModalOpen(false)}
                                    className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                                      isDarkMode
                                        ? "bg-neutral-900 border-neutral-800 hover:bg-neutral-850 text-neutral-400 hover:text-white"
                                        : "bg-slate-50 border-slate-105 hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                                    }`}
                                  >
                                    <X size={12} />
                                  </button>
                                </div>

                                <div className="space-y-4">
                                  {/* Link Type Switcher */}
                                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-850/5 dark:border-neutral-800/45">
                                    <button
                                      type="button"
                                      onClick={() => setIsExternalLink(true)}
                                      className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                        isExternalLink
                                          ? "bg-purple-600 text-white shadow-sm"
                                          : isDarkMode
                                          ? "text-neutral-400 hover:text-white"
                                          : "text-slate-600 hover:text-slate-900"
                                      }`}
                                    >
                                      🌐 External Link (e.g. google.com)
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setIsExternalLink(false)}
                                      className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                        !isExternalLink
                                          ? "bg-purple-600 text-white shadow-sm"
                                          : isDarkMode
                                          ? "text-neutral-400 hover:text-white"
                                          : "text-slate-600 hover:text-slate-900"
                                      }`}
                                    >
                                      🎒 Internal Page / Hash (e.g. #results)
                                    </button>
                                  </div>

                                  <div className="space-y-3">
                                    {/* URL Input */}
                                    <div className="space-y-1">
                                      <label className={`block text-[9.5px] font-bold uppercase tracking-wider ${isDarkMode ? "text-neutral-400" : "text-slate-500"}`}>
                                        Link Address (URL)
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={isExternalLink ? "e.g. youtube.com/watch?v=..." : "e.g. /blog or #section-id"}
                                        value={targetLinkUrl}
                                        onChange={(e) => setTargetLinkUrl(e.target.value)}
                                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none transition-all ${
                                          isDarkMode
                                            ? "bg-neutral-900/85 border-neutral-800 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/10"
                                            : "bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/10"
                                        }`}
                                        autoFocus
                                      />
                                    </div>

                                    {/* Text Input */}
                                    <div className="space-y-1">
                                      <label className={`block text-[9.5px] font-bold uppercase tracking-wider ${isDarkMode ? "text-neutral-400" : "text-slate-500"}`}>
                                        Display Text
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Leave blank to display the address itself"
                                        value={targetLinkText}
                                        onChange={(e) => setTargetLinkText(e.target.value)}
                                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none transition-all ${
                                          isDarkMode
                                            ? "bg-neutral-900/85 border-neutral-800 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/10"
                                            : "bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/10"
                                        }`}
                                      />
                                    </div>
                                  </div>
                                  
                                  {/* Suggestions / Fast Internal Links if internal is chosen */}
                                  {!isExternalLink && (
                                    <div className="space-y-1 pt-1">
                                      <span className={`block text-[8.5px] font-extrabold uppercase tracking-widest ${isDarkMode ? "text-neutral-500" : "text-slate-400"}`}>
                                        Quick Links:
                                      </span>
                                      <div className="flex flex-wrap gap-1.5">
                                        <button
                                          type="button"
                                          onClick={() => setTargetLinkUrl("/")}
                                          className={`px-2.5 py-1 rounded-lg text-[9.5px] font-bold border transition-all ${
                                            isDarkMode
                                              ? "bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-400 hover:text-white"
                                              : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-650"
                                          }`}
                                        >
                                          🏠 Main App Downloader
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setTargetLinkUrl("/blog")}
                                          className={`px-2.5 py-1 rounded-lg text-[9.5px] font-bold border transition-all ${
                                            isDarkMode
                                              ? "bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-400 hover:text-white"
                                              : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-650"
                                          }`}
                                        >
                                          📚 Blog Directory
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setTargetLinkUrl("#search-bar")}
                                          className={`px-2.5 py-1 rounded-lg text-[9.5px] font-bold border transition-all ${
                                            isDarkMode
                                              ? "bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-400 hover:text-white"
                                              : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-650"
                                          }`}
                                        >
                                          🔍 Search Anchor ID
                                        </button>
                                      </div>
                                    </div>
                                  )}

                                  {/* Action Buttons */}
                                  <div className="flex items-center justify-end gap-2.5 pt-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setIsLinkModalOpen(false);
                                        setTargetLinkUrl("");
                                        setTargetLinkText("");
                                      }}
                                      className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                                        isDarkMode
                                          ? "bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-400 hover:text-white"
                                          : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-650 hover:text-slate-850"
                                      }`}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      onClick={insertLink}
                                      className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer bg-purple-650 hover:bg-purple-600 text-white shadow-md shadow-purple-500/10`}
                                    >
                                      Insert Link
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Video Embedder Modal / Popover */}
                          <AnimatePresence>
                            {isVideoModalOpen && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className={`absolute border rounded-3xl p-5 shadow-2xl z-50 left-4 right-4 top-4 max-w-lg mx-auto ${
                                  isDarkMode
                                    ? "bg-neutral-950 border-neutral-800 text-neutral-200 shadow-purple-950/25"
                                    : "bg-white border-slate-200 text-slate-800 shadow-slate-200/50"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <Video size={16} className="text-purple-500" />
                                    <h4 className="text-xs font-extrabold uppercase tracking-widest">
                                      Embed Video Widget
                                    </h4>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => setIsVideoModalOpen(false)}
                                    className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                                      isDarkMode
                                        ? "bg-neutral-900 border-neutral-800 hover:bg-neutral-850 text-neutral-400 hover:text-white"
                                        : "bg-slate-50 border-slate-105 hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                                    }`}
                                  >
                                    <X size={12} />
                                  </button>
                                </div>

                                <div className="space-y-4">
                                  <p className={`text-[11px] leading-relaxed ${isDarkMode ? "text-neutral-400" : "text-slate-550"}`}>
                                    Paste a video URL (YouTube, Vimeo), a direct video file link (MP4, WebM), or raw iframe embed code.
                                  </p>

                                  <div className="space-y-3">
                                    {/* Aspect Ratio Selector */}
                                    <div className="space-y-1">
                                      <label className={`block text-[9.5px] font-bold uppercase tracking-wider ${isDarkMode ? "text-neutral-400" : "text-slate-505"}`}>
                                        Aspect Ratio
                                      </label>
                                      <div className="flex gap-1.5">
                                        {[
                                          { label: "Widescreen (16:9)", value: "16/9" },
                                          { label: "Standard (4:3)", value: "4/3" },
                                          { label: "Vertical Reel (9:16)", value: "9/16" },
                                          { label: "Square (1:1)", value: "1/1" }
                                        ].map((ratio) => (
                                          <button
                                            key={ratio.value}
                                            type="button"
                                            onClick={() => setVideoAspectRatio(ratio.value)}
                                            className={`flex-1 py-1 text-[9px] font-bold rounded-lg border transition-all cursor-pointer ${
                                              videoAspectRatio === ratio.value
                                                ? "bg-purple-600 text-white border-purple-500 shadow-sm"
                                                : isDarkMode
                                                ? "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                                                : "bg-slate-50 border-slate-150 text-slate-650 hover:text-slate-900"
                                            }`}
                                          >
                                            {ratio.label}
                                          </button>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Video Input URL or Code */}
                                    <div className="space-y-1">
                                      <label className={`block text-[9.5px] font-bold uppercase tracking-wider ${isDarkMode ? "text-neutral-400" : "text-slate-550"}`}>
                                        Video Link / Embed Source
                                      </label>
                                      <textarea
                                        rows={3}
                                        placeholder="e.g. youtube.com/watch?v=dQw4w9WgXcQ&#10;or Raw <iframe ...></iframe>"
                                        value={videoInput}
                                        onChange={(e) => setVideoInput(e.target.value)}
                                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none transition-all font-mono ${
                                          isDarkMode
                                            ? "bg-neutral-900/85 border-neutral-800 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/10"
                                            : "bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/10"
                                        }`}
                                        autoFocus
                                      />
                                    </div>
                                  </div>

                                  {/* Quick Info & Format tips */}
                                  <div className={`p-2.5 rounded-xl text-[9px] border leading-normal ${
                                    isDarkMode 
                                      ? "bg-neutral-900/40 border-neutral-850/50 text-neutral-450" 
                                      : "bg-slate-50/60 border-slate-100 text-slate-500"
                                  }`}>
                                    <span className="font-extrabold text-purple-500 uppercase mr-1">Supported URLs:</span>
                                    YouTube videos, Shorts, Vimeo tracks, static .mp4 online drives, or direct Embed tags.
                                  </div>

                                  {/* Actions */}
                                  <div className="flex items-center justify-end gap-2.5 pt-1">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setIsVideoModalOpen(false);
                                        setVideoInput("");
                                      }}
                                      className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                                        isDarkMode
                                          ? "bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-400 hover:text-white"
                                          : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-650 hover:text-slate-850"
                                      }`}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      onClick={insertVideo}
                                      className="px-4.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer bg-purple-650 hover:bg-purple-600 text-white shadow-md shadow-purple-500/10"
                                    >
                                      Embed Video
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Inline Image Inserter Modal / Popover */}
                          <AnimatePresence>
                            {isInlineImgModalOpen && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className={`absolute border rounded-3xl p-5 shadow-2xl z-50 left-4 right-4 top-4 max-w-lg mx-auto ${
                                  isDarkMode
                                    ? "bg-neutral-950 border-neutral-800 text-neutral-200 shadow-purple-950/25"
                                    : "bg-white border-slate-205 text-slate-800 shadow-slate-200/50"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <ImageIcon size={16} className="text-purple-500" />
                                    <h4 className="text-xs font-extrabold uppercase tracking-widest">
                                      Insert Inline Image
                                    </h4>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setIsInlineImgModalOpen(false);
                                      setInlineImgUrl("");
                                      setInlineImgAlt("");
                                    }}
                                    className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                                      isDarkMode
                                        ? "bg-neutral-900 border-neutral-800 hover:bg-neutral-850 text-neutral-400 hover:text-white"
                                        : "bg-slate-50 border-slate-105 hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                                    }`}
                                  >
                                    <X size={12} />
                                  </button>
                                </div>

                                <div className="space-y-4 font-sans">
                                  {/* Section selection tabs */}
                                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-850/5 dark:border-neutral-800/45">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setInlineImgMode("upload");
                                        setInlineImgUrl("");
                                      }}
                                      className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                        inlineImgMode === "upload"
                                          ? "bg-purple-600 text-white shadow-sm"
                                          : isDarkMode
                                          ? "text-neutral-400 hover:text-white"
                                          : "text-slate-650 hover:text-slate-950"
                                      }`}
                                    >
                                      📁 Upload from Device
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setInlineImgMode("url");
                                        setInlineImgUrl("");
                                      }}
                                      className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                        inlineImgMode === "url"
                                          ? "bg-purple-600 text-white shadow-sm"
                                          : isDarkMode
                                          ? "text-neutral-400 hover:text-white"
                                          : "text-slate-650 hover:text-slate-950"
                                      }`}
                                    >
                                      🔗 From Image Link
                                    </button>
                                  </div>

                                  {/* Upload Section view content */}
                                  {inlineImgMode === "upload" ? (
                                    <div className="space-y-3">
                                      <input
                                        type="file"
                                        ref={inlineImgFileInputRef}
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleInlineImageFileChange}
                                      />
                                      
                                      {!inlineImgUrl ? (
                                        <div
                                          onClick={() => inlineImgFileInputRef.current?.click()}
                                          className={`border border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-purple-500/50 ${
                                            isDarkMode
                                              ? "border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900"
                                              : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"
                                          }`}
                                        >
                                          <Upload size={24} className="text-purple-400 mb-2" />
                                          <span className="text-[11px] font-bold">Select image from your device</span>
                                          <span className={`text-[9px] mt-1 ${isDarkMode ? "text-neutral-500" : "text-slate-400"}`}>
                                            Supports PNG, JPG, WEBP, GIF (Max 5MB)
                                          </span>
                                        </div>
                                      ) : (
                                        <div className="space-y-3">
                                          <div className="relative rounded-2xl overflow-hidden border border-neutral-800/10 dark:border-neutral-800/40 max-h-40 bg-neutral-950 flex items-center justify-center">
                                            <img
                                              src={inlineImgUrl}
                                              alt="Upload preview"
                                              className="max-h-40 object-contain"
                                            />
                                            <button
                                              type="button"
                                              onClick={() => setInlineImgUrl("")}
                                              className="absolute top-2 right-2 p-1 bg-black/75 hover:bg-black rounded-lg text-white border border-white/10 transition-colors"
                                              title="Remove image preview"
                                            >
                                              <Trash2 size={11} />
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="space-y-3">
                                      <div className="space-y-1">
                                        <label className={`block text-[9.5px] font-bold uppercase tracking-wider ${isDarkMode ? "text-neutral-400" : "text-slate-505"}`}>
                                          Image Link / URL Address
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="e.g. https://images.unsplash.com/photo-..."
                                          value={inlineImgUrl}
                                          onChange={(e) => setInlineImgUrl(e.target.value)}
                                          className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none transition-all ${
                                            isDarkMode
                                              ? "bg-neutral-900/85 border-neutral-800 text-white focus:border-purple-500 hover:bg-neutral-850"
                                              : "bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 hover:bg-slate-100"
                                          }`}
                                          autoFocus
                                        />
                                      </div>

                                      {inlineImgUrl && inlineImgUrl.trim().startsWith("http") && (
                                        <div className="rounded-2xl overflow-hidden border border-neutral-800/10 dark:border-neutral-800/40 max-h-40 bg-neutral-950 flex items-center justify-center">
                                          <img
                                            src={inlineImgUrl}
                                            alt="Link preview"
                                            className="max-h-40 object-contain"
                                            onError={(e) => {
                                              (e.target as HTMLElement).style.display = 'none';
                                            }}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Alt Text / Caption field */}
                                  <div className="space-y-1">
                                    <label className={`block text-[9.5px] font-bold uppercase tracking-wider ${isDarkMode ? "text-neutral-400" : "text-slate-505"}`}>
                                      Alt Text / Image Caption (Optional)
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="e.g. Figure 1: Infographics or photo credentials"
                                      value={inlineImgAlt}
                                      onChange={(e) => setInlineImgAlt(e.target.value)}
                                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none transition-all ${
                                        isDarkMode
                                          ? "bg-neutral-900/85 border-neutral-800 text-white focus:border-purple-500 hover:bg-neutral-850"
                                          : "bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 hover:bg-slate-100"
                                      }`}
                                    />
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex items-center justify-end gap-2.5 pt-1">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setIsInlineImgModalOpen(false);
                                        setInlineImgUrl("");
                                        setInlineImgAlt("");
                                      }}
                                      className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                                        isDarkMode
                                          ? "bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-400 hover:text-white"
                                          : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-650 hover:text-slate-850"
                                      }`}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      disabled={!inlineImgUrl}
                                      onClick={() => {
                                        if (inlineImgMode === "upload") {
                                          insertInlineImageDataUrl(inlineImgUrl, inlineImgAlt);
                                        } else {
                                          insertInlineImageUrl(inlineImgUrl, inlineImgAlt);
                                        }
                                      }}
                                      className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer bg-purple-650 hover:bg-purple-600 text-white shadow-md shadow-purple-500/10 disabled:opacity-40 disabled:cursor-not-allowed`}
                                    >
                                      Insert Image
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {(!newContent || newContent === "<br>" || newContent === "") && (
                            <div className="absolute top-4 left-4 text-neutral-550/80 dark:text-neutral-500 text-xs pointer-events-none select-none max-w-md leading-relaxed">
                              Describe your insights here... Select text to format (bold, colors, underline, italic) and click any uploaded image to resize or align it!
                            </div>
                          )}
                          <div
                            ref={editorRef}
                            contentEditable
                            onInput={(e) => {
                              setSelectedEditorImg(null);
                              setNewContent(e.currentTarget.innerHTML);
                            }}
                            onClick={handleEditorClick}
                            className={`w-full p-4 min-h-[260px] max-h-[500px] overflow-y-auto text-xs rounded-b-2xl border-x border-b focus:outline-none transition-all font-sans leading-relaxed outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 blog-reader-rich ${
                              isDarkMode 
                                ? "bg-neutral-900 border-neutral-800 text-white" 
                                : "bg-white border-slate-200 text-slate-850"
                            }`}
                            style={{ minHeight: "260px" }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          type="button"
                          onClick={() => handlePublish(null, "published")}
                          disabled={isSubmitting}
                          className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            isSubmitting
                              ? "bg-purple-650 text-white cursor-wait opacity-85"
                              : "bg-purple-600 hover:bg-purple-550 text-white shadow shadow-purple-500/10 active:scale-98"
                          }`}
                        >
                          <Send size={13} />
                          <span>
                            {isSubmitting 
                              ? (editingPost ? "Saving updates..." : "Dispatching publication...") 
                              : (editingPost ? "Save & Publish" : "Publish Blog Article")
                            }
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handlePublish(null, "draft")}
                          disabled={isSubmitting}
                          className={`py-3 px-6 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
                            isDarkMode
                              ? "bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-amber-500 hover:text-amber-400"
                              : "bg-amber-50/50 hover:bg-amber-100 border-amber-200 text-amber-700 hover:text-amber-800"
                          }`}
                        >
                          <span className="text-xs">📁</span>
                          <span>{editingPost ? "Save as Draft" : "Save Draft"}</span>
                        </button>
                        
                        {editingPost && (
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className={`py-3 px-6 rounded-xl text-xs font-bold transition-all border cursor-pointer active:scale-98 ${
                              isDarkMode
                                ? "bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-400 hover:text-white"
                                : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            Cancel Edit
                          </button>
                        )}
                      </div>
                    </form>

                    {/* Manage Existing Articles */}
                    <div className="space-y-4 pt-10 border-t border-slate-205 dark:border-neutral-800/60">
                      <h4 className={`text-xs font-extrabold uppercase tracking-widest ${isDarkMode ? "text-neutral-400" : "text-slate-555"}`}>
                        🎒 Existing Articles ({posts.length})
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
                        {posts.map((p) => (
                          <div
                            key={p.id}
                            className={`p-3.5 rounded-2xl border flex items-center justify-between gap-4 transition-colors ${
                              isDarkMode ? "bg-neutral-900/60 border-neutral-800/80" : "bg-white border-slate-205"
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                  isDarkMode ? "bg-purple-950/50 text-purple-450 border border-purple-900/30" : "bg-purple-50 text-purple-700 border border-purple-100"
                                }`}>
                                  {p.category}
                                </span>
                                {p.status === "draft" && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-500">
                                    Draft
                                  </span>
                                )}
                              </div>
                              <h5 className={`font-bold text-xs truncate ${isDarkMode ? "text-neutral-200" : "text-slate-800"}`}>
                                {p.title}
                              </h5>
                              <span className={`text-[10px] block mt-0.5 ${isDarkMode ? "text-neutral-500" : "text-slate-400"}`}>
                                By {p.author} • {formatDate(p.createdAt)}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => handleStartEdit(p)}
                                className={`p-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/25 text-purple-500 dark:text-purple-400 border border-purple-500/15 dark:border-purple-500/25 hover:scale-105 transition-all cursor-pointer`}
                                title="Edit blog post"
                              >
                                <Edit size={13} />
                              </button>

                              <button
                                onClick={() => setPostToDelete(p.id)}
                                className={`p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:scale-105 transition-all cursor-pointer`}
                                title="Delete blog post"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAILED ARTICLE READER VIEW */}
      <AnimatePresence mode="wait">
        {activeArticle ? (
          <motion.div
            key="reader"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className={`rounded-3xl border overflow-hidden p-6 sm:p-10 ${
              isDarkMode ? "bg-[#101626]/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            {/* Post image cover card bar */}
            <div className="relative h-60 sm:h-80 w-full rounded-2xl overflow-hidden mb-8 animate-fade-in">
              <img 
                src={activeArticle.imageUrl} 
                alt={activeArticle.title}
                className="w-full h-full object-cover dark:brightness-[0.85]"
              />
              <div className="absolute top-4 left-4">
                <span className="font-bold text-[10px] uppercase tracking-wide bg-[#14B8A6] text-[#0F172A] rounded-full px-3 py-1 border border-teal-500/30">
                  {activeArticle.category}
                </span>
              </div>
              {getImageSourceText(activeArticle.imageUrl) && (
                <div className="absolute bottom-4 right-4 z-10 select-none">
                  <a 
                    href={activeArticle.imageUrl} 
                    target="_blank" 
                    rel="nofollow noopener noreferrer" 
                    className="font-mono text-[9px] uppercase tracking-wider bg-black/65 hover:bg-black/85 backdrop-blur-md text-neutral-200 hover:text-white rounded-lg px-2.5 py-1 border border-white/10 transition-all flex items-center gap-1.5 shrink-0"
                    title={`View or attribute image source on ${getImageSourceText(activeArticle.imageUrl)}`}
                  >
                    Image source: {getImageSourceText(activeArticle.imageUrl)}
                  </a>
                </div>
              )}
            </div>

            {/* Title & Author Info */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                {activeArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3 border-y border-slate-110 dark:border-slate-801 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <User size={13} className="text-[#14B8A6]" />
                  <span className={`font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>{activeArticle.author}</span>
                </div>
                <span className="opacity-30">|</span>
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#14B8A6]" />
                  <span>{formatDate(activeArticle.createdAt)}</span>
                </div>
                <span className="opacity-30">|</span>
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-[#14B8A6]" />
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              {/* Formatted body paragraph text elements */}
              {/<\/?[a-z][\s\S]*>/i.test(activeArticle.content) ? (
                <div 
                  className={`pt-6 pb-12 text-sm sm:text-base leading-relaxed space-y-6 blog-reader-rich ${isDarkMode ? "text-slate-300" : "text-slate-755"}`}
                  dangerouslySetInnerHTML={{ __html: activeArticle.content }}
                />
              ) : (
                <div className={`pt-6 pb-12 text-sm sm:text-base leading-relaxed space-y-6 ${isDarkMode ? "text-slate-300" : "text-slate-755"}`}>
                  {activeArticle.content.split("\n\n").map((chunk, index) => {
                    if (chunk.startsWith("###")) {
                      return (
                        <h3 
                          key={index} 
                          className={`text-lg sm:text-xl font-bold tracking-tight mt-8 mb-4 border-l-2 border-[#14B8A6] pl-3 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                        >
                          {chunk.replace("###", "").trim()}
                        </h3>
                      );
                    }
                    return (
                      <p key={index} className="whitespace-pre-wrap">
                        {chunk}
                      </p>
                    );
                  })}
                </div>
              )}

              {/* SOCIAL SHARING WIDGET BLOCK */}
              <div className={`mt-10 p-5 rounded-3xl border transition-all ${
                isDarkMode 
                  ? "bg-slate-900/50 border-slate-800/80 hover:border-slate-750" 
                  : "bg-slate-50 border-slate-200/80 hover:border-slate-300 shadow-sm"
              }`}>
                <div className="flex items-center justify-between gap-5">
                  <div className="flex items-center gap-2">
                    <Share2 size={16} className="text-[#14B8A6]" />
                    <h4 className={`font-bold text-sm tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      Share
                    </h4>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    {/* WhatsApp */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this valuable article: "${activeArticle.title}" - ${window.location.origin}/blog/${activeArticle.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] transition-all duration-200 hover:scale-[1.05] active:scale-[0.95] shadow-sm shadow-[#25D366]/15"
                      title="Share on WhatsApp"
                    >
                      <img 
                        src="https://static.vecteezy.com/system/resources/previews/016/716/480/original/whatsapp-icon-free-png.png" 
                        alt="WhatsApp" 
                        className="w-5 h-5 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </a>

                    {/* Telegram */}
                    <a
                      href={`https://t.me/share/url?url=${encodeURIComponent(`${window.location.origin}/blog/${activeArticle.slug}`)}&text=${encodeURIComponent(`Check out this insights article: "${activeArticle.title}"`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-white bg-[#0088cc] hover:bg-[#0077b3] transition-all duration-200 hover:scale-[1.05] active:scale-[0.95] shadow-sm shadow-[#0088cc]/15"
                      title="Share on Telegram"
                    >
                      <Send size={15} />
                    </a>

                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/blog/${activeArticle.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-white bg-[#1877F2] hover:bg-[#156ad6] transition-all duration-200 hover:scale-[1.05] active:scale-[0.95] shadow-sm shadow-[#1877F2]/15"
                      title="Share on Facebook"
                    >
                      <Facebook size={15} fill="currentColor" className="stroke-none" />
                    </a>

                    {/* LinkedIn */}
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}/blog/${activeArticle.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-white bg-[#0A66C2] hover:bg-[#0958a8] transition-all duration-200 hover:scale-[1.05] active:scale-[0.95] shadow-sm shadow-[#0A66C2]/15"
                      title="Share on LinkedIn"
                    >
                      <Linkedin size={15} fill="currentColor" className="stroke-none" />
                    </a>

                    {/* Copy Link */}
                    <button
                      onClick={() => {
                        const url = `${window.location.origin}/blog/${activeArticle.slug}`;
                        navigator.clipboard.writeText(url);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2500);
                      }}
                      className={`inline-flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 hover:scale-[1.05] active:scale-[0.95] cursor-pointer border ${
                        copied
                          ? "bg-emerald-500 border-emerald-400 text-white shadow-sm shadow-emerald-500/15"
                          : isDarkMode
                          ? "bg-neutral-800 hover:bg-neutral-755 border-neutral-700 text-neutral-300"
                          : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                      title="Copy Share Link to Clipboard"
                    >
                      {copied ? (
                        <CheckCircle size={15} className="text-white shrink-0 animate-pulse" />
                      ) : (
                        <Link size={15} className="shrink-0" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Reader bottom navigation bar */}
              <div className="border-t pt-8 border-neutral-800/10 dark:border-neutral-800/30 flex justify-between items-center">
                <button
                  onClick={() => setActiveArticle(null)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    isDarkMode 
                      ? "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300" 
                      : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                  }`}
                >
                  <ArrowLeft size={13} />
                  <span>Return to Article Feed</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      setActiveArticle(null);
                      setCurrentPage("home");
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all hover:scale-[1.02] ${
                      isDarkMode
                        ? "bg-[#14B8A6] hover:bg-[#0D9488] text-[#0F172A]"
                        : "bg-[#0F172A] hover:bg-slate-800 text-white"
                    }`}
                  >
                    Use Downloader
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        ) : (
          /* STANDARD GRID ARTICLE LIST VIEW */
          (() => {
            const filteredPosts = posts.filter(post => {
              // Hide drafts from public visitors if they are not logged in as admin
              if (post.status === "draft" && !isLoggedIn) {
                return false;
              }
              const matchesCategory = selectedCategory === "All Articles" || post.category === selectedCategory;
              const matchesSearch = searchQuery.trim() === "" || 
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                post.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || 
                post.category.toLowerCase().includes(searchQuery.toLowerCase());
              return matchesCategory && matchesSearch;
            });

            return (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* SEARCH AND NAVIGATION */}
                {!loading && posts.length > 0 && (
                  <div className="space-y-4">
                    {/* Search Bar & Stats */}
                    <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                      {/* Search Input field */}
                      <div className="relative flex-1 max-w-md">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-neutral-400">
                          <Search size={16} />
                        </span>
                        <input
                          type="text"
                          placeholder="Search articles, tactics or updates..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className={`w-full pl-10 pr-10 py-3 rounded-2xl text-xs font-medium border focus:outline-none transition-all ${
                            isDarkMode
                              ? "bg-neutral-900/60 border-neutral-800 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
                              : "bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
                          }`}
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400 hover:text-neutral-200 cursor-pointer"
                            title="Clear search"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>

                      {/* Active filters state indicator / Count */}
                      <div className="flex flex-wrap items-center gap-2">
                        {selectedCategory !== "All Articles" && (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                            isDarkMode 
                              ? "bg-purple-950/40 border-purple-500/25 text-purple-300 animate-fade-in"
                              : "bg-purple-50 border-purple-100 text-purple-700 animate-fade-in"
                          }`}>
                            <span>{selectedCategory}</span>
                            <button
                              onClick={() => setSelectedCategory("All Articles")}
                              className="hover:scale-110 transition-transform cursor-pointer font-bold text-xs"
                              title="Clear filter"
                            >
                              <X size={10} />
                            </button>
                          </span>
                        )}
                        <div className={`text-[10.5px] font-bold uppercase tracking-wider ${isDarkMode ? "text-neutral-500" : "text-slate-400"}`}>
                          Showing <span className="text-purple-500 font-extrabold">{filteredPosts.length}</span> of {posts.length} articles
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-24 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/5 text-purple-400 flex items-center justify-center border border-purple-500/15">
                      <BookOpen className="animate-pulse" size={24} />
                    </div>
                    <span className={`text-xs ${isDarkMode ? "text-neutral-400" : "text-slate-500"}`}>
                      Connecting to insights database...
                    </span>
                  </div>
                ) : posts.length === 0 ? (
                  <div className={`p-12 text-center rounded-3xl border ${isDarkMode ? "bg-neutral-900/20 border-neutral-800" : "bg-slate-50/50 border-slate-180"}`}>
                    <Newspaper className="mx-auto text-neutral-600 mb-3" size={32} />
                    <h4 className={`text-sm font-bold ${isDarkMode ? "text-neutral-300" : "text-slate-700"}`}>No articles published yet</h4>
                    <p className={`text-xs ${isDarkMode ? "text-neutral-500" : "text-slate-400"} mt-1 max-w-sm mx-auto`}>
                      Sign into the admin panel on the top-right and post your first content guide!
                    </p>
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className={`p-16 text-center rounded-3xl border ${isDarkMode ? "bg-neutral-900/20 border-neutral-800" : "bg-slate-50/50 border-slate-180"} animate-fade-in`}>
                    <Search className="mx-auto text-neutral-500 mb-3 animate-pulse text-purple-500" size={28} />
                    <h4 className={`text-sm font-extrabold ${isDarkMode ? "text-neutral-200" : "text-slate-800"}`}>
                      No matches found
                    </h4>
                    <p className={`text-xs ${isDarkMode ? "text-neutral-500" : "text-slate-400"} mt-2 max-w-sm mx-auto leading-relaxed`}>
                      We couldn't find any articles that match your search details or selected filter. Try adjusting your parameters.
                    </p>
                    <div className="mt-5 flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("All Articles");
                        }}
                        className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          isDarkMode
                            ? "bg-purple-950/30 hover:bg-purple-900/30 border-purple-500/20 text-purple-400"
                            : "bg-purple-50 hover:bg-purple-100/70 border-purple-100 text-purple-700 font-extrabold"
                        }`}
                      >
                        Reset Search & Filters
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6.5">
                    {filteredPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        onClick={() => {
                          setActiveArticle(post);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`group rounded-3xl border overflow-hidden flex flex-col h-full transition-all hover:-translate-y-1 cursor-pointer ${
                          isDarkMode 
                            ? "bg-[#101626]/40 border-slate-800/85 hover:bg-[#101626]/80 hover:border-slate-700" 
                            : "bg-white border-slate-200 shadow-sm hover:shadow-md"
                        }`}
                      >
                        {/* Banner Image */}
                        <div className="relative h-48 w-full overflow-hidden">
                          <img 
                            src={post.imageUrl} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 dark:brightness-[0.85]"
                          />
                          <div className="absolute top-4 left-4 flex gap-1.5 items-center">
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                              isDarkMode 
                                ? "bg-slate-900 border-[#14B8A6]/20 text-[#14B8A6]" 
                                : "bg-[#F8FAFC] border-slate-150 text-[#0F172A] font-extrabold"
                            }`}>
                              {post.category}
                            </span>
                            {post.status === "draft" && (
                              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/15 text-amber-500">
                                Draft
                              </span>
                            )}
                          </div>
                          {getImageSourceText(post.imageUrl) && (
                            <div className="absolute bottom-3 right-3 z-10 select-none">
                              <a 
                                href={post.imageUrl} 
                                target="_blank" 
                                rel="nofollow noopener noreferrer" 
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent card navigation trigger
                                }}
                                className={`font-mono text-[8.5px] uppercase tracking-wider px-2 py-0.5 rounded-md border transition-all ${
                                  isDarkMode 
                                    ? "bg-black/60 hover:bg-black/80 backdrop-blur-md border-neutral-800 text-neutral-400 hover:text-white" 
                                    : "bg-white/80 hover:bg-white backdrop-blur-md border-slate-205 text-slate-550 hover:text-slate-800"
                                }`}
                                title={`Check image on ${getImageSourceText(post.imageUrl)}`}
                              >
                                Source: {getImageSourceText(post.imageUrl)}
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Meta & Excerpt */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            {/* Author line */}
                            <div className="flex items-center gap-x-2 text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                              <span className={isDarkMode ? "text-slate-350" : "text-slate-600"}>{post.author}</span>
                              <span>•</span>
                              <span>{formatDate(post.createdAt)}</span>
                            </div>

                            {/* Title */}
                            <h3 className={`text-md font-extrabold group-hover:text-[#14B8A6] transition-colors ${
                              isDarkMode ? "text-white" : "text-slate-900"
                            }`}>
                              {post.title}
                            </h3>

                            {/* Excerpt */}
                            <p className={`text-xs line-clamp-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"} leading-relaxed`}>
                              {post.excerpt}
                            </p>
                          </div>

                          {/* Row footer action */}
                          <div className="flex items-center justify-between pt-3 border-t border-slate-150 dark:border-slate-805">
                            <div className="flex items-center gap-1.5 text-[10.5px] text-slate-450">
                              <Clock size={11} className="text-[#14B8A6]" />
                              <span>{post.readTime}</span>
                            </div>

                            <div
                              className={`text-xs font-bold transition-all flex items-center gap-1.5 ${
                                isDarkMode ? "text-[#14B8A6] group-hover:text-[#2dd4bf]" : "text-[#14B8A6] group-hover:text-[#0D9488]"
                              }`}
                            >
                              <span>Read Article</span>
                              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })()
        )}
      </AnimatePresence>

      {/* CUSTOM CONFIRMATION MODAL FOR DELETING BLOG POSTS */}
      <AnimatePresence>
        {postToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl relative ${
                isDarkMode 
                  ? "bg-neutral-900 border-neutral-800 text-white" 
                  : "bg-white border-slate-200 text-slate-800"
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 animate-pulse">
                  <AlertCircle size={22} />
                </div>
                
                <div className="space-y-1.5 animate-fade-in">
                  <h3 className={`text-md font-extrabold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    Confirm Deletion
                  </h3>
                  <p className={`text-xs ${isDarkMode ? "text-neutral-400" : "text-slate-500"} leading-relaxed`}>
                    Are you absolutely sure you want to delete this blog post? This action is permanent and cannot be undone.
                  </p>
                </div>

                {posts.find(p => p.id === postToDelete) && (
                  <div className={`w-full p-3 rounded-2xl text-left border text-xs ${
                    isDarkMode ? "bg-neutral-950/50 border-neutral-800/60" : "bg-slate-50/75 border-slate-100"
                  }`}>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-purple-500">
                      Target Article:
                    </span>
                    <p className={`font-extrabold mt-0.5 truncate ${isDarkMode ? "text-neutral-200" : "text-slate-800"}`}>
                      {posts.find(p => p.id === postToDelete)?.title}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2.5 w-full pt-2">
                  <button
                    type="button"
                    onClick={() => setPostToDelete(null)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      isDarkMode 
                        ? "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900" 
                        : "bg-slate-100 hover:bg-slate-205 border-slate-200/50 text-slate-700"
                    }`}
                  >
                    Keep Post
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteConfirm}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all bg-red-650 hover:bg-red-550 text-white shadow-md shadow-red-500/10 cursor-pointer"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
