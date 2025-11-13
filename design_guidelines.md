# Design Guidelines: Digital Skills Academy

## Design Approach

**Reference-Based Approach** drawing from leading educational platforms (Coursera, Udemy) combined with professional web design patterns (Stripe's trust-building elements, Linear's typography clarity). This creates a credible, aspirational college/university aesthetic that inspires confidence in Zimbabwe's digital skills education.

**Core Principles:**
- Institutional credibility through professional polish
- Clear educational value proposition
- Trust-building through social proof
- Accessible, scannable information hierarchy
- Action-oriented design encouraging enrollment

---

## Typography

**Font Families:**
- **Primary:** Inter or DM Sans (headings, UI elements) - modern, professional, excellent readability
- **Secondary:** Source Sans Pro or Open Sans (body text) - warm, approachable for longer content
- **Accent:** Poppins (hero headlines, CTAs) - bold, confident statements

**Hierarchy:**
- Hero Headlines: text-5xl to text-7xl, font-bold
- Section Headers: text-3xl to text-4xl, font-semibold
- Subsections: text-xl to text-2xl, font-medium
- Body Text: text-base to text-lg, font-normal, leading-relaxed for readability
- Card Titles: text-lg, font-semibold
- Captions/Meta: text-sm, font-medium

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20 and 24
- Common patterns: p-6, mb-12, gap-8, py-20, space-y-6
- Section padding: py-16 (mobile), py-24 (desktop)
- Card padding: p-6 to p-8
- Container: max-w-7xl mx-auto px-6

**Grid Strategy:**
- Course cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Testimonials: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Features/Stats: grid-cols-2 md:grid-cols-4
- Blog articles: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Pricing table: Single column stacking on mobile, multi-column on desktop

---

## Component Library

### Navigation
Professional sticky header with backdrop blur (backdrop-blur-lg), logo left, center menu items, right-aligned "Enroll Now" button with elevated importance (larger, distinct treatment)

### Hero Section
Full-width section (not forced viewport height) with:
- Large hero image showing diverse students using technology/studying
- Overlaid content area with semi-transparent backdrop blur for text readability
- Hero headline emphasizing "Zimbabwe's Premier Digital Skills Academy"
- Subheadline about 2026 enrollment with countdown timer component
- Early bird discount badge (pill shape, prominent)
- Dual CTAs: Primary "Enroll Now" + Secondary "Explore Courses"
- WhatsApp quick contact button with blurred background

### Course Cards
Elevated cards with shadow-lg, hover:shadow-xl transition:
- Course thumbnail image (16:9 ratio)
- Category badge (top-left overlay on image)
- Title, duration, instructor name
- Short description (2-3 lines)
- Pricing display: USD primary, ZWL secondary (smaller text)
- Star rating + review count
- "View Details" button full-width

### Enrollment Banner
Prominent announcement bar below hero featuring:
- "2026 Enrollment Open" with animated countdown timer
- Early bird discount percentage in circular badge
- Payment method icons (Ecocash, PayNow, Bank Transfer)
- Installment plan availability mention

### Testimonial Cards
Grid layout with photo-prominent design:
- Student headshot (rounded, 80x80px)
- 5-star rating display
- Quote text (italic, 3-4 lines)
- Student name + course completed
- Achievement metric if available ("Now earning $X freelancing")

### Forms
Clean, spacious forms with:
- Clear labels above inputs
- Generous input height (h-12 to h-14)
- Focus rings with proper contrast
- Inline validation messages
- Multi-step progress indicator for enrollment
- Payment method selector with radio cards (visual selection)

### Stats Section
4-column grid (2x2 on mobile) displaying:
- Large numbers (text-4xl, font-bold)
- Descriptive labels below
- Icons above numbers
- Examples: "500+ Students", "95% Success Rate", "20+ Courses", "10+ Expert Instructors"

### Footer
Comprehensive multi-column layout:
- Column 1: Academy info + social media icons
- Column 2: Quick links (Courses, About, Blog, Contact)
- Column 3: Popular courses list
- Column 4: Newsletter signup + payment methods accepted
- Bottom bar: Copyright, Terms, Privacy links

### WhatsApp Integration
Floating action button (FAB) fixed bottom-right:
- Green circular button with WhatsApp icon
- Slight pulse animation to draw attention
- Opens WhatsApp with pre-filled message

---

## Images

**Critical Image Placements:**

1. **Hero Section (Required):** Large, inspiring image of diverse Zimbabwean students engaged with technology - laptops, collaboration, modern learning environment. Professional photography style, well-lit, aspirational but authentic. Image should span full width with gradient overlay for text readability.

2. **Course Thumbnails:** Each course needs distinct representative image - computer screens showing relevant work (code, marketing dashboards, design tools), hands on keyboards, digital work environments. Use consistent 16:9 aspect ratio.

3. **Instructor Photos:** Professional headshots for 2+ instructors, square format (300x300px minimum), consistent styling.

4. **Testimonial Photos:** Student headshots (circular crop, authentic, diverse representation), 80x80px or 100x100px.

5. **About Page:** Team photo showing instructors/staff in professional but approachable setting. Additional image showing classroom/workspace environment.

6. **Blog Article Headers:** Featured images for each article (16:9 format), relevant to article topic.

7. **Success Story Images:** Before/after style imagery or student achievement photos for case studies.

**Image Treatment:** All images should be optimized for web, lazy-loaded, with alt text for accessibility. Use subtle rounded corners (rounded-lg) consistently across cards.

---

## Page-Specific Layouts

**Home Page Sections (in order):**
1. Hero with enrollment banner
2. Featured courses carousel (4-6 courses, auto-rotate)
3. Why Digital Skills Matter (2-column: text + image)
4. Course categories overview (4-6 cards in grid)
5. Success metrics stats section
6. Testimonials (3-column grid, 6 total)
7. Upcoming cohort CTA section
8. Recent blog articles preview (3-card grid)

**Courses Page:**
- Filter sidebar (categories, price range, duration)
- Grid of all course cards
- "Load More" pagination

**Individual Course Page:**
- Course hero (image + title + price + enroll button)
- Tabbed content: Overview, Syllabus, Instructor, Reviews
- Sticky sidebar with enrollment form
- Related courses section at bottom

**Student Portal:**
- Dashboard with progress cards for enrolled courses
- Sidebar navigation (My Courses, Certificates, Profile, Settings)
- Progress bars and completion percentages
- Certificate download cards

---

**Animation Note:** Minimal, purposeful animations only - smooth transitions on hover states, fade-in on scroll for testimonials, subtle pulse on CTA buttons. Avoid distracting motion.