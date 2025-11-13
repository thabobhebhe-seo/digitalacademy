import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Target, Eye, Award, Users } from "lucide-react";

export default function About() {
  const team = [
    {
      name: "Dr. Sarah Moyo",
      title: "Founder & CEO",
      expertise: "Digital Strategy & Education",
      bio: "15+ years in tech education and digital transformation across Africa.",
    },
    {
      name: "Michael Chikwanha",
      title: "Head of Curriculum",
      expertise: "Software Development & AI",
      bio: "Former senior developer at international tech companies, passionate about skill development.",
    },
    {
      name: "Tendai Mutasa",
      title: "Marketing Director",
      expertise: "Digital Marketing & SEO",
      bio: "Helped 100+ Zimbabwean businesses grow through digital marketing strategies.",
    },
    {
      name: "Grace Ndlovu",
      title: "Student Success Manager",
      expertise: "Career Development & Mentorship",
      bio: "Dedicated to helping students achieve their career goals and maximize potential.",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4">About Us</Badge>
            <h1 className="text-5xl font-bold mb-6 font-[Poppins]">
              Empowering Zimbabwe's Digital Future
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to bridge the digital skills gap and create opportunities for Zimbabweans to thrive in the global digital economy.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-[Poppins]">Our Mission</h2>
              <div className="flex gap-4" data-testid="section-mission">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide world-class digital skills training that is accessible, affordable, and relevant to the Zimbabwean market. We believe that everyone deserves the opportunity to learn, grow, and succeed in the digital age.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 font-[Poppins]">Our Vision</h2>
              <div className="flex gap-4" data-testid="section-vision">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground leading-relaxed">
                    To become Africa's leading digital skills academy, producing graduates who are globally competitive and driving innovation across the continent. We envision a Zimbabwe where digital literacy is universal and opportunities are limitless.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center font-[Poppins]">
              Why Digital Skills Matter in Zimbabwe
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Award,
                  title: "Career Advancement",
                  description:
                    "Digital skills are the key to unlocking higher-paying jobs and career opportunities both locally and internationally.",
                },
                {
                  icon: Users,
                  title: "Business Growth",
                  description:
                    "Whether you're an entrepreneur or business professional, digital skills help you reach more customers and scale your impact.",
                },
                {
                  icon: Target,
                  title: "Global Opportunities",
                  description:
                    "Work remotely for international companies, freelance globally, and compete in the worldwide digital marketplace.",
                },
              ].map((item, index) => (
                <Card key={index} className="hover-elevate">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8 text-center font-[Poppins]">
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="hover-elevate" data-testid={`card-team-${index}`}>
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <p className="text-sm text-primary mb-2">{member.title}</p>
                    <Badge variant="outline" className="mb-3 text-xs">
                      {member.expertise}
                    </Badge>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 font-[Poppins]">
              Our Credentials & Partnerships
            </h2>
            <p className="text-lg opacity-90 leading-relaxed mb-8">
              We're proud to be recognized by leading tech companies and educational institutions. Our curriculum is industry-approved and our instructors are certified professionals with real-world experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-primary-foreground text-primary text-sm px-4 py-2">
                ISO Certified Training
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground text-primary text-sm px-4 py-2">
                Google Partner
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground text-primary text-sm px-4 py-2">
                Meta Certified
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground text-primary text-sm px-4 py-2">
                AWS Academy Member
              </Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
