import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertEnrollmentSchema, insertUserSchema } from "@shared/schema";
import type { Course } from "@shared/schema";
import { z } from "zod";
import { CheckCircle } from "lucide-react";

const enrollmentFormSchema = insertUserSchema
  .pick({ name: true, email: true, phone: true, password: true })
  .extend({
    courseId: z.string().min(1, "Please select a course"),
    paymentMethod: z.enum(["Ecocash", "PayNow", "Bank Transfer", "Installments"]),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  });

type EnrollmentFormData = z.infer<typeof enrollmentFormSchema>;

export default function Enroll() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const { data: courses } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const form = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      courseId: "",
      paymentMethod: "Ecocash",
      termsAccepted: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: EnrollmentFormData) => {
      const userRes = await apiRequest("POST", "/api/register", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: "student",
      });

      if (!userRes.ok) {
        throw new Error("Registration failed");
      }

      const user = await userRes.json();

      const enrollRes = await apiRequest("POST", "/api/enrollments", {
        userId: user.id,
        courseId: data.courseId,
        paymentMethod: data.paymentMethod,
      });

      if (!enrollRes.ok) {
        throw new Error("Enrollment failed");
      }

      return { user, enrollment: await enrollRes.json() };
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: "Enrollment successful!",
        description: "Check your email for payment instructions and access details.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Enrollment failed",
        description: error.message || "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EnrollmentFormData) => {
    mutation.mutate(data);
  };

  const selectedCourse = courses?.find((c) => c.id === form.watch("courseId"));

  if (isSuccess) {
    return (
      <div className="min-h-screen py-12 flex items-center">
        <div className="max-w-2xl mx-auto px-6 w-full">
          <Card className="text-center">
            <CardContent className="p-12">
              <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4 font-[Poppins]">
                Enrollment Successful!
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Welcome to Digital Skills Academy! Check your email for payment instructions and login credentials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => setLocation("/portal")} size="lg" className="font-semibold">
                  Go to Student Portal
                </Button>
                <Button
                  onClick={() => setLocation("/courses")}
                  variant="outline"
                  size="lg"
                  className="font-semibold"
                >
                  Browse More Courses
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4">Enrollment</Badge>
          <h1 className="text-5xl font-bold mb-4 font-[Poppins]">Enroll Today</h1>
          <p className="text-lg text-muted-foreground">
            Start your digital skills journey. Complete the form below to secure your spot.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-[Poppins]">Enrollment Form</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="courseId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Course</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-course">
                                <SelectValue placeholder="Choose a course" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {courses?.map((course) => (
                                <SelectItem key={course.id} value={course.id}>
                                  {course.title} - ${course.priceUSD}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                {...field}
                                data-testid="input-enroll-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@example.com"
                                {...field}
                                data-testid="input-enroll-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+263 77 123 4567"
                                {...field}
                                data-testid="input-enroll-phone"
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
                                placeholder="Create a password"
                                {...field}
                                data-testid="input-enroll-password"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Method</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="grid grid-cols-2 gap-4"
                            >
                              {["Ecocash", "PayNow", "Bank Transfer", "Installments"].map(
                                (method) => (
                                  <div key={method}>
                                    <RadioGroupItem
                                      value={method}
                                      id={method}
                                      className="peer sr-only"
                                    />
                                    <label
                                      htmlFor={method}
                                      className="flex items-center justify-center rounded-md border-2 border-muted bg-card p-4 hover-elevate peer-data-[state=checked]:border-primary cursor-pointer"
                                      data-testid={`radio-payment-${method.toLowerCase().replace(/\s+/g, "-")}`}
                                    >
                                      <span className="text-sm font-medium">{method}</span>
                                    </label>
                                  </div>
                                )
                              )}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-terms"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Accept terms and conditions</FormLabel>
                            <FormDescription>
                              I agree to the Digital Skills Academy terms of service and privacy policy.
                            </FormDescription>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full font-semibold text-lg h-12"
                      disabled={mutation.isPending}
                      data-testid="button-enroll-submit"
                    >
                      {mutation.isPending ? "Processing..." : "Complete Enrollment"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {selectedCourse && (
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="text-lg font-[Poppins]">Selected Course</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {selectedCourse.category}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-2">{selectedCourse.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedCourse.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-sm text-muted-foreground">Price (USD)</span>
                      <span className="text-2xl font-bold text-primary font-[Poppins]">
                        ${selectedCourse.priceUSD}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-muted-foreground">Price (ZWL)</span>
                      <span className="text-sm font-medium">
                        {parseFloat(selectedCourse.priceZWL).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border text-sm text-muted-foreground">
                    <p>Duration: {selectedCourse.duration}</p>
                    <p>Level: {selectedCourse.level}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-accent/30">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">What's Included</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Lifetime course access
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Certificate of completion
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Instructor support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Practical projects
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
