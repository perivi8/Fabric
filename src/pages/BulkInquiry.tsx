import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Users, Package, MessageCircle, Mail, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const BulkInquiry = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    businessType: "",
    fabricType: "",
    quantity: "",
    timeline: "",
    budget: "",
    requirements: "",
    customization: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Inquiry Submitted Successfully!",
      description: `We'll contact you within 24 hours. Reference ID: BLK${Date.now().toString().slice(-6)}`,
    });
    
    // Reset form
    setFormData({
      businessName: "",
      contactPerson: "",
      email: "",
      phone: "",
      businessType: "",
      fabricType: "",
      quantity: "",
      timeline: "",
      budget: "",
      requirements: "",
      customization: ""
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-16">
        <div className="container-custom text-center">
          <Building2 className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-hero mb-6">Bulk Orders & Customization</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Partner with us for your business textile needs. From fashion brands to interior designers, 
            we provide premium fabrics at competitive wholesale prices with custom solutions.
          </p>
        </div>
      </section>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Bulk Inquiry Form */}
          <div>
            <h2 className="text-section-title mb-6">Request Custom Quote</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Information */}
              <div className="fabric-card p-6">
                <h3 className="text-card-title mb-4">Business Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      placeholder="Your company/business name"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fashion-brand">Fashion Brand</SelectItem>
                          <SelectItem value="interior-designer">Interior Designer</SelectItem>
                          <SelectItem value="tailor">Tailor/Boutique</SelectItem>
                          <SelectItem value="retailer">Fabric Retailer</SelectItem>
                          <SelectItem value="manufacturer">Manufacturer</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="business@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Requirements */}
              <div className="fabric-card p-6">
                <h3 className="text-card-title mb-4">Order Requirements</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fabricType">Fabric Type *</Label>
                      <Select value={formData.fabricType} onValueChange={(value) => handleInputChange("fabricType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fabric type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cotton">Cotton Fabrics</SelectItem>
                          <SelectItem value="silk">Silk Fabrics</SelectItem>
                          <SelectItem value="linen">Linen Fabrics</SelectItem>
                          <SelectItem value="synthetic">Synthetic Fabrics</SelectItem>
                          <SelectItem value="blended">Blended Fabrics</SelectItem>
                          <SelectItem value="home-textiles">Home Textiles</SelectItem>
                          <SelectItem value="custom">Custom Requirements</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="quantity">Estimated Quantity *</Label>
                      <Select value={formData.quantity} onValueChange={(value) => handleInputChange("quantity", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select quantity range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50-100">50-100 meters</SelectItem>
                          <SelectItem value="100-500">100-500 meters</SelectItem>
                          <SelectItem value="500-1000">500-1000 meters</SelectItem>
                          <SelectItem value="1000-5000">1000-5000 meters</SelectItem>
                          <SelectItem value="5000+">5000+ meters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="timeline">Required Timeline</Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="When do you need this?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">Urgent (1-2 weeks)</SelectItem>
                          <SelectItem value="1-month">Within 1 month</SelectItem>
                          <SelectItem value="2-3-months">2-3 months</SelectItem>
                          <SelectItem value="flexible">Flexible timeline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget Range (Optional)</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                          <SelectItem value="50k-1l">₹50,000 - ₹1,00,000</SelectItem>
                          <SelectItem value="1l-5l">₹1,00,000 - ₹5,00,000</SelectItem>
                          <SelectItem value="5l+">Above ₹5,00,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="requirements">Specific Requirements *</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => handleInputChange("requirements", e.target.value)}
                      placeholder="Please describe your specific fabric requirements, intended use, quality specifications, etc."
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="customization">Customization Needs (Optional)</Label>
                    <Textarea
                      id="customization"
                      value={formData.customization}
                      onChange={(e) => handleInputChange("customization", e.target.value)}
                      placeholder="Any custom printing, dyeing, or special treatments required?"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full btn-primary">
                Submit Inquiry
              </Button>
            </form>
          </div>

          {/* Benefits & Contact Info */}
          <div className="space-y-8">
            {/* Why Choose Us for Bulk Orders */}
            <div className="fabric-card p-6">
              <h3 className="text-card-title mb-4">Why Choose Us for Bulk Orders?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Package className="w-6 h-6 text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold">Competitive Pricing</h4>
                    <p className="text-muted-foreground text-sm">Tiered pricing with better rates for larger quantities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold">Custom Solutions</h4>
                    <p className="text-muted-foreground text-sm">Tailored fabric specifications to meet your exact needs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Building2 className="w-6 h-6 text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold">Reliable Supply</h4>
                    <p className="text-muted-foreground text-sm">Consistent quality and on-time delivery commitments</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Options */}
            <div className="fabric-card p-6">
              <h3 className="text-card-title mb-4">Prefer Direct Contact?</h3>
              <div className="space-y-4">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">WhatsApp Business</p>
                    <p className="text-sm text-green-600">+91 98765 43210</p>
                  </div>
                </a>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <Phone className="w-5 h-5 text-highlight" />
                  <div>
                    <p className="font-medium">Direct Phone</p>
                    <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <Mail className="w-5 h-5 text-highlight" />
                  <div>
                    <p className="font-medium">Business Email</p>
                    <p className="text-sm text-muted-foreground">bulk@jaichitratextile.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="fabric-card p-6">
              <h3 className="text-card-title mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Response time: Within 24 hours for bulk inquiries
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkInquiry;