export interface VideoOption {
  resolution: string;
  size: string;
  url: string;
  fps: number;
}

export interface AudioOption {
  title: string;
  size: string;
  duration: string;
  url: string;
}

export interface MediaMetadata {
  platform: "tiktok" | "instagram";
  title: string;
  creator: string;
  duration: string;
  id: string;
  views: string;
  likes: string;
  comments: string;
  shares: string;
  thumbnail: string;
  videoOptions: VideoOption[];
  audioOption: AudioOption;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  readTime: string;
  status?: "published" | "draft";
}
