# ✨ Ultra Premium Gallery

A Pinterest & Unsplash-inspired, ultra-premium image gallery built with **HTML, CSS & Vanilla JavaScript**.
Discover, upload, organize, and share visual inspiration — beautifully.

🔗 **Live Demo:** https://javeriya-shiekh.github.io/codealpha_task3/

---

## 🚀 Features

### 🖼️ Gallery & Layout
- **Pinterest-Style Masonry Layout** using CSS Columns — 3 columns on desktop, 2 on tablet & mobile
- **9 Curated Sample Images** from Picsum Photos with varied heights, photographers & dates
- **Blur-Up Lazy Loading** — images load with smooth blur-to-sharp transition
- **Fade-Up Animation** on card load
- **Hover Overlay** with gradient, title, description & category
- **Fully Responsive** design for mobile, tablet & desktop

### 📤 Upload, Edit & Delete (CRUD)
- **Upload + Caption** — upload any image with title, caption & category
- **Live Image Preview** using FileReader API before publishing
- **Edit Post** — change title, caption, category & image anytime
- **Delete Post** — with confirmation dialog using `confirm()` & `splice()`
- **Custom Categories** — create new categories on the fly via "+ Add New Category..."

### 🔍 Filter, Search & Sort
- **Dynamic Category Filters** — auto-generated from your posts + All
- **Favourites Filter** — view only ❤️ favourited images
- **Instant Search** — search by title, category, or caption in real-time
- **4 Sort Options** — Newest, Oldest, A-Z, Most Liked

### ❤️ Engagement
- **Like System** — like counter on each card, saved permanently
- **Favourites System** — toggle 🤍 / ❤️ and filter favourites
- **Comments System** — post & view comments per image inside lightbox

### 🎨 Personalization
- **Dark / Light Mode** — with CSS Variables, saved in LocalStorage
- **4 Colour Styles** — Original, Black & White, Sepia, Vintage (applied via CSS `filter`)
- **Theme & Style Persistence** — your preference stays after refresh

### 🔎 Full-Screen Lightbox
- **Full-Screen Viewer** with image counter (e.g. 1 / 9)
- **Zoom In / Out / Reset** — buttons + Mouse Wheel (0.5x to 2.5x)
- **Prev / Next Navigation** — arrows + Keyboard (Left / Right / ESC)
- **Auto Slideshow** — plays every 3 seconds with Pause
- **Download Image** — via Blob fetch, with fallback for Data URLs
- **Share / Copy Link** — Clipboard API with fallback
- **Fullscreen Mode** — Fullscreen API
- **Info Panel** — Category, Date Added, Photographer, Likes

### 💾 Data Persistence
- **LocalStorage** — all posts, categories, theme & style are saved
- Data survives page refresh — no backend needed
- **Safe Rendering** — `escapeHTML()` to prevent XSS from user input

### 🔔 UX Extras
- **Toast Notifications** — "Liked!", "Image uploaded!", "Link copied!" etc.
- **Empty State** — friendly message when no images match

---

## 🛠️ Tech Stack

| Technology | Use |
| --- | --- |
| **HTML5** | Structure, Header, Modals, Lightbox |
| **CSS3** | CSS Variables, Masonry Columns, Flexbox, Animations, Responsive Design |
| **Vanilla JavaScript** | DOM Manipulation, LocalStorage, FileReader, Clipboard, Fullscreen API |
| **Google Fonts - Inter** | Clean, modern typography |
| **Picsum Photos** | Sample images |
