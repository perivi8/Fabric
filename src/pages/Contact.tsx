import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    inquiry_type: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      inquiry_type: "",
      message: ""
    });
  };

  return (
    <div className="py-8">
      {/* Back Button */}
      <div className="container-custom mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {/* Header */}
      <section className="container-custom text-center mb-16">
        <h1 className="text-hero mb-6">Get in Touch</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Have questions about our fabrics? Need assistance with your order? 
          We're here to help you find the perfect textile solutions.
        </p>
      </section>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-section-title mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="fabric-card p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="inquiry_type">Inquiry Type</Label>
                      <Select value={formData.inquiry_type} onValueChange={(value) => handleInputChange("inquiry_type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product">Product Information</SelectItem>
                          <SelectItem value="order">Order Support</SelectItem>
                          <SelectItem value="bulk">Bulk Orders</SelectItem>
                          <SelectItem value="custom">Custom Requirements</SelectItem>
                          <SelectItem value="shipping">Shipping & Delivery</SelectItem>
                          <SelectItem value="returns">Returns & Exchanges</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief subject line"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please describe your inquiry in detail..."
                      rows={6}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full btn-primary">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="fabric-card p-6">
              <h3 className="text-card-title mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Visit Our Showroom</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      14/18, SARANGAPANI SOUTH<br />
                      Kumbakonam, Thanjavur<br />
                      Tamil Nadu, India - 612001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Call Us</h4>
                    <p className="text-muted-foreground">+91 94439 36367</p>
                    <p className="text-sm text-muted-foreground">Mon-Sat: 9:00 AM - 7:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Email Us</h4>
                    <p className="text-muted-foreground">contact@jaichitratextiles.shop</p>
                    <p className="text-muted-foreground">jaichitratextiles99@gmail.com</p>
                    <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Business Hours</h4>
                    <div className="text-muted-foreground text-sm space-y-1">
                      <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                      <p>Saturday: 9:00 AM - 5:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="fabric-card p-6">
              <h3 className="text-card-title mb-4">Quick Contact</h3>
              <div className="space-y-3">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 transition-colors"
                >
                  <MessageCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">WhatsApp Chat</p>
                    <p className="text-sm text-green-600">Get instant support</p>
                  </div>
                </a>

                <a
                  href="tel:+919876543210"
                  className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Phone className="w-6 h-6 text-highlight" />
                  <div>
                    <p className="font-semibold">Call Directly</p>
                    <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  </div>
                </a>

                <a
                  href="mailto:info@jaichitratextile.com"
                  className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Mail className="w-6 h-6 text-highlight" />
                  <div>
                    <p className="font-semibold">Email Support</p>
                    <p className="text-sm text-muted-foreground">Send detailed inquiry</p>
                  </div>
                </a>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="fabric-card p-6">
              <h3 className="text-card-title mb-4">Frequently Asked Questions</h3>
              <p className="text-muted-foreground mb-4">
                Looking for quick answers? Check out our FAQ section for common questions about:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Fabric specifications and care instructions</li>
                <li>• Shipping and delivery information</li>
                <li>• Return and exchange policies</li>
                <li>• Bulk order processes</li>
                <li>• Custom fabric requirements</li>
              </ul>
            </div>

            {/* Map Placeholder */}
            <div className="fabric-card p-6">
              <h3 className="text-card-title mb-4">Find Our Location</h3>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-medium">Interactive Map</p>
                  <p className="text-sm">123 Textile Street, Coimbatore</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Located in the heart of Coimbatore's textile district, easily accessible by public transport.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;