import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Megaphone, 
  Code, 
  Share2, 
  TestTube, 
  Palette, 
  Search,
  ArrowRight 
} from "lucide-react";

const services = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Strategic campaigns that drive traffic, engagement, and conversions across all digital channels.",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites and applications built with modern technologies for optimal performance.",
  },
  {
    icon: Share2,
    title: "Social Media",
    description: "Engaging social strategies that build communities and amplify your brand voice.",
  },
  {
    icon: TestTube,
    title: "QA Services",
    description: "Comprehensive testing to ensure your software meets the highest quality standards.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered designs that create intuitive and memorable digital experiences.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Data-driven SEO strategies to improve visibility and organic search rankings.",
  },
];

export const ServicesPreview = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-wider uppercase text-sm mb-4">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground">
            Comprehensive digital solutions tailored to help your business thrive in the modern landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-8 rounded-2xl bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-300 card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/services">
            <Button variant="outline" size="lg">
              Explore All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
