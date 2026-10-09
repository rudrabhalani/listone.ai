# Listone.ai

> **From one photo to a complete listing.**
> Production-ready AI SaaS web application for Amazon, Flipkart, Shopify, Meesho, and Etsy sellers.

Built by **Bhalani Rudra Sandipbhai** (17-year-old entrepreneur, Founder & Owner).

---

## 🚀 Key Modules & Capabilities

1. **15-Product Image Generator**
   - Pure-white Amazon Hero image (RGB 255,255,255) adhering strictly to marketplace policies.
   - Infographics with dimension guides, lifestyle scenes, competitor comparisons, and warranty seals.
   - Preserves authentic product pixels with zero hallucinated logos or altered packaging.
   - Dual inputs: 1–5 photo upload or official Amazon ASIN / URL catalog fetch (SP-API).
   - Generates layered JSON outputs and instant ZIP downloads.

2. **Canva-Style Freeform Layer Editor**
   - Built on a real-time layered canvas architecture with zoom, snapping, and undo/redo (`Ctrl+Z` / `Ctrl+Y`).
   - Every element (background, product cutout, headline, badges, dimension arrows) is a separate movable, resizable layer.
   - Magic features: Toggle pure white / moody studio backdrop, remove background, and export 2000x2000+ PNG/JPG/JSON.
   - Autosaves every 5 seconds.

3. **A+ Content Studio (Enhanced Brand Content)**
   - 7 standardized vertical modules: 970x600 Hero banner, Brand story, 4-card feature grid, Comparison matrix, Split editorial, Specs table, and FAQ module.
   - Live Desktop and Mobile responsive preview simulators.
   - One-click export bundling layout manifests and copy-paste alt-text documents.

4. **Amazon SEO Listing Copywriter**
   - A9 title generator adhering to strict formulas without promotional fluff.
   - 5 benefit-first bullet points starting with CAPITALIZED headers (150–200 characters sweet spot).
   - HTML-safe description (1000–1500 characters).
   - Backend search terms byte calculator guaranteeing indexation under 250 bytes.
   - Edit-in-place, character counters, and individual bullet regenerator.

5. **24/7 E-Commerce AI Copilot**
   - Trained on Amazon Advertising (PPC ACoS/TACoS optimization), A9 ranking, FBA fees, sourcing, and Indian tax compliance (GST TCS on Flipkart/Meesho).
   - Multi-lingual support: English, Hindi, Hinglish, Gujarati.
   - Direct "Send to Listing Copy" bridge.

6. **Full-Featured Modern SaaS Marketing Site & Dashboard**
   - 15-section landing page with interactive before/after comparison slider, marketplace marquee, feature bento grid, and testimonials.
   - Supabase schema with Row Level Security (RLS) policies for users, projects, credits, images, and chat history.
   - Dual payment gateway integration: Stripe (international USD) and Razorpay (India INR / UPI).
   - Dedicated `/about` founder page with editable configuration in `config/about.ts`.

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + Custom Modern Aurora Gradient Tokens
- **Icons & Motion:** Lucide React + Framer Motion Keyframes
- **Database & Auth:** Supabase (PostgreSQL schema with RLS)
- **Export & Canvas:** JSZip + HTML5 Canvas Rendering Engine
- **Validation:** Zod Schema Validation

---

## 💻 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/rudrabhalani/listone.ai.git
cd listone.ai

# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

---

## 📄 License & Commercial Ownership

Users retain **100% full commercial ownership** of all generated images, layers, and copy produced on Listone.ai. 

© 2026 Listone.ai. Built by Rudra Bhalani.
