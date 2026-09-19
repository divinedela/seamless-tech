# Seamless Technologies Hub — Project Context

## Business
- **Name:** Seamless Technologies Hub
- **Type:** E-Commerce + LMS (Learning Management System) + IT Services
- **Location:** Ghana (Accra)
- **Slogan:** "Empowering Lives Through Technology & Digital Skills"
- **Currency:** GH₵ (Ghanaian Cedi)

## Tech Stack
- Pure HTML + CSS + JavaScript — zero frameworks, zero build tools
- Runs from any host: Netlify, Vercel, shared cPanel
- Images: Unsplash CDN (no auth needed, free high-quality)
- Fonts: Google Fonts (Plus Jakarta Sans + Inter)
- Cart state: `localStorage` key `sth_cart`

## Design System (CSS custom properties in every file)
```
--navy:       #0B1F3A   /* primary dark — headers, nav, dark sections */
--navy-mid:   #1A3A6B   /* gradients, hover bg */
--blue:       #1565C0   /* links, highlights, focus rings */
--blue-lt:    #E8F0FE   /* nav hover bg, focus glow */
--orange:     #F97316   /* PRIMARY CTA — buttons, badges, accents */
--orange-dk:  #EA6508   /* CTA hover state */
--white:      #FFFFFF
--off-white:  #F5F7FA   /* section alternates */
--gray-100:   #F3F4F6
--gray-200:   #E5E7EB
--gray-400:   #9CA3AF
--gray-600:   #6B7280
--gray-900:   #111827
--green:      #16A34A
--red:        #DC2626
--amber:      #F59E0B

--font-head: 'Plus Jakarta Sans', sans-serif
--font-body: 'Inter', sans-serif

--shadow-sm: 0 1px 3px rgba(0,0,0,0.08)
--shadow-md: 0 4px 12px rgba(0,0,0,0.10)
--shadow-lg: 0 8px 24px rgba(0,0,0,0.12)
--shadow-xl: 0 16px 48px rgba(0,0,0,0.18)

--r-sm:   6px
--r-md:   10px
--r-lg:   16px
--r-xl:   24px
--r-full: 9999px
```

## Typography Scale
- Display/Hero: `clamp(38px, 5.5vw, 62px)`, weight 800, Plus Jakarta Sans
- Section titles: `clamp(28px, 4vw, 42px)`, weight 800
- Body: 16px, Inter, line-height 1.6–1.7
- Small/meta: 12–13px, gray-600

## Key Design Decisions (approved by client)
- **Orange accent** chosen over green — converts better for tech e-commerce (Amazon/Jumia pattern)
- **Shopify-like aesthetic** — generous white space, premium cards, hover elevations
- **Dark navy hero + courses section** — creates visual contrast rhythm across page
- Service cards **flip to navy on hover** — a distinguishing interaction
- No contact form on homepage — contact form lives on its own page only

## Payment Methods (Ghana-specific — must appear on checkout + CTA sections)
1. MTN Mobile Money (MoMo)
2. Telecel Cash
3. AirtelTigo Money
4. Debit / Credit Card
5. Bank Transfer

## Logo
- Text wordmark only for now (no logo file provided by client)
- Mark: dark navy square with orange lightning bolt SVG
- Future: swap in real logo file when client provides

## Contact Info
- All placeholders currently (`+233 XX XXX XXXX`, `info@seamlesstech.com.gh`, `Accra, Ghana`)
- Update when client provides real details

## Pages — Build Status

| Page | File | Status |
|---|---|---|
| Homepage | `index.html` | ✅ Done — approved |
| Shop / Product Listing | `shop.html` | ✅ Done |
| Product Detail | `product.html` | ✅ Done |
| Courses Page | `courses.html` | ✅ Done |
| Course Detail | `course-detail.html` | ✅ Done |
| Services Page | `services.html` | ✅ Done |
| Cart + Checkout | `checkout.html` | ✅ Done |
| About Us | `about.html` | ✅ Done |
| Contact | `contact.html` | ✅ Done |
| Login / Register | `login.html` | ⬜ |
| Student Dashboard | `dashboard.html` | ⬜ |
| Blog | `blog.html` | ⬜ (optional, last) |

## Homepage Sections (for reference when building inner pages)
1. Announcement bar — navy bg, delivery + payment mention
2. Sticky header — logo / nav / search / wishlist / cart drawer / login
3. Hero — dark navy, split layout, 3 CTAs, floating stat cards
4. Social proof strip — 5 stats (products / students / repairs / clients / rating)
5. Services — 6 cards, hover flips navy, orange icon
6. Featured Products — 8-card grid, badges, Add to Cart → cart drawer
7. Shop by Category — horizontal scroll chips
8. Courses — 3 cards on dark navy background
9. Why Choose Us — 8 icon cards
10. Testimonials — 3 cards
11. CTA Banner — dark gradient, payment method chips
12. Footer — 4-column (about+socials / quick links / services / contact)

## Product Data Shape (JS)
```js
{ id, brand, name, meta, price, old, img, badge, stock }
// badge: 'hot' | 'sale' | 'new' | null
// stock: true | false
```

## Course Data Shape (JS)
```js
{ id, cat, title, duration, lessons, price, old, img }
```

## Sample Products (use these as canonical data across pages)
- HP EliteBook 840 G8 — GH₵ 4,599
- Dell Latitude 5420 — GH₵ 3,299
- Lenovo ThinkPad X1 Carbon — GH₵ 5,899
- Logitech MX Master 3 — GH₵ 399
- Samsung Galaxy A54 5G — GH₵ 2,199
- Seagate External HDD 1TB — GH₵ 549
- HP Universal Charger 65W — GH₵ 199
- ASUS ROG Strix (out of stock) — GH₵ 8,999

## Sample Courses
- Graphic Design Masterclass — GH₵ 299 (was 499) · 8 weeks · 42 lessons
- Website Development Bootcamp — GH₵ 399 (was 699) · 12 weeks · 68 lessons
- Cybersecurity Fundamentals — GH₵ 249 (was 449) · 6 weeks · 35 lessons
- Digital Marketing — add when building courses page
- Data Analysis with Excel — add when building courses page
- Computer Networking Basics — add when building courses page
- AI Fundamentals — add when building courses page

## Shop Filters (for shop.html sidebar)
- Price Range (slider)
- Brand (HP / Dell / Lenovo / ASUS / Samsung / Logitech / Seagate)
- Category
- Condition (New / Used)
- RAM Size
- Storage Capacity

## Navigation Menu
Home · About · Shop · Courses · IT Training · Services · Repairs · Consultation · Installations · Blog · Contact · Login/Register

## Responsive Breakpoints
- `< 1100px` — 3-col products, 2-col why/footer
- `< 900px`  — 1-col hero (hide visual), 2-col services/products/courses, hide desktop nav
- `< 640px`  — 1-col services/courses, 2-col products/why, 1-col footer
- `< 380px`  — 1-col everything
