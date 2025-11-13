# Digital Skills Academy

Zimbabwe's premier digital skills training academy. Empowering the next generation of tech professionals through comprehensive, affordable, and accessible online courses.

## Features

### Frontend
- **Home Page** with hero section, featured courses carousel, countdown timer, and testimonials
- **Course Catalog** with category filtering and detailed course pages
- **Student Portal** for enrolled students to track progress and access certificates
- **About Page** showcasing mission, vision, and team
- **Blog** with articles on digital skills, career advice, and success stories
- **Contact Page** with form, FAQ, and WhatsApp integration
- **Pricing Page** with transparent pricing and payment options
- **Testimonials Page** featuring student success stories
- **Enrollment System** with multi-step form and payment method selection

### Backend
- User authentication with JWT tokens and bcrypt password hashing
- Complete REST API for courses, enrollments, testimonials, blog articles
- In-memory storage with sample data
- Role-based access control (student/instructor/admin)
- Student progress tracking

### Design
- Professional college/university aesthetic
- Deep blue (#0056D2) and gold (#F5C300) color scheme
- Fully responsive mobile-first design
- Dark mode support
- Smooth animations and transitions
- WhatsApp floating action button

## Getting Started

### Prerequisites
- Node.js 20+ installed
- npm package manager

### Installation

The application is already set up and ready to run!

```bash
# The dependencies are already installed
# Just start the application
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5000

### Demo Credentials

**Student Login:**
- Email: demo@example.com
- Password: password123

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and configs
│   │   └── hooks/         # Custom React hooks
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # In-memory storage
├── shared/                # Shared types and schemas
│   └── schema.ts         # Database schemas and types
```

## Features in Detail

### Courses
- 10 pre-loaded courses covering:
  - Digital Marketing
  - SEO
  - Web Development
  - AI for Business
  - E-commerce
  - Freelancing
  - And more!

### Payment Methods
- Ecocash
- PayNow
- Bank Transfer
- Installment Plans

### Sample Data
- 2 Expert Instructors
- 10 Comprehensive Courses
- 10 Student Testimonials
- 5 Blog Articles
- Demo user account

## Technology Stack

### Frontend
- React 18
- Wouter (routing)
- TanStack Query (data fetching)
- Tailwind CSS (styling)
- Shadcn UI (components)
- React Hook Form (forms)
- Zod (validation)

### Backend
- Node.js
- Express
- TypeScript
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)
- In-memory storage

## API Endpoints

### Authentication
- POST `/api/register` - Register new user
- POST `/api/login` - User login

### Courses
- GET `/api/courses` - Get all courses
- GET `/api/courses/:id` - Get course by ID
- POST `/api/courses` - Create course (admin)
- PATCH `/api/courses/:id` - Update course (admin)
- DELETE `/api/courses/:id` - Delete course (admin)

### Enrollments
- GET `/api/enrollments` - Get all enrollments
- GET `/api/enrollments?userId=:id` - Get user enrollments
- POST `/api/enrollments` - Create enrollment
- PATCH `/api/enrollments/:id` - Update enrollment progress

### Content
- GET `/api/articles` - Get all blog articles
- GET `/api/testimonials` - Get all testimonials
- GET `/api/instructors` - Get all instructors
- POST `/api/contact` - Submit contact form

## Contributing

This is a production-ready MVP. Future enhancements could include:
- PostgreSQL database for persistence
- Real payment gateway integration (Stripe, Ecocash API)
- Video course content hosting
- Interactive quizzes and assessments
- Live instructor sessions
- Advanced analytics dashboard
- Email notification system
- Certificate generation

## License

Copyright © 2026 Digital Skills Academy. All rights reserved.

## Support

For questions or support:
- Email: info@digitalskillsacademy.co.zw
- Phone: +263 77 123 4567
- WhatsApp: Click the floating button on the website
