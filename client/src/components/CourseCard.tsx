import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Star, Users } from "lucide-react";
import type { Course } from "@shared/schema";

interface CourseCardProps {
  course: Course & { instructorName?: string; reviewCount?: number; averageRating?: number };
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all h-full flex flex-col hover-elevate"
      data-testid={`card-course-${course.id}`}
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        {course.thumbnail && (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            {course.category}
          </Badge>
        </div>
        {course.featured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-secondary text-secondary-foreground">
              Featured
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="flex-grow">
        <h3 className="font-semibold text-lg line-clamp-2 mb-2 font-[Poppins]">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {course.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          {course.averageRating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span>{course.averageRating.toFixed(1)}</span>
              {course.reviewCount && (
                <span className="text-muted-foreground">({course.reviewCount})</span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary font-[Poppins]">
            ${course.priceUSD}
          </span>
          <span className="text-sm text-muted-foreground">
            ZWL {parseFloat(course.priceZWL).toLocaleString()}
          </span>
        </div>

        {course.instructorName && (
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{course.instructorName}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4">
        <Link href={`/course/${course.id}`}>
          <a className="w-full" data-testid={`button-view-course-${course.id}`}>
            <Button className="w-full font-semibold">View Details</Button>
          </a>
        </Link>
      </CardFooter>
    </Card>
  );
}
