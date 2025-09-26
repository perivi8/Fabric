import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, MessageSquare, Share2, Heart, Star, Truck, Shield, RotateCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

// Product data - same as in Products.tsx
const mockProducts = [
  {
    id: "1",
    name: "Premium Cotton Fabric",
    price: 850,
    bulkPrice: 680,
    image: "/category/1.jpg",
    category: "cotton",
    material: "100% Cotton",
    width: "44 inches",
    gsm: "140 GSM",
    colors: ["Red", "Blue", "Green"],
    inStock: true,
    tags: ["retail", "wholesale"],
    description: "This premium cotton fabric is perfect for fashion garments, home décor, and craft projects. Soft to touch with excellent durability and vibrant colors.",
    specifications: {
      "Material": "100% Cotton",
      "Width": "44 inches",
      "GSM": "140 GSM",
      "Weave": "Plain",
      "Care": "Machine wash cold",
      "Origin": "Tamil Nadu, India"
    }
  },
  {
    id: "2", 
    name: "Silk Blend Saree Fabric",
    price: 1200,
    bulkPrice: 950,
    image: "/category/2.jpg",
    category: "silk",
    material: "Silk Blend",
    width: "44 inches", 
    gsm: "160 GSM",
    colors: ["Gold", "Maroon", "Purple"],
    inStock: true,
    tags: ["retail", "wholesale"],
    description: "Luxurious silk blend fabric perfect for traditional sarees and ethnic wear. Features beautiful drape and lustrous finish.",
    specifications: {
      "Material": "Silk Blend",
      "Width": "44 inches",
      "GSM": "160 GSM",
      "Weave": "Satin",
      "Care": "Dry clean recommended",
      "Origin": "Karnataka, India"
    }
  },
  {
    id: "3",
    name: "Pure Linen Fabric",
    price: 950,
    bulkPrice: 750,
    image: "/category/3.jpg",
    category: "linen",
    material: "100% Linen",
    width: "44 inches",
    gsm: "120 GSM",
    colors: ["Natural", "White", "Beige"],
    inStock: true,
    tags: ["retail", "wholesale"],
    description: "Natural linen fabric with breathable texture, perfect for summer clothing and home textiles. Eco-friendly and sustainable choice.",
    specifications: {
      "Material": "100% Linen",
      "Width": "44 inches",
      "GSM": "120 GSM",
      "Weave": "Plain",
      "Care": "Machine wash gentle",
      "Origin": "West Bengal, India"
    }
  },
  {
    id: "4",
    name: "Organic Cotton Voile",
    price: 720,
    bulkPrice: 580,
    image: "/category/4.jpg",
    category: "cotton",
    material: "Organic Cotton",
    width: "44 inches",
    gsm: "100 GSM",
    colors: ["White", "Cream", "Light Blue"],
    inStock: true,
    tags: ["retail", "wholesale"],
    description: "Lightweight organic cotton voile with soft hand feel. Perfect for delicate garments, curtains, and summer wear.",
    specifications: {
      "Material": "Organic Cotton",
      "Width": "44 inches",
      "GSM": "100 GSM",
      "Weave": "Plain",
      "Care": "Machine wash cold",
      "Origin": "Gujarat, India"
    }
  },
  {
    id: "5",
    name: "Luxury Silk Dupioni",
    price: 1500,
    bulkPrice: 1200,
    image: "/category/5.jpg",
    category: "silk",
    material: "Pure Silk",
    width: "44 inches",
    gsm: "180 GSM",
    colors: ["Royal Blue", "Emerald", "Burgundy"],
    inStock: true,
    tags: ["retail", "wholesale"],
    description: "Premium silk dupioni with characteristic slub texture. Ideal for formal wear, evening gowns, and luxury home décor.",
    specifications: {
      "Material": "Pure Silk",
      "Width": "44 inches",
      "GSM": "180 GSM",
      "Weave": "Dupioni",
      "Care": "Dry clean only",
      "Origin": "Karnataka, India"
    }
  },
  {
    id: "6",
    name: "Premium Wool Blend Fabric",
    price: 1100,
    bulkPrice: 880,
    image: "/category/6.jpg",
    category: "wool",
    material: "Wool Blend",
    width: "44 inches",
    gsm: "220 GSM",
    colors: ["Charcoal", "Navy", "Brown"],
    inStock: true,
    tags: ["retail", "wholesale"],
    description: "High-quality wool blend fabric perfect for tailored garments, coats, and winter wear. Excellent drape and warmth retention.",
    specifications: {
      "Material": "Wool Blend",
      "Width": "44 inches",
      "GSM": "220 GSM",
      "Weave": "Twill",
      "Care": "Dry clean recommended",
      "Origin": "Punjab, India"
    }
  }
];

