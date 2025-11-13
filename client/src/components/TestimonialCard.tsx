import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card
      className="h-full hover-elevate"
      data-testid={`card-testimonial-${testimonial.id}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={testimonial.photo || undefined} alt={testimonial.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-semibold">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">{testimonial.courseCompleted}</p>
            <div className="flex gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < testimonial.rating
                      ? "fill-secondary text-secondary"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="text-muted-foreground italic leading-relaxed mb-4">
          "{testimonial.text}"
        </p>

        {testimonial.achievement && (
          <div className="pt-4 border-t border-border">
            <p className="text-sm font-medium text-primary">
              {testimonial.achievement}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
