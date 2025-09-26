import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, MessageSquare, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  bulkPrice: number;
  image: string;
  category: string;
  material: string;
  width: string;
  gsm: string;
  colors: string[];
  inStock: boolean;
  tags: string[];
}

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

const ProductCard = ({ product, viewMode = "grid" }: ProductCardProps) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      color: product.colors[0],
      material: product.material
    };
    
    addItem(cartItem);
    toast.success(`Added ${product.name} to cart!`);
  };
  
  const handleQuoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/bulk-inquiry');
  };
  if (viewMode === "list") {
    return (
      <div className="fabric-card flex flex-col md:flex-row">
        <Link to={`/products/${product.id}`} className="md:w-48 h-48 md:h-32 block">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </Link>
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex-1">
              <Link to={`/products/${product.id}`} className="block">
                <h3 className="text-card-title hover:text-highlight transition-colors mb-2">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mb-2">
                {product.tags.includes("retail") && (
                  <Badge variant="secondary">Retail</Badge>
                )}
                {product.tags.includes("wholesale") && (
                  <Badge variant="outline">Wholesale</Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                {product.material} • {product.width} • {product.gsm}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {product.colors.slice(0, 3).map((color) => (
                  <span key={color} className="text-xs bg-muted px-2 py-1 rounded">
                    {color}
                  </span>
                ))}
                {product.colors.length > 3 && (
                  <span className="text-xs bg-muted px-2 py-1 rounded">
                    +{product.colors.length - 3}
                  </span>
                )}
              </div>
            </div>
            <div className="md:text-right">
              <div className="mb-3">
                <p className="text-price text-highlight">₹{product.price}/meter</p>
                <p className="text-sm text-muted-foreground">Bulk: ₹{product.bulkPrice}/meter</p>
              </div>
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Button onClick={handleAddToCart} size="sm" className="btn-primary" disabled={!product.inStock}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button onClick={handleQuoteClick} size="sm" variant="outline">
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fabric-card group relative">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {product.tags.includes("retail") && (
              <Badge variant="secondary">Retail</Badge>
            )}
            {product.tags.includes("wholesale") && (
              <Badge variant="outline" className="bg-white/90">Wholesale</Badge>
            )}
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-card-title hover:text-highlight transition-colors mb-2">
            {product.name}
          </h3>
        
        <p className="text-muted-foreground text-sm mb-3">
          {product.material} • {product.width} • {product.gsm}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.colors.slice(0, 3).map((color) => (
            <span key={color} className="text-xs bg-muted px-2 py-1 rounded">
              {color}
            </span>
          ))}
          {product.colors.length > 3 && (
            <span className="text-xs bg-muted px-2 py-1 rounded">
              +{product.colors.length - 3}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-price text-highlight">₹{product.price}/m</p>
            <p className="text-xs text-muted-foreground">Bulk: ₹{product.bulkPrice}/m</p>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Package className="w-4 h-4 mr-1" />
            <span className="text-xs">{product.inStock ? "In Stock" : "Out of Stock"}</span>
          </div>
        </div>

        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <Button onClick={handleAddToCart} size="sm" className="flex-1 btn-primary" disabled={!product.inStock}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button onClick={handleQuoteClick} size="sm" variant="outline">
            <MessageSquare className="w-4 h-4" />
          </Button>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default ProductCard;