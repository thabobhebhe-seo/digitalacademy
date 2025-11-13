import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Clock,
  BarChart,
  BookOpen,
  Users,
  CheckCircle,
  Star,
} from "lucide-react";
import type { Course, Instructor, Review } from "@shared/schema";

export default function CourseDetail() {
  const [, params] = useRoute("/course/:id");

  const { data: course, isLoading } = useQuery<Course>({
    queryKey: ["/api/courses", params?.id],
    enabled: !!params?.id,
  });

  const { data: instructor } = useQuery<Instructor>({
    queryKey: ["/api/instructors", course?.instructorId],
    enabled: !!course?.instructorId,
  });

  const { data: reviews } = useQuery<Review[]>({
    queryKey: ["/api/reviews", { courseId: params?.id }],
    queryFn: async () => {
      const res = await fetch(`/api/reviews?courseId=${params?.id}`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    },
    enabled: !!params?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6">
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <Link href="/courses">
            <a>
              <Button>Browse Courses</Button>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  const syllabusSections = course.syllabus.split("\n").filter((line) => line.trim());
  const outcomes = course.learningOutcomes.split("\n").filter((line) => line.trim());
  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Badge className="mb-4">{course.category}</Badge>
              <h1 className="text-5xl font-bold mb-4 font-[Poppins]">
                {course.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-primary" />
                  <span>{course.level}</span>
                </div>
                {reviews && reviews.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-secondary text-secondary" />
                    <span>
                      {averageRating.toFixed(1)} ({reviews.length} reviews)
                    </span>
                  </div>
                )}
                {instructor && (
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>{instructor.name}</span>
                  </div>
                )}
              </div>
            </div>

            <Card className="lg:sticky lg:top-20 h-fit">
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-md mb-6 overflow-hidden">
                  {course.thumbnail && (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-primary font-[Poppins]">
                        ${course.priceUSD}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${(parseFloat(course.priceUSD) * 1.25).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ZWL {parseFloat(course.priceZWL).toLocaleString()}
                    </p>
                  </div>

                  <Badge variant="secondary" className="w-full justify-center py-2">
                    Save 20% - Early Bird Discount
                  </Badge>
                </div>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Instructor support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Practical projects</span>
                  </div>
                </div>

                <Link href="/enroll">
                  <a data-testid="button-enroll-course">
                    <Button className="w-full font-semibold text-lg h-12 mb-3">
                      Enroll Now
                    </Button>
                  </a>
                </Link>

                <p className="text-xs text-center text-muted-foreground">
                  30-day money-back guarantee
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs defaultValue="overview" className="w-full" data-testid="tabs-course-detail">
            <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-8">
              <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
              <TabsTrigger value="syllabus" data-testid="tab-syllabus">Syllabus</TabsTrigger>
              <TabsTrigger value="instructor" data-testid="tab-instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews" data-testid="tab-reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4 font-[Poppins]">
                    What You'll Learn
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {outcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="syllabus">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 font-[Poppins]">
                    Course Syllabus
                  </h2>
                  <div className="space-y-4">
                    {syllabusSections.map((section, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-md hover-elevate border border-border"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{section}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instructor">
              {instructor && (
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6 mb-6">
                      <Avatar className="w-24 h-24">
                        <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                          {instructor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-2xl font-bold mb-1 font-[Poppins]">
                          {instructor.name}
                        </h2>
                        <p className="text-primary mb-2">{instructor.title}</p>
                        <Badge variant="outline">{instructor.expertise}</Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {instructor.bio}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-4">
                {reviews && reviews.length > 0 ? (
                  reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              U
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold">Student</span>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "fill-secondary text-secondary"
                                        : "text-muted"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-muted-foreground">
                        No reviews yet. Be the first to review this course!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
