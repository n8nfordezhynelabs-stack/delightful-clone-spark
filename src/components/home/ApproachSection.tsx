import { Search, Palette, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    description: "We dive deep into understanding your business, goals, and target audience to create a strategic foundation.",
  },
  {
    icon: Palette,
    number: "02",
    title: "Design",
    description: "Our designers create stunning visuals and intuitive interfaces that capture your brand essence.",
  },
  {
    icon: Code,
    number: "03",
    title: "Development",
    description: "Expert developers bring designs to life with clean, scalable code and cutting-edge technologies.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch",
    description: "We deploy your project with thorough testing and provide ongoing support for continued success.",
  },
];

export const ApproachSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-wider uppercase text-sm mb-4">
            How We Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Approach
          </h2>
          <p className="text-muted-foreground">
            A proven process that delivers exceptional results every time.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              
              <div className="text-center space-y-4">
                {/* Icon */}
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-2xl bg-secondary border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
