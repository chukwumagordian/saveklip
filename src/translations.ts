export type LanguageCode =
  | "en"
  | "en-gb"
  | "es"
  | "fr"
  | "de"
  | "pt"
  | "ar"
  | "ur"
  | "hi"
  | "bn"
  | "zh"
  | "ja"
  | "ru"
  | "it"
  | "tr"
  | "id"
  | "vi"
  | "pl"
  | "nl";

export interface TranslationDictionary {
  // Navigation & Stats
  downloadsToday: string;
  themeLight: string;
  themeDark: string;
  home: string;
  tiktokDownloader: string;
  instagramDownloader: string;
  blog: string;
  aboutUs: string;
  contactUs: string;
  privacyPolicy: string;
  termsOfService: string;
  dmcaPolicy: string;

  // Hero Section
  zeroWatermarks: string;
  heroTitleHome: string;
  heroTitleTikTok: string;
  heroTitleInstagram: string;
  heroDescHome: string;
  heroDescTikTok: string;
  heroDescInstagram: string;

  // Input & Form
  pasteLabel: string;
  placeholderHome: string;
  placeholderTikTok: string;
  placeholderInstagram: string;
  clearLabel: string;
  downloadBtn: string;
  extractingBtn: string;
  validationErrorEmpty: string;
  validationErrorInvalid: string;

  // Loading & Results
  skeletonText: string;
  platformDetected: string;
  extractId: string;
  downloadAnother: string;
  livePreview: string;
  views: string;
  likes: string;
  comments: string;
  shares: string;
  durationLabel: string;
  proHDBadge: string;
  mp4Format: string;
  downloadVideoBtn: string;
  savedLabel: string;
  finishedLabel: string;
  audioMP3Label: string;
  audioMP3Desc: string;
  getMP3AudioBtn: string;
  sslSecureLabel: string;

  // Capabilities
  capabilitiesTitleTikTok: string;
  capabilitiesTitleInstagram: string;
  capabilitiesTitleGeneral: string;
  tiktokCap1: string;
  tiktokCap2: string;
  tiktokCap3: string;
  tiktokCap4: string;
  instagramCap1: string;
  instagramCap2: string;
  instagramCap3: string;
  instagramCap4: string;

  // FAQ
  faqTitle: string;
  faqSubtitle: string;
  faqItemsHome: { question: string; answer: string }[];
  faqItemsTikTok: { question: string; answer: string }[];
  faqItemsInstagram: { question: string; answer: string }[];
  
  // Footer
  disclaimerHeader: string;
  disclaimerText: string;
  copyrightText: string;
  detectedAlert: string;
}

