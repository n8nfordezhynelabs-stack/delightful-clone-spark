import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from("contact_submissions").insert([form]);
    
    if (error) {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Success!", description: "Your message has been sent. We'll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    }
    setLoading(false);
  };

  return (
    <Layout>
      <section className="section-padding bg-card">
        <div className="container-custom text-center">
          <p className="text-primary font-medium tracking-wider uppercase text-sm mb-4">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Let's Talk</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Have a project in mind? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <Input type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <Input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
              <Textarea placeholder="Your Message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              <Button type="submit" size="lg" className="w-full glow-primary" disabled={loading}>
                {loading ? "Sending..." : "Send Message"} <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-card border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Mail className="w-5 h-5 text-primary" /></div>
                    <div><p className="text-muted-foreground text-sm">Email</p><p className="text-foreground font-medium">hello@dezhyne.com</p></div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Phone className="w-5 h-5 text-primary" /></div>
                    <div><p className="text-muted-foreground text-sm">Phone</p><p className="text-foreground font-medium">+1 (555) 123-4567</p></div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><MapPin className="w-5 h-5 text-primary" /></div>
                    <div><p className="text-muted-foreground text-sm">Location</p><p className="text-foreground font-medium">123 Digital Street, San Francisco, CA</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;