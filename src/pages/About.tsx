import { Users, Award, Truck, Shield, Heart, Target, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Every fabric undergoes rigorous quality checks to ensure premium standards."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer First",
      description: "Your satisfaction is our priority. We build lasting relationships through exceptional service."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Innovation",
      description: "Constantly evolving with new designs, techniques, and sustainable practices."
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Reliable Service",
      description: "Consistent quality, on-time delivery, and dependable customer support."
    }
  ];

  const milestones = [
    { year: "1995", title: "Founded", description: "Started as a small family textile business in Coimbatore" },
    { year: "2005", title: "Expansion", description: "Expanded to serve fashion brands and interior designers" },
    { year: "2015", title: "Modernization", description: "Invested in modern machinery and quality control systems" },
    { year: "2020", title: "Digital Presence", description: "Launched online platform to serve customers nationwide" },
    { year: "2024", title: "Sustainable Focus", description: "Committed to eco-friendly and sustainable textile practices" }
  ];

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
      <section className="container-custom text-center mb-16">
        <h1 className="text-hero mb-6">Our Heritage, Your Trust</h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          Since 1995, Jai Chitra Textile has been weaving dreams into reality. From our humble beginnings 
          in Tamil Nadu to serving customers across India, our commitment to quality and craftsmanship 
          remains unwavering.
        </p>
      </section>

      {/* Hero Image Placeholder */}
      <section className="container-custom mb-16">
        <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gradient-to-r from-primary to-accent flex items-center justify-center text-primary-foreground">
          <div className="text-center">
            <Users className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Traditional Craftsmanship</h3>
            <p className="text-lg">Modern designs with heritage quality</p>
          </div>
        </div>
      </section>

      <div className="container-custom">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-section-title mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  What started as a passion project by our founder in 1995 has grown into one of Tamil Nadu's 
                  most trusted textile companies. Located in the heart of India's textile capital, Coimbatore, 
                  we've witnessed and contributed to the evolution of the Indian textile industry.
                </p>
                <p>
                  Our journey began with a simple belief: that every fabric tells a story. Whether it's the 
                  soft cotton that will become a child's favorite dress, the elegant silk for a wedding saree, 
                  or the durable upholstery that will grace a family home for decades – we treat each fabric 
                  with the respect it deserves.
                </p>
                <p>
                  Today, we serve fashion designers, interior decorators, boutiques, and individual customers 
                  who value quality and authenticity. Our state-of-the-art facility combines traditional 
                  techniques with modern technology to deliver fabrics that meet contemporary standards 
                  while honoring our heritage.
                </p>
              </div>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src="/category/about.png"
                alt="Jai Chitra Textile - Our Story"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-section-title mb-4">What Drives Us</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our values are woven into every fabric we produce and every relationship we build.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="fabric-card p-6 text-center">
                <div className="text-highlight mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-section-title mb-4">Our Journey</h2>
            <p className="text-muted-foreground text-lg">
              Key milestones that shaped Jai Chitra Textile into what we are today.
            </p>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border hidden lg:block"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'}`}>
                    <div className="fabric-card p-6">
                      <div className="text-highlight font-bold text-xl mb-2">{milestone.year}</div>
                      <h3 className="font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground text-sm">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden lg:block w-4 h-4 bg-highlight rounded-full border-4 border-background relative z-10"></div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">29+</div>
                <div className="text-primary-foreground/80">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">5000+</div>
                <div className="text-primary-foreground/80">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">500+</div>
                <div className="text-primary-foreground/80">Fabric Varieties</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">50+</div>
                <div className="text-primary-foreground/80">Cities Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-section-title mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Behind every quality fabric is a dedicated team of craftspeople, designers, and customer service professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team member placeholders */}
            <div className="fabric-card p-6 text-center">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Production Team</h3>
              <p className="text-muted-foreground text-sm">Expert craftspeople ensuring quality in every meter</p>
            </div>
            <div className="fabric-card p-6 text-center">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Design Team</h3>
              <p className="text-muted-foreground text-sm">Creative professionals bringing new patterns to life</p>
            </div>
            <div className="fabric-card p-6 text-center">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Customer Care</h3>
              <p className="text-muted-foreground text-sm">Dedicated support for all your textile needs</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="fabric-card p-12">
            <h2 className="text-section-title mb-4">Ready to Experience Our Quality?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Discover why thousands of customers trust Jai Chitra Textile for their fabric needs. 
              From individual projects to bulk orders, we're here to serve you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button className="btn-primary">
                  Explore Our Fabrics
                </Button>
              </Link>
              <Link to="/bulk-inquiry">
                <Button variant="outline">
                  Request Bulk Quote
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;