export const LANGUAGES: { code: LanguageCode; name: string; flag: string; isRTL?: boolean }[] = [
  { code: "en", name: "English (US)", flag: "🇺🇸" },
  { code: "en-gb", name: "English (UK)", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ar", name: "العربية", flag: "🇸🇦", isRTL: true },
  { code: "ur", name: "اردو", flag: "🇵🇰", isRTL: true },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" }
];

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    downloadsToday: "Downloads Today",
    themeLight: "Switch to Light Mode",
    themeDark: "Switch to Dark Mode",
    home: "Home",
    tiktokDownloader: "TikTok Downloader",
    instagramDownloader: "Instagram Downloader",
    blog: "Blog",
    aboutUs: "About Us",
    contactUs: "Contact Us",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    dmcaPolicy: "DMCA Policy",
    zeroWatermarks: "Zero Watermarks",
    heroTitleHome: "Save High-Quality TikTok & Instagram Videos",
    heroTitleTikTok: "Save High-Quality TikTok Videos",
    heroTitleInstagram: "Save High-Quality Instagram Videos",
    heroDescHome: "Easily download your favorite TikTok videos and Instagram reels in high quality. No sign-ups, no watermarks, and completely free.",
    heroDescTikTok: "Save your favorite TikTok videos directly to your device stream-free and watermark-free. No sign-ups, no installation, and completely free.",
    heroDescInstagram: "Download Reels, profile videos, and photo posts from Instagram in pristine visual quality. No sign-ups, no watermarks, and completely free.",
    pasteLabel: "Paste Video URL Link",
    placeholderHome: "https://tiktok.com/... or https://instagram.com/reel/...",
    placeholderTikTok: "https://www.tiktok.com/@username/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "Clear link",
    downloadBtn: "Download",
    extractingBtn: "Extracting Media...",
    validationErrorEmpty: "Please enter a valid TikTok or Instagram URL first",
    validationErrorInvalid: "Please enter a valid TikTok or Instagram video link",
    skeletonText: "Extracting Media Details...",
    platformDetected: "detected",
    extractId: "Extract ID:",
    downloadAnother: "Download another video",
    livePreview: "Live HD Preview",
    views: "Views",
    likes: "Likes",
    comments: "Comments",
    shares: "Shares",
    durationLabel: "Duration",
    proHDBadge: "Pro HD",
    mp4Format: "MP4 format",
    downloadVideoBtn: "Download Video",
    savedLabel: "Saved",
    finishedLabel: "Finished!",
    audioMP3Label: "audio (MP3)",
    audioMP3Desc: "High Quality audio",
    getMP3AudioBtn: "Get MP3 audio",
    sslSecureLabel: "Encrypted SSL downlinks verified • Safe direct origin source server bypass",
    capabilitiesTitleTikTok: "TikTok Downloader Capabilities",
    capabilitiesTitleInstagram: "Instagram Downloader Capabilities",
    capabilitiesTitleGeneral: "Supported Platform Capabilities",
    tiktokCap1: "Download unlimited TikTok posts without watermarks",
    tiktokCap2: "Extract background tracks and sound overlays natively",
    tiktokCap3: "Extract multiple target resolutions (HD available)",
    tiktokCap4: "Instant processing directly bypassing client barriers",
    instagramCap1: "Extract Reels, Posts, and Carousel items quickly",
    instagramCap2: "Direct CDN fetch loops preserving premium bitrate files",
    instagramCap3: "MP3 dynamic extract for reels sound clips",
    instagramCap4: "Complete safe bypass of feed logins & security tokens",
    faqTitle: "Frequently Answered FAQ",
    faqSubtitle: "Everything you need to know about watermarks, downloading speed limits, and file safety.",
    faqItemsHome: [
      {
        question: "How do I download a video from TikTok or Instagram?",
        answer: "Simply navigate to TikTok or Instagram, copy the URL of the video, reel, or post, paste it into our address bar above, and click 'Download'. Select your preferred quality and hit Download!"
      },
      {
        question: "Are the downloaded videos free of watermarks?",
        answer: "Yes, our social media pipeline extracts direct, raw host streams so video formats are completely watermark-free—perfect for clean archives and multi-platform repurposing."
      },
      {
        question: "Which formats and qualities are supported?",
        answer: "We support high-definition video files up to 1080p, as well as fast compressed qualities for lower bandwidth (720p, 480p, 360p) and direct high-frequency audio extraction in MP3/M4A format."
      },
      {
        question: "Do I need to sign up for an account?",
        answer: "No account registration or software installation is required. Everything runs entirely within our ultra-secure browser application to maintain your complete digital privacy."
      },
      {
        question: "Is there a limit on how many videos I can download?",
        answer: "We offer completely unlimited extracts! To protect server infrastructure, we implement a mild rate-limiting mechanism of 15 requests per minute, which is more than enough for casual and pro use."
      }
    ],
    faqItemsTikTok: [
      {
        question: "How do I download a video from TikTok?",
        answer: "Simply navigate to TikTok, copy the URL of the video (using the share button), paste it into our address bar above. Select your preferred high-quality video or audio and enjoy!"
      },
      {
        question: "Are the downloaded TikTok videos free of watermarks?",
        answer: "Yes, our TikTok pipeline extracts direct, raw stream sources so files are 100% watermark-free—perfect for clean creator archives and multi-platform backup."
      },
      {
        question: "Can I download audio tracks or music from TikTok?",
        answer: "Yes! You can choose to extract and convert the background tracks or dynamic sound overlay from any TikTok video directly to high-bitrate audio formats like MP3."
      },
      {
        question: "Do I need to sign up to download TikTok videos?",
        answer: "No account registration, logins, or browser extensions are required. The entire TikTok extraction runs securely within your desktop or mobile browser to preserve digital safety."
      },
      {
        question: "Is there a limit on how many TikTok downloads I can make?",
        answer: "We offer completely unlimited extractions. Download as many trending TikToks as you need without premium accounts or hidden fees."
      }
    ],
    faqItemsInstagram: [
      {
        question: "How do I download a video or reel from Instagram?",
        answer: "Simply navigate to Instagram, copy the link of the reel, video, or photo slideshow, paste it into our address bar above, and click 'Download' to instantly generate high-quality download links."
      },
      {
        question: "Can I save Instagram Reels and videos without watermarks?",
        answer: "Yes, our Instagram downloader directly fetches raw files from public CDN sources so there are absolutely no watermarks or platform brand overlays added to the media."
      },
      {
        question: "Does it support saving photos, posts, and carousel items?",
        answer: "Yes, our extraction system is capable of detecting and downloading single image posts, video posts, and side-scrollable multi-photo carousel slides."
      },
      {
        question: "Do I need to authenticate or log in with my Instagram account?",
        answer: "No! We never ask for your Instagram password or login credentials. You can safely download public reels and posts without sharing account info."
      },
      {
        question: "Are Instagram audio extract formats supported?",
        answer: "Yes, our platform lets you isolate and download only the background music of Reels or IGTV uploads, saved in a standard high-bitrate MP3/M4A format."
      }
    ],
    disclaimerHeader: "Disclaimer:",
    disclaimerText: "This application is a tool for personal backup archiving and media exploration. We are not allied or officially affiliated with TikTok, ByteDance, Instagram, Meta, or any related social media networks. Brand copyrights belong entirely to their respective media owners. Always respect digital intellectual property rules before repurposing content.",
    copyrightText: "© 2026 Jinald Inc",
    detectedAlert: "Language automatically changed based on your region preference:"
  },
  "en-gb": {
    downloadsToday: "Downloads Today",
    themeLight: "Switch to Light Mode",
    themeDark: "Switch to Dark Mode",
    home: "Home",
    tiktokDownloader: "TikTok Downloader",
    instagramDownloader: "Instagram Downloader",
    blog: "Blog",
    aboutUs: "About Us",
    contactUs: "Contact Us",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    dmcaPolicy: "DMCA Policy",
    zeroWatermarks: "Zero Watermarks",
    heroTitleHome: "Save High-Quality TikTok & Instagram Videos",
    heroTitleTikTok: "Save High-Quality TikTok Videos",
    heroTitleInstagram: "Save High-Quality Instagram Videos",
    heroDescHome: "Easily download your favourite TikTok videos and Instagram reels in high quality. No sign-ups, no watermarks, and completely free.",
    heroDescTikTok: "Save your favourite TikTok videos directly to your device stream-free and watermark-free. No sign-ups, no installation, and completely free.",
    heroDescInstagram: "Download Reels, profile videos, and photo posts from Instagram in pristine visual quality. No sign-ups, no watermarks, and completely free.",
    pasteLabel: "Paste Video URL Link",
    placeholderHome: "https://tiktok.com/... or https://instagram.com/reel/...",
    placeholderTikTok: "https://www.tiktok.com/@username/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "Clear link",
    downloadBtn: "Download",
    extractingBtn: "Extracting Media...",
    validationErrorEmpty: "Please enter a valid TikTok or Instagram URL first",
    validationErrorInvalid: "Please enter a valid TikTok or Instagram video link",
    skeletonText: "Extracting Media Details...",
    platformDetected: "detected",
    extractId: "Extract ID:",
    downloadAnother: "Download another video",
    livePreview: "Live HD Preview",
    views: "Views",
    likes: "Likes",
    comments: "Comments",
    shares: "Shares",
    durationLabel: "Duration",
    proHDBadge: "Pro HD",
    mp4Format: "MP4 format",
    downloadVideoBtn: "Download Video",
    savedLabel: "Saved",
    finishedLabel: "Finished!",
    audioMP3Label: "audio (MP3)",
    audioMP3Desc: "High Quality audio",
    getMP3AudioBtn: "Get MP3 audio",
    sslSecureLabel: "Encrypted SSL downlinks verified • Safe direct origin source server bypass",
    capabilitiesTitleTikTok: "TikTok Downloader Capabilities",
    capabilitiesTitleInstagram: "Instagram Downloader Capabilities",
    capabilitiesTitleGeneral: "Supported Platform Capabilities",
    tiktokCap1: "Download unlimited TikTok posts without watermarks",
    tiktokCap2: "Extract background tracks and sound overlays natively",
    tiktokCap3: "Extract multiple target resolutions (HD available)",
    tiktokCap4: "Instant processing directly bypassing client barriers",
    instagramCap1: "Extract Reels, Posts, and Carousel items quickly",
    instagramCap2: "Direct CDN fetch loops preserving premium bitrate files",
    instagramCap3: "MP3 dynamic extract for reels sound clips",
    instagramCap4: "Complete safe bypass of feed logins & security tokens",
    faqTitle: "Frequently Answered FAQ",
    faqSubtitle: "Everything you need to know about watermarks, downloading speed limits, and file safety.",
    faqItemsHome: [
      {
        question: "How do I download a video from TikTok or Instagram?",
        answer: "Simply navigate to TikTok or Instagram, copy the URL of the video, reel, or post, paste it into our address bar above, and click 'Download'. Select your preferred quality and hit Download!"
      },
      {
        question: "Are the downloaded videos free of watermarks?",
        answer: "Yes, our social media pipeline extracts direct, raw host streams so video formats are completely watermark-free—perfect for clean archives and multi-platform repurposing."
      },
      {
        question: "Which formats and qualities are supported?",
        answer: "We support high-definition video files up to 1080p, as well as fast compressed qualities for lower bandwidth (720p, 480p, 360p) and direct high-frequency audio extraction in MP3/M4A format."
      },
      {
        question: "Do I need to sign up for an account?",
        answer: "No account registration or software installation is required. Everything runs entirely within our ultra-secure browser application to maintain your complete digital privacy."
      },
      {
        question: "Is there a limit on how many videos I can download?",
        answer: "We offer completely unlimited extracts! To protect server infrastructure, we implement a mild rate-limiting mechanism of 15 requests per minute, which is more than enough for casual and pro use."
      }
    ],
    faqItemsTikTok: [
      {
        question: "How do I download a video from TikTok?",
        answer: "Simply navigate to TikTok, copy the URL of the video (using the share button), paste it into our address bar above. Select your preferred high-quality video or audio and enjoy!"
      },
      {
        question: "Are the downloaded TikTok videos free of watermarks?",
        answer: "Yes, our TikTok pipeline extracts direct, raw stream sources so files are 100% watermark-free—perfect for clean creator archives and multi-platform backup."
      },
      {
        question: "Can I download audio tracks or music from TikTok?",
        answer: "Yes! You can choose to extract and convert the background tracks or dynamic sound overlay from any TikTok video directly to high-bitrate audio formats like MP3."
      },
      {
        question: "Do I need to sign up to download TikTok videos?",
        answer: "No account registration, logins, or browser extensions are required. The entire TikTok extraction runs securely within your desktop or mobile browser to preserve digital safety."
      },
      {
        question: "Is there a limit on how many TikTok downloads I can make?",
        answer: "We offer completely unlimited extractions. Download as many trending TikToks as you need without premium accounts or hidden fees."
      }
    ],
    faqItemsInstagram: [
      {
        question: "How do I download a video or reel from Instagram?",
        answer: "Simply navigate to Instagram, copy the link of the reel, video, or photo slideshow, paste it into our address bar above, and click 'Download' to instantly generate high-quality download links."
      },
      {
        question: "Can I save Instagram Reels and videos without watermarks?",
        answer: "Yes, our Instagram downloader directly fetches raw files from public CDN sources so there are absolutely no watermarks or platform brand overlays added to the media."
      },
      {
        question: "Does it support saving photos, posts, and carousel items?",
        answer: "Yes, our extraction system is capable of detecting and downloading single image posts, video posts, and side-scrollable multi-photo carousel slides."
      },
      {
        question: "Do I need to authenticate or log in with my Instagram account?",
        answer: "No! We never ask for your Instagram password or login credentials. You can safely download public reels and posts without sharing account info."
      },
      {
        question: "Are Instagram audio extract formats supported?",
        answer: "Yes, our platform lets you isolate and download only the background music of Reels or IGTV uploads, saved in a standard high-bitrate MP3/M4A format."
      }
    ],
    disclaimerHeader: "Disclaimer:",
    disclaimerText: "This application is a tool for personal backup archiving and media exploration. We are not allied or officially affiliated with TikTok, ByteDance, Instagram, Meta, or any related social media networks. Brand copyrights belong entirely to their respective media owners. Always respect digital intellectual property rules before repurposing content.",
    copyrightText: "© 2026 Jinald Inc",
    detectedAlert: "Language automatically changed based on your region preference:"
  },
  es: {
    downloadsToday: "Descargas de hoy",
    themeLight: "Cambiar a modo claro",
    themeDark: "Cambiar a modo oscuro",
    home: "Inicio",
    tiktokDownloader: "Descargador de TikTok",
    instagramDownloader: "Descargador de Instagram",
    blog: "Blog",
    aboutUs: "Sobre nosotros",
    contactUs: "Contacto",
    privacyPolicy: "Política de privacidad",
    termsOfService: "Condiciones de servicio",
    dmcaPolicy: "Política DMCA",
    zeroWatermarks: "Sin marcas de agua",
    heroTitleHome: "Guardar videos de TikTok e Instagram en alta calidad",
    heroTitleTikTok: "Guardar videos de TikTok en alta calidad",
    heroTitleInstagram: "Guardar videos de Instagram en alta calidad",
    heroDescHome: "Descarga fácilmente tus videos favoritos de TikTok y reels de Instagram en alta calidad. Sin registros, sin marcas de agua y totalmente gratis.",
    heroDescTikTok: "Guarda tus videos favoritos de TikTok directamente en tu dispositivo, sin marcas de agua de stream. Sin registros, sin instalación y totalmente gratis.",
    heroDescInstagram: "Descarga Reels, videos de perfil y fotos de Instagram con una calidad visual impecable. Sin registros, sin marcas de agua y totalmente gratis.",
    pasteLabel: "Pega el enlace de la URL del video",
    placeholderHome: "https://tiktok.com/... o https://instagram.com/reel/...",
    placeholderTikTok: "https://www.tiktok.com/@usuario/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "Limpiar enlace",
    downloadBtn: "Descargar",
    extractingBtn: "Extrayendo multimedia...",
    validationErrorEmpty: "Por favor, introduce primero una URL válida de TikTok o Instagram",
    validationErrorInvalid: "Por favor, introduce un enlace de video de TikTok o Instagram válido",
    skeletonText: "Extrayendo detalles multimedia...",
    platformDetected: "detectado",
    extractId: "ID de extracción:",
    downloadAnother: "Descargar otro video",
    livePreview: "Vista previa HD en vivo",
    views: "Vistas",
    likes: "Me gusta",
    comments: "Comentarios",
    shares: "Compartidos",
    durationLabel: "Duración",
    proHDBadge: "Pro HD",
    mp4Format: "Formato MP4",
    downloadVideoBtn: "Descargar video",
    savedLabel: "Guardado",
    finishedLabel: "¡Terminado!",
    audioMP3Label: "audio (MP3)",
    audioMP3Desc: "Audio de alta calidad",
    getMP3AudioBtn: "Obtener audio MP3",
    sslSecureLabel: "Enlaces SSL encriptados verificados • Desvío seguro del servidor de origen directo",
    capabilitiesTitleTikTok: "Capacidades del descargador de TikTok",
    capabilitiesTitleInstagram: "Capacidades del descargador de Instagram",
    capabilitiesTitleGeneral: "Capacidades de plataformas compatibles",
    tiktokCap1: "Descarga publicaciones ilimitadas de TikTok sin marcas de agua",
    tiktokCap2: "Extrae pistas de fondo y superposiciones de sonido de forma nativa",
    tiktokCap3: "Extrae múltiples resoluciones de destino (HD disponible)",
    tiktokCap4: "Procesamiento inmediato que evita las barreras del cliente",
    instagramCap1: "Extrae Reels, publicaciones y elementos de carrusel rápidamente",
    instagramCap2: "Bucle directo de CDN que conserva archivos con tasa de bits premium",
    instagramCap3: "Extracción dinámica de MP3 para clips de sonido de reels",
    instagramCap4: "Evita de forma segura inicios de sesión y tokens de seguridad",
    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Todo lo que necesitas saber sobre marcas de agua, límites de velocidad y seguridad de archivos.",
    faqItemsHome: [
      {
        question: "¿Cómo descargo un video de TikTok o Instagram?",
        answer: "Simplemente navega a TikTok o Instagram, copia la URL del video, reel o publicación, pégala en nuestra barra de direcciones arriba y haz clic en 'Descargar'. Selecciona la calidad que prefieras y haz clic en Descargar."
      },
      {
        question: "¿Los videos descargados están libres de marcas de agua?",
        answer: "Sí, nuestro sistema de redes sociales extrae directamente las transmisiones originales, por lo que los videos quedan completamente sin marcas de agua: ideal para creadores de contenido."
      },
      {
        question: "¿Qué formatos y calidades son compatibles?",
        answer: "Soportamos archivos de video de alta definición de hasta 1080p, así como calidades comprimidas rápidas para menor ancho de banda (720p, 480p, 360p) y extracción directa de audio MP3 de alta fidelidad."
      },
      {
        question: "¿Tengo que registrarme para obtener una cuenta?",
        answer: "No es necesario registrarse ni instalar ningún software. Todo funciona dentro de nuestro navegador ultra seguro para proteger tu privacidad digital."
      },
      {
        question: "¿Hay límite en cuántos videos puedo descargar?",
        answer: "¡Ofrecemos extracciones completamente ilimitadas! Para proteger la infraestructura, implementamos un límite de 15 solicitudes por minuto."
      }
    ],
    faqItemsTikTok: [
      {
        question: "¿Cómo descargo un video de TikTok?",
        answer: "Simplemente copia la URL del video de TikTok (usando el botón de compartir), pégala arriba, elige el formato de audio o video premium y disfruta."
      },
      {
        question: "¿Los videos descargados de TikTok están libres de marcas de agua?",
        answer: "Sí, nuestra integración extrae fuentes de transmisión sin adulterar para ofrecer un archivo enteramente libre de logotipos de la plataforma."
      },
      {
        question: "¿Puedo descargar pistas de audio o música de TikTok?",
        answer: "¡Sí! Puedes descargar cualquier pista de sonido de fondo aislada directamente en formato de audio MP3 de alta fidelidad."
      },
      {
        question: "¿Es seguro descargar videos de TikTok?",
        answer: "Totalmente. El procesamiento seguro se ejecuta localmente en tu navegador sin que debas instalar extensiones sospechosas ni iniciar sesión."
      },
      {
        question: "¿Hay límites de descarga diarios?",
        answer: "No hay límites, puedes descargar tantos clips como prefieras de manera completamente gratuita."
      }
    ],
    faqItemsInstagram: [
      {
        question: "¿Cómo se descargan reels u otros formatos de Instagram?",
        answer: "Copia el enlace de Instagram, pégalo arriba y el sistema localizará las transmisiones de video para entregarte los enlaces directos correspondientes."
      },
      {
        question: "¿Es gratis guardar reels de Instagram sin marcas de agua?",
        answer: "Sí, es totalmente gratuito. Obtenemos el archivo desde los servidores de distribución (CDN) públicos de forma libre."
      },
      {
        question: "¿Soporta carruseles de fotos?",
        answer: "Sí, el sistema es compatible con carruseles de imágenes, publicaciones de video y fotos individuales."
      },
      {
        question: "¿Tengo que ingresar mis claves de acceso?",
        answer: "Nunca pedimos credenciales de red social. Toda descarga de cuenta pública se realiza sin necesidad de loguearse."
      },
      {
        question: "¿Se puede guardar el audio de reels?",
        answer: "Sí, puedes descargar solamente el segmento de música ambiental del reel directamente en formato MP3."
      }
    ],
    disclaimerHeader: "Descargo de responsabilidad:",
    disclaimerText: "Esta aplicación es una herramienta para el archivo personal de copias de seguridad y la exploración de medios. No estamos aliados ni afiliados oficialmente con TikTok, ByteDance, Instagram, Meta ni ninguna red social relacionada. Los derechos de autor de las marcas pertenecen en su totalidad a sus respectivos propietarios de medios. Respete siempre las normas de propiedad intelectual digital antes de reutilizar el contenido.",
    copyrightText: "© 2026 Jinald Inc",
    detectedAlert: "Idioma cambiado automáticamente según tu preferencia de región:"
  },
  fr: {
    downloadsToday: "Téléchargements aujourd'hui",
    themeLight: "Passer au mode clair",
    themeDark: "Passer au mode sombre",
    home: "Accueil",
    tiktokDownloader: "Téléchargeur TikTok",
    instagramDownloader: "Téléchargeur Instagram",
    blog: "Blog",
    aboutUs: "À propos",
    contactUs: "Contact",
    privacyPolicy: "Politique de confidentialité",
    termsOfService: "Conditions d'utilisation",
    dmcaPolicy: "Politique DMCA",
    zeroWatermarks: "Sans filigrane",
    heroTitleHome: "Enregistrer des vidéos TikTok & Instagram de haute qualité",
    heroTitleTikTok: "Enregistrer des vidéos TikTok de haute qualité",
    heroTitleInstagram: "Enregistrer des vidéos Instagram de haute qualité",
    heroDescHome: "Téléchargez facilement vos vidéos TikTok et reels Instagram préférés en haute qualité. Pas d'inscription, sans filigrane et complètement gratuit.",
    heroDescTikTok: "Sauvegardez vos vidéos TikTok préférées directement sur votre appareil, sans filigrane. Pas d'inscription, pas d'installation et totalement gratuit.",
    heroDescInstagram: "Téléchargez des Reels, des vidéos de profil et des photos d'Instagram dans une qualité visuelle irréprochable. Sans filigrane, sans inscription, gratuit.",
    pasteLabel: "Coller le lien de l'URL de la vidéo",
    placeholderHome: "https://tiktok.com/... ou https://instagram.com/reel/...",
    placeholderTikTok: "https://www.tiktok.com/@username/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "Effacer le lien",
    downloadBtn: "Télécharger",
    extractingBtn: "Extraction en cours...",
    validationErrorEmpty: "Veuillez d'abord entrer une URL valide de TikTok ou Instagram",
    validationErrorInvalid: "Veuillez entrer un lien vidéo TikTok ou Instagram valide",
    skeletonText: "Extraction des détails du média...",
    platformDetected: "détecté",
    extractId: "ID d'extraction :",
    downloadAnother: "Télécharger une autre vidéo",
    livePreview: "Aperçu HD en direct",
    views: "Vues",
    likes: "J'aime",
    comments: "Commentaires",
    shares: "Partages",
    durationLabel: "Durée",
    proHDBadge: "Pro HD",
    mp4Format: "Format MP4",
    downloadVideoBtn: "Télécharger la vidéo",
    savedLabel: "Enregistré",
    finishedLabel: "Terminé !",
    audioMP3Label: "audio (MP3)",
    audioMP3Desc: "Audio de haute qualité",
    getMP3AudioBtn: "Obtenir l'audio MP3",
    sslSecureLabel: "Liens SSL cryptés vérifiés • Contournement sécurisé directement depuis la source d'origine",
    capabilitiesTitleTikTok: "Capacités de téléchargement TikTok",
    capabilitiesTitleInstagram: "Capacités de téléchargement Instagram",
    capabilitiesTitleGeneral: "Capacités des plateformes prises en charge",
    tiktokCap1: "Téléchargement illimité de publications TikTok sans filigrane",
    tiktokCap2: "Extraction des pistes audio et superpositions sonores natives",
    tiktokCap3: "Plusieurs résolutions de destination disponibles (jusqu'à la HD)",
    tiktokCap4: "Traitement ultra-rapide contournant les barrières client",
    instagramCap1: "Extraction de Reels, publications et carrousels en un clic",
    instagramCap2: "Boucle CDN directe préservant la qualité d'origine",
    instagramCap3: "Extraction MP3 dynamique pour les clips musicaux de reels",
    instagramCap4: "Contournement sécurisé des invites de connexion & tokens",
    faqTitle: "Foire Aux Questions",
    faqSubtitle: "Tout ce que vous devez savoir sur les filigranes, les limites de vitesse et la sécurité.",
    faqItemsHome: [
      {
        question: "Comment télécharger une vidéo de TikTok ou d'Instagram ?",
        answer: "Copiez simplement l'URL de la vidéo ou du reel, collez-la dans la barre de saisie ci-dessus, puis cliquez sur 'Télécharger'. Choisissez votre format et profitez-en !"
      },
      {
        question: "Les fichiers téléchargés contiennent-ils des filigranes ?",
        answer: "Non, notre convertisseur extrait directement les flux de diffusion bruts. Les fichiers sont 100 % vierges de tout filigrane marqueur."
      },
      {
        question: "Quels formats et résolutions sont disponibles ?",
        answer: "Nous prenons en charge les fichiers vidéo HD jusqu'à 1080p, des fichiers plus compressés pour économiser la bande passante, ainsi qu'une extraction audio MP3 pure."
      },
      {
        question: "Dois-je payer ou m'inscrire ?",
        answer: "Aucune inscription ni paiement requis ! Le site est 100% anonyme, gratuit et fonctionne entièrement en ligne."
      },
      {
        question: "Y a-t-il une limite de téléchargement ?",
        answer: "Les téléchargements sont illimités, avec une régulation légère de 15 requêtes par minute pour stabiliser nos serveurs."
      }
    ],
    faqItemsTikTok: [
      {
        question: "Comment extraire une vidéo TikTok ?",
        answer: "Copiez le lien depuis l'application TikTok, collez-le ici et obtenez instantanément le clip vidéo original."
      },
      {
        question: "Les TikToks sont-ils enregistrés sans logo ?",
        answer: "Absolument. Les vidéos sont téléchargées directement à partir des flux de service sans logo de superposition."
      },
      {
        question: "Puis-je enregistrer seulement le son de TikTok ?",
        answer: "Oui, notre outil propose une extraction audio MP3 optimale pour sauvegarder uniquement la musique."
      },
      {
        question: "Dois-je renseigner mon compte ?",
        answer: "Non, aucune identification n'est nécessaire. Notre passerelle reste sécurisée et confidentielle."
      },
      {
        question: "Est-ce gratuit ?",
        answer: "Oui, totalement gratuit, ouvert et sans coût caché."
      }
    ],
    faqItemsInstagram: [
      {
        question: "Comment télécharger un Reel Instagram ?",
        answer: "Copiez le lien depuis Instagram, insérez-le ci-dessus et cliquez sur le bouton de téléchargement."
      },
      {
        question: "Les Reels sont-ils exempts de filigrane ?",
        answer: "Oui, les fichiers récupérés proviennent directement du serveur d'origine sans aucune altération de marque."
      },
      {
        question: "Puis-je télécharger des photos de carrousel ?",
        answer: "Oui, notre système prend en charge les photos uniques, carrousels multiples et vidéos standard."
      },
      {
        question: "Dois-je me connecter à Instagram ?",
        answer: "Non, l'outil télécharge n'importe quel média public sans nécessiter de mot de passe."
      },
      {
        question: "Puis-je extraire le MP3 d'un Reel ?",
        answer: "Oui, vous pouvez exporter l'audio d'une vidéo Instagram en cliquant sur 'Mélanger l'audio MP3'."
      }
    ],
    disclaimerHeader: "Avertissement :",
    disclaimerText: "Cette application est un outil d'archivage personnel de sauvegardes et d'exploration de médias. Nous ne sommes pas alliés ou officiellement affiliés à TikTok, ByteDance, Instagram, Meta, ou à tout autre réseau social lié. Les droits d'auteur des marques appartiennent entièrement à leurs propriétaires respectifs. Respectez toujours les règles de propriété intellectuelle numérique avant de réutiliser du contenu.",
    copyrightText: "© 2026 Jinald Inc",
    detectedAlert: "Langue modifiée automatiquement en fonction de vos préférences régionales :"
  },
  de: {
    downloadsToday: "Downloads heute",
    themeLight: "In den hellen Modus wechseln",
    themeDark: "In den dunklen Modus wechseln",
    home: "Startseite",
    tiktokDownloader: "TikTok Downloader",
    instagramDownloader: "Instagram Downloader",
    blog: "Blog",
    aboutUs: "Über uns",
    contactUs: "Kontakt",
    privacyPolicy: "Datenschutzerklärung",
    termsOfService: "Nutzungsbedingungen",
    dmcaPolicy: "DMCA-Richtlinie",
    zeroWatermarks: "Ohne Wasserzeichen",
    heroTitleHome: "TikTok & Instagram Videos in hoher Qualität speichern",
    heroTitleTikTok: "TikTok Videos in hoher Qualität speichern",
    heroTitleInstagram: "Instagram Videos in hoher Qualität speichern",
    heroDescHome: "Laden Sie Ihre Lieblings-TikTok-Videos und Instagram-Reels ganz einfach in hoher Qualität herunter. Ohne Anmeldung, ohne Wasserzeichen und absolut kostenlos.",
    heroDescTikTok: "Speichern Sie Ihre Lieblings-TikTok-Videos direkt auf Ihrem Gerät – wasserzeichenfrei und in bester Streaming-Qualität. Ohne Registrierung und kostenlos.",
    heroDescInstagram: "Laden Sie Reels, Profilvideos und Foto-Beiträge von Instagram in erstklassiger Bildqualität herunter. Keine Anmeldung, keine Wasserzeichen und völlig gratis.",
    pasteLabel: "Video-URL-Link hier einfügen",
    placeholderHome: "https://tiktok.com/... oder https://instagram.com/reel/...",
    placeholderTikTok: "https://www.tiktok.com/@username/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "Link löschen",
    downloadBtn: "Herunterladen",
    extractingBtn: "Extrahiere Medien...",
    validationErrorEmpty: "Bitte geben Sie zuerst eine gültige TikTok- oder Instagram-URL ein",
    validationErrorInvalid: "Bitte geben Sie einen gültigen TikTok- oder Instagram-Videolink ein",
    skeletonText: "Extrahiere Mediengrunddaten...",
    platformDetected: "erkannt",
    extractId: "Extraktions-ID:",
    downloadAnother: "Ein weiteres Video herunterladen",
    livePreview: "Live HD Vorschau",
    views: "Aufrufe",
    likes: "Likes",
    comments: "Kommentare",
    shares: "Geteilt",
    durationLabel: "Dauer",
    proHDBadge: "Pro HD",
    mp4Format: "MP4 Format",
    downloadVideoBtn: "Video herunterladen",
    savedLabel: "Gespeichert",
    finishedLabel: "Fertig!",
    audioMP3Label: "Audio (MP3)",
    audioMP3Desc: "Hochwertige Audiodatei",
    getMP3AudioBtn: "MP3-Audio herunterladen",
    sslSecureLabel: "Verschlüsselte SSL-Verbindung verifiziert • Sicheres Umgehen von Client-Sperren",
    capabilitiesTitleTikTok: "TikTok-Downloader-Funktionen",
    capabilitiesTitleInstagram: "Instagram-Downloader-Funktionen",
    capabilitiesTitleGeneral: "Unterstützte Plattformfunktionen",
    tiktokCap1: "Unbegrenzte TikTok-Downloads ohne störendes Wasserzeichen",
    tiktokCap2: "Hintergrundmusik und Soundtracks direkt isolieren",
    tiktokCap3: "Mehrere Auflösungen zur Auswahl (inklusive HD-Qualität)",
    tiktokCap4: "Sofortige Server-Verarbeitung ohne Browser-Verzögerungen",
    instagramCap1: "Reels, Bilder und Karussells im Handumdrehen speichern",
    instagramCap2: "Direktabruf von sicheren Servern sorgt für Original-Bitrate",
    instagramCap3: "Dynamische Generierung von MP3-Audiospuren für Reels",
    instagramCap4: "Sicheres Umgehen von Anmeldeschranken auf Instagram",
    faqTitle: "Häufig gestellte Fragen (FAQ)",
    faqSubtitle: "Alles, was Sie über Wasserzeichen, Download-Geschwindigkeiten und Dateisicherheit wissen müssen.",
    faqItemsHome: [
      {
        question: "Wie lade ich Videos von TikTok oder Instagram herunter?",
        answer: "Einfach die URL des Beitrags kopieren, oben im Eingabefeld einfügen und auf 'Herunterladen' klicken. Wählen Sie die gewünschte Qualität aus und speichern Sie die Datei!"
      },
      {
        question: "Sind die heruntergeladenen Videos frei von Wasserzeichen?",
        answer: "Ja, unser System greift direkt auf die Rohdatenströme zu. Die heruntergeladenen MP4-Videos sind absolut frei von Wasserzeichen."
      },
      {
        question: "Welche Qualitäten und Formate werden unterstützt?",
        answer: "Es werden HD-Auflösungen bis zu 1080p und komprimierte Varianten für schnelles Sparen von Datenvolumen (720p, 480p) sowie MP3-Extraktion unterstützt."
      },
      {
        question: "Muss ich mich registrieren oder bezahlen?",
        answer: "Nein, unser Service ist komplett kostenfrei und erfordert keine Registrierung, Software-Installation oder Anmeldung."
      },
      {
        question: "Gibt es ein Limit bei den Downloads?",
        answer: "Sie können unbegrenzt viele Videos herunterladen. Zum Schutz vor Manipulationen gilt ein Sicherheitslimit von 15 Anfragen pro Minute."
      }
    ],
    faqItemsTikTok: [
      {
        question: "Wie lade ich ein TikTok-Video herunter?",
        answer: "Teilen-Button beim Video anklicken, Link kopieren und hier einsetzen, um den Download sofort zu starten."
      },
      {
        question: "Haben die TikTok-Downloads Wasserzeichen?",
        answer: "Nein, diese Videos enthalten kein TikTok-Logo und sind vollkommen frei von Wasserzeichen."
      },
      {
        question: "Kann ich nur den Ton von TikTok herunterladen?",
        answer: "Ja, wir extrahieren die Soundspur direkt und stellen sie als MP3-Download bereit."
      },
      {
        question: "Muss ich meine TikTok-Anmeldedaten eingeben?",
        answer: "Niemals. Wir benötigen kein Passwort und respektieren Ihre Privatsphäre."
      },
      {
        question: "Ist die Nutzung unbegrenzt kostenlos?",
        answer: "Ja, unbegrenzt gratis und ohne versteckte Werbeabonnements."
      }
    ],
    faqItemsInstagram: [
      {
        question: "Wie speichere ich Reels von Instagram?",
        answer: "Instagram-Link kopieren, oben einfügen und downloaden. Perfekt für Offline-Backups."
      },
      {
        question: "Sind Instagram-Videos frei von Wasserzeichen?",
        answer: "Ja, wir laden sie direkt von Instagram-Servern unverfälscht herunter."
      },
      {
        question: "Funktioniert es bei Karussell-Beiträgen?",
        answer: "Ja, Karussells mit Bildern und Videos werden problemlos unterstützt."
      },
      {
        question: "Benötige ich einen Instagram-Account?",
        answer: "Nein, Downloads von öffentlichen Profilen funktionieren komplett ohne Anmeldung."
      },
      {
        question: "Kann man IG-Audio extrahieren?",
        answer: "Ja, die Musik des Beitrags kann direkt als MP3-Datei heruntergeladen werden."
      }
    ],
    disclaimerHeader: "Haftungsausschluss:",
    disclaimerText: "Diese App ist ein Werkzeug zur persönlichen Backup-Archivierung und Medienexploration. Wir stehen in keiner Allianz oder offiziellen Verbindung mit TikTok, ByteDance, Instagram, Meta oder anderen damit verbundenen sozialen Mediennetzwerken. Alle Markenrechte liegen ausschließlich bei den jeweiligen Inhabern. Bitte respektieren Sie die Urheberrechte der Künstler.",
    copyrightText: "© 2026 Jinald Inc",
    detectedAlert: "Sprache automatisch an Ihre regionalen Einstellungen angepasst:"
  },
  pt: {
    downloadsToday: "Downloads hoje",
    themeLight: "Mudar para o Modo Claro",
    themeDark: "Mudar para o Modo Escuro",
    home: "Início",
    tiktokDownloader: "Baixar vídeos do TikTok",
    instagramDownloader: "Baixar vídeos do Instagram",
    blog: "Blog",
    aboutUs: "Sobre nós",
    contactUs: "Contato",
    privacyPolicy: "Política de privacidade",
    termsOfService: "Termos de serviço",
    dmcaPolicy: "Política DMCA",
    zeroWatermarks: "Sem marcas d'água",
    heroTitleHome: "Salvar vídeos do TikTok e Instagram em alta qualidade",
    heroTitleTikTok: "Salvar vídeos do TikTok em alta qualidade",
    heroTitleInstagram: "Salvar vídeos do Instagram em alta qualidade",
    heroDescHome: "Baixe facilmente seus vídeos favoritos do TikTok e reels do Instagram em alta qualidade. Sem cadastros, sem marcas d'água e totalmente grátis.",
    heroDescTikTok: "Salve seus TikToks favoritos diretamente no seu dispositivo sem logotipos ou marcas d'água de forma totalmente gratuita e sem registros.",
    heroDescInstagram: "Baixe Reels, vídeos de perfil e fotos do Instagram com excelente qualidade visual. Sem marcas d'água, sem logins e 100% gratuito.",
    pasteLabel: "Cole o link da URL do vídeo",
    placeholderHome: "https://tiktok.com/... ou https://instagram.com/reel/...",
    placeholderTikTok: "https://www.tiktok.com/@username/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "Limpar o link",
    downloadBtn: "Baixar",
    extractingBtn: "Extraindo mídia...",
    validationErrorEmpty: "Por favor, insira primeiro um URL válido do TikTok ou Instagram",
    validationErrorInvalid: "Por favor, insira um link de vídeo válido do TikTok ou Instagram",
    skeletonText: "Extraindo detalhes do arquivo de mídia...",
    platformDetected: "detectado",
    extractId: "ID de extração:",
    downloadAnother: "Baixar outro vídeo",
    livePreview: "Visualização HD ao vivo",
    views: "Visualizações",
    likes: "Curtidas",
    comments: "Comentários",
    shares: "Compartilhamentos",
    durationLabel: "Duração",
    proHDBadge: "Pro HD",
    mp4Format: "Formato MP4",
    downloadVideoBtn: "Baixar vídeo",
    savedLabel: "Salvo",
    finishedLabel: "Concluído!",
    audioMP3Label: "Áudio (MP3)",
    audioMP3Desc: "Áudio de alta qualidade",
    getMP3AudioBtn: "Obter áudio MP3",
    sslSecureLabel: "Conexões seguras SSL verificadas • Desvio direto do servidor de origem seguro",
    capabilitiesTitleTikTok: "Recursos do baixador de TikTok",
    capabilitiesTitleInstagram: "Recursos do baixador de Instagram",
    capabilitiesTitleGeneral: "Recursos de plataformas compatíveis",
    tiktokCap1: "Baixe publicações ilimitadas do TikTok sem marca d'água",
    tiktokCap2: "Extraia faixas de áudio e músicas de fundo nativamente",
    tiktokCap3: "Várias opções de resoluções de destino disponíveis (incluindo HD)",
    tiktokCap4: "Processamento rápido operado diretamente nos servidores",
    instagramCap1: "Grave Reels, fotos e carrosséis rapidamente",
    instagramCap2: "Bucle direto de CDN garantindo a taxa de bits original",
    instagramCap3: "Conversão dinâmica para MP3 para obter sons de reels",
    instagramCap4: "Desvio seguro que dispensa logins e senhas de acesso",
    faqTitle: "Perguntas Frequentes",
    faqSubtitle: "Tudo o que você precisa saber sobre marcas d'água, limites de velocidade e segurança de arquivos.",
    faqItemsHome: [
      {
        question: "Como posso baixar vídeos do TikTok ou Reels do Instagram?",
        answer: "Basta copiar o link desejado no respectivo aplicativo, colar no campo de texto acima e clicar no botão 'Baixar'. Escolha a resolução desejada e salve."
      },
      {
        question: "Os downloads são livres de marcas d'água?",
        answer: "Sim, extraímos diretamente os fluxos puros de transmissão de vídeo para fornecer downloads limpos e sem marcas d'água."
      },
      {
        question: "Quais são as resoluções suportadas?",
        answer: "Suportamos arquivos de vídeo HD de alta definição até 1080p, além de versões otimizadas mais leves e áudio estéreo em MP3."
      },
      {
        question: "Preciso criar uma conta para baixar?",
        answer: "Não. Nosso serviço é totalmente gratuito, anônimo e funciona em qualquer dispositivo sem necessidade de login."
      },
      {
        question: "Existe limite de downloads diários?",
        answer: "Não há limite de quantidade, apenas limitamos a velocidade por questões de segurança (15 downloads por minuto)."
      }
    ],
    faqItemsTikTok: [
      {
        question: "Como baixar vídeo do TikTok?",
        answer: "Copie o link do vídeo, cole na caixa de texto acima e faça a extração em poucos segundos."
      },
      {
        question: "O vídeo do TikTok vem sem marca d'água?",
        answer: "Sim, fornecemos o link direto limpo, sem o selo com logotipo flutuante do TikTok."
      },
      {
        question: "Posso baixar apenas a música de fundo do TikTok?",
        answer: "Sim, extraímos o arquivo MP3 de áudio do respectivo vídeo de forma direta."
      },
      {
        question: "É necessário entrar na minha conta do TikTok?",
        answer: "Nunca solicitamos suas senhas. A busca é feita de forma independente em publicações abertas."
      },
      {
        question: "O site é realmente gratuito?",
        answer: "Sim, totalmente grátis e sem nenhum tipo de taxa."
      }
    ],
    faqItemsInstagram: [
      {
        question: "Como salvar Reels do Instagram no meu celular?",
        answer: "Copie o link do post, cole no nosso campo acima e clique sobre a opção de salvamento."
      },
      {
        question: "O download de Instagram tem marca d'água?",
        answer: "Não, as mídias são baixadas nas definições mais fiéis de origem sem adições."
      },
      {
        question: "Funciona para carrossel com várias imagens?",
        answer: "Sim, detectamos carrosséis de fotos do Instagram para permitir baixar o conteúdo."
      },
      {
        question: "Preciso colocar minha conta do Instagram para baixar?",
        answer: "Não, nosso site respeita sua segurança e processa tudo sem necessidade de login."
      },
      {
        question: "Posso salvar áudios dos posts?",
        answer: "Sim, converta o áudio do Reel diretamente com o botão de formato MP3."
      }
    ],
    disclaimerHeader: "Isenção de responsabilidade:",
    disclaimerText: "Este aplicativo é uma ferramenta para arquivamento de backup pessoal e exploração de mídia. Não estamos aliados ou oficialmente afiliados ao TikTok, ByteDance, Instagram, Meta ou quaisquer redes sociais relacionadas. Os direitos autorais das marcas pertencem inteiramente aos seus respectivos proprietários de mídia. Respeite sempre as regras de propriedade intelectual digital antes de reutilizar o conteúdo.",
    copyrightText: "© 2026 Jinald Inc",
    detectedAlert: "Idioma alterado automaticamente conforme a sua região:"
  },
  ar: {
    downloadsToday: "التحميلات اليوم",
    themeLight: "التبديل إلى الوضع الفاتح",
    themeDark: "التبديل إلى الوضع الداكن",
    home: "الرئيسية",
    tiktokDownloader: "تحميل تيك توك",
    instagramDownloader: "تحميل إنستغرام",
    blog: "المدونة",
    aboutUs: "معلومات عنا",
    contactUs: "اتصل بنا",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    dmcaPolicy: "سياسة DMCA",
    zeroWatermarks: "بدون علامة مائية",
    heroTitleHome: "حفظ فيديوهات تيك توك وإنستغرام بجودة عالية",
    heroTitleTikTok: "حفظ فيديوهات تيك توك بجودة عالية",
    heroTitleInstagram: "حفظ فيديوهات إنستغرام بجودة عالية",
    heroDescHome: "قم بتحميل مقاطع تيك توك وريلز إنستغرام المفضلة لديك بكل سهولة وبأعلى جودة. بدون تسجيل، بدون علامات مائية، ومجاني بالكامل.",
    heroDescTikTok: "احفظ فيديوهات تيك توك بدون علامات مائية مباشرة على جهازك مجاناً وبدون الحاجة لإنشاء حساب أو تثبيت برامج.",
    heroDescInstagram: "قم بحميل ريلز وصور ومنشورات إنستغرام بجودة أصلية ممتازة. تطبيق مجاني بالكامل بدون علامات مائية وبدون تسجيل.",
    pasteLabel: "قم بلصق رابط المنشور هنا",
    placeholderHome: "أدخل رابط تيك توك أو ريل إنستغرام...",
    placeholderTikTok: "https://www.tiktok.com/@username/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "مسح الرابط",
    downloadBtn: "تحميل",
    extractingBtn: "جاري استخراج البيانات...",
    validationErrorEmpty: "يرجى إدخال رابط تيك توك أو إنستغرام صحيح أولاً",
    validationErrorInvalid: "يرجى إدخال رابط فيديو تيك توك أو ريل إنستغرام صحيح",
    skeletonText: "جاري استخراج تفاصيل الميديا وتجهيز الروابط...",
    platformDetected: "تم اكتشافه",
    extractId: "رقم التحميل:",
    downloadAnother: "تحميل فيديو آخر",
    livePreview: "معاينة البث المباشر HD",
    views: "المشاهدات",
    likes: "الإعجابات",
    comments: "التعليقات",
    shares: "المشاركات",
    durationLabel: "المدة",
    proHDBadge: "Pro HD",
    mp4Format: "صيغة MP4",
    downloadVideoBtn: "تحميل الفيديو",
    savedLabel: "تم الحفظ",
    finishedLabel: "اكتمل التحميل!",
    audioMP3Label: "صوت (MP3)",
    audioMP3Desc: "ملفات صوتية عالية النقاء",
    getMP3AudioBtn: "تحميل الصوت MP3",
    sslSecureLabel: "اتصال SSL مشفر وآمن تماماً • تجاوز خوادم المنصات وتوليد روابط تحميل مباشرة ونظيفة",
    capabilitiesTitleTikTok: "مميزات تحميل تيك توك",
    capabilitiesTitleInstagram: "مميزات تحميل إنستغرام",
    capabilitiesTitleGeneral: "المنصات المدعومة ومميزات التحميل",
    tiktokCap1: "تحميل غير محدود من منصة تيك توك بدون شعار أو علامات مائية",
    tiktokCap2: "فصل وتحميل المقاطع الصوتية وموسيقى الخلفية بجودة مذهلة",
    tiktokCap3: "خيارات وتنسيقات متعددة الدقة والوضوح (متوفر جودة HD)",
    tiktokCap4: "عمليات معالجة سحابية فورية ومباشرة دون أي انتظار وبسرعة قصوى",
    instagramCap1: "تحميل ريلز، منشورات فردية، ومنشورات الشرائح المتعددة Carousel",
    instagramCap2: "توليد تلقائي لروابط CDN سريعة وتنزيل الملف بجودته وبترمييزه الأصلي",
    instagramCap3: "تحويل ريلز وفيديوهات إنستغرام إلى مقاطع صوتية MP3 بنقرة واحدة",
    instagramCap4: "تجاوز عقبات وسياسات تسجيل الدخول وحماية خصوصية المتصفح تماماً",
    faqTitle: "الأسئلة الشائعة FAQ",
    faqSubtitle: "كل ما تود معرفته حول كيفية التحميل، العلامات المائية، سرعة التحميل وأمان خصوصيتك.",
    faqItemsHome: [
      {
        question: "كيف أقوم بتحميل الفيديوهات من تيك توك أو إنستغرام؟",
        answer: "قم بنسخ رابط الفيديو أو الريل من التطبيق، ثم الصقه في مستطيل الإدخال بالأعلى واضغط على زر 'تحميل'. حدد الجودة المطلوبة لتبدأ عملية التنزيل فوراً."
      },
      {
        question: "هل المقاطع التي أقوم بتحميلها خالية من العلامة المائية؟",
        answer: "نعم تماماً، يقوم خادمنا بسحب روابط البث الخام والمباشرة ليعطيك مقاطع صافية بلمسة واحدة دون وجود علامة مائية عائمة."
      },
      {
        question: "ما هي التنسيقات والجودات المدعومة للتحميل؟",
        answer: "ندعم دقة فائقة الوضوح HD تصل إلى 1080p كما ندعم الجودات المضغوطة الاقتصادية والمقاطع الصوتية بصيغة MP3."
      },
      {
        question: "هل يلزمني التسجيل بالمنصة للتحميل؟",
        answer: "أبداً، لا يتطلب التسجيل، شحن الحساب، أو تثبيت إضافات. الأداة سحابية حرة وآمنة وتعمل من أي متصفح."
      },
      {
        question: "هل هناك قيود على حجم أو عدد التحميلات اليومية؟",
        answer: "التحميل لدينا غير محدود ومفتوح للجميع مجاناً! لمنع العبث، نطبق معدل طلبات تبلغ 15 عملية بالدقيقة لضمان استقرار الخوادم."
      }
    ],
    faqItemsTikTok: [
      {
        question: "كيف يمكنني تنزيل فيديو تيك توك؟",
        answer: "انسخ الرابط من تطبيق تيك توك، ثم قم بلصقه في الحقل المخصص بالأعلى واضغط على زر التحميل."
      },
      {
        question: "هل فيديوهات تيك توك خالية من العلامات التجارية؟",
        answer: "نعم، يتم توفير الفيديو الأصلي المسحوب من خوادم البث الرسمية بدون أي لوجو تيك توك."
      },
      {
        question: "هل يمكنني تنزيل موسيقى تيك توك فقط؟",
        answer: "نعم، يمكنك اختيار خيار تنزيل مقطع الصوت بجودة MP3 عالية."
      },
      {
        question: "هل يتطلب الأمر تسجيل الدخول باسم المستخدم في تيك توك؟",
        answer: "لا فخرية تامة، نأخذ رابط الفيديو فقط وننفذ العمل دون تدخلك بحساباتك الشخصية."
      },
      {
        question: "هل تنزيل تيك توك يتطلب اشتراكاً أو دفعاً؟",
        answer: "الخدمة حرة تماماً وبدون أي رسوم خفية أو باقات مدفوعة."
      }
    ],
    faqItemsInstagram: [
      {
        question: "كيف أحفظ مقاطع ريلز أو منشورات إنستغرام؟",
        answer: "انسخ رابط الريل أو الصورة من إنستغرام، ثم الصق الرابط في صندوق الأداة لبدء الاستخراج السريع."
      },
      {
        question: "هل المنشورات المحملة تحتوي على شعارات مائية؟",
        answer: "لا، تحصل على الملف النقي الأصلي دون أي تعديل أو دمج لأيقونات إنستغرام."
      },
      {
        question: "هل يدعم تنزيل الصور المتعددة (الالبوم)؟",
        answer: "نعم، خوارزمياتنا قادرة على رصد وتنزيل شرائح الصور والمنشورات المركبة بيسر وسهولة."
      },
      {
        question: "هل يجب تزويدكم بكلمة مرور إنستغرام؟",
        answer: "نحن مهتمون للغاية بخصوصيتك ولا نطلب معلوماتك الحساسية مطلقاً. المنشورات العامة يتم تنزيلها مباشرة."
      },
      {
        question: "كيف يمكنني عزل الصوت من ريل بجودة عالية؟",
        answer: "بمجرد معالجة الرابط، يتوفر خيار لتنزيل مقطع الصوت بنقاوة ستيريو MP3."
      }
    ],
    disclaimerHeader: "إخلاء مسؤولية:",
    disclaimerText: "هذا التطبيق هو أداة للأرشفة الشخصية والاستكشاف الإعلامي. نحن لسنا تابعين رسميًا لمنصة تيك توك، بايت دانس، إنستغرام، ميتا، أو أي منصة تواصل اجتماعي أخرى. حقوق الطبع والنشر للماركات مملوكة لأصحابها بالكامل. يرجى احترام قوانين الملكية الفكرية الرقمية.",
    copyrightText: "© 2026 SaveKlip للبرمجيات. تم الإنجاز بما يتوافق مع معايير الويب فائقة الأداء.",
    detectedAlert: "تم تغيير لغة الموقع تلقائياً بناءً على إعدادات منطقتك وجهازك:"
  },
  ur: {
    downloadsToday: "آج کے ڈاؤن لوڈز",
    themeLight: "لائٹ موڈ پر جائیں",
    themeDark: "ڈارک موڈ پر جائیں",
    home: "ہوم",
    tiktokDownloader: "ٹک ٹاک ڈاؤن لوڈر",
    instagramDownloader: "انسٹاگرام ڈاؤن لوڈر",
    blog: "بلاگ",
    aboutUs: "ہمارے بارے میں",
    contactUs: "رابطہ کریں",
    privacyPolicy: "پرائیویسی پالیسی",
    termsOfService: "شرائط و ضوابط",
    dmcaPolicy: "ڈی ایم سی اے",
    zeroWatermarks: "بغیر واٹر مارک کے",
    heroTitleHome: "ٹک ٹاک اور انسٹاگرام ویڈیوز ہائی کوالٹی میں ڈاؤن لوڈ کریں",
    heroTitleTikTok: "ٹک ٹاک ویڈیوز ہائی کوالٹی میں ڈاؤن لوڈ کریں",
    heroTitleInstagram: "انسٹاگرام ویڈیوز ہائی کوالٹی میں ڈاؤن لوڈ کریں",
    heroDescHome: "اپنی پسندیدہ ٹک ٹاک ویڈیوز اور انسٹاگرام ریلز آسانی سے اعلیٰ ترین کوالٹی میں ڈاؤن لوڈ کریں۔ کسی سائن اپ اور واٹر مارک کے بغیر، بالکل مفت۔",
    heroDescTikTok: "اپنی پسندیدہ ٹک ٹاک ویڈیوز بغیر واٹر مارک کے براہ راست اپنے موبائل یا کمپیوٹر میں ڈاؤن لوڈ کریں۔ بغیر کسی لاگ ان اور فیس کے۔",
    heroDescInstagram: "انسٹاگرام ریلز، پوسٹس اور فائلیں بہترین کوالٹی میں محفوظ کریں۔ واٹر مارک کے بغیر اور بالکل مفت۔",
    pasteLabel: "ویڈیو کا لنک یہاں پیسٹ کریں",
    placeholderHome: "لنک یہاں پیسٹ کریں...",
    placeholderTikTok: "https://www.tiktok.com/@username/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "لنک صاف کریں",
    downloadBtn: "ڈاؤن لوڈ",
    extractingBtn: "میڈیا نکالا جا رہا ہے...",
    validationErrorEmpty: "براہ کرم سب سے پہلے درست ٹک ٹاک یا انسٹاگرام لنک فراہم کریں",
    validationErrorInvalid: "براہ کرم درست ٹک ٹاک یا انسٹاگرام ویڈیو لنک فراہم کریں",
    skeletonText: "تفصیلات نکالی جا رہی ہیں...",
    platformDetected: "شناخت شدہ",
    extractId: "ڈاؤن لوڈ آئی ڈی:",
    downloadAnother: "دوسری ویڈیو ڈاؤن لوڈ کریں",
    livePreview: "براہ راست ایچ ڈی پیش نظارہ",
    views: "ویوز",
    likes: "لائکس",
    comments: "کمنٹس",
    shares: "شیئر",
    durationLabel: "دورانیہ",
    proHDBadge: "Pro HD",
    mp4Format: "MP4 فارمیٹ",
    downloadVideoBtn: "ویڈیو ڈاؤن لوڈ کریں",
    savedLabel: "محفوظ کر لیا گیا",
    finishedLabel: "مکمل ہو گیا!",
    audioMP3Label: "آڈیو (MP3)",
    audioMP3Desc: "اعلیٰ معیار کی آڈیو فائل",
    getMP3AudioBtn: "MP3 آڈیو حاصل کریں",
    sslSecureLabel: "محفوظ اور انکرپٹڈ ڈاؤن لوڈ لنکس • تھرڈ پارٹی سے براہ راست محفوظ ڈاؤن لوڈنگ",
    capabilitiesTitleTikTok: "ٹک ٹاک ڈاؤن لوڈر کی خصوصیات",
    capabilitiesTitleInstagram: "انسٹاگرام ڈاؤن لوڈر کی خصوصیات",
    capabilitiesTitleGeneral: "مدد یافتہ پلیٹ فارمز کی خصوصیات",
    tiktokCap1: "بغیر واٹر مارک کے لامحدود ٹک ٹاک ویڈیوز ڈاؤن لوڈ کریں",
    tiktokCap2: "ویڈیو کا بیک گراؤنڈ میوزک اور آوازیں آسانی سے ڈاؤن لوڈ کریں",
    tiktokCap3: "مختلف ایچ ڈی ریزولیوشنز میں ڈاؤن لوڈنگ دستیاب ہے",
    tiktokCap4: "بغیر کسی انتظار کے انتہائی تیز رفتار سائن آپشنز",
    instagramCap1: "انسٹاگرام ریلز اور پوسٹس سیکنڈوں میں ڈاؤن لوڈ کریں",
    instagramCap2: "براہ راست سی ڈی این سرورز سے بہترین کوالٹی پر ڈاؤن لوڈنگ",
    instagramCap3: "انسٹاگرام ریلز سے ایک کلک پر پیور MP3 آڈیو ڈاؤن لوڈ کریں",
    instagramCap4: "کسی لاگ ان یا اکاؤنٹ پرائیویسی خدشات کے بغیر ڈاؤن لوڈنگ",
    faqTitle: "اکثر پوچھے گئے سوالات (FAQ)",
    faqSubtitle: "واٹر مارک، رفتار کی حد، اور فائلوں کی حفاظت کے بارے میں سب کچھ۔",
    faqItemsHome: [
      {
        question: "میں ٹک ٹاک یا انسٹاگرام سے ویڈیو کیسے ڈاؤن لوڈ کروں؟",
        answer: "ویڈیو یا ریل کا لنک کاپی کریں، اسے اوپر بکس میں پیسٹ کریں اور 'ڈاؤن لوڈ' بٹن پر کلک کریں۔ اپنی پسند کی کوالٹی منتخب کریں اور ڈاؤن لوڈ شروع کریں!"
      },
      {
        question: "کیا ڈاؤن لوڈ کی گئی ویڈیوز میں واٹر مارک ہوتا ہے؟",
        answer: "جی نہیں، ہماری ویب سائٹ کا سرور براہ راست سورس فائل نکالتا ہے، اس لیے ویڈیوز واٹر مارک کے بغیر بالکل صاف ہوتی ہیں۔"
      },
      {
        question: "کون سے فارمیٹس فراہم کیے جاتے ہیں؟",
        answer: "ہم 1080p تک ایچ ڈی ویڈیوز، چھوٹی فائل سائز کے فارمیٹس، اور پیور MP3 آڈیو ڈاؤن لوڈنگ کی سہولت فراہم کرتے ہیں۔"
      },
      {
        question: "کیا مجھے اکاؤنٹ بنانے کی ضرورت ہے؟",
        answer: "نہیں، کسی قسم کی لاگ ان یا رجسٹریشن کی ضرورت نہیں ہے۔ یہ مکمل طور پر مفت اور گمنام ہے۔"
      },
      {
        question: "کیا روزانہ ڈاؤن لوڈز کی کوئی حد ہے؟",
        answer: "ڈاؤن لوڈز بالکل لامحدود ہیں۔ سرور کو محفوظ رکھنے کے لیے ہم ایک منٹ میں 15 ڈاؤن لوڈز کی معمولی حد نافذ کرتے ہیں۔"
      }
    ],
    faqItemsTikTok: [
      {
        question: "ٹک ٹاک ویڈیو کیسے ڈاؤن لوڈ کریں؟",
        answer: "ٹک ٹاک سے لنک کاپی کریں، یہاں پیسٹ کریں اور ڈاؤن لوڈ پر کلک کریں۔"
      },
      {
        question: "کیا ٹک ٹاک ویڈیوز واٹر مارک کے بغیر ہوتی ہیں؟",
        answer: "جی ہاں، ڈاؤن لوڈ کی گئی ویڈیوز ٹک ٹاک کے واٹر مارک (لوگو) کے بغیر ہوتی ہیں۔"
      },
      {
        question: "کیا ٹک ٹاک کا ساؤنڈ ڈاؤن لوڈ کیا جا سکتا ہے؟",
        answer: "جی ہاں، آپ ویڈیو کو اعلیٰ کوالٹی کے MP3 آڈیو فارمیٹ میں محفوظ کر سکتے ہیں۔"
      },
      {
        question: "کیا ٹک ٹاک اکاؤنٹ کی تفصیلات درکار ہیں؟",
        answer: "نہیں، ہم کبھی بھی آپ کے لاگ ان کی تفصیلات یا پاس ورڈ نہیں مانگتے۔"
      },
      {
        question: "کیا یہ سروس واقعی مفت ہے؟",
        answer: "جی ہاں، یہ سروس ہمیشہ کے لیے بالکل مفت ہے۔"
      }
    ],
    faqItemsInstagram: [
      {
        question: "انسٹاگرام ریلز کیسے ڈاؤن لوڈ کریں؟",
        answer: "انسٹاگرام سے ریل کا لنک کاپی کر کے یہاں پیسٹ کریں، ریل فوراً ڈاؤن لوڈ ہو جائے گی۔"
      },
      {
        question: "کیا انسٹاگرام ڈاؤن لوڈز واٹر مارک سے پاک ہوتے ہیں؟",
        answer: "جی ہاں، تمام فائلیں سورس سرور سے بالکل اصل اور صاف کوالٹی میں ڈاؤن لوڈ ہوتی ہیں۔"
      },
      {
        question: "کیا یہ الائڈ پوسٹس سپورٹ کرتا ہے؟",
        answer: "جی ہاں، یہ تصاویر، ویڈیوز اور ملٹی فوٹو پوسٹس (Carousel) سب کو سپورٹ کرتا ہے۔"
      },
      {
        question: "کیا مجھے انسٹاگرام لاگ ان درکار ہے؟",
        answer: "نہیں، پبلک پروفائلز سے ڈاؤن لوڈنگ کے لیے کسی لاگ ان کی ضرورت نہیں ہے۔"
      },
      {
        question: "کیا انسٹاگرام آڈیو ڈاؤن لوڈ ممکن ہے؟",
        answer: "جی ہاں، آپ ریلز کے بیک گراؤنڈ ساؤنڈ کو MP3 فارمیٹ میں ڈاؤن لوڈ کر سکتے ہیں۔"
      }
    ],
    disclaimerHeader: "دستبرداری (Disclaimer):",
    disclaimerText: "یہ ایپلی کیشن ذاتی بیکن اپ آرکائیونگ اور میڈیا ڈاؤن لوڈنگ کی سہولت کے لیے بنائی گئی ہے۔ ہمارا ٹک ٹاک، بائٹ ڈانس، انسٹاگرام، میٹا، یا کسی بھی دوسرے سوشل نیٹ ورک سے کوئی تعلق نہیں ہے۔ تمام برانڈز اور کاپی رائٹس ان کے اصل مالکان کے ہیں۔",
    copyrightText: "© 2026 SaveKlip سسٹمز۔ اعلیٰ کارکردگی والے ویب پروٹوکولز کے مطابق بنایا گیا۔",
    detectedAlert: "آپ کے علاقے اور براؤز کی ترجیحات کے مطابق زبان خود بخود تبدیل کر دی گئی ہے:"
  },
  hi: {
    downloadsToday: "आज के डाउनलोड",
    themeLight: "लाइट मोड पर जाएं",
    themeDark: "डार्क मोड पर जाएं",
    home: "होम",
    tiktokDownloader: "टिकटॉक डाउनलोडर",
    instagramDownloader: "इंस्टाग्राम डाउनलोडर",
    blog: "ब्लॉग",
    aboutUs: "हमारे बारे में",
    contactUs: "संपर्क करें",
    privacyPolicy: "प्राइवेसी पॉलिसी",
    termsOfService: "सेवा की शर्तें",
    dmcaPolicy: "डीएमसीए",
    zeroWatermarks: "बिना वॉटरमार्क",
    heroTitleHome: "टिकटॉक और इंस्टाग्राम वीडियो हाई-क्वालिटी में सेव करें",
    heroTitleTikTok: "टिकटॉक वीडियो हाई-क्वालिटी में सेव करें",
    heroTitleInstagram: "इंस्टाग्राम वीडियो हाई-क्वालिटी में सेव करें",
    heroDescHome: "अपने पसंदीदा टिकटॉक वीडियो और इंस्टाग्राम रील्स को आसानी से हाई-क्वालिटी में डाउनलोड करें। बिना साइन-अप, बिना वॉटरमार्क और पूरी तरह से मुफ्त।",
    heroDescTikTok: "अपने पसंदीदा टिकटॉक वीडियो को सीधे अपने डिवाइस में सुरक्षित करें। वाटरमार्क-मुक्त और बिना साइन-अप के बिल्कुल मुफ्त।",
    heroDescInstagram: "उत्कृष्ट दृश्य गुणवत्ता में इंस्टाग्राम रील्स, प्रोफाइल वीडियो और फोटो पोस्ट डाउनलोड करें। बिल्कुल मुफ्त और बिना वॉटरमार्क।",
    pasteLabel: "वीडियो का यूआरएल लिंक यहां पेस्ट करें",
    placeholderHome: "लिंक यहां पेस्ट करें...",
    placeholderTikTok: "https://www.tiktok.com/@username/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "लिंक हटाएं",
    downloadBtn: "डाउनलोड",
    extractingBtn: "मीडिया लोड हो रहा है...",
    validationErrorEmpty: "कृपया पहले एक वैध टिकटॉक या इंस्टाग्राम यूआरएल दर्ज करें",
    validationErrorInvalid: "कृपया एक वैध टिकटॉक या इंस्टाग्राम वीडियो लिंक दर्ज करें",
    skeletonText: "मीडिया जानकारी निकाली जा रही है...",
    platformDetected: "डिटेक्ट किया गया",
    extractId: "डाउनलोड आईडी:",
    downloadAnother: "दूसरा वीडियो डाउनलोड करें",
    livePreview: "लाइव एचडी प्रीव्यू",
    views: "व्यूज",
    likes: "लाइक्स",
    comments: "कमेंट्स",
    shares: "शेयर",
    durationLabel: "अवधि",
    proHDBadge: "Pro HD",
    mp4Format: "MP4 प्रारूप",
    downloadVideoBtn: "वीडियो डाउनलोड करें",
    savedLabel: "सुरक्षित किया गया",
    finishedLabel: "पूरा हुआ!",
    audioMP3Label: "ऑडियो (MP3)",
    audioMP3Desc: "उच्च गुणवत्ता की ऑडियो फ़ाइल",
    getMP3AudioBtn: "MP3 ऑडियो डाउनलोड करें",
    sslSecureLabel: "सुरक्षित एन्क्रिप्टेड SSL डाउनलोड की पुष्टि • सीधे मूल सर्वर से लिंक जनरेट",
    capabilitiesTitleTikTok: "टिकटॉक डाउनलोडर की विशेषताएं",
    capabilitiesTitleInstagram: "इंस्टाग्राम डाउनलोडर की विशेषताएं",
    capabilitiesTitleGeneral: "समर्थित प्लेटफ़ॉर्म विशेषताएं",
    tiktokCap1: "बिना वॉटरमार्क के असीमित टिकटॉक वीडियो डाउनलोड करें",
    tiktokCap2: "वीडियो के गानों और ध्वनियों को सीधे एमपी3 में सेव करें",
    tiktokCap3: "विभिन्न एचडी रिज़ॉल्यूशन में वीडियो डाउनलोड उपलब्ध है",
    tiktokCap4: "बिना किसी लोडिंग बाधा के सुपरफास्ट डाउनलोडिंग स्पीड",
    instagramCap1: "इंस्टाग्राम रील्स, पोस्ट और मुख्य मीडिया तेजी से निकालें",
    instagramCap2: "असली मूल गुणवत्ता बनाए रखने के लिए सीधा सीडीएन डाउनलोड",
    instagramCap3: "इंस्टाग्राम रील्स से एक क्लिक में शुद्ध एमपी3 ऑडियो डाउनलोड",
    instagramCap4: "बिना किसी पासवर्ड लॉगिन झंझट के सुरक्षित डाउनलोडिंग",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न (FAQ)",
    faqSubtitle: "वॉटरमार्क, डाउनलोडिंग स्पीड लिमिट और फाइल सुरक्षा के बारे में सब कुछ।",
    faqItemsHome: [
      {
        question: "मैं टिकटॉक या इंस्टाग्राम से वीडियो कैसे डाउनलोड करूं?",
        answer: "बस टिकटॉक या इंस्टाग्राम से वीडियो का लिंक कॉपी करें, उसे ऊपर बॉक्स में पेस्ट करें और 'डाउनलोड' पर क्लिक करें। अपनी पसंदीदा गुणवत्ता चुनें और सुरक्षित कर लें!"
      },
      {
        question: "क्या डाउनलोड किए गए वीडियो वॉटरमार्क से मुक्त हैं?",
        answer: "हां, हमारा सिस्टम मुख्य रूप से सीधे स्ट्रीम फाइलें डाउनलोड करता है, इसलिए वीडियो पूरी तरह से वॉटरमार्क के बिना साफ होते हैं।"
      },
      {
        question: "कौन से प्रारूप और वीडियो गुणवत्ता समर्थित हैं?",
        answer: "हम 1080p तक की मुख्य एचडी वीडियो फाइलों को सपोर्ट करते हैं, साथ ही आपके डेटा बचाने के लिए संकुचित फॉर्मेट और केवल एमपी3 ऑडियो की सुविधा भी है।"
      },
      {
        question: "क्या मुझे कोई खाता बनाने की आवश्यकता है?",
        answer: "नहीं, इसके लिए किसी खाता पंजीकरण या लॉगिन विवरण की आवश्यकता नहीं है। यह पूरी तरह से मुफ्त और गोपनीय है।"
      },
      {
        question: "क्या दैनिक डाउनलोड की सीमाएं लागू हैं?",
        answer: "डाउनलोड पूरी तरह से असीमित हैं! हालांकि, सर्वर को सुचारू चलाने के लिए एक मिनट में अधिकतम 15 बार ही लिंक निकाल सकते हैं।"
      }
    ],
    faqItemsTikTok: [
      {
        question: "टिकटॉक वीडियो कैसे डाउनलोड करें?",
        answer: "टिकटॉक से लिंक कॉपी कर के यहां पेस्ट करें और डाउनलोड बटन पर क्लिक करें।"
      },
      {
        question: "क्या टिकटॉक वीडियो बिना वॉटरमार्क के होंगे?",
        answer: "हां, डाउनलोड किए गए वीडियो बिल्कुल स्पष्ट और बिना लॉगिन लोगो/वॉटरमार्क के होते हैं।"
      },
      {
        question: "क्या केवल टिकटॉक का ऑडियो डाउनलोड हो सकता है?",
        answer: "हां, आप पसंदीदा टिकटॉक वीडियो के ऑडियो ट्रैक को सीधे एमपी3 फाइल के रूप में सेव कर सकते हैं।"
      },
      {
        question: "क्या मुझे टिकटॉक पासवर्ड की जरूरत है?",
        answer: "नहीं, हम आपकी सुरक्षा को प्राथमिकता देते हैं और किसी भी प्राइवेसी लॉगिन की आवश्यकता नहीं है।"
      },
      {
        question: "क्या यह सेवा पूरी तरह से फ्री है?",
        answer: "हां, यह हमेशा के लिए पूरी तरह से मुफ्त और मुफ्त है।"
      }
    ],
    faqItemsInstagram: [
      {
        question: "इंस्टाग्राम रील कैसे डाउनलोड करें?",
        answer: "रील का लिंक कॉपी करें, उसे यहां डालें और रील तुरंत आपके डिवाइस में सेव हो जाएगी।"
      },
      {
        question: "क्या इंस्टाग्राम वीडियो पर वॉटरमार्क होता है?",
        answer: "नहीं, वीडियो सीधा मुख्य इंस्टाग्राम सर्वर से अपनी सटीक गुणवत्ता में निकलती है।"
      },
      {
        question: "क्या यह अलबम पोस्ट्स को सपोर्ट करता है?",
        answer: "हां, यह एकल फोटो, वीडियो और एकाधिक चित्रों वाली मुख्य स्लाइड्स को सपोर्ट करता है।"
      },
      {
        question: "क्या मुझे इंस्टाग्राम लॉगिन करना होगा?",
        answer: "नहीं, सार्वजनिक प्रोफाइल के डाउनलोड के लिए किसी साइन-इन की बिल्कुल भी आवश्यकता नहीं है।"
      },
      {
        question: "क्या रील्स के गाने सीधे एमपी3 हो सकते हैं?",
        answer: "हां, आप 'ऑडियो डाउनलोड' पर क्लिक करके बैकग्राउंड धुन को सीधे एमपी3 बना सकते हैं।"
      }
    ],
    disclaimerHeader: "अस्वीकरण (Disclaimer):",
    disclaimerText: "यह एप्लिकेशन व्यक्तिगत बैकअप और मीडिया अन्वेषण के लिए एक उपकरण है। हमारा टिकटॉक, बाइटडांस, इंस्टाग्राम, मेटा, या किसी भी संबंधित सोशल मीडिया प्लेटफॉर्म से कोई राजनीतिक या आधिकारिक जुड़ाव नहीं है। ब्रांड अधिकार और कॉपीराइट पूरी तरह से उनके संबंधित स्वामियों के हैं।",
    copyrightText: "© 2026 SaveKlip सिस्टम। उच्च प्रदर्शन वेब प्रोटोकॉल सुरक्षा के तहत निर्मित।",
    detectedAlert: "आपकी क्षेत्रीय प्राथमिकताओं के आधार पर भाषा स्वचालित रूप से बदल दी गई है:"
  },
  bn: {
    downloadsToday: "আজকে ডাউনলোড হয়েছে",
    themeLight: "লাইট মোডে যান",
    themeDark: "ডার্ক মোডে যান",
    home: "হোম",
    tiktokDownloader: "টিকটক ডাউনলোডার",
    instagramDownloader: "ইনস্টাগ্রাম ডাউনলোডার",
    blog: "ব্লগ",
    aboutUs: "আমাদের সম্পর্কে",
    contactUs: "যোগাযোগ",
    privacyPolicy: "প্রাইভেসি পলিসি",
    termsOfService: "শর্তাবলী",
    dmcaPolicy: "ডিএমসিএ পলিসি",
    zeroWatermarks: "ওয়াটারমার্ক ছাড়া",
    heroTitleHome: "টিকটক ও ইনস্টাগ্রাম ভিডিও হাই-কোয়ালিটিতে সেভ করুন",
    heroTitleTikTok: "টিকটক ভিডিও হাই-কোয়ালিটিতে সেভ করুন",
    heroTitleInstagram: "ইনস্টাগ্রাম ভিডিও হাই-কোয়ালিটিতে সেভ করুন",
    heroDescHome: "আপনার প্রিয় টিকটক ভিডিও এবং ইনস্টাগ্রাম রিল সহজে ও দ্রুত হাই-কোয়ালিটির মাধ্যমে ডাউনলোড করুন। কোনো সাইন-আপ নেই, ওয়াটারমার্ক ছাড়া একদম ফ্রি।",
    heroDescTikTok: "আপনার পছন্দের টিকটক ভিডিওগুলো ওয়াটারমার্ক ছাড়া সরাসরি আপনার ডিভাইসে সম্পূর্ণ ফ্রিতে ডাউনলোড করুন।",
    heroDescInstagram: "ইনস্টাগ্রাম রিল, পোস্ট এবং ছবি চমৎকার ভিজ্যুয়াল কোয়ালিটিতে সেভ করুন। কোনো ওয়াটারমার্ক ছাড়া সম্পূর্ণ সেভ অপশন।",
    pasteLabel: "ভিডিও ইউআরএল লিঙ্ক এখানে পেস্ট করুন",
    placeholderHome: "লিঙ্ক এখানে পেস্ট করুন...",
    placeholderTikTok: "https://www.tiktok.com/@username/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "লিঙ্ক মুছুন",
    downloadBtn: "ডাউনলোড",
    extractingBtn: "মিডিয়া লোড হচ্ছে...",
    validationErrorEmpty: "দয়া করে প্রথমে একটি সঠিক টিকটক বা ইনস্টাগ্রাম লিঙ্ক দিন",
    validationErrorInvalid: "দয়া করে একটি সঠিক টিকটক বা ইনস্টাগ্রাম ভিডিওর লিঙ্ক পেস্ট করুন",
    skeletonText: "তথ্য বের করা হচ্ছে...",
    platformDetected: "শনাক্ত করা হয়েছে",
    extractId: "ডাউনলোড আইডি:",
    downloadAnother: "অন্য ভিডিও ডাউনলোড করুন",
    livePreview: "লাইভ এইচডি প্রিভিউ",
    views: "ভিউ",
    likes: "লাইক",
    comments: "কমেন্ট",
    shares: "শেয়ার",
    durationLabel: "সময়কাল",
    proHDBadge: "Pro HD",
    mp4Format: "MP4 ফরম্যাট",
    downloadVideoBtn: "ভিডিও ডাউনলোড করুন",
    savedLabel: "সংরক্ষিত",
    finishedLabel: "সম্পন্ন!",
    audioMP3Label: "অডিও (MP3)",
    audioMP3Desc: "উচ্চমানের অডিও ফাইল",
    getMP3AudioBtn: "MP3 অডিও ডাউনলোড করুন",
    sslSecureLabel: "সম্পূর্ণ নিরাপদ SSL ডাউনলোড লিঙ্ক • কোনো থার্ড-পার্টি লগইন ছাড়াই ডাউনলোড সম্ভব",
    capabilitiesTitleTikTok: "টিকটক ডাউনলোডার বৈশিষ্ট্যসমূহ",
    capabilitiesTitleInstagram: "ইনস্টাগ্রাম ডাউনলোডার বৈশিষ্ট্যসমূহ",
    capabilitiesTitleGeneral: "সমর্থিত প্ল্যাটফর্ম বৈশিষ্ট্যসমূহ",
    tiktokCap1: "ওয়াটারমার্ক ছাড়া আনলিমিটেড টিকটক ভিডিও ডাউনলোড",
    tiktokCap2: "ভিডিওর ব্যাকগ্রাউন্ড মিউজিক বা সাউন্ড সরাসরি ডাউনলোড",
    tiktokCap3: "বিভিন্ন এইচডি রেজোলিউশনে ভিডিও ফাইল ডাউনলোড করার সুবিধা",
    tiktokCap4: "কোনো ধরনের লগইন ছাড়াই সুপারফাস্ট ডাউনলোডের অভিজ্ঞতা",
    instagramCap1: "ইনস্টাগ্রাম রিলস, পোস্ট খুব দ্রুত ব্রাউজ এবং ডাউনলোড করুন",
    instagramCap2: "অরিজিনাল কোয়ালিটি বজায় রাখতে সরাসরি CDN সোর্স থেকে সেভ",
    instagramCap3: "ইনস্টাগ্রাম রিল থেকে এক ক্লিকে পিওর MP3 অডিও এক্সট্র্যাক্ট",
    instagramCap4: "কোনো অ্যাকাউন্ট বা পাসওয়ার্ড ছাড়াই নিরাপদে ডাউনলোড",
    faqTitle: "সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)",
    faqSubtitle: "ওয়াটারমার্ক, ডাউনলোডের স্পিড এবং ফাইলের নিরাপত্তার বিষয়ে সব তথ্য।",
    faqItemsHome: [
      {
        question: "টিকটক বা ইনস্টাগ্রাম থেকে ভিডিও কীভাবে ডাউনলোড করব?",
        answer: "ভিডিও বা রীলের লিঙ্ক কপি করে উপরে পেস্ট করুন এবং 'ডাউনলোড' বাটনে চাপ দিন। আপনার পছন্দের কোয়ালিটি সিলেক্ট করে ফাইলটি সেভ করে নিন!"
      },
      {
        question: "ভিডিওগুলোতে কি কোনো ওয়াটারমার্ক থাকবে?",
        answer: "না, আমাদের সার্ভার সরাসরি মূল ভিডিও সোর্স লিঙ্কটি খুঁজে বের করে, যার ফলে ভিডিওগুলো ওয়াটারমার্ক ছাড়াই সেভ হয়।"
      },
      {
        question: "কোন ফরম্যাট এবং কোয়ালিটি সাপোর্ট করে?",
        answer: "আমরা ১০৮০পি পর্যন্ত এইচডি ভিডিও সাপোর্ট করি, পাশাপাশি কম ডেটা খরচে কম রেজোলিউশনের এবং সম্পূর্ণ অডিও ফাইলও সেভ করতে পারবেন।"
      },
      {
        question: "আমাকে কি এখানে সাইন-আপ করতে হবে?",
        answer: "না, এখানে কোনো অ্যাকাউন্ট খুলতে বা টাকা দিতে হয় না। এটি সম্পূর্ণ ফ্রিতে এবং বেনামে ব্যবহার করা যায়।"
      },
      {
        question: "দিনের ডাইনলোড করার কোনো নির্দিষ্ট সীমা আছে কি?",
        answer: "আমাদের ডাইনলোড প্রক্রিয়া সম্পূর্ণ আনলিমিটেড! তবে সার্ভার সুস্থ রাখতে মিনিটে সর্বোচ্চ ১৫ বার রিকোয়েস্ট পাঠাতে পারবেন।"
      }
    ],
    faqItemsTikTok: [
      {
        question: "টিকটক ভিডিও কীভাবে ডাউনলোড করব?",
        answer: "টিকটক থেকে লিঙ্ক কপি করে এখানে বসিয়ে ডাউনলোড বাটনে ক্লিক করলেই ফাইলটি পেয়ে যাবেন।"
      },
      {
        question: "টিকটক ভিডিওগুলো কি লোগো ছাড়া সেভ হবে?",
        answer: "হ্যাঁ, আপনার ডাইনলোড করা ভিডিওতে টিকটকের কোনো ভাসমান লোগো বা ওয়াটারমার্ক থাকবে না।"
      },
      {
        question: "আমি কি শুধু টিকটকের গান ডাউনলোড করতে পারব?",
        answer: "হ্যাঁ, আপনার পছন্দের ভিডিওটি থেকে অডিও ট্র্যাক সরাসরি এমপি৩ ফরম্যাটে সেভ করতে পারবেন।"
      },
      {
        question: "টিকটক অ্যাকাউন্ট লগইন করা কি জরুরি?",
        answer: "না, আমরা আপনার সুরক্ষাকে প্রাধান্য দিই এবং কোনো ধরনের পাসওয়ার্ড চাই না।"
      },
      {
        question: "এই সার্ভিসটি কি আজীবন ফ্রি থাকবে?",
        answer: "হ্যাঁ, এই ওয়েবসাইট ব্যবহারের জন্য কোনো টাকা দিতে হবে না, এটি সম্পূর্ণ ফ্রি।"
      }
    ],
    faqItemsInstagram: [
      {
        question: "ইনস্টাগ্রাম রিল কীভাবে ডাউনলোড করব?",
        answer: "ইনস্টাগ্রাম রীলের লিঙ্ক কপি করে এখানে পেস্ট করে দিলেই রীলটি ডাউনলোড হয়ে যাবে।"
      },
      {
        question: "ইনস্টাগ্রাম সেভ করা ফাইলগুলো কি ওয়াটারমার্ক ছাড়া হবে?",
        answer: "হ্যাঁ, এগুলো সরাসরি সোর্স ফাইল থেকে ডাউনলোড হওয়ার কারণে নিখুঁত কোয়ালিটিতে সেভ হয়।"
      },
      {
        question: "এটি কি অ্যালবাম বা একাধিক স্লাইড পোস্ট সাপোর্ট করে?",
        answer: "হ্যাঁ, একক ছবি, ভিডিও এবং মাল্টিপল ছবি বিশিষ্ট স্লাইড বা ক্যারোসেল পোস্ট সাপোর্ট করে।"
      },
      {
        question: "আমাকে কি ইনস্টাগ্রাম লগইন করতে হবে?",
        answer: "না, পাবলিক প্রোফাইলের ডাইনলোডের জন্য আপনার অ্যাকাউন্টের তথ্যের কোনো প্রয়োজন নেই।"
      },
      {
        question: "রীলের ব্যাকগ্রাউন্ড টিউন কীভাবে সেভ করব?",
        answer: "সহজে 'অডিও ডাউনলোড' অপশনে ক্লিক করে ব্যাকগ্রাউন্ড সুরটি এমপি৩ আকারে সেভ করে নিতে পারবেন।"
      }
    ],
    disclaimerHeader: "দাবিত্যাগ (Disclaimer):",
    disclaimerText: "এই ওয়েবসাইটটি শুধুমাত্র ব্যক্তিগত ব্যাকআপ এবং বিনোদনের উদ্দেশ্যে ব্যবহৃত একটি সামাজিক টুল। টিকটক, বাইটডান্স, ইনস্টাগ্রাম বা মেটা কারোর সাথেই আমাদের কোনো অফিশিয়াল সম্পর্ক নেই। মেটেরিয়ালগুলোর সব কপিরাইট তাদের আসল মালিকদের।",
    copyrightText: "© 2026 SaveKlip সিস্টেম। হাই পারফরম্যান্স ওয়েব প্রোটোকল নিরাপত্তার অধীনে নির্মিত।",
    detectedAlert: "আপনার আঞ্চলিক পছন্দের উপর ভিত্তি করে ভাষা স্বয়ংক্রিয়ভাবে পরিবর্তিত হয়েছে:"
  },
  zh: {
    downloadsToday: "今日下载次数",
    themeLight: "切换到浅色模式",
    themeDark: "切换到深色模式",
    home: "首页",
    tiktokDownloader: "TikTok 下载器",
    instagramDownloader: "Instagram 下载器",
    blog: "博客",
    aboutUs: "关于我们",
    contactUs: "联系我们",
    privacyPolicy: "隐私政策",
    termsOfService: "服务条款",
    dmcaPolicy: "DMCA 声明",
    zeroWatermarks: "无水印",
    heroTitleHome: "高清保存 TikTok 和 Instagram 视频",
    heroTitleTikTok: "高清保存 TikTok 视频",
    heroTitleInstagram: "高清保存 Instagram 视频",
    heroDescHome: "轻松、高速、免费下载你最喜欢的 TikTok 视频和 Instagram 精彩 Reels。无需注册登录，100% 纯净无水印。",
    heroDescTikTok: "直接保存你想收藏的 TikTok 视频到本地，完美去除漂浮水印。无需注册，100% 免费使用。",
    heroDescInstagram: "以最清晰的高清画质保存 Instagram Reels 视频、帖子和多图轮播。无需任何账号，免费保存。",
    pasteLabel: "请在此粘贴视频 URL 链接",
    placeholderHome: "请粘贴 TikTok 视频或者 Instagram Reels 链接...",
    placeholderTikTok: "https://www.tiktok.com/@username/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "清除链接",
    downloadBtn: "立即下载",
    extractingBtn: "正在解析媒体文件...",
    validationErrorEmpty: "请先输入有效的 TikTok 或 Instagram URL 链接",
    validationErrorInvalid: "请输入有效的 TikTok 视频或 Instagram Reels 视频链接",
    skeletonText: "正在深度解析视频信息...",
    platformDetected: "已成功识别平台",
    extractId: "解析 ID:",
    downloadAnother: "继续下载其他视频",
    livePreview: "在线高清预览",
    views: "播放量",
    likes: "点赞数",
    comments: "评论数",
    shares: "分享数",
    durationLabel: "时长",
    proHDBadge: "高清原画",
    mp4Format: "MP4 格式",
    downloadVideoBtn: "下载视频文件",
    savedLabel: "已保存",
    finishedLabel: "下载完成！",
    audioMP3Label: "优质音频 (MP3)",
    audioMP3Desc: "高比特率原声音频",
    getMP3AudioBtn: "获取 MP3 音频",
    sslSecureLabel: "已通过 SSL 高度加密传输 • 安全直连原厂服务器直接下载",
    capabilitiesTitleTikTok: "TikTok 下载器核心优势",
    capabilitiesTitleInstagram: "Instagram 下载器核心优势",
    capabilitiesTitleGeneral: "已支持平台的功能特性",
    tiktokCap1: "无限量下载无水印 TikTok 视频",
    tiktokCap2: "完美抓取视频背景音乐、原声和配音轨",
    tiktokCap3: "可选择多种不同清晰度（最高可支持 1080p 超清）",
    tiktokCap4: "云端服务器瞬时解析，告别客户端卡顿与下载阻碍",
    instagramCap1: "一键快速下载 Instagram Reels、视频及精选帖子",
    instagramCap2: "直连 Instagram 公开 CDN 缓存节点，无损获取原厂画质",
    instagramCap3: "一键分离视频音轨，提取独立高品质 MP3 配乐",
    instagramCap4: "无需登录个人社交账号，安全匿名，保障隐私",
    faqTitle: "常见问题解答 (FAQ)",
    faqSubtitle: "关于视频水印、下载限速、系统安全和隐私保护的所有解答。",
    faqItemsHome: [
      {
        question: "如何下载 TikTok 视频或 Instagram Reels？",
        answer: "只需复制所需视频的分享链接，粘贴到顶部的输入框中，然后点击“下载”按钮。系统解析完成后，选择你想要的分辨率，点击对应的下载按钮即可保存。"
      },
      {
        question: "下载出来的视频真的没有水印吗？",
        answer: "是的。我们的系统会直接从服务商的视频传输线路中抓取最底层、最原始、没有经过平台二次合成的纯净视频流，因此可以提供完美的无水印文件。"
      },
      {
        question: "系统支持哪些传输格式和分辨率？",
        answer: "我们支持最高 1080p 超清分辨率的 MP4 视频，以及为了帮用户节省流量而提供的更低轻量分辨率。同时还提供纯音轨 MP3 下载。"
      },
      {
        question: "在这里下载视频需要注册或者付费吗？",
        answer: "完全不需要。本站是一项 100% 免费的在线公共服务，不收取任何隐藏费用，也无需填写任何个人注册资料，点击即用。"
      },
      {
        question: "我每天下载视频的次数有限制吗？",
        answer: "没有。我们提供完全不限次数的免费提取服务。为了防止服务器遭到高频恶意刷取，我们设定了每分钟 15 次的轻度智能频率限制，这完全足够日常使用。"
      }
    ],
    faqItemsTikTok: [
      {
        question: "如何保存 TikTok 的去水印视频？",
        answer: "在 TikTok 客户端点击分享，复制视频链接。将它粘贴到此页面的解析框中，便能一键下载保存。"
      },
      {
        question: "这里的 TikTok 视频真的去除了水印和标志吗？",
        answer: "是的，我们提取的是无任何平台浮动标志的纯净视频数据。"
      },
      {
        question: "可以只下载 TikTok 视频的主题曲吗？",
        answer: "当然可以。点击底部的 MP3 提取按钮，即可安全另存为独立的高品质音频文件。"
      },
      {
        question: "我需要输入我的 TikTok 账号或密码吗？",
        answer: "不需要。我们非常尊重您的账号安全，解析所有公共视频都不要求任何账号验证。"
      },
      {
        question: "这项服务以后要收费吗？",
        answer: "不要。本下载服务向全球创作者永久免费开放，无潜在的收费陷阱。"
      }
    ],
    faqItemsInstagram: [
      {
        question: "如何下载 Instagram 的 Reels 或帖子？",
        answer: "复制帖子分享链接，粘贴并点击下载。本服务完美支持网页版和手机版。"
      },
      {
        question: "下载的 Instagram 内容会有本站水印吗？",
        answer: "不会，我们只负责协助您从官方公开的网络服务器调取最纯净的原厂源文件，不添加任何网站水印。"
      },
      {
        question: "网站支持下载 Instagram 连页多图轮播（Carousel）吗？",
        answer: "支持。我们专门优化的 Instagram 解码引擎能够自动检测到连页轮播并提供逐张另存链接。"
      },
      {
        question: "下载加密或私密账号发布的内容可以使用吗？",
        answer: "不可以。出于版权和隐私保护要求，我们的系统目前仅提供公开账号所发布的媒体内容下载服务。"
      },
      {
        question: "可以在这里把 IG 视频直接转成 MP3 吗？",
        answer: "可以。音频提取模块会自动将 Reels 视频音效无损压缩为便于存储的高级 MP3 格式。"
      }
    ],
    disclaimerHeader: "免责声明：",
    disclaimerText: "本应用是一项用于个人学术研究、备份归档及媒体艺术探索的在线辅助工具。我们与 TikTok、字节跳动、Instagram、Meta 以及任何相关社交媒体平台在法律和商业上均无任何联盟、官方隶属或合作关系。所有平台品牌版权均归其各自的所有人所有。在向多平台二次编辑或传播他人作品时，请自觉遵守知识产权相关法律法规。",
    copyrightText: "© 2026 SaveKlip 创作者系统。通过高效率网页端传输技术实现安全解析。",
    detectedAlert: "系统已根据您的浏览器语言偏好为您自动切换了首选界面语言："
  },
  ja: {
    downloadsToday: "本日のダウンロード数",
    themeLight: "ライトモードに切り替え",
    themeDark: "ダークモードに切り替え",
    home: "ホーム",
    tiktokDownloader: "TikTok 保存",
    instagramDownloader: "Instagram 保存",
    blog: "ブログ",
    aboutUs: "運営者情報",
    contactUs: "お問い合わせ",
    privacyPolicy: "プライバシーポリシー",
    termsOfService: "利用規約",
    dmcaPolicy: "DMCA 著作権ポリシー",
    zeroWatermarks: "ウォーターマークなし",
    heroTitleHome: "TikTok & Instagram 高画質動画ダウンロード保存",
    heroTitleTikTok: "TikTok 高画質動画ダウンロード保存",
    heroTitleInstagram: "Instagram 高画質動画ダウンロード保存",
    heroDescHome: "お気に入りの TikTok 動画や Instagram リールを、高画質かつ高速で簡単にダウンロード。登録不要、ロゴ（ウォーターマーク）なし、完全無料です。",
    heroDescTikTok: "お好きな TikTok 動画をデバイスにウォーターマークなしで直接保存。アカウント作成不要、アプリのインストールももちろん不要で完全無料。",
    heroDescInstagram: "Instagram リール、プロフィール動画、投稿写真をハイクオリティで安全保存。透かしや透かしロゴなし、完全ログイン不要で無料提供。",
    pasteLabel: "ここに動画の URL リンクを貼り付けてください",
    placeholderHome: "TikTok または Instagram の共有リンクを貼り付け...",
    placeholderTikTok: "https://www.tiktok.com/@username/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "リンクをクリア",
    downloadBtn: "ダウンロード",
    extractingBtn: "動画データを解析中...",
    validationErrorEmpty: "先に有効な TikTok もしくは Instagram の URL を入力してください",
    validationErrorInvalid: "有効な TikTok もしくは Instagram の共有リンクを入力してください",
    skeletonText: "詳細情報を解析しています...",
    platformDetected: "検出されました",
    extractId: "解析 ID:",
    downloadAnother: "別の動画を保存する",
    livePreview: "オンライン HD プレビュー",
    views: "再生数",
    likes: "いいね",
    comments: "コメント",
    shares: "シェア",
    durationLabel: "再生時間",
    proHDBadge: "Pro HD原画",
    mp4Format: "MP4 形式",
    downloadVideoBtn: "動画を保存",
    savedLabel: "保存完了",
    finishedLabel: "完了！",
    audioMP3Label: "音声 (MP3)",
    audioMP3Desc: "高音質オーディオトラック",
    getMP3AudioBtn: "MP3音声をダウンロード",
    sslSecureLabel: "SSL 暗号化接続検証済み • プラットフォーム規制をセキュアにバイパスして直接抽出",
    capabilitiesTitleTikTok: "TikTok 保存機能の特長",
    capabilitiesTitleInstagram: "Instagram 保存機能の特長",
    capabilitiesTitleGeneral: "対応プラットフォームの特長",
    tiktokCap1: "TikTok動画を無制限、浮き出しロゴ（透かし）なしで一発保存",
    tiktokCap2: "動画のバックグラウンド音楽や音声トラックを原音のまま一級保存",
    tiktokCap3: "画質別（超高画質1080p、軽量用モバイル向け）の切り替え保存対応",
    tiktokCap4: "外部サーバー高速プロセスのため、ブラウザ側への動作負荷はゼロ",
    instagramCap1: "リール、投稿写真、スライドショーも迅速にデコードして収集",
    instagramCap2: "元の Instagram CDN に直結するため、ビットレート変換を抑制、原画を保持",
    instagramCap3: "インスタリール音源からワンタップで MP3 オーディオを作成可能",
    instagramCap4: "パスワードの入力、ログイン不要でアカウント情報のセキュリティも安心",
    faqTitle: "よくある質問 (FAQ)",
    faqSubtitle: "ウォーターマーク除去、ダウンロード制限、データ安全性に関する質問への回答。",
    faqItemsHome: [
      {
        question: "TikTok や Instagram の動画を保存する方法は？",
        answer: "対象の動画から共有リンクをコピーし、上部の入力エリアに貼り付け、'ダウンロード'ボタンを押します。表示された解像度リストから適した画質を選び、ボタンを押して保存します。"
      },
      {
        question: "ロゴやウォーターマークは動画に表示されますか？",
        answer: "いいえ。本システムは合成処理前のオリジナルの配信用配信ストリームデータを引き出すため、動画にウォーターマーク（ロゴ）は残りません。アーカイブ用に最適です。"
      },
      {
        question: "どのようなファイル形式や品質に対応していますか？",
        answer: "最高画質 1080p の MP4 ビデオと、転送量を抑えるための圧縮仕様を選択できます。また、純粋な音楽用の高音質 MP3 出力もサポートしています。"
      },
      {
        question: "利用するにあたり登録や支払いは必要ですか？",
        answer: "いいえ。無料登録、お支払いなどは一切必要ありません。100% 匿名のまま無料でお使いいただけるブラウザツールです。"
      },
      {
        question: "1日あたりのダウンロード回数に制限はありますか？",
        answer: "ダウンロード回数は完全に無制限です。ただし、サーバー保護のために1分間に15リクエストという軽度のアクセスコントロールを導入しています。"
      }
    ],
    faqItemsTikTok: [
      {
        question: "TikTok 動画はどうやって保存しますか？",
        answer: "TikTok から「リンクをコピー」し、当サイトに入力して実行ボタンをクリックすると、すぐに動画データを復元します。"
      },
      {
        question: "TikTok の動画にロゴは付かないですか？",
        answer: "はい、浮き出しロゴやロゴアイコンなしで、完全にクリアな元の状態で保存できます。"
      },
      {
        question: "TikTok の音源だけを保存することはできますか？",
        answer: "可能です。動画から音声トラックのみを抽出した高音質 MP3 ファイルも配布保存に対応しています。"
      },
      {
        question: "TikTok への個人情報の提供は必要ですか？",
        answer: "不要です。お客様の認証情報は、一切お尋ねすることも使用することもありません。"
      },
      {
        question: "本当にずっと無料で使用できますか？",
        answer: "はい、当サイトのダウンロードサービスはアカウントの誘導もなく、永久無料です。"
      }
    ],
    faqItemsInstagram: [
      {
        question: "インスタのバックアップをするには？",
        answer: "保存したいリールやフィード投稿の共有リンクをコピーし、上部ツールボックスに入れて処理を行います。"
      },
      {
        question: "Instagram から保存した動画にぼかしや透かしは入りますか？",
        answer: "いいえ、不純物を挟まない最高画質の原版のまま引き出すため、不要な透かし等はありません。"
      },
      {
        question: "一回の投稿に複数枚画像がある場合（複数投稿）はどう動きますか？",
        answer: "カルーセル形式（スライドショー投稿）もデコードし、全ての画像素材、ビデオ素材を個別に保存できるようにします。"
      },
      {
        question: "自分の Instagram のパスワードは必要ですか？",
        answer: "いいえ、当ツールはプライベートな安全性があり、公開状態のコンテンツならば、ログイン・サインインなしで取得できます。"
      },
      {
        question: "インスタ動画を MP3 として残せますか？",
        answer: "はい。「MP3 をダウンロード」機能を使ってリール音源を綺麗な音声ファイル形式で書き出せます。"
      }
    ],
    disclaimerHeader: "免責事項：",
    disclaimerText: "本アプリケーションは個人のバックアップ目的、メディア研究用の支援ツールとなります。弊社は TikTok、ByteDance、Instagram、Meta その他関連ソーシャルネットワークと提携関係や公式協力契約の一切を有していません。全ブランド・商標の権利は、その権利所有者本人に帰属します。作品を二次配布等する際には必ず各著作権法を尊重してください。",
    copyrightText: "© 2026 SaveKlip システム。高信頼性ウェブライン規格に準拠して設計されました。",
    detectedAlert: "ブラウザ設定に従い、ページの表示言語を自動で切り替えました："
  },
  ru: {
    downloadsToday: "Скачиваний за сегодня",
    themeLight: "Переключить на светлую тему",
    themeDark: "Переключить на темную тему",
    home: "Главная",
    tiktokDownloader: "Скачать из TikTok",
    instagramDownloader: "Скачать из Instagram",
    blog: "Блог",
    aboutUs: "О нас",
    contactUs: "Контакты",
    privacyPolicy: "Политика конфиденциальности",
    termsOfService: "Условия использования",
    dmcaPolicy: "Правила DMCA",
    zeroWatermarks: "Без водяных знаков",
    heroTitleHome: "Скачать видео из TikTok и Instagram без водяных знаков",
    heroTitleTikTok: "Скачать видео из TikTok в высоком качестве",
    heroTitleInstagram: "Скачать видео из Instagram в высоком качестве",
    heroDescHome: "Легко и быстро скачивайте любимые видеоролики TikTok и Reels из Instagram в лучшем качестве. Без регистрации, без платных подписок и водяных знаков.",
    heroDescTikTok: "Сохраняйте любимые видеоматериалы TikTok прямо на свое устройство. Совершенно бесплатно, напрямую с серверов и без логотипов.",
    heroDescInstagram: "Загружайте Reels, посты и фотографии из Instagram в безупречном высоком качестве. Без регистрации, без водяных знаков и платных ограничений.",
    pasteLabel: "Вставьте ссылку на видео",
    placeholderHome: "Вставьте ссылку из TikTok или Instagram Reels...",
    placeholderTikTok: "https://www.tiktok.com/@username/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "Очистить ссылку",
    downloadBtn: "Скачать",
    extractingBtn: "Извлечение файлов медиа...",
    validationErrorEmpty: "Пожалуйста, сначала введите рабочую ссылку из TikTok или Instagram",
    validationErrorInvalid: "Введите корректную ссылку на видео TikTok или Reels в Instagram",
    skeletonText: "Идет глубокий анализ медиафайла...",
    platformDetected: "распознано",
    extractId: "ID загрузки:",
    downloadAnother: "Скачать другое видео",
    livePreview: "Онлайн HD превью",
    views: "Просмотры",
    likes: "Лайки",
    comments: "Комментарии",
    shares: "Поделились",
    durationLabel: "Длительность",
    proHDBadge: "Pro HD原画",
    mp4Format: "Формат MP4",
    downloadVideoBtn: "Скачать видеоролик",
    savedLabel: "Загружено",
    finishedLabel: "Готово!",
    audioMP3Label: "звук (MP3)",
    audioMP3Desc: "Аудиофайл высокого качества",
    getMP3AudioBtn: "Скачать звук (MP3)",
    sslSecureLabel: "Шифрованное безопасное соединение SSL • Защищенный прямой обход серверов без потери битрейта",
    capabilitiesTitleTikTok: "Преимущества сохранения TikTok",
    capabilitiesTitleInstagram: "Преимущества сохранения Instagram",
    capabilitiesTitleGeneral: "Поддерживаемые платформы и возможности",
    tiktokCap1: "Безлимитное скачивание сотен видео TikTok без накладываемых логотипов",
    tiktokCap2: "Прямое отделение фоновой музыки и дикторских дорожек в отдельный файл",
    tiktokCap3: "Выбор между качественными разрешениями видео (доступно качество HD)",
    tiktokCap4: "Полностью удаленная процедура обработки на сервере без ожидания в браузере",
    instagramCap1: "Мгновенное скачивание постов под высокими нагрузками (видео, карусели фотографий)",
    instagramCap2: "Прямое кэширование CDN потоков для сохранения исходного качества деталей поста",
    instagramCap3: "Быстрая конвертация роликов Instagram в формат MP3 одним кликом",
    instagramCap4: "Безопасный доступ без необходимости раскрывать логины, пароли и куки",
    faqTitle: "Часто задаваемые вопросы (FAQ)",
    faqSubtitle: "Вся важная информация о водяных знаках, ограничениях на скачивание и вашей конфеденциальности.",
    faqItemsHome: [
      {
        question: "Как скачать видео из TikTok или Instagram?",
        answer: "Скопируйте ссылку на публикацию, вставьте ее в текстовое поле вверху страницы и нажмите кнопку 'Скачать'. Система проанализирует данные за секунды, после чего вы сможете выбрать качество и сохранить файл к себе."
      },
      {
        question: "Будут ли видеофайлы содержать водяные знаки социальной сети?",
        answer: "Нет. Наш алгоритм достает оригинальные исходные потоки файлов, до их обработки наложением брендированных плашек, предоставляя вам чистое медиа без водяных знаков."
      },
      {
        question: "Какие форматы расширения и качества доступны?",
        answer: "Мы поддерживаем высококачественные MP4 HD файлы до 1080p, более экономичные мелкие файлы, а также чистые звуковые стереодорожки в формате MP3."
      },
      {
        question: "Нужно ли мне создавать учетную запись здесь или платить?",
        answer: "Нет. Это абсолютно общественный веб-сервис. Наша утилита не имеет платных опций и не требует никакой регистрации или установки расширений."
      },
      {
        question: "Есть ли лимиты на суточное сохранение со стороны вашего сайта?",
        answer: "Скачивание медиа — полностью безлимитное. Для предотвращения спама на сервера установлено ограничение до 15 сетевых анализов в одну минуту."
      }
    ],
    faqItemsTikTok: [
      {
        question: "Как извлечь ролик из TikTok?",
        answer: "Скопируйте ссылку кнопкой 'Поделиться' в TikTok, вставьте ее выше на этой странице и нажмите старт."
      },
      {
        question: "Будет ли видеоролик TikTok без фирменного логотипа?",
        answer: "Да, наши ссылки ведут на чистые оригинальные исходники без водяных знаков TikTok."
      },
      {
        question: "Можно ли скачать только музыку из видео?",
        answer: "Да, нажмите на раздел извлечения MP3 дорожки, чтобы загрузить файл музыкального сопровождения."
      },
      {
        question: "Должен ли я передавать пароли от своей учетной записи?",
        answer: "Нет. Наша утилита работает независимо от вашего личного профиля, запрашивая только публичный ролик."
      },
      {
        question: "Это действительно навсегда бесплатно?",
        answer: "Да, наша система бесплатной поддержки авторов открыта всегда без дополнительных условий."
      }
    ],
    faqItemsInstagram: [
      {
        question: "Как сохранить Reels или посты из Instagram?",
        answer: "Скопируйте ссылку из постов Instagram, разместите ее в верхней строке ввода и нажмите на загрузку."
      },
      {
        question: "Теряет ли Instagram медиа свое исходное качество?",
        answer: "Нет, так как мы подтягиваем файл прямо из открытых облаков CDN Instagram без ухудшения битрейтов."
      },
      {
        question: "Работает ли скачивание для целых галерей-каруселей?",
        answer: "Да. Наш интеллектуальный декодер разбирает карусели и выдает индивидуальные ссылки для каждого слайда."
      },
      {
        question: "Нужно ли авторизовываться в Instagram через вашу форму?",
        answer: "Нет, в целях полной безопасности вам никогда не нужно указывать свои регистрационные данные."
      },
      {
        question: "Как сохранить музыку из Reels себе в плеер?",
        answer: "После декодирования нажмите на кнопку скачивания формата MP3, чтобы конвертировать ролик в музыку."
      }
    ],
    disclaimerHeader: "Отказ от ответственности:",
    disclaimerText: "Это приложение — инструмент для создания резервных копий и просмотра медиа материалов в личных целях. Мы не связаны коммерчески или официально с TikTok, ByteDance, Instagram, Meta, или другими связанными социальными сетями. Права на товарные знаки принадлежат их законным правообладателям. Всегда уважайте ценность авторских прав.",
    copyrightText: "© 2026 SaveKlip Systems. Разработано в соответствии с протоколами высоконагруженных веб-сетей.",
    detectedAlert: "Язык интерфейса был автоматически адаптирован на основе вашей геолокации/браузера:"
  },
  it: {
    downloadsToday: "Download di oggi",
    themeLight: "Passa alla modalità chiara",
    themeDark: "Passa alla modalità scura",
    home: "Home",
    tiktokDownloader: "Downloader di TikTok",
    instagramDownloader: "Downloader di Instagram",
    blog: "Blog",
    aboutUs: "Chi siamo",
    contactUs: "Contattaci",
    privacyPolicy: "Informativa sulla privacy",
    termsOfService: "Termini di servizio",
    dmcaPolicy: "Politica DMCA",
    zeroWatermarks: "Senza filigrana",
    heroTitleHome: "Salva video TikTok e Instagram in alta qualità",
    heroTitleTikTok: "Salva video di TikTok in alta qualità",
    heroTitleInstagram: "Salva video di Instagram in alta qualità",
    heroDescHome: "Scarica facilmente i tuoi video TikTok e reel Instagram preferiti in alta qualità. Nessuna registrazione, senza filigrana e completamente gratuito.",
    heroDescTikTok: "Salva i tuoi video TikTok preferiti direttamente sul tuo dispositivo senza filigrana. Nessuna registrazione o installazione, completamente gratuito.",
    heroDescInstagram: "Scarica Reel, video del profilo e foto da Instagram in qualità visiva eccezionale. Senza filigrana, nessuna registrazione, completamente gratuito.",
    pasteLabel: "Incolla il link URL del video",
    placeholderHome: "https://tiktok.com/... o https://instagram.com/reel/...",
    placeholderTikTok: "https://www.tiktok.com/@username/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "Cancella link",
    downloadBtn: "Scarica",
    extractingBtn: "Estrazione media...",
    validationErrorEmpty: "Inserisci prima un URL TikTok o Instagram valido",
    validationErrorInvalid: "Inserisci un link video TikTok o Instagram valido",
    skeletonText: "Estrazione dettagli file...",
    platformDetected: "rilevato",
    extractId: "ID estrazione:",
    downloadAnother: "Scarica un altro video",
    livePreview: "Anteprima HD in tempo reale",
    views: "Visualizzazioni",
    likes: "Mi piace",
    comments: "Commenti",
    shares: "Condivisioni",
    durationLabel: "Durata",
    proHDBadge: "Pro HD",
    mp4Format: "Formato MP4",
    downloadVideoBtn: "Scarica Video",
    savedLabel: "Salvato",
    finishedLabel: "Finito!",
    audioMP3Label: "audio (MP3)",
    audioMP3Desc: "Audio ad alta qualità",
    getMP3AudioBtn: "Ottieni audio MP3",
    sslSecureLabel: "Collegamenti SSL crittografati verificati • Bypass sicuro del server di origine diretta",
    capabilitiesTitleTikTok: "Funzionalità downloader TikTok",
    capabilitiesTitleInstagram: "Funzionalità downloader Instagram",
    capabilitiesTitleGeneral: "Funzionalità delle piattaforme supportate",
    tiktokCap1: "Scarica post TikTok illimitati senza filigrana",
    tiktokCap2: "Estrai tracce di sottofondo e audio nativamente",
    tiktokCap3: "Estrai diverse risoluzioni (HD disponibile)",
    tiktokCap4: "Elaborazione istantanea senza barriere per il client",
    instagramCap1: "Estrai Reel, Post e caroselli rapidamente",
    instagramCap2: "Download CDN diretto che preserva la massima qualità",
    instagramCap3: "Estrazione dinamica MP3 per clip audio dei reel",
    instagramCap4: "Evita in sicurezza l'accesso e i token di sicurezza",
    faqTitle: "Domande frequenti (FAQ)",
    faqSubtitle: "Tutto ciò che c'è da sapere su filigrane, limiti di velocità di download e sicurezza dei file.",
    faqItemsHome: [
      {
        question: "Come scarico un video da TikTok o Instagram?",
        answer: "Copia l'URL del video, del reel o del post su TikTok o Instagram, incollalo nella barra sopra e fai clic su 'Scarica'. Scegli la qualità e scarica!"
      },
      {
        question: "I video scaricati sono privi di filigrana?",
        answer: "Sì, il nostro sistema estrae i file originali direttamente dai server CDN, quindi i video sono al 100% senza filigrana."
      },
      {
        question: "Quali formati e qualità sono supportati?",
        answer: "Supportiamo file video HD fino a 1080p, qualità compresse per connessione ridotta (720p, 480p, 360p) ed estrazione audio diretta ad alta fedeltà in formato MP3."
      },
      {
        question: "Devo registrarmi per scaricare?",
        answer: "No, non è richiesta alcuna registrazione o installazione di software. Tutto avviene in modo sicuro all'interno del tuo browser."
      },
      {
        question: "C'è un limite al numero di download?",
        answer: "Offriamo download completamente illimitati! Applichiamo solo un leggero limite di sicurezza di 15 richieste al minuto per proteggere i server."
      }
    ],
    faqItemsTikTok: [
      {
        question: "Come si scarica un video da TikTok?",
        answer: "Copia l'URL del video da TikTok, incollalo sopra e clicca su scarica. Seleziona il formato video o audio preferito."
      },
      {
        question: "I video di TikTok sono senza filigrana?",
        answer: "Sì, l'estrattore scarica direttamente lo stream originale privo di qualsiasi logo o marchio ad esso applicato."
      },
      {
        question: "Posso scaricare tracce audio o musica da TikTok?",
        answer: "Sì! Puoi scegliere di estrarre e convertire la traccia audio in formato MP3 ad alta definizione."
      },
      {
        question: "È sicuro scaricare video di TikTok qui?",
        answer: "Sicurissimo. L'importazione e la conversione vengono gestite nei nostri server sicuri senza richiedere credenziali o estensioni browser."
      },
      {
        question: "Ci sono limiti di download giornalieri?",
        answer: "Nessun limite. Puoi scaricare quanti TikTok desideri in modo completamente gratuito."
      }
    ],
    faqItemsInstagram: [
      {
        question: "Come scaricare reel o video da Instagram?",
        answer: "Copia il link del reel o del post di Instagram, incollalo sopra e il sistema genererà all'istante i collegamenti diretti per il download."
      },
      {
        question: "È possibile salvare i Reel senza filigrana?",
        answer: "Sì, il downloader ottiene il file sorgente dal CDN pubblico di Instagram mantenendone intatta l'alta qualità visiva."
      },
      {
        question: "Supporta caroselli, foto e post singoli?",
        answer: "Sì, il nostro sistema è strutturato per estrarre caroselli multi-foto, foto singole e post video."
      },
      {
        question: "È necessario inserire le password di Instagram?",
        answer: "Assolutamente no. Non ti chiederemo mai nessuna credenziale. Puoi scaricare liberamente da tutti i profili pubblici."
      },
      {
        question: "Posso convertire i Reel in file audio MP3?",
        answer: "Sì, puoi isolare la musica e gli effetti sonori dei Reel desiderati e scaricarli direttamente in formato MP3."
      }
    ],
    disclaimerHeader: "Dichiarazione di non responsabilità:",
    disclaimerText: "Questa applicazione è uno strumento per l'archiviazione di backup personale dei file multimediali. Non siamo affiliati né associati ufficialmente a TikTok, ByteDance, Instagram, Meta o altri social network correlati. I diritti d'autore appartengono interamente ai rispettivi proprietari. Rispetta sempre le leggi sulla proprietà intellettuale prima di riutilizzare i contenuti.",
    copyrightText: "© 2026 SaveKlip Systems. Sviluppato in conformità con i protocolli web ad alte prestazioni.",
    detectedAlert: "Lingua cambiata automaticamente in base alle tue preferenze:"
  },
  tr: {
    downloadsToday: "Bugün İndirilenler",
    themeLight: "Açık Moduna Geç",
    themeDark: "Karanlık Moduna Geç",
    home: "Ana Sayfa",
    tiktokDownloader: "TikTok İndirici",
    instagramDownloader: "Instagram İndirici",
    blog: "Blog",
    aboutUs: "Hakkımızda",
    contactUs: "İletişim",
    privacyPolicy: "Gizlilik Politikası",
    termsOfService: "Kullanım Koşulları",
    dmcaPolicy: "DMCA Politikası",
    zeroWatermarks: "Filigransız",
    heroTitleHome: "TikTok ve Instagram Videolarını Yüksek Kalitede İndirin",
    heroTitleTikTok: "TikTok Videolarını Yüksek Kalitede İndirin",
    heroTitleInstagram: "Instagram Videolarını Yüksek Kalitede İndirin",
    heroDescHome: "En sevdiğiniz TikTok videolarını ve Instagram reels videolarını yüksek kalitede kolayca indirin. Üye olmak yok, filigran yok ve tamamen ücretsiz.",
    heroDescTikTok: "Favori TikTok videolarınızı filigransız olarak doğrudan cihazınıza indirin. Kayıt yok, kurulum yok ve tamamen ücretsiz.",
    heroDescInstagram: "Instagram Reels, profil videoları ve fotoğraf gönderilerini mükemmel kalitede kaydedin. Filigran yok, kayıt yok, tamamen ücretsiz.",
    pasteLabel: "Video Linkini Yapıştırın",
    placeholderHome: "https://tiktok.com/... veya https://instagram.com/reel/...",
    placeholderTikTok: "https://www.tiktok.com/@kullanici/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "Bağlantıyı temizle",
    downloadBtn: "İndir",
    extractingBtn: "Medya Ayrıştırılıyor...",
    validationErrorEmpty: "Lütfen önce geçerli bir TikTok veya Instagram URL'si girin",
    validationErrorInvalid: "Lütfen geçerli bir TikTok veya Instagram video bağlantısı girin",
    skeletonText: "Medya Detayları Çözümleniyor...",
    platformDetected: "algılandı",
    extractId: "Ayrıştırma Kimliği:",
    downloadAnother: "Başka bir video indir",
    livePreview: "Canlı HD Önizleme",
    views: "Görüntülenme",
    likes: "Beğeni",
    comments: "Yorum",
    shares: "Paylaşım",
    durationLabel: "Süre",
    proHDBadge: "Pro HD",
    mp4Format: "MP4 formatı",
    downloadVideoBtn: "Videoyu İndir",
    savedLabel: "Kaydedildi",
    finishedLabel: "Tamamlandı!",
    audioMP3Label: "Ses (MP3)",
    audioMP3Desc: "Yüksek Kaliteli Ses",
    getMP3AudioBtn: "MP3 Sesi Al",
    sslSecureLabel: "Şifrelenmiş SSL indirme bağlantıları doğrulandı • Güvenli doğrudan kaynak sunucu bağlantısı",
    capabilitiesTitleTikTok: "TikTok İndirici Yetenekleri",
    capabilitiesTitleInstagram: "Instagram İndirici Yetenekleri",
    capabilitiesTitleGeneral: "Desteklenen Platform Özellikleri",
    tiktokCap1: "Sınırsız sayıda TikTok gönderisini filigransız indirin",
    tiktokCap2: "Arka plan müziklerini ve sesleri doğrudan ayrıştırın",
    tiktokCap3: "Farklı çözünürlüklerde indirme imkanı (HD mevcut)",
    tiktokCap4: "İstemci sınırlarını aşan anında işlem hızı",
    instagramCap1: "Reels, Gönderi ve Çoklu fotoğrafları hızlıca çekin",
    instagramCap2: "En yüksek bit hızını koruyan doğrudan CDN indirmeleri",
    instagramCap3: "Reels ses klipleri için dinamik MP3 dönüştürme",
    instagramCap4: "Giriş engellerini ve güvenlik tokenlerini güvenle aşın",
    faqTitle: "Sıkça Sorulan Sorular",
    faqSubtitle: "Filigranlar, indirme hızı limitleri ve dosya güvenliği hakkında bilmeniz gereken her şey.",
    faqItemsHome: [
      {
        question: "TikTok veya Instagram'dan nasıl video indirebilirim?",
        answer: "TikTok veya Instagram'dan indirmek istediğiniz videonun linkini kopyalayın, yukarıdaki alana yapıştırın ve 'İndir' butonuna basın. Tercih ettiğiniz kaliteyi seçerek indirin!"
      },
      {
        question: "İndirilen videolar filigransız mı?",
        answer: "Evet, servisimiz orijinal sunuculardan doğrudan indirme bağlantılarını çeker, bu sayede videolar %100 filigransız ve orijinal kalitededir."
      },
      {
        question: "Hangi formatlar ve kaliteler destekleniyor?",
        answer: "1080p çözünürlüğe kadar yüksek çözünürlüklü video dosyalarını, düşük bant genişlikleri için sıkıştırılmış alternatifleri (720p, 480p) ve ses ayıklama için MP3 formatını destekliyoruz."
      },
      {
        question: "Hesap oluşturmam veya giriş yapmam gerekiyor mu?",
        answer: "Hayır, herhangi bir kayıt işlemi veya program yükleme zorunluluğu yoktur. Tüm süreç tarayıcınız üzerinden güvenle yürütülür."
      },
      {
        question: "İndirme sayısı için bir sınır var mı?",
        answer: "Sınırsız indirme sunuyoruz! Sadece sunucu sağlığını korumak amacıyla dakikada 15 istek gibi hafif bir limit uygulanmaktadır."
      }
    ],
    faqItemsTikTok: [
      {
        question: "TikTok videosu nasıl indirilir?",
        answer: "TikTok uygulamasından video linkini kopyalayın, buraya yapıştırın ve indirmeyi başlatın. Tercih ettiğiniz video veya ses formatını seçebilirsiniz."
      },
      {
        question: "TikTok videoları gerçekten filigransız mı?",
        answer: "Evet, geliştirdiğimiz altyapı, TikTok üzerindeki orijinal raw video dosyasını çektiği için üzerinde hiçbir logo bulunmaz."
      },
      {
        question: "TikTok videolarının seslerini MP3 olarak indirebilir miyim?",
        answer: "Evet! Arka plandaki tüm müzikleri veya sesleri yüksek kalitede MP3 dosyası olarak ayrıştırıp cihazınıza kaydedebilirsiniz."
      },
      {
        question: "TikTok videoları indirmek güvenli midir?",
        answer: "Kesinlikle güvenlidir. Herhangi bir tarayıcı eklentisi yüklemeniz gerekmez, her şey güvenli sunucularımızda otomatik işlenir."
      },
      {
        question: "Günlük indirme kotası var mı?",
        answer: "Herhangi bir günlük sınırımız yoktur. Dilediğiniz kadar TikTok videosunu tamamen bedava indirebilirsiniz."
      }
    ],
    faqItemsInstagram: [
      {
        question: "Instagram Reels veya paylaşımları nasıl indirilir?",
        answer: "Instagram'daki video veya reels URL'sini kopyalayıp sistemimize yapıştırın. Sistem anında size direkt indirme bağlantılarını sunacaktır."
      },
      {
        question: "Instagram Reels videolarını filigransız indirmek ücretsiz mi?",
        answer: "Evet, tamamen ücretsizdir. Instagram'ın CDN dağıtım sunucularındaki orijinal dosyaya doğrudan ulaşmanızı sağlıyoruz."
      },
      {
        question: "Çoklu fotoğraf (Kaydırmalı Gönderi) desteği var mı?",
        answer: "Evet, sistemimiz tekli fotoğraflar, videolar ve kaydırmalı çoklu fotoğraf albümleri dahil tüm gönderi türlerini destekler."
      },
      {
        question: "Instagram hesap şifremi girmem gerekir mi?",
        answer: "Asla hesap bilgilerinizi istemeyiz. Herkesin erişimine açık genel hesaplardaki paylaşımları giriş yapmadan indirebilirsiniz."
      },
      {
        question: "Reels videolarının müziklerini MP3 yapabilir miyim?",
        answer: "Evet, reels videolarındaki sesleri doğrudan ayıklayıp MP3 formatında müzik dosyası olarak indirebilirsiniz."
      }
    ],
    disclaimerHeader: "Sorumluluk Reddi:",
    disclaimerText: "Bu uygulama, kişisel yedekleme arşivleme ve medya geliştirme amaçlı bir araçtır. TikTok, ByteDance, Instagram, Meta veya diğer ilgili sosyal medya kuruluşları ile hiçbir resmi bağımız bulunmamaktadır. Tüm telif hakları ilgili sahiplerine aittir. İçerikleri kullanmadan önce dijital fikri mülkiyet haklarına uymaya özen gösteriniz.",
    copyrightText: "© 2026 SaveKlip Systems. Yüksek performanslı web protokollerine uyumlu gerçekleştirilmiştir.",
    detectedAlert: "Dil tercihiniz algılanarak otomatik olarak değiştirildi:"
  },
  id: {
    downloadsToday: "Unduhan Hari Ini",
    themeLight: "Ganti ke Mode Terang",
    themeDark: "Ganti ke Mode Gelap",
    home: "Beranda",
    tiktokDownloader: "Pengunduh TikTok",
    instagramDownloader: "Pengunduh Instagram",
    blog: "Blog",
    aboutUs: "Tentang Kami",
    contactUs: "Hubungi Kami",
    privacyPolicy: "Kebijakan Privasi",
    termsOfService: "Ketentuan Layanan",
    dmcaPolicy: "Kebijakan DMCA",
    zeroWatermarks: "Tanpa Watermark",
    heroTitleHome: "Simpan Video TikTok & Instagram Kualitas Tinggi",
    heroTitleTikTok: "Simpan Video TikTok Kualitas Tinggi",
    heroTitleInstagram: "Simpan Video Instagram Kualitas Tinggi",
    heroDescHome: "Unduh video TikTok dan reels Instagram favorit Anda dengan kualitas tinggi. Tanpa daftar, tanpa watermark, dan 100% gratis.",
    heroDescTikTok: "Simpan video TikTok favorit Anda langsung ke perangkat Anda tanpa watermark. Tanpa perlu daftar atau instal aplikasi apa pun, 100% gratis.",
    heroDescInstagram: "Unduh Reels, video profil, dan foto Instagram dengan resolusi terbaik. Tanpa watermark, tanpa daftar, dan 100% gratis.",
    pasteLabel: "Tempel Tautan URL Video",
    placeholderHome: "https://tiktok.com/... atau https://instagram.com/reel/...",
    placeholderTikTok: "https://www.tiktok.com/@username/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "Bersihkan link",
    downloadBtn: "Unduh",
    extractingBtn: "Mengekstrak Media...",
    validationErrorEmpty: "Silakan masukkan tautan URL TikTok atau Instagram yang valid terlebih dahulu",
    validationErrorInvalid: "Silakan masukkan tautan video TikTok atau Instagram yang valid",
    skeletonText: "Mengekstrak Detail Media...",
    platformDetected: "terdeteksi",
    extractId: "ID Ekstraksi:",
    downloadAnother: "Unduh video lain",
    livePreview: "Pratinjau HD Langsung",
    views: "Dilihat",
    likes: "Suka",
    comments: "Komentar",
    shares: "Dibagikan",
    durationLabel: "Durasi",
    proHDBadge: "Pro HD",
    mp4Format: "Format MP4",
    downloadVideoBtn: "Unduh Video",
    savedLabel: "Disimpan",
    finishedLabel: "Selesai!",
    audioMP3Label: "Audio (MP3)",
    audioMP3Desc: "Audio Kualitas Tinggi",
    getMP3AudioBtn: "Dapatkan Audio MP3",
    sslSecureLabel: "Tautan unduhan SSL terenkripsi terverifikasi • Bypass aman server asal langsung",
    capabilitiesTitleTikTok: "Kemampuan Pengunduh TikTok",
    capabilitiesTitleInstagram: "Kemampuan Pengunduh Instagram",
    capabilitiesTitleGeneral: "Kemampuan Platform yang Didukung",
    tiktokCap1: "Unduh kiriman TikTok tanpa batasan tanpa watermark",
    tiktokCap2: "Ekstrak musik latar belakang dan audio asli secara instan",
    tiktokCap3: "Ekstrak ke berbagai resolusi target (Tersedia HD)",
    tiktokCap4: "Proses cepat langsung tanpa hambatan pada klien",
    instagramCap1: "Ekstrak Reels, Foto, dan Carousel dengan cepat",
    instagramCap2: "Unduh langsung via CDN untuk mempertahankan kualitas terbaik",
    instagramCap3: "Ekstraksi MP3 dinamis untuk klip suara di reels",
    instagramCap4: "Lewati login pakan atau token keamanan dengan aman",
    faqTitle: "Pertanyaan yang Sering Diajukan",
    faqSubtitle: "Semua hal yang perlu Anda ketahui tentang watermark, batas kecepatan unduhan, dan keamanan file.",
    faqItemsHome: [
      {
        question: "Bagaimana cara mengunduh video dari TikTok atau Instagram?",
        answer: "Cukup salin URL video, reel, atau postingan di TikTok atau Instagram, tempel di kolom atas, dan klik 'Unduh'. Pilih kualitas yang Anda inginkan lalu klik Unduh!"
      },
      {
        question: "Apakah video hasil unduhan bebas watermark?",
        answer: "Ya, sistem kami mengekstrak file video asli langsung dari jaringan pengiriman konten (CDN), memastikan video bersih tanpa watermark."
      },
      {
        question: "Format dan kualitas apa saja yang didukung?",
        answer: "Kami mendukung kualitas video definisi tinggi hingga 1080p, serta format kompresi (720p, 480p) untuk menghemat kuota, dan ekstraksi audio MP3 kualitas tinggi."
      },
      {
        question: "Apakah saya harus mendaftar akun terlebih dahulu?",
        answer: "Tidak perlu membuat akun atau memasang perangkat lunak eksternal apa pun. Semua proses berjalan langsung di web browser Anda secara aman."
      },
      {
        question: "Apakah ada batasan jumlah file yang bisa diunduh?",
        answer: "Kami menyediakan unduhan tanpa batas! Hanya ada batasan ringan sebanyak 15 permintaan per menit demi menjaga keandalan server kami."
      }
    ],
    faqItemsTikTok: [
      {
        question: "Bagaimana cara mengunduh video dari TikTok?",
        answer: "Salin link video dari TikTok, tempelkan di atas, dan klik unduh. Pilih opsi kualitas video atau audio yang sesuai."
      },
      {
        question: "Apakah video TikTok bebas dari watermark?",
        answer: "Ya, pengunduh kami menarik data video mentah asli sehingga bersih tanpa logo TikTok yang bergerak."
      },
      {
        question: "Dapatkah saya mengunduh lagu atau audio mp3 dari TikTok?",
        answer: "Tentu saja! Anda bisa mengisolasi rekaman suara latar belakang video dan menyimpannya sebagai file format MP3."
      },
      {
        question: "Apakah aman memakai situs ini untuk mengunduh?",
        answer: "Sangat aman. Kami tidak memerlukan kredensial akun Anda, dan Anda pun tidak harus menginstal ekstensi browser yang mencurigakan."
      },
      {
        question: "Apakah ada batas limit harian?",
        answer: "Tidak ada limit harian sama sekali. Anda bebas mengunduh video TikTok sebanyak mungkin, gratis."
      }
    ],
    faqItemsInstagram: [
      {
        question: "Bagaimana cara mengunduh Reels atau postingan Instagram?",
        answer: "Salin link dari Instagram, masukkan ke kolom input di atas, dan sistem kami akan langsung menyusun link unduhan aslinya."
      },
      {
        question: "Apakah gratis mengunduh Reels Instagram?",
        answer: "Ya, sepenuhnya gratis. Kami mengambil file langsung dari peladen distribusi resmi tanpa mengenakan biaya apa pun."
      },
      {
        question: "Apakah mendukung postingan berbentuk Carousel (banyak foto)?",
        answer: "Ya, ekstraktor kami mampu melacak dan mengunduh postingan carousel, foto tunggal, maupun video feed biasa."
      },
      {
        question: "Apakah saya perlu memasukkan sandi Instagram saya?",
        answer: "Tidak. Kami tidak pernah meminta data sandi Anda. Anda dapat mengunduh konten dari profil yang disetel publik secara langsung."
      },
      {
        question: "Bisakah mengunduh bagian lagu saja di Reels?",
        answer: "Bisa, Anda tinggal memilih format audio saja pada hasil deteksi, lalu ekstrak sebagai lagu MP3 kualitas tinggi."
      }
    ],
    disclaimerHeader: "Sanggahan:",
    disclaimerText: "Aplikasi ini merupakan alat bantu untuk membuat salinan cadangan pribadi dan eksplorasi media. Kami tidak memiliki hubungan resmi maupun berafiliasi dengan TikTok, ByteDance, Instagram, Meta, atau jejaring sosial terkait lainnya. Hak cipta merek dagang sepenuhnya dipegang oleh pemilih masing-masing. Harap selalu hormati hak atas kekayaan intelektual sebelum membagikan ulang kiriman.",
    copyrightText: "© 2026 SaveKlip Systems. Dihadirkan sesuai protokol web berkinerja tinggi.",
    detectedAlert: "Bahasa otomatis diubah berdasarkan preferensi wilayah Anda:"
  },
  vi: {
    downloadsToday: "Lượt tải hôm nay",
    themeLight: "Chuyển sang Chế độ sáng",
    themeDark: "Chuyển sang Chế độ tối",
    home: "Trang chủ",
    tiktokDownloader: "Tải video TikTok",
    instagramDownloader: "Tải video Instagram",
    blog: "Blog",
    aboutUs: "Giới thiệu",
    contactUs: "Liên hệ",
    privacyPolicy: "Chính sách bảo mật",
    termsOfService: "Điều khoản dịch vụ",
    dmcaPolicy: "Chính sách DMCA",
    zeroWatermarks: "Không logo/watermark",
    heroTitleHome: "Tải video TikTok & Instagram chất lượng cao",
    heroTitleTikTok: "Tải video TikTok chất lượng cao",
    heroTitleInstagram: "Tải video Instagram chất lượng cao",
    heroDescHome: "Dễ dàng tải về các video TikTok và reels Instagram yêu thích với chất lượng cao nhất. Không cần đăng ký, không dính logo watermark và hoàn toàn miễn phí.",
    heroDescTikTok: "Lưu trữ video TikTok yêu thích trực tiếp về thiết bị không dính logo. Không cần đăng ký tài khoản hoặc cài đặt phần mềm khác.",
    heroDescInstagram: "Tải Reels, bài viết và ảnh Instagram với chất lượng tuyệt đỉnh. Không watermark, không đăng ký tài khoản, tải miễn phí.",
    pasteLabel: "Dán đường dẫn URL của video",
    placeholderHome: "https://tiktok.com/... hoặc https://instagram.com/reel/...",
    placeholderTikTok: "https://www.tiktok.com/@username/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "Xóa liên kết",
    downloadBtn: "Tải xuống",
    extractingBtn: "Đang phân tích...",
    validationErrorEmpty: "Vui lòng nhập một đường link TikTok hoặc Instagram hợp lệ trước",
    validationErrorInvalid: "Vui lòng nhập một liên kết video TikTok hoặc Instagram hợp lệ",
    skeletonText: "Đang truy xuất thông tin tệp tin...",
    platformDetected: "đã phát hiện",
    extractId: "ID phân tích:",
    downloadAnother: "Tải thêm video khác",
    livePreview: "Xem trước HD trực tiếp",
    views: "Lượt xem",
    likes: "Lượt thích",
    comments: "Bình luận",
    shares: "Chia sẻ",
    durationLabel: "Thời lượng",
    proHDBadge: "Pro HD",
    mp4Format: "Định dạng MP4",
    downloadVideoBtn: "Tải Video xuống",
    savedLabel: "Đã lưu",
    finishedLabel: "Hoàn tất!",
    audioMP3Label: "Âm thanh (MP3)",
    audioMP3Desc: "Nhạc chất lượng cao",
    getMP3AudioBtn: "Tải nhạc MP3",
    sslSecureLabel: "Các liên kết tải xuống đã được mã hóa SSL an toàn • Máy chủ gốc trực tiếp",
    capabilitiesTitleTikTok: "Tính năng tải TikTok",
    capabilitiesTitleInstagram: "Tính năng tải Instagram",
    capabilitiesTitleGeneral: "Các nền tảng được hỗ trợ tốt nhất",
    tiktokCap1: "Tải không giới hạn các bài đăng TikTok không dính logo",
    tiktokCap2: "Trích xuất bài hát nền và âm thanh chất lượng gốc",
    tiktokCap3: "Nhiều độ phân giải khác nhau để tải tùy chọn (Có HD)",
    tiktokCap4: "Xử lý tức thì không bị chặn bởi các rào cản ứng dụng",
    instagramCap1: "Tải nhanh Reels, Bài viết ảnh và các bộ ảnh Carousel",
    instagramCap2: "Liên kết tải CDN trực tiếp cho tập tin chất lượng cao nhất",
    instagramCap3: "Trích xuất MP3 nhanh cho tất cả các bản nhạc trong Reels",
    instagramCap4: "Vượt qua các bước bắt buộc đăng nhập tài khoản an toàn",
    faqTitle: "Các câu hỏi thường gặp",
    faqSubtitle: "Mọi thông tin liên quan đến bản quyền watermark, tốc độ tải và độ an toàn của dữ liệu.",
    faqItemsHome: [
      {
        question: "Làm thế nào để tải video từ TikTok hoặc Instagram?",
        answer: "Chỉ cần truy cập TikTok hoặc Instagram, sao chép liên kết của video cần tải, dán vào thanh công cụ ở trên rồi nhấn nút 'Tải xuống'. Lựa chọn chất lượng video bạn cần và tải về máy!"
      },
      {
        question: "Video được tải xuống có dính logo watermark không?",
        answer: "Không, toàn bộ hệ thống của chúng tôi lấy tệp tin gốc trực tiếp từ hệ thống CDN của nền tảng, đảm bảo video tải về sạch 100% không dính logo mờ."
      },
      {
        question: "Những định dạng và chất lượng nào được hỗ trợ?",
        answer: "Chúng tôi hỗ trợ tập tin HD lên tới 1080p, cũng như định dạng nén tối ưu (720p, 480p) để tiết kiệm dữ liệu mạng, và trích xuất nhạc chất lượng cao định dạng MP3."
      },
      {
        question: "Tôi có cần phải đăng ký tài khoản để sử dụng không?",
        answer: "Không cần đăng ký bất kỳ tài khoản hay tiện ích mở rộng trình duyệt nào. Mọi tác vụ được xử lý trực tiếp trên trình duyệt của bạn một cách bảo mật."
      },
      {
        question: "Có giới hạn số lượng video được phép tải xuống không?",
        answer: "Dịch vụ của chúng tôi hoàn toàn miễn phí và không giới hạn! Chúng tôi chỉ áp đặt giới hạn bảo vệ máy chủ nhẹ ở mức 15 lượt tải mỗi phút để duy trì tốc độ ổn định."
      }
    ],
    faqItemsTikTok: [
      {
        question: "Làm thế nào để tải xuống video từ TikTok?",
        answer: "Thực hiện sao chép liên kết video TikTok cần tải, dán vào thanh tìm kiếm phía trên rồi chọn chất lượng video hoặc định dạng âm thanh tùy thích."
      },
      {
        question: "Video TikTok tải về có thực sự không dính logo?",
        answer: "Chính xác, hệ thống tải tệp video thô nguyên bản từ máy chủ chính nên hoàn toàn không bị dính biểu tượng chuyển động của TikTok."
      },
      {
        question: "Tôi có thể tải nhạc nền hoặc âm thanh từ bài đăng TikTok không?",
        answer: "Có! Bạn chọn phần tải xuống âm thanh để trích xuất bài hát nền trực tiếp sang định dạng nghe nhạc MP3 độ phân giải cao."
      },
      {
        question: "Sử dụng công cụ này để tải video TikTok có an toàn không?",
        answer: "Cực kỳ an toàn. Bạn không cần điền thông tin đăng nhập của mình, mọi kiểm tra tệp tin đều an tâm chạy trên hệ thống bảo mật của chúng tôi."
      },
      {
        question: "Có rào cản hay giới hạn gì trong ngày không?",
        answer: "Hoàn toàn miễn phí và không giới hạn số lượng video bạn muốn lưu trữ hàng ngày."
      }
    ],
    faqItemsInstagram: [
      {
        question: "Làm sao để tải Reels hoặc ảnh từ Instagram?",
        answer: "Sao chép liên kết bài viết từ Instagram dán trực tiếp vào công cụ ở trang chủ để hệ thống phân tích và chuẩn bị liên kết tải gốc tốc độ cao."
      },
      {
        question: "Tải Reels từ Instagram có mất phí gì không?",
        answer: "Sử dụng hoàn toàn miễn phí. Chúng tôi hỗ trợ tìm tệp nguồn từ liên kết công khai của mạng xã hội giúp bạn lưu dễ dàng."
      },
      {
        question: "Có tải được bộ bài đăng chứa nhiều ảnh (Carousel) không?",
        answer: "Có nhé, hệ thống tải được đầy đủ các bộ ảnh, ảnh đơn, video hay thước phim Reels thông thường."
      },
      {
        question: "Tôi có cần nhập mật khẩu Instagram không?",
        answer: "Tuyệt đối không cần cung cấp bất kỳ tài khoản hay mật khẩu cá nhân nào. Bạn tải được ngay từ các bài đăng công khai cực nhanh."
      },
      {
        question: "Làm cách nào để chuyển đổi Reels Instagram sang file nhạc MP3?",
        answer: "Bạn chọn tùy chọn tải âm thanh để hệ thống tách nhạc nền và tải về máy dưới dạng tệp MP3 tiện dụng."
      }
    ],
    disclaimerHeader: "Tuyên bố miễn trừ trách nhiệm:",
    disclaimerText: "Ứng dụng này là một công cụ hỗ trợ cho mục đích sao lưu cá nhân và trải nghiệm truyền thông trực tuyến. Chúng tôi không hoạt động liên thông hay liên kết chính thức với TikTok, ByteDance, Instagram, Meta, hoặc bất kỳ thương hiệu mạng xã hội nào khác. Toàn bộ bản quyền thương hiệu thuộc sở hữu hoàn toàn của các bên liên quan. Vui lòng tôn trọng quyền sở hữu trí tuệ trước khi chia sẻ lại nội dung.",
    copyrightText: "© 2026 SaveKlip Systems. Phát triển và tối ưu theo tiêu chuẩn công nghệ web tốc độ cao.",
    detectedAlert: "Ngôn ngữ đã tự động điều chỉnh phù hợp với vị trí của bạn:"
  },
  pl: {
    downloadsToday: "Dzisiejsze pobrania",
    themeLight: "Przełącz na tryb jasny",
    themeDark: "Przełącz na tryb ciemny",
    home: "Główna",
    tiktokDownloader: "Pobieranie z TikTok",
    instagramDownloader: "Pobieranie z Instagram",
    blog: "Blog",
    aboutUs: "O nas",
    contactUs: "Kontakt",
    privacyPolicy: "Polityka prywatności",
    termsOfService: "Regulamin usług",
    dmcaPolicy: "Zgłoszenia DMCA",
    zeroWatermarks: "Bez znaków wodnych",
    heroTitleHome: "Zapisuj filmy z TikToka i Instagrama w wysokiej jakości",
    heroTitleTikTok: "Zapisuj filmy z TikToka w wysokiej jakości",
    heroTitleInstagram: "Zapisuj filmy z Instagrama w wysokiej jakości",
    heroDescHome: "Pobieraj z łatwością swoje ulubione filmy z TikToka oraz rolki z Instagrama. Bez rejestracji, bez znaków wodnych, w 100% darmowo.",
    heroDescTikTok: "Zapisuj ulubione materiały z TikToka bezpośrednio na urządzeniu bez znaku wodnego. Brak rejestracji, brak instalacji programów, całkowicie bez opłat.",
    heroDescInstagram: "Zapisuj Rolki, zdjęcia i posty z Instagrama w najwyższej jakości obrazu. Brak znaków wodnych, bez zakładania konta, darmowo.",
    pasteLabel: "Wklej link URL do filmu",
    placeholderHome: "https://tiktok.com/... lub https://instagram.com/reel/...",
    placeholderTikTok: "https://www.tiktok.com/@nazwa_uzytkownika/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "Wyczyść link",
    downloadBtn: "Pobierz",
    extractingBtn: "Wyodrębnianie plików...",
    validationErrorEmpty: "Wprowadź najpierw poprawny adres URL z TikToka lub Instagrama",
    validationErrorInvalid: "Wprowadź poprawny link do filmu z TikToka lub Instagrama",
    skeletonText: "Pobieranie szczegółów pliku...",
    platformDetected: "wykryto",
    extractId: "ID operacji:",
    downloadAnother: "Pobierz kolejny film",
    livePreview: "Podgląd na żywo HD",
    views: "Wyświetlenia",
    likes: "Polubienia",
    comments: "Komentarze",
    shares: "Udostępnienia",
    durationLabel: "Czas trwania",
    proHDBadge: "Pro HD",
    mp4Format: "Format MP4",
    downloadVideoBtn: "Pobierz wideo",
    savedLabel: "Zapisano",
    finishedLabel: "Gotowe!",
    audioMP3Label: "Dźwięk (MP3)",
    audioMP3Desc: "Ulubiona muzyka w wysokiej jakości",
    getMP3AudioBtn: "Pobierz dźwięk MP3",
    sslSecureLabel: "Połączenia szyfrowane SSL zweryfikowane • Bezpieczne pobieranie bezpośrednio ze źródła",
    capabilitiesTitleTikTok: "Funkcje pobierania z TikToka",
    capabilitiesTitleInstagram: "Funkcje pobierania z Instagrama",
    capabilitiesTitleGeneral: "Wspierane platformy społecznościowe",
    tiktokCap1: "Pobieraj nieograniczone posty z TikToka bez znaków wodnych",
    tiktokCap2: "Wyodrębniaj ścieżki dźwiękowe bezpośrednio do formatu MP3",
    tiktokCap3: "Pobieraj w wielu wersjach rozdzielczości (dostępne HD)",
    tiktokCap4: "Błyskawiczne przetwarzanie omijające blokady regionalne",
    instagramCap1: "Szybko pobieraj Rolki, Posty oraz galerie zdjęć",
    instagramCap2: "Bezpośrednie ścieżki pobierania z sieci dystrybucji CDN",
    instagramCap3: "Dynamiczna ekstrakcja audio dla fragmentów muzycznych",
    instagramCap4: "Bezpieczne omijanie wymogu logowania do platformy",
    faqTitle: "Często zadawane pytania (FAQ)",
    faqSubtitle: "Wszystko, co musisz wiedzieć o znakach wodnych, limitach prędkości pobierania oraz bezpieczeństwie danych.",
    faqItemsHome: [
      {
        question: "Jak pobrać film z TikToka lub Instagrama?",
        answer: "Skopiuj link filmu, rolki lub wpisu z TikToka bądź Instagrama, wklej go na naszej stronie głównej i kliknij przycisk 'Pobierz'. Wybierz interesującą Cię jakość i gotowe!"
      },
      {
        question: "Czy pobrane filmy posiadają znaki wodne?",
        answer: "Nie, nasz system pobiera oryginalny plik bezpośrednio z serwerów CDN sieci społecznościowej, gwarantując brak jakichkolwiek znaków wodnych."
      },
      {
        question: "Jakie formaty i jakości są obsługiwane?",
        answer: "Obsługujemy pliki wideo o wysokiej rozdzielczości do 1080p, a także mniejsze skompresowane wersje (720p, 480p) oraz bezproblemowe pobieranie ścieżek dźwiękowych w formacie MP3."
      },
      {
        question: "Czy muszę zakładać konto na stronie?",
        answer: "Nie są wymagane żadne konta użytkownika ani instalacja dodatkowego oprogramowania. Całość działa w pełni bezpiecznie w Twojej przeglądarce."
      },
      {
        question: "Czy istnieje limit pobierania plików?",
        answer: "Oferujemy w pełni darmowe pobieranie bez limitów! Stosujemy jedynie drobny limit ochronny serwera na poziomie 15 zapytań na minutę."
      }
    ],
    faqItemsTikTok: [
      {
        question: "Jak pobierać klipy z TikToka?",
        answer: "Skopiuj link bezpośrednio w aplikacji TikTok, wklej go u nas i zatwierdź przyciskiem pobierania. Następnie wybierz format wideo lub muzyczny."
      },
      {
        question: "Czy filmy z TikToka są rzeczywiście pobierane bez znaku wodnego?",
        answer: "Tak, nasz silnik pobiera plik wideo przed nałożeniem wirującego logo firmy TikTok, dając Ci w pełni czysty materiał."
      },
      {
        question: "Mogę pobrać muzykę z filmu z TikToka?",
        answer: "Oczywiście! Możesz przekonwertować i wyodrębnić ścieżkę dźwiękową bezpośrednio do formatu MP3 w wysokiej jakości."
      },
      {
        question: "Czy ta strona jest bezpieczna do pobierania?",
        answer: "Tak. Nie wymagamy podawania żadnych haseł, cały proces pobierania zachodzi przy użyciu bezpiecznego interfejsu API."
      },
      {
        question: "Czy napotkam dzienne limity?",
        answer: "Nie, możesz pobierać dowolną ilość filmów w ciągu dnia całkowicie darmowo."
      }
    ],
    faqItemsInstagram: [
      {
        question: "Jak pobrać Rolki (Reels) z Instagrama?",
        answer: "Wklej link wpisu z serwisu Instagram na naszej stronie. System odnajdzie pliki źródłowe i wyświetli bezpośrednie odnośniki."
      },
      {
        question: "Czy pobieranie plików z Instagrama jest darmowe?",
        answer: "Tak, wszelkie funkcjonalności są całkowicie bezpłatne. Pobieramy pliki ze sprawdzonych publicznych serwerów CDN."
      },
      {
        question: "Czy wspierane są posty karuzelowe (kilka zdjęć)?",
        answer: "Tak, system doskonale radzi sobie z wyciąganiem całych serii zdjęć z postów typu karuzela."
      },
      {
        question: "Czy muszę zalogować się u was kontem z Instagrama?",
        answer: "Nigdy nie prosimy o hasła do kont. Możesz pobrać dowolne publicznie dostępne multimedia bez konieczności rejestracji."
      },
      {
        question: "Jak wyciągnąć sam dźwięk ze ścieżki wideo na Instagramie?",
        answer: "Wybierz format audio z listy wykrytych plików po analizie linku i pobierz ścieżkę jako plik muzyczny MP3."
      }
    ],
    disclaimerHeader: "Zastrzeżenie:",
    disclaimerText: "Ta strona jest niezależnym narzędziem do tworzenia kopii zapasowych oraz prywatnego przeglądania multimediów. Nie współpracujemy ani nie jesteśmy powiązani z serwisami TikTok, ByteDance, Instagram, Meta ani żadną powiązaną siecią społecznościową. Prawa autorskie do znaków należą do ich prawnych właścicieli. Zawsze przestrzegaj praw autorskich przed dalszym użyciem treści.",
    copyrightText: "© 2026 SaveKlip Systems. Stworzono zgodnie ze standardami szybkiej i wydajnej sieci web.",
    detectedAlert: "Język został dostosowany do Twojej lokalizacji geograficznej:"
  },
  nl: {
    downloadsToday: "Aantal downloads vandaag",
    themeLight: "Overschakelen naar lichte modus",
    themeDark: "Overschakelen naar donkere modus",
    home: "Startpagina",
    tiktokDownloader: "TikTok Downloader",
    instagramDownloader: "Instagram Downloader",
    blog: "Blog",
    aboutUs: "Over ons",
    contactUs: "Contact",
    privacyPolicy: "Privacybeleid",
    termsOfService: "Servicevoorwaarden",
    dmcaPolicy: "DMCA-beleid",
    zeroWatermarks: "Geen watermerken",
    heroTitleHome: "Sla TikTok & Instagram video's op in hoge kwaliteit",
    heroTitleTikTok: "Sla TikTok video's op in hoge kwaliteit",
    heroTitleInstagram: "Sla Instagram video's op in hoge kwaliteit",
    heroDescHome: "Download eenvoudig je favoriete TikTok video's en Instagram reels in hoge kwaliteit. Geen registratie nodig, zonder watermerk en volledig gratis.",
    heroDescTikTok: "Sla je favoriete TikTok's op direct op je apparaat zonder watermerk. Geen aanmeldingen, geen software-installaties en helemaal gratis.",
    heroDescInstagram: "Download Instagram Reels, profielvideo's en fotoposts in ongeëvenaarde visuele kwaliteit. Zonder watermerken, zonder account registratie.",
    pasteLabel: "Plak de URL-link van je video",
    placeholderHome: "https://tiktok.com/... of https://instagram.com/reel/...",
    placeholderTikTok: "https://www.tiktok.com/@gebruikersnaam/video/7123456...",
    placeholderInstagram: "https://www.instagram.com/reel/Ct12345...",
    clearLabel: "Link wissen",
    downloadBtn: "Downloaden",
    extractingBtn: "Media ophalen...",
    validationErrorEmpty: "Voer eerst een geldige TikTok- of Instagram-URL in",
    validationErrorInvalid: "Voer een geldige video-link van TikTok of Instagram in",
    skeletonText: "Bestandsgegevens ophalen...",
    platformDetected: "gedetecteerd",
    extractId: "Extractie ID:",
    downloadAnother: "Nog een video downloaden",
    livePreview: "Live HD Sneak Preview",
    views: "Weergaven",
    likes: "Likes",
    comments: "Reacties",
    shares: "Gedeeld",
    durationLabel: "Duur",
    proHDBadge: "Pro HD",
    mp4Format: "MP4-formaat",
    downloadVideoBtn: "Video downloaden",
    savedLabel: "Opgeslagen",
    finishedLabel: "Voltooid!",
    audioMP3Label: "audio (MP3)",
    audioMP3Desc: "Hoge kwaliteit audiospoor",
    getMP3AudioBtn: "Download MP3-audio",
    sslSecureLabel: "Geverifieerde beveiligde SSL-verbindingen • Directe herleiding via bronserver",
    capabilitiesTitleTikTok: "Specificaties TikTok Downloader",
    capabilitiesTitleInstagram: "Specificaties Instagram Downloader",
    capabilitiesTitleGeneral: "Ondersteunde platformmogelijkheden",
    tiktokCap1: "Download onbeperkt TikTok's zonder storend watermerk",
    tiktokCap2: "Sla achtergrondtracks en audio direct op als MP3",
    tiktokCap3: "Sla op in diverse resoluties (HD beschikbaar)",
    tiktokCap4: "Supersnelle overdracht zonder cliënt-side blokkades",
    instagramCap1: "Download Reels, fotoposts en carrousel-items in een handomdraai",
    instagramCap2: "Directe downloadkoppelingen rechtstreeks vanaf de CDN-servers",
    instagramCap3: "Zet de leukste Reels soundtracks snel om naar MP3",
    instagramCap4: "Veilig en anoniem downloaden zonder in te loggen",
    faqTitle: "Veelgestelde vragen (FAQ)",
    faqSubtitle: "Alles wat u moet weten over watermerken, downloadsnelheden en de veiligheid van uw downloads.",
    faqItemsHome: [
      {
        question: "Hoe download ik een video van TikTok of Instagram?",
        answer: "Kopieer de link van de video, reel of foto op TikTok of Instagram, plak deze hierboven in de balk en druk op 'Download'. Kies de gewenste resolutie en sla het bestand op!"
      },
      {
        question: "Zijn de gedownloade video's echt vrij van watermerken?",
        answer: "Ja, onze downloader haalt het bronbestand rechtstreeks op van de officiële distributienetwerken (CDN). Zo krijg je video's zonder logo's."
      },
      {
        question: "Welke formaten en resoluties worden ondersteund?",
        answer: "We ondersteunen hoge-resolutie videobestanden tot 1080p HD, evenals compactere bestandsgrootten (720p, 480p) en directe MP3-audiodownloads."
      },
      {
        question: "Moet ik een account aanmaken om te downloaden?",
        answer: "Nee, er is geen registratie of extra software vereist. Alles vindt volledig beveiligd plaats binnen het venster van je browser."
      },
      {
        question: "Geldt er een limiet op het aantal downloads dat ik mag doen?",
        answer: "We bieden de downloader onbeperkt en gratis aan! Ter bescherming van onze servercapaciteit hanteren we enkel een lichte veiligheidsgrens van 15 verzoeken per minuut."
      }
    ],
    faqItemsTikTok: [
      {
        question: "Hoe download ik een filmpje van TikTok?",
        answer: "Kopieer de weblink van de TikTok, voer deze hierboven in en klik op downloaden. Kies daarna de gewenste downloadversie."
      },
      {
        question: "Is de TikTok-video zonder watermerk?",
        answer: "Absoluut, onze techniek pakt de originele media van de bronserver nog voordat het bewegende TikTok-logo erop is geplaatst."
      },
      {
        question: "Kan ik ook alleen de MP3-muziek van TikTok downloaden?",
        answer: "Ja! Je kunt heel makkelijk de bijbehorende muziek traceren en downloaden in MP3-formaat van hoge kwaliteit."
      },
      {
        question: "Is het betrouwbaar om hier TikTok-video's te downloaden?",
        answer: "Zeker. We bewaren geen gegevens en je hoeft nooit je wachtwoorden in te vullen of gevaarlijke installaties te doen."
      },
      {
        question: "Gelden er dagelijkse downloadlimieten?",
        answer: "Nee, er zijn geen restricties per dag. Je kunt zoveel downloads uitvoeren als je zelf wilt."
      }
    ],
    faqItemsInstagram: [
      {
        question: "Hoe download ik Instagram Reels of berichten?",
        answer: "Vul het gekopieerde webadres van de Instagram-post hier in. Onze server toont je direct de downloadbare CDN-bestandslocaties."
      },
      {
        question: "Kost het geld om Instagram-bestanden te downloaden?",
        answer: "Nee, deze service is 100% gratis en onbeperkt te gebruiken voor alle publiekelijk beschikbare berichten."
      },
      {
        question: "In hoeverre worden carrouselposts ondersteund?",
        answer: "Ons systeem herkent alle afbeeldingen in een fotogalerij en haalt ze direct een voor een voor u op."
      },
      {
        question: "Moet ik inloggen met mijn persoonlijke Instagram-gegevens?",
        answer: "Nooit. Wij vragen u nooit om toegangscodes. U kunt via elk openbaar profiel direct de bestanden veilig downloaden."
      },
      {
        question: "Kan en mag ik de geluiden van Reels opnemen?",
        answer: "Ja, selecteer de audioversie onder de knoppen om enkel het achtergrondgeluid van het bericht in MP3 binnen te halen."
      }
    ],
    disclaimerHeader: "Disclaimer:",
    disclaimerText: "Deze webapplicatie is uitsluitend bedoeld voor het maken van persoonlijke reservesleutels en media-archivering. Wij zijn niet gelieerd aan of officieel verbonden met TikTok, ByteDance, Instagram, Meta, of andere sociale medianetwerken. Alle merkrechten liggen bij de respectievelijke eigenaren. Respecteer altijd de geldende auteursrechten alvorens u media deelt.",
    copyrightText: "© 2026 SaveKlip Systems. Ontwikkeld conform eisen voor uiterst snelle responstijden.",
    detectedAlert: "Taal automatisch aangepast aan uw geografische regio:"
  }
};
