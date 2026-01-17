import { Layout } from "@/components/layout/Layout";
import { Megaphone, Code, Share2, TestTube } from "lucide-react";

const services = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Drive growth with data-driven marketing strategies that deliver measurable results.",
    features: ["SEO Optimization", "PPC Campaigns", "Content Marketing", "Email Marketing"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Build your brand presence and engage your audience across all social platforms.",
    features: ["Content Creation", "Community Management", "Influencer Partnerships", "Analytics & Reporting"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
  },
  {
    icon: Code,
    title: "Website Development",
    description: "Custom websites built with modern technologies for optimal performance and user experience.",
    features: ["Responsive Design", "E-commerce Solutions", "CMS Integration", "Performance Optimization"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop",
  },
  {
    icon: TestTube,
    title: "Software QA Services",
    description: "Comprehensive testing to ensure your software meets the highest quality standards.",
    features: ["Manual Testing", "Automated Testing", "Performance Testing", "Security Audits"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-card">
        <div className="container-custom text-center">
          <p className="text-primary font-medium tracking-wider uppercase text-sm mb-4">What We Offer</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Comprehensive digital solutions tailored to help your business thrive.</p>
        </div>
      </section>

      {/* Services */}
      {services.map((service, index) => (
        <section key={service.title} className={`section-padding ${index % 2 === 0 ? "bg-background" : "bg-card"}`}>
          <div className="container-custom">
            <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">{service.title}</h2>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <img src={service.image} alt={service.title} className="rounded-2xl w-full aspect-video object-cover" />
              </div>
            </div>
          </div>
        </section>
      ))}
    </Layout>
  );
};

export default Services;