import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import type { Course } from "@shared/schema";

export default function Pricing() {
  const { data: courses } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const paymentMethods = [
    { name: "Ecocash", description: "Instant mobile payments" },
    { name: "PayNow", description: "Secure bank transfers" },
    { name: "Bank Transfer", description: "Direct bank deposits" },
    { name: "Installments", description: "Flexible payment plans" },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4">Pricing</Badge>
          <h1 className="text-5xl font-bold mb-4 font-[Poppins]">
            Affordable Courses for Everyone
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing with flexible payment options. All courses include lifetime access and certificates.
          </p>
        </div>

        <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-6 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 font-[Poppins]">
              Early Bird Special - 20% Off!
            </h2>
            <p className="text-muted-foreground mb-4">
              Enroll before March 31, 2026 and save 20% on all courses
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="px-4 py-2">
                Limited Time Offer
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                All Courses Included
              </Badge>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center font-[Poppins]">
            Course Pricing
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses?.map((course) => (
              <Card
                key={course.id}
                className="hover:shadow-lg transition-all hover-elevate"
                data-testid={`card-pricing-${course.id}`}
              >
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">
                    {course.category}
                  </Badge>
                  <CardTitle className="font-[Poppins]">{course.title}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
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
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      <span>{course.duration} duration</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Certificate included</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Instructor support</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Link href={`/course/${course.id}`}>
                    <a className="w-full" data-testid={`link-pricing-view-course-${course.id}`}>
                      <Button className="w-full font-semibold" data-testid={`button-pricing-view-course-${course.id}`}>View Course</Button>
                    </a>
                  </Link>
                  <Link href="/enroll">
                    <a className="w-full" data-testid={`link-pricing-enroll-${course.id}`}>
                      <Button variant="outline" className="w-full" data-testid={`button-pricing-enroll-${course.id}`}>
                        Enroll Now
                      </Button>
                    </a>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center font-[Poppins]">
            Payment Methods
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method, index) => (
              <Card key={index} className="hover-elevate">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">{method.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            All payments are secure and processed instantly. Installment plans available for courses over $75.
          </p>
        </div>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 font-[Poppins]">
              Need a Custom Package?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Looking to train your team or need multiple courses? Contact us for corporate packages and group discounts.
            </p>
            <Link href="/contact">
              <a>
                <Button size="lg" className="font-semibold" data-testid="button-contact-sales">
                  Contact Sales
                </Button>
              </a>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
