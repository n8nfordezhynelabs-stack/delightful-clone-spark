-- Create portfolio_projects table
CREATE TABLE public.portfolio_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  external_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  read_time INTEGER NOT NULL DEFAULT 5,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Portfolio projects are publicly readable
CREATE POLICY "Portfolio projects are publicly readable"
  ON public.portfolio_projects
  FOR SELECT
  USING (true);

-- Blog posts are publicly readable when published
CREATE POLICY "Published blog posts are publicly readable"
  ON public.blog_posts
  FOR SELECT
  USING (published = true);

-- Contact submissions can be inserted by anyone
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_portfolio_projects_updated_at
  BEFORE UPDATE ON public.portfolio_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample portfolio projects
INSERT INTO public.portfolio_projects (title, description, category, image_url, external_link) VALUES
('E-Commerce Platform', 'A modern e-commerce solution with seamless checkout experience and inventory management.', 'Web', 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop', 'https://example.com'),
('Brand Identity Design', 'Complete brand identity redesign including logo, typography, and color palette.', 'Branding', 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&auto=format&fit=crop', 'https://example.com'),
('Mobile Banking App', 'Secure and intuitive mobile banking application with biometric authentication.', 'Web', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop', 'https://example.com'),
('Restaurant Website', 'Elegant restaurant website with online reservations and menu management.', 'E-commerce', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop', 'https://example.com'),
('SaaS Dashboard', 'Analytics dashboard for SaaS businesses with real-time data visualization.', 'Web', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop', 'https://example.com'),
('Fashion E-Store', 'High-end fashion e-commerce store with AR try-on features.', 'E-commerce', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop', 'https://example.com');

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, excerpt, content, category, image_url, read_time) VALUES
('The Future of Web Development in 2024', 'Explore the latest trends and technologies shaping the future of web development.', 'Web development is evolving rapidly with new frameworks, tools, and methodologies emerging every year. In this comprehensive guide, we explore what developers need to know to stay ahead in 2024.

## Key Trends

### 1. AI-Powered Development
Artificial intelligence is revolutionizing how we write code. From GitHub Copilot to ChatGPT, AI assistants are becoming indispensable tools for developers.

### 2. Edge Computing
With the rise of edge computing, applications are becoming faster and more responsive than ever before.

### 3. WebAssembly
WebAssembly continues to gain traction, enabling high-performance applications in the browser.

## Conclusion
The future of web development is exciting and full of possibilities. Stay curious and keep learning!', 'Development', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop', 7),

('Essential UI/UX Design Principles', 'Master the fundamental principles that make great user experiences.', 'Great design is not just about aesthetics—it is about creating meaningful experiences that solve real problems for users.

## Core Principles

### 1. Clarity
Every element should have a clear purpose. Remove anything that does not contribute to the user journey.

### 2. Consistency
Maintain consistent patterns throughout your design to reduce cognitive load.

### 3. Feedback
Provide immediate feedback for user actions to confirm their inputs were received.

## Best Practices
- Use whitespace effectively
- Create visual hierarchy
- Design for accessibility

Remember: Good design is invisible.', 'Design', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop', 5),

('Maximizing ROI with Digital Marketing', 'Learn strategies to get the most out of your marketing budget.', 'Digital marketing offers unprecedented opportunities to reach your target audience, but only if you know how to leverage the right channels effectively.

## Strategies for Success

### 1. Data-Driven Decisions
Use analytics to guide your marketing decisions and optimize campaigns in real-time.

### 2. Content is King
Create valuable content that resonates with your audience and establishes your brand as an authority.

### 3. Social Media Engagement
Build genuine connections with your audience through consistent, meaningful engagement.

## Measuring Success
Track key metrics like conversion rates, customer acquisition cost, and lifetime value to measure true ROI.', 'Marketing', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop', 6),

('Building Scalable E-commerce Platforms', 'Technical insights for creating robust online stores.', 'E-commerce platforms must be built to handle growth while maintaining performance and reliability.

## Architecture Considerations

### 1. Microservices
Break your application into smaller, independently deployable services.

### 2. Database Optimization
Design your database schema for scalability from day one.

### 3. Caching Strategies
Implement multi-layer caching to reduce load on your servers.

## Security
Never compromise on security. Implement SSL, secure payment gateways, and regular security audits.', 'E-commerce', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop', 8);