// Generate bulk pricing tiers based on product price
const generateBulkPricing = (price: number, bulkPrice: number) => [
  { quantity: "1-50 meters", price: price },
  { quantity: "51-100 meters", price: Math.round(price * 0.92) },
  { quantity: "101-500 meters", price: Math.round(price * 0.85) },
  { quantity: "500+ meters", price: bulkPrice }
];

// Generate reviews data
const generateReviews = () => ({
  rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10, // 3.5-5.0 rating
  count: Math.floor(Math.random() * 200) + 50 // 50-250 reviews
});

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Find the product by ID
  const product = mockProducts.find(p => p.id === id);
  
  // If product not found, show error
  if (!product) {
    return (
      <div className="container-custom py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      </div>
    );
  }
  
  // Generate dynamic data for this product
  const bulkPricing = generateBulkPricing(product.price, product.bulkPrice);
  const reviews = generateReviews();
  
  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      color: product.colors[0],
      material: product.material
    };
    
    addItem(cartItem);
    toast.success(`Added ${quantity} meters of ${product.name} to cart!`);
  };
  
  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="container-custom py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              {product.tags.includes("retail") && (
                <Badge variant="secondary">Retail</Badge>
              )}
              {product.tags.includes("wholesale") && (
                <Badge variant="outline">Wholesale</Badge>
              )}
            </div>
            <h1 className="text-section-title mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(reviews.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-muted-foreground">
                  {reviews.rating} ({reviews.count} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex justify-between mb-3">
              <span className="text-price text-highlight">₹{product.price}</span>
              <span className="text-sm text-muted-foreground">per meter</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Bulk pricing starting from ₹{product.bulkPrice}/meter
            </p>
            <details className="text-sm">
              <summary className="cursor-pointer text-highlight hover:underline">
                View bulk pricing tiers
              </summary>
              <div className="mt-2 space-y-1">
                {bulkPricing.map((tier, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{tier.quantity}</span>
                    <span>₹{tier.price}/meter</span>
                  </div>
                ))}
              </div>
            </details>
          </div>

          {/* Specifications Quick View */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Material:</span>
              <p className="font-medium">{product.material}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Width:</span>
              <p className="font-medium">{product.width}</p>
            </div>
            <div>
              <span className="text-muted-foreground">GSM:</span>
              <p className="font-medium">{product.gsm}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Stock:</span>
              <p className="font-medium text-green-600">In Stock</p>
            </div>
          </div>


          {/* Quantity */}
          <div>
            <label className="block font-medium mb-2">Quantity (meters)</label>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-32"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button onClick={handleAddToCart} className="flex-1 btn-primary">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ₹{(product.price * quantity).toLocaleString()}
              </Button>
              <Button variant="outline">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
            <Button onClick={handleBuyNow} className="w-full btn-accent">
              Buy Now - ₹{(product.price * quantity).toLocaleString()}
            </Button>
            <Button variant="outline" className="w-full">
              <MessageSquare className="w-5 h-5 mr-2" />
              Request Bulk Quote
            </Button>
          </div>

          {/* Features */}
          <div className="flex justify-between text-sm text-muted-foreground border-t pt-4">
            <div className="flex items-center">
              <Truck className="w-4 h-4 mr-1" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-1" />
              <span>Quality Assured</span>
            </div>
            <div className="flex items-center">
              <RotateCcw className="w-4 h-4 mr-1" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="care">Care Instructions</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed">{product.description}</p>
              <h3>Perfect for:</h3>
              <ul>
                <li>Fashion garments and apparel</li>
                <li>Home décor projects</li>
                <li>Craft and DIY projects</li>
                <li>Quilting and patchwork</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{key}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="care" className="mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Care Instructions</h3>
              <ul className="space-y-2">
                <li>• Machine wash cold with like colors</li>
                <li>• Use mild detergent</li>
                <li>• Tumble dry low or hang to dry</li>
                <li>• Iron on medium heat if needed</li>
                <li>• Do not bleach</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Shipping Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Domestic Shipping</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Free shipping on orders above ₹2000</li>
                    <li>• Standard delivery: 5-7 business days</li>
                    <li>• Express delivery: 2-3 business days</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">International Shipping</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Available to select countries</li>
                    <li>• Delivery: 10-15 business days</li>
                    <li>• Customs duties apply</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;