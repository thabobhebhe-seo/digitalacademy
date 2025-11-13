import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for subscribing!",
      description: "You'll receive our latest updates and course offerings.",
    });
    setEmail("");
  };

  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-4 font-[Poppins]">
              Digital Skills Academy
            </h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Zimbabwe's premier digital skills training academy. Empowering the next generation of tech professionals.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-facebook"
                className="w-9 h-9 rounded-md bg-muted flex items-center justify-center hover-elevate active-elevate-2"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-twitter"
                className="w-9 h-9 rounded-md bg-muted flex items-center justify-center hover-elevate active-elevate-2"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-instagram"
                className="w-9 h-9 rounded-md bg-muted flex items-center justify-center hover-elevate active-elevate-2"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-linkedin"
                className="w-9 h-9 rounded-md bg-muted flex items-center justify-center hover-elevate active-elevate-2"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/courses">
                  <a
                    data-testid="link-footer-courses"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Browse Courses
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a
                    data-testid="link-footer-about"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a
                    data-testid="link-footer-blog"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a
                    data-testid="link-footer-contact"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Popular Courses</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Digital Marketing</li>
              <li className="text-sm text-muted-foreground">Web Development</li>
              <li className="text-sm text-muted-foreground">AI for Business</li>
              <li className="text-sm text-muted-foreground">SEO Mastery</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get updates on new courses and special offers.
            </p>
            <form onSubmit={handleNewsletterSignup} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-newsletter-email"
                className="h-10"
              />
              <Button
                type="submit"
                className="w-full"
                data-testid="button-newsletter-submit"
              >
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-2">We Accept:</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-muted px-2 py-1 rounded">Ecocash</span>
                <span className="text-xs bg-muted px-2 py-1 rounded">PayNow</span>
                <span className="text-xs bg-muted px-2 py-1 rounded">Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Digital Skills Academy. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms">
              <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </Link>
            <Link href="/privacy">
              <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
