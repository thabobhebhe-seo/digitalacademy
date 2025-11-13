import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
import type { Article } from "@shared/schema";

interface BlogCardProps {
  article: Article;
}

export function BlogCard({ article }: BlogCardProps) {
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all h-full flex flex-col hover-elevate"
      data-testid={`card-article-${article.id}`}
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        {article.thumbnail && (
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            {article.category}
          </Badge>
        </div>
      </div>

      <CardHeader className="flex-grow">
        <h3 className="font-semibold text-lg line-clamp-2 mb-2 font-[Poppins]">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Link href={`/blog/${article.slug}`}>
          <a className="w-full" data-testid={`button-read-article-${article.id}`}>
            <Button variant="outline" className="w-full">
              Read More
            </Button>
          </a>
        </Link>
      </CardFooter>
    </Card>
  );
}
