import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image_url: string;
  read_time: number;
  created_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from("blog_posts").select("id, title, excerpt, category, image_url, read_time, created_at").order("created_at", { ascending: false });
      if (data) setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <Layout>
      <section className="section-padding bg-card">
        <div className="container-custom text-center">
          <p className="text-primary font-medium tracking-wider uppercase text-sm mb-4">Insights</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Stay updated with the latest trends, tips, and insights.</p>
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
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="group block">
                  <article className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all card-hover">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">{post.category}</span>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{formatDate(post.created_at)}</span>
                        <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{post.read_time} min</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;