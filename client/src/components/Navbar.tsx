import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/courses", label: "Courses" },
    { path: "/about", label: "About" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a data-testid="link-home" className="flex items-center gap-2 hover-elevate active-elevate-2 px-2 py-1 rounded-md transition-all">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-primary-foreground">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground leading-tight font-[Poppins]">
                  Digital Skills
                </span>
                <span className="text-xs text-muted-foreground leading-tight">
                  Academy
                </span>
              </div>
            </a>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <a
                  data-testid={`link-${link.label.toLowerCase()}`}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all hover-elevate active-elevate-2 ${
                    location === link.path
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <Link href="/portal">
              <a
                data-testid="link-student-login"
                className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground transition-all hover-elevate active-elevate-2"
              >
                Student Login
              </a>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/enroll">
              <a data-testid="link-enroll">
                <Button className="font-semibold">Enroll Now</Button>
              </a>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover-elevate active-elevate-2"
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <a
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  className={`block px-4 py-2 rounded-md text-sm font-medium transition-all hover-elevate ${
                    location === link.path
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <Link href="/portal">
              <a
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="link-mobile-student-login"
                className="block px-4 py-2 rounded-md text-sm font-medium text-muted-foreground transition-all hover-elevate"
              >
                Student Login
              </a>
            </Link>
            <div className="pt-2">
              <Link href="/enroll">
                <a
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="link-mobile-enroll"
                >
                  <Button className="w-full font-semibold">Enroll Now</Button>
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
