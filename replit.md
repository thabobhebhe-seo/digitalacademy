# Digital Skills Academy - Replit Project

## Overview

Digital Skills Academy is a full-stack educational platform designed for Zimbabwe's digital skills training market. The application provides course catalog browsing, student enrollment, progress tracking, and content management. It features a professional college/university aesthetic with a responsive design optimized for both desktop and mobile users.

The platform targets students seeking digital skills training (Digital Marketing, SEO, Coding, AI, etc.) with affordable pricing and flexible payment options suitable for the Zimbabwean market (Ecocash, PayNow, bank transfers, and installments).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React with TypeScript for type-safe component development
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and caching
- React Hook Form with Zod for form validation
- Tailwind CSS for utility-first styling

**Component Strategy:**
- shadcn/ui component library for consistent, accessible UI primitives (buttons, cards, dialogs, forms)
- Custom domain components (CourseCard, TestimonialCard, BlogCard, CountdownTimer) built on top of shadcn/ui
- Shared layout components (Navbar, Footer, WhatsAppButton) for consistent navigation

**Design System:**
- Professional institutional color scheme: Primary blue (#0056D2), accent gold (#F5C300)
- Typography hierarchy using Inter, Poppins, and Open Sans font families
- Mobile-first responsive design with breakpoint-based grid layouts
- Dark mode support through CSS custom properties and class-based theme switching
- Elevation system using custom CSS classes (hover-elevate, active-elevate-2) for interactive feedback

**Routing Pattern:**
The application uses client-side routing with dedicated pages for:
- Home (hero, featured courses, testimonials, countdown timer)
- Course catalog with category filtering
- Individual course detail pages
- Student portal with authentication
- Enrollment flow with multi-step form
- Static pages (About, Blog, Contact, Pricing, Testimonials)

### Backend Architecture

**Technology Stack:**
- Node.js with Express for REST API server
- TypeScript for type safety across frontend and backend
- Drizzle ORM configured for PostgreSQL database (schema-first approach)
- bcryptjs for password hashing
- jsonwebtoken (JWT) for authentication tokens

**API Design:**
RESTful API endpoints following standard HTTP methods:
- Authentication: POST /api/register, POST /api/login
- Courses: GET /api/courses, GET /api/courses/:id, POST /api/courses, PATCH /api/courses/:id, DELETE /api/courses/:id
- Enrollments: GET /api/enrollments, POST /api/enrollments
- Reviews, Articles, Testimonials, Instructors, Contact submissions follow similar CRUD patterns

**Authentication & Authorization:**
- JWT-based authentication with tokens stored client-side
- Password hashing using bcrypt with 10 salt rounds
- Role-based access control (student, instructor, admin roles)
- Session secret for JWT signing (environment-based or default fallback)

**Data Management Strategy:**
- In-memory storage implementation (server/storage.ts) for development
- Drizzle schema (shared/schema.ts) defines PostgreSQL database structure
- Shared types between frontend/backend using Drizzle inference and Zod schemas
- Database migrations managed through drizzle-kit

**Development Environment:**
- Vite development server with HMR (Hot Module Replacement)
- Custom middleware mode integration between Express and Vite
- SSR-ready template handling for production builds

### Database Schema

**Core Tables:**
- **users**: User accounts with email, hashed passwords, phone, role
- **courses**: Course catalog with pricing (USD/ZWL), category, duration, level, syllabus
- **instructors**: Instructor profiles with bio and expertise
- **enrollments**: Student-course relationships with progress tracking and payment status
- **reviews**: Course reviews with ratings and text
- **articles**: Blog content with categories and slugs
- **testimonials**: Student success stories with ratings
- **contact_submissions**: Contact form submissions

**Schema Strategy:**
- UUID primary keys (gen_random_uuid())
- Timestamp tracking (createdAt, updatedAt where applicable)
- Decimal precision for currency values (10,2 for USD; 12,2 for ZWL)
- Text fields for flexible content storage
- Boolean flags for featured content and status tracking

### External Dependencies

**UI Component Library:**
- Radix UI primitives (@radix-ui/react-*) for accessible, unstyled components
- shadcn/ui configuration for customized component variants
- Tailwind CSS for styling with custom theme extensions

**Database & ORM:**
- PostgreSQL as the target database system
- Neon Database serverless driver (@neondatabase/serverless)
- Drizzle ORM for type-safe database queries and migrations
- drizzle-kit for schema management and migration generation

**Form & Validation:**
- react-hook-form for performant form state management
- @hookform/resolvers for integration with validation libraries
- Zod for runtime type validation and schema generation
- drizzle-zod for automatic Zod schema generation from database schema

**Development Tools:**
- tsx for TypeScript execution in development
- esbuild for production server bundling
- Vite plugins for Replit integration (@replit/vite-plugin-*)
- ESM module system throughout the codebase

**Third-Party Integrations:**
- WhatsApp integration for customer support (floating button with pre-filled message)
- Payment method support designed for: Ecocash, PayNow, Bank Transfer, Installments (webhook-ready architecture)
- Google Fonts for typography (Inter, Poppins, Open Sans)

**State Management:**
- TanStack Query for server state with automatic caching, refetching, and background updates
- React Hook Form for form state
- React Context (minimal usage) for theme and authentication state

**Build & Deployment:**
- Production build: Vite builds frontend to dist/public, esbuild bundles server to dist/
- Environment variables: DATABASE_URL required for database connection
- Session secret configurable via SESSION_SECRET environment variable