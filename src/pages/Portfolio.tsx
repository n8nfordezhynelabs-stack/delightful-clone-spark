import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  external_link: string | null;
}

const categories = ["All", "Web", "E-commerce", "Branding"];

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from("portfolio_projects").select("*").order("created_at", { ascending: false });
      if (data) setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <section className="section-padding bg-card">
        <div className="container-custom text-center">
          <p className="text-primary font-medium tracking-wider uppercase text-sm mb-4">Our Work</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Portfolio</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">Explore our latest projects and see how we help businesses succeed.</p>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => <div key={i} className="aspect-video bg-secondary rounded-2xl animate-pulse" />)}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="group relative rounded-2xl overflow-hidden border border-border card-hover">
                  <img src={project.image_url} alt={project.title} className="w-full aspect-video object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <span className="text-primary text-sm font-medium mb-2">{project.category}</span>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                    {project.external_link && (
                      <a href={project.external_link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-primary hover:underline">
                        View Project <ExternalLink className="ml-1 w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;