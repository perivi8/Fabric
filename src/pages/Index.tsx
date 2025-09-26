import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, MessageSquare, Star, Truck, Shield, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const featuredProducts = [
    { id: "1", name: "Premium Cotton Fabric", price: 850, image: "/category/1.jpg", rating: 4.8 },
    { id: "2", name: "Silk Blend Saree Fabric", price: 1200, image: "/category/2.jpg", rating: 4.9 },
    { id: "3", name: "Pure Linen Fabric", price: 950, image: "/category/3.jpg", rating: 4.7 }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-background via-background to-muted/30 pt-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge variant="outline" className="mb-4">Trusted Since 1995</Badge>
                <h1 className="text-hero mb-6">
                  Modern Fabrics.<br />
                  <span className="text-highlight">Trusted Quality.</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  Premium textiles from Tamil Nadu's heritage textile district. 
                  From fashion designers to home decorators, we serve quality at every scale.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button className="btn-primary group">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Shop Fabrics
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/bulk-inquiry">
                  <Button variant="outline" className="group">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Request Bulk Quote
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 shadow-lg">
                <img
                  src="/category/hero.png"
                  alt="Premium Quality Handpicked Fabrics"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Award className="w-16 h-16 mb-4 mx-auto drop-shadow-lg" />
                    <h3 className="text-2xl font-bold drop-shadow-lg">Premium Quality</h3>
                    <p className="text-white/90 drop-shadow-lg">Handpicked fabrics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <h2 className="text-section-title text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: "Cotton Fabrics", 
                href: "/products?category=cotton", 
                image: "/category/a.jpg",
                description: "Premium cotton fabrics for all your needs"
              },
              { 
                name: "Silk Fabrics", 
                href: "/products?category=silk", 
                image: "/category/b.jpg",
                description: "Luxurious silk blends and pure silk"
              },
              { 
                name: "Linen Fabrics", 
                href: "/products?category=linen", 
                image: "/category/c.jpg",
                description: "Natural linen for comfort and style"
              },
              { 
                name: "Wool Fabrics", 
                href: "/products?category=wool", 
                image: "/category/d.jpg",
                description: "Premium wool blends for warmth and style"
              }
            ].map((category, index) => (
              <Link key={index} to={category.href}>
                <div className="fabric-card group hover:scale-105 transition-transform duration-300 overflow-hidden h-full flex flex-col">
                  <div className="aspect-square overflow-hidden flex-shrink-0">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-highlight transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-section-title">Featured Fabrics</h2>
            <Link to="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid-products">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`}>
                <div className="fabric-card group">
                  <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-highlight transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-muted-foreground">{product.rating}</span>
                    </div>
                    <p className="text-price text-highlight">₹{product.price}/meter</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-section-title mb-12">Why Choose Jai Chitra Textile?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Shield className="w-8 h-8" />, title: "Quality Assured", desc: "Every fabric tested" },
              { icon: <Truck className="w-8 h-8" />, title: "Fast Delivery", desc: "On-time shipping" },
              { icon: <Users className="w-8 h-8" />, title: "Expert Support", desc: "24/7 assistance" },
              { icon: <Award className="w-8 h-8" />, title: "29+ Years", desc: "Trusted experience" }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-highlight mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-primary-foreground/80 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent to-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-section-title mb-4">Ready for Bulk Orders?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get competitive pricing for wholesale orders. Perfect for businesses and large projects.
          </p>
          <Link to="/bulk-inquiry">
            <Button className="btn-primary bg-white text-primary hover:bg-white/90">
              Request Quote Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;