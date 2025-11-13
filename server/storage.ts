import {
  type User,
  type InsertUser,
  type Course,
  type InsertCourse,
  type Instructor,
  type InsertInstructor,
  type Enrollment,
  type InsertEnrollment,
  type Review,
  type InsertReview,
  type Article,
  type InsertArticle,
  type Testimonial,
  type InsertTestimonial,
  type ContactSubmission,
  type InsertContactSubmission,
} from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getAllCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, course: Partial<InsertCourse>): Promise<Course | undefined>;
  deleteCourse(id: string): Promise<boolean>;

  getAllInstructors(): Promise<Instructor[]>;
  getInstructor(id: string): Promise<Instructor | undefined>;
  createInstructor(instructor: InsertInstructor): Promise<Instructor>;

  getAllEnrollments(): Promise<Enrollment[]>;
  getEnrollmentsByUserId(userId: string): Promise<Enrollment[]>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  updateEnrollment(id: string, data: Partial<Enrollment>): Promise<Enrollment | undefined>;

  getAllReviews(): Promise<Review[]>;
  getReviewsByCourseId(courseId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  getAllArticles(): Promise<Article[]>;
  getArticle(id: string): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;

  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private courses: Map<string, Course>;
  private instructors: Map<string, Instructor>;
  private enrollments: Map<string, Enrollment>;
  private reviews: Map<string, Review>;
  private articles: Map<string, Article>;
  private testimonials: Map<string, Testimonial>;
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.instructors = new Map();
    this.enrollments = new Map();
    this.reviews = new Map();
    this.articles = new Map();
    this.testimonials = new Map();
    this.contactSubmissions = new Map();
    
    this.seedData();
  }

  private async seedData() {
    const instructors = await Promise.all([
      this.createInstructor({
        name: "Dr. Sarah Moyo",
        title: "Digital Marketing Expert",
        bio: "With over 15 years of experience in digital marketing and advertising, Dr. Moyo has helped over 200 Zimbabwean businesses grow their online presence. She holds a PhD in Digital Communications and has worked with major international brands.",
        expertise: "Digital Marketing, SEO, Social Media Strategy",
        photo: "",
      }),
      this.createInstructor({
        name: "Michael Chikwanha",
        title: "Senior Software Engineer",
        bio: "Michael is a full-stack developer with 10+ years of experience at top tech companies including Google and Microsoft. He's passionate about making coding accessible to African developers and has mentored over 500 students.",
        expertise: "Web Development, JavaScript, Python, AI",
        photo: "",
      }),
    ]);

    const courses = await Promise.all([
      this.createCourse({
        title: "Digital Marketing Basics",
        description: "Master the fundamentals of digital marketing including social media, email marketing, and content strategy. Perfect for beginners looking to grow their business online.",
        category: "Digital Marketing",
        priceUSD: "49.00",
        priceZWL: "16000.00",
        duration: "6 weeks",
        level: "Beginner",
        thumbnail: "",
        syllabus: "Week 1: Introduction to Digital Marketing\nWeek 2: Social Media Marketing Fundamentals\nWeek 3: Content Marketing Strategy\nWeek 4: Email Marketing Essentials\nWeek 5: Analytics and Measurement\nWeek 6: Campaign Planning and Execution",
        learningOutcomes: "Create effective social media campaigns\nBuild an email marketing strategy\nUnderstand digital marketing analytics\nDevelop a content marketing plan\nMeasure and optimize campaign performance",
        instructorId: instructors[0].id,
        featured: true,
      }),
      this.createCourse({
        title: "Facebook & Google Ads Mastery",
        description: "Learn to create high-converting Facebook and Google ad campaigns that drive real results. Master targeting, bidding strategies, and optimization techniques.",
        category: "Digital Marketing",
        priceUSD: "79.00",
        priceZWL: "25800.00",
        duration: "8 weeks",
        level: "Intermediate",
        thumbnail: "",
        syllabus: "Week 1: Facebook Ads Manager Setup\nWeek 2: Audience Targeting and Segmentation\nWeek 3: Ad Creative Best Practices\nWeek 4: Campaign Optimization\nWeek 5: Google Ads Fundamentals\nWeek 6: Search vs Display Advertising\nWeek 7: Conversion Tracking\nWeek 8: Advanced Strategies and Scaling",
        learningOutcomes: "Set up and manage Facebook ad campaigns\nCreate compelling ad copy and visuals\nMaster audience targeting\nOptimize campaigns for conversions\nTrack and measure ROI\nScale profitable campaigns",
        instructorId: instructors[0].id,
        featured: true,
      }),
      this.createCourse({
        title: "SEO Mastery",
        description: "Dominate search engine rankings with comprehensive SEO training. Learn on-page, off-page, and technical SEO strategies that work in 2026.",
        category: "SEO",
        priceUSD: "99.00",
        priceZWL: "32400.00",
        duration: "10 weeks",
        level: "Intermediate",
        thumbnail: "",
        syllabus: "Week 1: SEO Fundamentals\nWeek 2: Keyword Research Mastery\nWeek 3: On-Page Optimization\nWeek 4: Technical SEO\nWeek 5: Link Building Strategies\nWeek 6: Content SEO\nWeek 7: Local SEO\nWeek 8: SEO Tools and Analytics\nWeek 9: Algorithm Updates\nWeek 10: Advanced SEO Strategies",
        learningOutcomes: "Conduct effective keyword research\nOptimize website content for search engines\nBuild high-quality backlinks\nImprove website technical performance\nRank higher in search results\nTrack and measure SEO success",
        instructorId: instructors[0].id,
        featured: false,
      }),
      this.createCourse({
        title: "Content Monetization",
        description: "Turn your content into income streams. Learn affiliate marketing, sponsored content, digital products, and more ways to monetize your online presence.",
        category: "Digital Marketing",
        priceUSD: "59.00",
        priceZWL: "19300.00",
        duration: "6 weeks",
        level: "Beginner",
        thumbnail: "",
        syllabus: "Week 1: Monetization Fundamentals\nWeek 2: Affiliate Marketing\nWeek 3: Sponsored Content\nWeek 4: Digital Product Creation\nWeek 5: Membership and Subscriptions\nWeek 6: Scaling Your Income",
        learningOutcomes: "Set up affiliate marketing programs\nNegotiate sponsored content deals\nCreate and sell digital products\nBuild membership sites\nDiversify income streams",
        instructorId: instructors[0].id,
        featured: false,
      }),
      this.createCourse({
        title: "No-Code Development",
        description: "Build professional websites and apps without writing code. Master tools like Webflow, Bubble, and Airtable to bring your ideas to life.",
        category: "Coding",
        priceUSD: "89.00",
        priceZWL: "29100.00",
        duration: "8 weeks",
        level: "Beginner",
        thumbnail: "",
        syllabus: "Week 1: No-Code Revolution\nWeek 2: Website Building with Webflow\nWeek 3: App Development with Bubble\nWeek 4: Database Design with Airtable\nWeek 5: Automation with Zapier\nWeek 6: E-commerce Setup\nWeek 7: User Authentication\nWeek 8: Launching Your Project",
        learningOutcomes: "Build responsive websites without code\nCreate functional web applications\nSet up automated workflows\nDesign databases\nLaunch complete projects",
        instructorId: instructors[1].id,
        featured: true,
      }),
      this.createCourse({
        title: "AI for Business",
        description: "Leverage artificial intelligence to transform your business. Learn ChatGPT, automation, and AI tools that boost productivity and profits.",
        category: "AI",
        priceUSD: "79.00",
        priceZWL: "25800.00",
        duration: "7 weeks",
        level: "Beginner",
        thumbnail: "",
        syllabus: "Week 1: AI Fundamentals for Business\nWeek 2: ChatGPT Mastery\nWeek 3: AI Content Creation\nWeek 4: AI Marketing Tools\nWeek 5: Automation with AI\nWeek 6: AI Analytics\nWeek 7: Implementing AI Strategy",
        learningOutcomes: "Use ChatGPT effectively for business\nAutomate repetitive tasks with AI\nCreate content faster with AI tools\nMake data-driven decisions\nDevelop an AI implementation strategy",
        instructorId: instructors[1].id,
        featured: true,
      }),
      this.createCourse({
        title: "Web Development Essentials",
        description: "Start your coding journey with HTML, CSS, and JavaScript. Build real websites and learn the foundations of professional web development.",
        category: "Coding",
        priceUSD: "129.00",
        priceZWL: "42200.00",
        duration: "12 weeks",
        level: "Beginner",
        thumbnail: "",
        syllabus: "Week 1-2: HTML Fundamentals\nWeek 3-4: CSS Styling and Layout\nWeek 5-6: Responsive Design\nWeek 7-9: JavaScript Basics\nWeek 10: DOM Manipulation\nWeek 11: APIs and Fetch\nWeek 12: Final Project",
        learningOutcomes: "Write clean HTML and CSS\nCreate responsive layouts\nUnderstand JavaScript fundamentals\nManipulate the DOM\nFetch data from APIs\nBuild complete websites",
        instructorId: instructors[1].id,
        featured: true,
      }),
      this.createCourse({
        title: "Freelancing & Remote Work",
        description: "Build a successful freelance career. Learn how to find clients, set rates, manage projects, and work remotely for international companies.",
        category: "Freelancing",
        priceUSD: "39.00",
        priceZWL: "12700.00",
        duration: "4 weeks",
        level: "Beginner",
        thumbnail: "",
        syllabus: "Week 1: Freelancing Fundamentals\nWeek 2: Finding and Landing Clients\nWeek 3: Pricing and Proposals\nWeek 4: Managing Projects and Scaling",
        learningOutcomes: "Create a winning portfolio\nFind high-paying clients\nWrite persuasive proposals\nSet profitable rates\nManage client relationships\nScale your freelance business",
        instructorId: instructors[0].id,
        featured: false,
      }),
      this.createCourse({
        title: "E-commerce Mastery",
        description: "Launch and grow a profitable online store. Learn product selection, store setup, marketing, and fulfillment strategies.",
        category: "E-commerce",
        priceUSD: "89.00",
        priceZWL: "29100.00",
        duration: "8 weeks",
        level: "Intermediate",
        thumbnail: "",
        syllabus: "Week 1: E-commerce Fundamentals\nWeek 2: Product Research and Selection\nWeek 3: Store Setup (Shopify)\nWeek 4: Product Photography and Listings\nWeek 5: Marketing Your Store\nWeek 6: Customer Service\nWeek 7: Fulfillment and Logistics\nWeek 8: Scaling Your Business",
        learningOutcomes: "Find profitable products to sell\nSet up a professional online store\nCreate compelling product listings\nDrive traffic to your store\nManage orders and fulfillment\nScale to 6-figure revenue",
        instructorId: instructors[0].id,
        featured: false,
      }),
      this.createCourse({
        title: "WhatsApp Business Automation",
        description: "Automate your WhatsApp business communication. Learn chatbots, broadcast messaging, and customer management strategies.",
        category: "Digital Marketing",
        priceUSD: "69.00",
        priceZWL: "22600.00",
        duration: "5 weeks",
        level: "Intermediate",
        thumbnail: "",
        syllabus: "Week 1: WhatsApp Business Basics\nWeek 2: Setting Up Automation\nWeek 3: Chatbot Development\nWeek 4: Broadcast Strategies\nWeek 5: Integration and Analytics",
        learningOutcomes: "Set up WhatsApp Business API\nCreate automated responses\nBuild chatbots\nManage customer conversations at scale\nIntegrate with CRM systems",
        instructorId: instructors[1].id,
        featured: true,
      }),
    ]);

    await Promise.all([
      this.createTestimonial({
        name: "Tendai Mukono",
        photo: "",
        text: "The Digital Marketing course transformed my career! I went from struggling to find clients to running a successful agency with 15 clients. The practical strategies actually work in Zimbabwe.",
        rating: 5,
        courseCompleted: "Digital Marketing Basics",
        achievement: "Now running a 6-figure marketing agency",
      }),
      this.createTestimonial({
        name: "Grace Sibanda",
        photo: "",
        text: "Best investment I ever made! The SEO course helped me rank my business on Google's first page. We've seen a 300% increase in organic traffic and sales have tripled.",
        rating: 5,
        courseCompleted: "SEO Mastery",
        achievement: "Tripled business revenue in 6 months",
      }),
      this.createTestimonial({
        name: "James Nyathi",
        photo: "",
        text: "I was skeptical about learning to code, but the Web Development course made it so easy. Now I'm building websites for clients and earning in USD!",
        rating: 5,
        courseCompleted: "Web Development Essentials",
        achievement: "Earning $2000/month as a freelance developer",
      }),
      this.createTestimonial({
        name: "Rutendo Mpofu",
        photo: "",
        text: "The AI for Business course opened my eyes to so many opportunities. I've automated 70% of my content creation and cut costs by half while doubling output.",
        rating: 5,
        courseCompleted: "AI for Business",
        achievement: "Automated content creation, saved 20+ hours/week",
      }),
      this.createTestimonial({
        name: "Tafadzwa Moyo",
        photo: "",
        text: "Thanks to the Facebook Ads course, my e-commerce store is now profitable. I'm getting a 4x return on ad spend and growing every month.",
        rating: 5,
        courseCompleted: "Facebook & Google Ads Mastery",
        achievement: "4x ROAS on Facebook ads",
      }),
      this.createTestimonial({
        name: "Chipo Banda",
        photo: "",
        text: "The Freelancing course gave me the confidence to quit my job and go full-time. I'm now working remotely for US clients and earning 3x my old salary.",
        rating: 5,
        courseCompleted: "Freelancing & Remote Work",
        achievement: "Working remotely for international clients, 3x income",
      }),
      this.createTestimonial({
        name: "Simba Dube",
        photo: "",
        text: "E-commerce Mastery helped me launch my online store. Within 3 months, I hit $10,000 in sales. The step-by-step guidance was invaluable.",
        rating: 5,
        courseCompleted: "E-commerce Mastery",
        achievement: "$10,000 in first quarter sales",
      }),
      this.createTestimonial({
        name: "Pamela Ncube",
        photo: "",
        text: "Content Monetization changed everything! I went from blogging for free to earning $1,500/month through affiliates and sponsored posts.",
        rating: 5,
        courseCompleted: "Content Monetization",
        achievement: "$1,500/month passive income",
      }),
      this.createTestimonial({
        name: "Tinashe Khumalo",
        photo: "",
        text: "The instructors are incredibly supportive. No-Code Development gave me the tools to build my startup idea without hiring developers. We just got our first 100 users!",
        rating: 5,
        courseCompleted: "No-Code Development",
        achievement: "Launched startup, 100+ active users",
      }),
      this.createTestimonial({
        name: "Fungai Chirwa",
        photo: "",
        text: "WhatsApp Automation has been a game-changer for my business. I can now handle 200+ customer conversations daily without hiring extra staff.",
        rating: 5,
        courseCompleted: "WhatsApp Business Automation",
        achievement: "Automated customer service, 200+ daily conversations",
      }),
    ]);

    await Promise.all([
      this.createArticle({
        title: "Top 10 Digital Marketing Trends in Zimbabwe for 2026",
        slug: "top-10-digital-marketing-trends-zimbabwe-2026",
        content: "As Zimbabwe's digital landscape continues to evolve, businesses must stay ahead of emerging trends to remain competitive. Here are the top 10 digital marketing trends shaping 2026...",
        excerpt: "Discover the latest digital marketing trends dominating Zimbabwe's business landscape in 2026.",
        category: "Digital Marketing",
        thumbnail: "",
        author: "Dr. Sarah Moyo",
      }),
      this.createArticle({
        title: "How I Built a Six-Figure Freelance Career from Harare",
        slug: "six-figure-freelance-career-harare",
        content: "Three years ago, I was working a traditional 9-5 job earning $400 per month. Today, I run a thriving freelance business earning over $8,000 monthly, all from my home in Harare...",
        excerpt: "A success story of building a profitable freelance career while living in Zimbabwe.",
        category: "Success Stories",
        thumbnail: "",
        author: "James Nyathi",
      }),
      this.createArticle({
        title: "SEO Strategies That Actually Work for Zimbabwean Businesses",
        slug: "seo-strategies-zimbabwean-businesses",
        content: "Many Zimbabwean businesses struggle with SEO because they follow generic advice meant for Western markets. Here are SEO strategies specifically tailored for our local context...",
        excerpt: "Proven SEO tactics designed specifically for the Zimbabwean market.",
        category: "SEO",
        thumbnail: "",
        author: "Dr. Sarah Moyo",
      }),
      this.createArticle({
        title: "5 AI Tools Every Zimbabwean Entrepreneur Should Use in 2026",
        slug: "ai-tools-zimbabwean-entrepreneurs-2026",
        content: "Artificial intelligence is no longer just for big tech companies. Here are 5 AI tools that Zimbabwean entrepreneurs can use today to boost productivity and grow their businesses...",
        excerpt: "Essential AI tools to supercharge your business productivity and growth.",
        category: "AI & Technology",
        thumbnail: "",
        author: "Michael Chikwanha",
      }),
      this.createArticle({
        title: "From Zero to Earning in USD: A Remote Work Guide for Zimbabweans",
        slug: "remote-work-guide-zimbabweans",
        content: "The remote work revolution has opened unprecedented opportunities for Zimbabweans to earn in foreign currency. This comprehensive guide will show you exactly how to get started...",
        excerpt: "Your complete roadmap to landing remote jobs and earning in USD from Zimbabwe.",
        category: "Career Advice",
        thumbnail: "",
        author: "Chipo Banda",
      }),
    ]);

    const demoUser = await this.createUser({
      name: "Demo Student",
      email: "demo@example.com",
      phone: "+263771234567",
      password: await bcrypt.hash("password123", 10),
      role: "student",
    });

    await this.createEnrollment({
      userId: demoUser.id,
      courseId: courses[0].id,
      paymentMethod: "Ecocash",
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = {
      ...insertCourse,
      id,
      createdAt: new Date(),
    };
    this.courses.set(id, course);
    return course;
  }

  async updateCourse(id: string, data: Partial<InsertCourse>): Promise<Course | undefined> {
    const course = this.courses.get(id);
    if (!course) return undefined;
    
    const updated = { ...course, ...data };
    this.courses.set(id, updated);
    return updated;
  }

  async deleteCourse(id: string): Promise<boolean> {
    return this.courses.delete(id);
  }

  async getAllInstructors(): Promise<Instructor[]> {
    return Array.from(this.instructors.values());
  }

  async getInstructor(id: string): Promise<Instructor | undefined> {
    return this.instructors.get(id);
  }

  async createInstructor(insertInstructor: InsertInstructor): Promise<Instructor> {
    const id = randomUUID();
    const instructor: Instructor = { ...insertInstructor, id };
    this.instructors.set(id, instructor);
    return instructor;
  }

  async getAllEnrollments(): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values());
  }

  async getEnrollmentsByUserId(userId: string): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values()).filter((e) => e.userId === userId);
  }

  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const id = randomUUID();
    const enrollment: Enrollment = {
      ...insertEnrollment,
      id,
      progress: 0,
      completed: false,
      certificateIssued: false,
      enrolledAt: new Date(),
    };
    this.enrollments.set(id, enrollment);
    return enrollment;
  }

  async updateEnrollment(id: string, data: Partial<Enrollment>): Promise<Enrollment | undefined> {
    const enrollment = this.enrollments.get(id);
    if (!enrollment) return undefined;
    
    const updated = { ...enrollment, ...data };
    this.enrollments.set(id, updated);
    return updated;
  }

  async getAllReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async getReviewsByCourseId(courseId: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter((r) => r.courseId === courseId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = {
      ...insertReview,
      id,
      createdAt: new Date(),
    };
    this.reviews.set(id, review);
    return review;
  }

  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).sort(
      (a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0)
    );
  }

  async getArticle(id: string): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find((a) => a.slug === slug);
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = randomUUID();
    const article: Article = {
      ...insertArticle,
      id,
      publishedAt: new Date(),
    };
    this.articles.set(id, article);
    return article;
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = {
      ...insertTestimonial,
      id,
      createdAt: new Date(),
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async createContactSubmission(
    insertSubmission: InsertContactSubmission
  ): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      ...insertSubmission,
      id,
      submittedAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
}

export const storage = new MemStorage();
