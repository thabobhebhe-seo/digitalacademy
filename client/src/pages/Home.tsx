import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/CourseCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { BlogCard } from "@/components/BlogCard";
import { CountdownTimer } from "@/components/CountdownTimer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  GraduationCap,
  Users,
  Trophy,
  BookOpen,
  TrendingUp,
  Globe,
  Zap,
  Award,
} from "lucide-react";
import type { Course, Testimonial, Article } from "@shared/schema";

export default function Home() {
  const { data: courses } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const { data: articles } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const featuredCourses = courses?.filter((c) => c.featured).slice(0, 6) || [];
  const recentTestimonials = testimonials?.slice(0, 6) || [];
  const recentArticles = articles?.slice(0, 3) || [];

  const enrollmentDeadline = new Date("2026-03-31T23:59:59");

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="max-w-7xl mx-auto px-6 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-secondary text-secondary-foreground px-4 py-1.5 text-sm font-semibold">
                2026 Enrollment Now Open
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight font-[Poppins]">
                Transform Your Future with{" "}
                <span className="text-primary">Digital Skills</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Zimbabwe's premier digital skills academy. Master digital marketing, coding, AI, and more with expert instructors and hands-on projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/enroll">
                  <a data-testid="button-hero-enroll">
                    <Button size="lg" className="text-lg px-8 font-semibold">
                      Enroll Now
                    </Button>
                  </a>
                </Link>
                <Link href="/courses">
                  <a data-testid="button-hero-explore">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 font-semibold"
                    >
                      Explore Courses
                    </Button>
                  </a>
                </Link>
              </div>
            </div>

            <div className="bg-card border border-card-border rounded-lg p-8 shadow-xl">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2 font-[Poppins]">
                  Early Bird Discount Ends In:
                </h3>
                <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-lg px-4 py-2">
                  Save 20% - Limited Time!
                </Badge>
              </div>
              <CountdownTimer targetDate={enrollmentDeadline} />
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center mb-3">
                  Flexible Payment Options:
                </p>
                <div className="flex justify-center gap-2 flex-wrap">
                  <Badge variant="outline">Ecocash</Badge>
                  <Badge variant="outline">PayNow</Badge>
                  <Badge variant="outline">Bank Transfer</Badge>
                  <Badge variant="outline">Installments</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "500+", label: "Students" },
              { icon: Trophy, value: "95%", label: "Success Rate" },
              { icon: BookOpen, value: "20+", label: "Courses" },
              { icon: GraduationCap, value: "10+", label: "Expert Instructors" },
            ].map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <stat.icon className="w-10 h-10 mx-auto mb-3 opacity-90" />
                <div className="text-4xl font-bold mb-1 font-[Poppins]">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4">Featured Courses</Badge>
            <h2 className="text-4xl font-bold mb-4 font-[Poppins]">
              Start Your Learning Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our carefully curated selection of industry-relevant courses designed for the Zimbabwean market.
            </p>
          </div>

          {featuredCourses.length > 0 && (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
              data-testid="carousel-featured-courses"
            >
              <CarouselContent>
                {featuredCourses.map((course) => (
                  <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <CourseCard course={course} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious data-testid="carousel-prev" />
              <CarouselNext data-testid="carousel-next" />
            </Carousel>
          )}

          <div className="text-center mt-8">
            <Link href="/courses">
              <a data-testid="button-view-all-courses">
                <Button size="lg" variant="outline" className="font-semibold">
                  View All Courses
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Why Choose Us</Badge>
              <h2 className="text-4xl font-bold mb-6 font-[Poppins]">
                Why Digital Skills Matter in Zimbabwe
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                In today's digital economy, having the right skills opens doors to global opportunities. Whether you're looking to start a career, grow your business, or work remotely, our courses give you the competitive edge.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: TrendingUp,
                    title: "Career Growth",
                    description: "Boost your earning potential with in-demand digital skills",
                  },
                  {
                    icon: Globe,
                    title: "Global Opportunities",
                    description: "Work with international clients from anywhere",
                  },
                  {
                    icon: Zap,
                    title: "Practical Learning",
                    description: "Real-world projects and hands-on experience",
                  },
                ].map((item, index) => (
                  <Card key={index} className="hover-elevate">
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Award className="w-48 h-48 text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4">Success Stories</Badge>
            <h2 className="text-4xl font-bold mb-4 font-[Poppins]">
              What Our Students Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of successful graduates who have transformed their careers through our programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/testimonials">
              <a data-testid="button-view-all-testimonials">
                <Button variant="outline" size="lg" className="font-semibold">
                  View All Success Stories
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4">Latest Updates</Badge>
            <h2 className="text-4xl font-bold mb-4 font-[Poppins]">
              From Our Blog
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest trends in digital skills, career advice, and success stories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/blog">
              <a data-testid="button-view-all-articles">
                <Button variant="outline" size="lg" className="font-semibold">
                  Read More Articles
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 font-[Poppins]">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join our next cohort and take the first step towards a successful digital career. Limited seats available with early bird pricing!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/enroll">
              <a data-testid="button-cta-enroll">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 font-semibold"
                >
                  Enroll Now
                </Button>
              </a>
            </Link>
            <Link href="/contact">
              <a data-testid="button-cta-contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 font-semibold border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Contact Us
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
