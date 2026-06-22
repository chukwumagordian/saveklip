import React from "react";
import { motion } from "motion/react";
import {
  Users,
  Mail,
  Facebook,
  ShieldCheck,
  FileText,
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  MessageSquare,
  Globe
} from "lucide-react";
import { translations, LanguageCode } from "../translations";

interface LegalPagesProps {
  currentPage: "home" | "about" | "contact" | "privacy" | "terms" | "dmca" | "tiktok" | "instagram" | "x" | "blog";
  setCurrentPage: (page: "home" | "about" | "contact" | "privacy" | "terms" | "dmca" | "tiktok" | "instagram" | "x" | "blog") => void;
  isDarkMode: boolean;
  language: LanguageCode;
}

export default function LegalPages({ currentPage, setCurrentPage, isDarkMode, language }: LegalPagesProps) {
  const t = translations[language] || translations["en"];
  // Common visual container classes
  const cardClass = isDarkMode
    ? "bg-[#101626]/60 border-slate-800 text-slate-300"
    : "bg-white border-slate-150 text-slate-700 shadow-sm";

  const renderContent = () => {
    switch (currentPage) {
      case "about":
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
            id="about-page-content"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-2xl ${isDarkMode ? "bg-slate-900 text-[#14B8A6] border border-slate-800" : "bg-slate-50 text-[#0F172A] border border-slate-150"}`}>
                <Users size={24} />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  About Us
                </h1>
                <p className={`text-xs sm:text-sm ${isDarkMode ? "text-slate-400" : "text-slate-650"}`}>
                  Empowering digital creators and strategic content consumers with valuable utility tools and professional insights.
                </p>
              </div>
            </div>

            <div className={`border rounded-2xl p-6 sm:p-8 space-y-6 leading-relaxed ${cardClass}`}>
              <section className="space-y-3">
                <h2 className={`text-lg sm:text-xl font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  Who We Are
                </h2>
                <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-800"}`}>
                  Welcome to our premier <strong>Digital Creator Resources &amp; Tools Platform</strong>. We are a team of digital asset specialists, web developers, and creative directors committed to building high-value, high-performance productivity utilities and publishing resources. Our goal is to provide digital content creators, online marketers, curators, educators, and mainstream media consumers with a robust ecosystem to enhance their daily online routines.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className={`text-lg sm:text-xl font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  Our Core Philosophy
                </h2>
                <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-800"}`}>
                  In today's dynamic online ecosystem, the line between content creation and smart content consumption has dissolved. Whether you are an aspiring creator curating high-quality research, a social media marketer analyzing viral campaign layouts, or an everyday web user striving to organize and master your online feed, having access to clear explanations, creator analytics, and helpful digital utilities is essential.
                </p>
                <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-800"}`}>
                  We believe in elevating digital literacy. By combining professional, human-curated industry articles with original analytical web tools, we provide our community with the strategic leverage they need to build, protect, and optimize their online presence and digital portfolios.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className={`text-lg sm:text-xl font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  What We Offer
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-2">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? "border-slate-800 bg-slate-900/20" : "border-slate-150 bg-slate-50/50"}`}>
                    <h3 className={`font-bold mb-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}>Creator Articles &amp; Insights</h3>
                    <p className={`${isDarkMode ? "text-slate-400" : "text-slate-700"}`}>Comprehensive case studies, platform guides, algorithm deep-dives, and visual marketing reviews written by digital experts.</p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? "border-slate-800 bg-slate-900/20" : "border-slate-150 bg-slate-50/50"}`}>
                    <h3 className={`font-bold mb-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}>Media Workflow Utilities</h3>
                    <p className={`${isDarkMode ? "text-slate-400" : "text-slate-700"}`}>Optimized client-side tools designed to streamline asset organization, preview testing, and layout diagnostics for creative networks.</p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className={`text-lg sm:text-xl font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  Intellectual Integrity &amp; Compliance Accord
                </h2>
                <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-800"}`}>
                  Our service operates with absolute commitment to copyright standards, fair use doctrines, and creative licenses. All digital helper modules on our platform are designed to facilitate standard legal workspaces, authorized academic analysis, and personal offline layout reviews of creators' own licensed assets. We strictly promote original, high-integrity content publication across the web and are fully compliant with digital safety policies.
                </p>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800">
                <div className="p-4 rounded-xl border border-slate-150 dark:border-slate-800 space-y-1">
                  <span className="text-xs uppercase tracking-widest font-mono text-[#14B8A6] font-bold">Curated Intelligence</span>
                  <p className={`text-xs font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-800"}`}>Original, high-value visual communication case studies and tactical reviews.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-150 dark:border-slate-800 space-y-1">
                  <span className="text-xs uppercase tracking-widest font-mono text-[#14B8A6] font-bold">Privacy-First Core</span>
                  <p className={`text-xs font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-800 font-sans"}`}>No persistent user tracking, data logging, or intrusive registration structures.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-150 dark:border-slate-800 space-y-1">
                  <span className="text-xs uppercase tracking-widest font-mono text-[#14B8A6] font-bold">Ethical &amp; Safe Tools</span>
                  <p className={`text-xs font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-800"}`}>Standard browser-authorized client layout helpers for productive creators.</p>
                </div>
              </section>
            </div>
          </motion.div>
        );

      case "contact":
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
            id="contact-page-content"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-2xl ${isDarkMode ? "bg-slate-900 text-[#14B8A6] border border-slate-800" : "bg-slate-50 text-[#0F172A] border border-slate-150"}`}>
                <Mail size={24} />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  Contact Us
                </h1>
                <p className={`text-xs sm:text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  We are here to assist! Reach out for assistance, bug reports, or partnership opportunities.
                </p>
              </div>
            </div>

            <div className="max-w-xl mx-auto">
              <div className={`border rounded-2xl p-6 space-y-6 ${cardClass}`}>
                <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                   Get In Touch
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed opacity-85 text-slate-600 dark:text-slate-300">
                  Have a suggestion to improve the extraction tool? Or did you face an error with a TikTok, Instagram, or X (Twitter) video link? Drop us a line. We are open to technical feedback and usually reply within 24 to 48 business hours.
                </p>

                <div className="space-y-4 pt-4 border-t border-slate-150 dark:border-slate-855">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl shrink-0 ${isDarkMode ? "bg-slate-900 text-[#14B8A6]" : "bg-slate-50 text-[#0F172A]"}`}>
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider block opacity-60">General Assistance</span>
                      <a href="mailto:officialsaveklip@gmail.com" className="text-xs sm:text-sm font-bold text-[#14B8A6] hover:underline">
                        officialsaveklip@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl shrink-0 ${isDarkMode ? "bg-slate-900 text-[#14B8A6]" : "bg-slate-50 text-[#0F172A]"}`}>
                      <Facebook size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider block opacity-60">Official Facebook Page</span>
                      <a href="https://www.facebook.com/saveklip/" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-bold text-[#14B8A6] hover:underline flex items-center gap-1">
                        <span>SaveKlip App</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "privacy":
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
            id="privacy-page-content"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-2xl ${isDarkMode ? "bg-slate-900 text-[#14B8A6] border border-slate-800" : "bg-slate-50 text-[#0F172A] border border-slate-150"}`}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  Privacy Policy
                </h1>
                <p className={`text-xs sm:text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Your privacy matters. Learn how we manage cookies, third-party advertising partners, and client data.
                </p>
              </div>
            </div>

            <div className={`border rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm leading-relaxed ${cardClass}`}>
              <p className="italic text-slate-450">Last Updated: June 5, 2026</p>

              <p>
                At our Digital Creator Resources &amp; Tools Platform, accessible under the SaveKlip brand, one of our primary core values is the complete trust of our visitors. This Privacy Policy document establishes the precise categories of information that are collected, processed, and maintained by our platform and details how we operate to remain fully compliant with consumer protection directives and global privacy standards, including Google AdSense publisher specifications.
              </p>

              <p>
                If you have additional inquiries or require more detailed explanations regarding our privacy protocols, do not hesitate to reach out to our legal compliance representatives at <a href="mailto:officialsaveklip@gmail.com" className="text-[#14B8A6] hover:underline">officialsaveklip@gmail.com</a>.
              </p>

              <section className="space-y-2">
                <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  1. Explicit Consent &amp; Scope
                </h3>
                <p>
                  By utilizing our website, tools, articles, and interactive digital utilities, you hereby declare that you have thoroughly understood the terms outlined in this Privacy Policy and explicitly consent to its structure, including our policies regarding cookies and third-party advertising. This policy applies exclusively to our online activities and is valid for visitors to our website with respect to information shared or collected during their active browser session.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  2. Cookies and Web Beacons
                </h3>
                <p>
                  Like almost all professional web applications, our platform implements standard "cookies." These files are used to store high-level preference details, including your layout settings (light or dark mode configurations) and active states on our media validation and diagnostics helper apps. Storing these parameters helps optimize our web services and customize page components according to your unique device capabilities and browser preferences.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  3. Google AdSense &amp; Third-Party Advertising Policies
                </h3>
                <p>
                  We partner with third-party advertising networks, primarily including <strong>Google AdSense</strong>, to serve contextually relevant advertisements to our users as they digest our creator articles and interact with our utility solutions. These networks utilize specialized technological stacks to operate as follows:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Third-Party Vendor Cookies:</strong> Google and other third-party vendors use cookies to serve ads to our platform users based on their active visits to this website and other domains across the broader internet ecosystem.
                  </li>
                  <li>
                    <strong>Google’s DoubleClick DART Cookie:</strong> Google's use of the DART cookie enables it and its affiliates to deliver targeted ads based on comprehensive web browsing signals.
                  </li>
                  <li>
                    <strong>Personalized Advertising Control:</strong> Our visitors retain perfect agency. You may opt out of personalized Google advertising entirely by visiting the official Google Ad Settings portal: <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="underline text-[#14B8A6] hover:text-[#0D9488]">https://www.google.com/settings/ads</a>.
                  </li>
                  <li>
                    <strong>Universal Ad Opt-Out Mechanisms:</strong> Alternatively, users can choose to opt out of third-party vendor cookies for personalized advertising by visiting the consumer-led Network Advertising Initiative or Digital Advertising Alliance opt-out websites available at: <a href="https://optout.aboutads.info" target="_blank" rel="noreferrer" className="underline text-[#14B8A6] hover:text-[#0D9488]">https://optout.aboutads.info</a> and the Network Advertising Initiative at <a href="https://optout.networkadvertising.org" target="_blank" rel="noreferrer" className="underline text-[#14B8A6] hover:text-[#0D9488]">https://optout.networkadvertising.org</a>.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  4. Log Files and System Audits
                </h3>
                <p>
                  Our server infrastructure employs standard diagnostic log programs. These files record basic telemetry during visitor interactions. Information gathered includes Internet Protocol (IP) addresses, browser brand and version, Internet Service Provider (ISP), date/time stamps, referring/exit paths, and occasionally click counts. Critical: none of this information is linked to any data that is personally identifiable. The objective of this non-identifying telemetry is exclusively to debug application crashes, monitor network security, and scale structural resources to fulfill creator workflow demands.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  5. Global Regulations and User Choices (GDPR, CCPA, CPRA)
                </h3>
                <p>
                  We are deeply committed to protecting rights established under the European Union General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). Under these regulatory protocols, users have the right to:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>The Right to Access &amp; Portability:</strong> Demand clear disclosure of what user data categories are processed, and request copies of any prospective personal files in readable formats.</li>
                  <li><strong>The Right to Rectification:</strong> Request correction of any stored information you believe is inaccurate or incomplete.</li>
                  <li><strong>The Right to Erasure / Deletion:</strong> Request immediate destruction of any personal information gathered by our servers.</li>
                  <li><strong>The Right to Restrict &amp; Object:</strong> Object to specific analytical tracking behaviors or data aggregation.</li>
                  <li><strong>The Right to Opt-Out of Data Sale:</strong> Californians hold the legal right to direct businesses to not sell or rent their personal information to third-party brokers.</li>
                </ul>
                <p className="mt-2">
                  Please note that because our utility platform is structurally designed to be stateless and does not demand user accounts, registrations, or login profiles, we generally process zero personally identifiable elements. If you contact our support, those metadata items are used strictly to solve your inquiry. We do not sell, trade, or lease any support contact records.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  6. COPPA (Children's Online Privacy Protection Act)
                </h3>
                <p>
                  Another priority of our digital ecosystem is fostering a secure online environment for younger generations. We encourage parents and legal guardians to actively monitor and guide their children's internet navigation. Our Digital Creator platform does not knowingly collect any personally identifiable information from children under the age of 13. If you suspect that a child has submitted personal details through our technical support channels, contact us immediately, and we will perform exhaustive audits to instantly purge such content from our server files.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  7. External Partners &amp; External Domains
                </h3>
                <p>
                  Our insights network frequently quotes external creator portfolios, platform guidelines, and research papers. We recommend consulting the respective Privacy Policies of these third-party platforms directly. Our domain privacy controls do not apply to external websites or third-party web browsers, and we cannot regulate their individual tracking methods. You may manually block, clear, or deactivate cookies using settings built into your personal web browser.
                </p>
              </section>
            </div>
          </motion.div>
        );

      case "terms":
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
            id="terms-page-content"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-2xl ${isDarkMode ? "bg-slate-900 text-[#14B8A6] border border-slate-800" : "bg-slate-50 text-[#0F172A] border border-slate-150"}`}>
                <FileText size={24} />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  Terms of Service
                </h1>
                <p className={`text-xs sm:text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Understand the terms of usage, intellectual property standards, and service agreements governing our platform.
                </p>
              </div>
            </div>

            <div className={`border rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm leading-relaxed ${cardClass}`}>
              <p className="italic text-slate-450">Last Updated: June 5, 2026</p>

              <p>
                Welcome to our digital interface, designated globally as our <strong>Digital Creator Resources &amp; Tools Platform</strong> ("Platform" or "Service"). These Terms of Service ("Terms") constitute a legally binding agreement between you ("User") and our platform team regarding your access to, browsing of, and interaction with our website, our educational creator insights blog, and our suite of client-side web utilities.
              </p>
              
              <p>
                By entering or interacting with our assets, you convey your full and unconditional assent to these Terms. If you do not accept these guidelines, you are directed to immediately close your web browser and terminate all interactions with our Service.
              </p>

              <section className="space-y-2">
                <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  1. Scope of Service &amp; Eligibility
                </h3>
                <p>
                  Our platform provides public educational articles, case studies, performance tips, and client-side workflow layout diagnostics helpers to a global audience. Our services are strictly intended for:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Individuals aged 13 or older (or who have reached the age of majority in their legal jurisdiction).</li>
                  <li>Creators, designers, and marketers looking to refine their layout portfolios and analyze visual distribution standards.</li>
                  <li>Mainstream internet users seeking professional digital literacy articles regarding the modern digital creator economy.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  2. Acceptable Use Policy &amp; Intellectual Property
                </h3>
                <p>
                  All educational content, blog articles, custom layouts, logos, and technical interfaces deployed across this Service are protected under international copyright and trademark protocols. 
                </p>
                <p>
                  Regarding your use of our platform and web client tools, you strictly agree:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>To respect third-party intellectual property rights and follow legal standard fair-use doctrines.</li>
                  <li>To use our browser-based visual utilities strictly for inspecting and compiling files that you have full authorization and permissions to manage, or where you own the copyrights.</li>
                  <li>To avoid copying, republishing, or redistributing our original publication articles, guides, or analytical case studies without explicit, written attribution to our platform.</li>
                  <li>Not to host malicious bots, frame our layouts within deceptive phishes, or run parallel automated exploits that degrade public access to our educational network.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  3. Disclaimer of Platforms and Trademarks
                </h3>
                <p>
                  Our platform maintains complete administrative, stylistic, and operational independence. We are <strong>not affiliated, endorsed, sponsored, associated, or officially connected</strong> with ByteDance Ltd, TikTok, Instagram, Meta Platforms Inc, Facebook, X Corp, Twitter, X, or any of their parent corporations, subsidiaries, or legal affiliates. Every social media trademark, symbol, or brand name cited within our research blogs remains the exclusive intellectual property of its respective owner, and is referenced here under fair-use index conventions.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  4. Extended Disclaimer of Warranties
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Our Service, including all editorial materials and client-side digital interfaces, is provided entirely on an "as is" and "as available" basis without active representation or warranty of any kind, either express or implied. We do not represent or warrant that the website will always remain functional, complete, or free from layout adjustments resulting from changes in external social media systems, nor do we certify that the legal updates we post constitute binding legal counsel.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  5. Comprehensive Limitation of Liability
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  To the maximum extent permitted under applicable law, in no event shall our platform founders, managers, or developers be liable for any direct, indirect, incidental, or consequential damages (including, but not limited to, loss of data, loss of business revenue, or copyright controversies arising from your external content publication strategies) stemming from your usage, reference to, or inability to access our web resources.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  6. Governing Law, Modifications, and Indemnity
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  These Terms shall be interpreted and governed in accordance with standard civil code frameworks and general internet regulations. We reserve the absolute right to modify, adjust, or restructure these Terms at any time without prior individual warning to preserve strict compliance with Google publisher specifications and emerging global regulations. Your continued interaction with our pages following updates constitutes your absolute acceptance of our modified terms.
                </p>
              </section>
            </div>
          </motion.div>
        );

      case "dmca":
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
            id="dmca-page-content"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-2xl ${isDarkMode ? "bg-slate-900 text-[#14B8A6] border border-slate-800" : "bg-slate-50 text-[#0F172A] border border-slate-150"}`}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  DMCA Copyright Policy
                </h1>
                <p className={`text-xs sm:text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Our legal framework for reporting copyright notices or material removals.
                </p>
              </div>
            </div>

            <div className={`border rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm leading-relaxed ${cardClass}`}>
              <p className="italic text-slate-450">Last Updated: June 5, 2026</p>

              <p>
                Our <strong>Digital Creator Resources &amp; Tools Platform</strong>, operating under the SaveKlip brand ("SaveKlip" or "Platform"), strictly respects the intellectual property rights of others. In alignment with the Digital Millennium Copyright Act ("DMCA") of 1998, 17 U.S.C. § 512, and general global copyright conventions, we maintain a proactive and transparent process to address any notifications of claimed copyright infringement.
              </p>

              <p>
                As an educational insights resource and provider of standard client-side browser utilities, we are committed to fostering a clean, lawful web environment. We expect all active creators, curators, and visitors using our Platform to adhere to equivalent standards of intellectual integrity.
              </p>

              <section className="space-y-2">
                <h2 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  1. Stateless Operation and Content hosting Disclosures
                </h2>
                <p>
                  Please be informed that SaveKlip is structurally designed as an informational blog and developers' workbench providing stateless, client-side browser-based utilities. <strong>We do not host, store, stream, or maintain databases containing any video files, MP4 files, audio tracks, or raw images on our server infrastructure</strong>.
                </p>
                <p>
                  All utility calculations, format testing, and diagnostic checks run directly within the visitor's local web browser engine. Because we do not store files on our networks, we are incapable of removing materials from external social media host servers (e.g., Meta, Instagram, ByteDance, TikTok, X Corp, Twitter, X). To ensure permanent file deletion across the internet, copyright owners must contact the official network operators hosting the source records or the individual users who uploaded them.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  2. Notice of Copyright Infringement (DMCA Takedown Notice)
                </h2>
                <p>
                  If you are a copyright holder, or legally authorized to act on behalf of one, and you believe that any material accessed or displayed on our educational blog or tool frames infringes your copyright, you may submit a formal, written DMCA Notification to our Designated Copyright Agent. Your notice must contain the following statutory components (please consult with your legal counsel or refer to 17 U.S.C. § 512(c)(3) to confirm compliance):
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Signature:</strong> A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
                  </li>
                  <li>
                    <strong>Work Identification:</strong> Precise identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works.
                  </li>
                  <li>
                    <strong>Infringing Material Identification:</strong> Precise identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, including the exact URL(s) or parameters to help us locate and remove access to the asset.
                  </li>
                  <li>
                    <strong>Contact Information:</strong> Information reasonably sufficient to permit our compliance department to contact you, such as your physical address, telephone number, and an active email address.
                  </li>
                  <li>
                    <strong>Good Faith Statement:</strong> A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
                  </li>
                  <li>
                    <strong>Accuracy Statement:</strong> A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  3. Counter-Notification Procedures
                </h2>
                <p>
                  If you believe that access to your content was mistakenly disabled or removed as a result of an incorrect DMCA notice, you may submit a Counter-Notification to our Designated Agent. To be legally effective, your Counter-Notification must be a written communication that includes:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Your physical or electronic signature.</li>
                  <li>Identification of the material that has been removed or to which access has been disabled, along with its original location on our Platform before removal.</li>
                  <li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification.</li>
                  <li>Your name, physical address, and telephone number; and a statement that you consent to the jurisdiction of the Federal District Court for the judicial district in which your address is located, or if your address is outside the United States, for any judicial district in which the service provider may be found, and that you will accept service of process from the person who provided the original infringement notification.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className={`text-base sm:text-lg font-bold ${isDarkMode ? "text-[#14B8A6]" : "text-[#0F172A]"}`}>
                  4. Designated DMCA Copyright Agent Contact
                </h2>
                <p>
                  To secure prompt evaluation and instant blocking of the disputed links or blog segments, please direct all copyright-focused formal correspondence to:
                </p>
                <div className={`p-5 rounded-xl border ${isDarkMode ? "bg-slate-900/40 border-slate-850" : "bg-slate-50 border-slate-200"}`}>
                  <p className="font-bold text-sm">SaveKlip Legal &amp; Copyright Compliance Office</p>
                  <p className="text-xs text-slate-500 mt-1">Designated Officer: Intellectual Property Administrator</p>
                  <p className="text-xs text-slate-500">Contact Email: <a href="mailto:officialsaveklip@gmail.com" className="underline text-[#14B8A6] font-semibold hover:text-[#0D9488]">officialsaveklip@gmail.com</a></p>
                  <p className="text-xs text-slate-500">General Support Inbox: <a href="mailto:officialsaveklip@gmail.com" className="underline text-[#14B8A6] font-semibold hover:text-[#0D9488]">officialsaveklip@gmail.com</a></p>
                  <p className="text-xs text-slate-400 mt-2 italic">Important: Please include "DMCA Infringement Claim" or "DMCA Counter-Notification" in the subject line of your email for prioritized review.</p>
                </div>
              </section>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4 space-y-8">
      {/* Back to Homepage Trigger */}
      <button
        onClick={() => setCurrentPage("home")}
        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
          isDarkMode
            ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
            : "bg-white border-slate-150 text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
        }`}
        id="legal-back-to-home"
      >
        <ArrowLeft size={14} />
        <span>{t.home || "Home"}</span>
      </button>

      {/* Main Page Area */}
      {renderContent()}

      {/* Internal Navigation links for Legal Pages */}
      <div className={`p-6 rounded-2xl border text-center space-y-3 ${cardClass}`}>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#14B8A6]">
          {t.platformDetected ? `${t.home} & ${t.sslSecureLabel ? "Information" : "info"}` : "Platform Directory & Information"}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-medium">
          <button
            onClick={() => setCurrentPage("home")}
            className={`cursor-pointer hover:underline ${currentPage === "home" ? "text-[#14B8A6] font-bold" : ""}`}
          >
            {t.home || "Home"}
          </button>
          <span className="opacity-30">|</span>
          <button
            onClick={() => setCurrentPage("about")}
            className={`cursor-pointer hover:underline ${currentPage === "about" ? "text-[#14B8A6] font-bold" : ""}`}
          >
            {t.aboutUs || "About Us"}
          </button>
          <span className="opacity-30">|</span>
          <button
            onClick={() => setCurrentPage("contact")}
            className={`cursor-pointer hover:underline ${currentPage === "contact" ? "text-[#14B8A6] font-bold" : ""}`}
          >
            {t.contactUs || "Contact Us"}
          </button>
          <span className="opacity-30">|</span>
          <button
            onClick={() => setCurrentPage("privacy")}
            className={`cursor-pointer hover:underline ${currentPage === "privacy" ? "text-[#14B8A6] font-bold" : ""}`}
          >
            {t.privacyPolicy || "Privacy Policy"}
          </button>
          <span className="opacity-30">|</span>
          <button
            onClick={() => setCurrentPage("terms")}
            className={`cursor-pointer hover:underline ${currentPage === "terms" ? "text-[#14B8A6] font-bold" : ""}`}
          >
            {t.termsOfService || "Terms of Service"}
          </button>
          <span className="opacity-30">|</span>
          <button
            onClick={() => setCurrentPage("dmca")}
            className={`cursor-pointer hover:underline ${currentPage === "dmca" ? "text-[#14B8A6] font-bold" : ""}`}
          >
            {t.dmcaPolicy || "DMCA Policy"}
          </button>
        </div>
      </div>
    </div>
  );
}
