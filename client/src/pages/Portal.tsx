import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { BookOpen, Download, Award, TrendingUp } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Portal() {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const res = await apiRequest("POST", "/api/login", data);
      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      return await res.json();
    },
    onSuccess: (data) => {
      setIsLoggedIn(true);
      setUserId(data.userId);
      toast({
        title: "Login successful!",
        description: "Welcome back to your student portal.",
      });
    },
    onError: () => {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    },
  });

  const { data: enrollments } = useQuery({
    queryKey: ["/api/enrollments", userId],
    enabled: isLoggedIn && !!userId,
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-12 flex items-center">
        <div className="max-w-md mx-auto px-6 w-full">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold font-[Poppins]">
                Student Portal
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Login to access your courses and progress
              </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                            data-testid="input-login-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            data-testid="input-login-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full font-semibold"
                    disabled={loginMutation.isPending}
                    data-testid="button-login-submit"
                  >
                    {loginMutation.isPending ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </Form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Don't have an account?{" "}
                <a href="/enroll" className="text-primary hover:underline font-medium">
                  Enroll now
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 font-[Poppins]">Student Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Track your progress and continue learning.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: BookOpen,
              label: "Enrolled Courses",
              value: enrollments?.length || 0,
              color: "text-primary",
            },
            {
              icon: TrendingUp,
              label: "Average Progress",
              value: "65%",
              color: "text-secondary",
            },
            {
              icon: Award,
              label: "Certificates",
              value: enrollments?.filter((e: any) => e.completed).length || 0,
              color: "text-chart-3",
            },
            {
              icon: BookOpen,
              label: "Active Courses",
              value: enrollments?.filter((e: any) => !e.completed).length || 0,
              color: "text-chart-2",
            },
          ].map((stat, index) => (
            <Card key={index} className="hover-elevate">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold font-[Poppins]">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 font-[Poppins]">My Courses</h2>
          {enrollments && enrollments.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {enrollments.map((enrollment: any) => (
                <Card key={enrollment.id} className="hover-elevate">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-[Poppins]">
                          {enrollment.courseTitle}
                        </CardTitle>
                        <Badge variant="outline" className="mt-2">
                          {enrollment.completed ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                      {enrollment.completed && (
                        <Button
                          variant="outline"
                          size="sm"
                          data-testid={`button-download-certificate-${enrollment.id}`}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Certificate
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{enrollment.progress}%</span>
                      </div>
                      <Progress value={enrollment.progress} className="h-2" />
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 font-semibold" data-testid={`button-continue-${enrollment.id}`}>Continue Learning</Button>
                      <Button variant="outline" data-testid={`button-view-course-${enrollment.id}`}>View Course</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No courses yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start your learning journey by enrolling in a course.
                </p>
                <a href="/courses">
                  <Button size="lg" className="font-semibold" data-testid="button-browse-courses-empty">
                    Browse Courses
                  </Button>
                </a>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
