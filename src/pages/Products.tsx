import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Filter, Search, Grid, List, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";

// Mock product data
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
    tags: ["retail", "wholesale"]
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
    tags: ["retail", "wholesale"]
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
    tags: ["retail", "wholesale"]
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
    tags: ["retail", "wholesale"]
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
    tags: ["retail", "wholesale"]
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
    tags: ["retail", "wholesale"]
  }
];

const categories = [
  { id: "all", name: "All Fabrics" },
  { id: "cotton", name: "Cotton" },
  { id: "silk", name: "Silk" },
  { id: "linen", name: "Linen" },
  { id: "wool", name: "Wool Fabrics" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  
  // Handle URL parameters for category filtering
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);
  
  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Price range filtering
    let matchesPriceRange = true;
    if (selectedPriceRanges.length > 0) {
      matchesPriceRange = selectedPriceRanges.some(range => {
        switch (range) {
          case "under-500":
            return product.price < 500;
          case "500-1000":
            return product.price >= 500 && product.price <= 1000;
          case "1000-2000":
            return product.price >= 1000 && product.price <= 2000;
          case "above-2000":
            return product.price > 2000;
          default:
            return true;
        }
      });
    }
    
    return matchesCategory && matchesSearch && matchesPriceRange;
  });
  
  const handlePriceRangeChange = (range: string, checked: boolean) => {
    if (checked) {
      setSelectedPriceRanges(prev => [...prev, range]);
    } else {
      setSelectedPriceRanges(prev => prev.filter(r => r !== range));
    }
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

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-hero mb-4">
          {selectedCategory === 'all' 
            ? 'Our Premium Fabrics' 
            : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Fabrics`
          }
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {selectedCategory === 'all' 
            ? 'Discover our extensive collection of premium fabrics, perfect for fashion, home décor, and custom projects.'
            : `Explore our premium ${selectedCategory} fabric collection with various colors, patterns, and quality options.`
          }
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search fabrics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>

        {/* Filter Toggle */}
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="font-heading font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    selectedCategory === category.id
                      ? "bg-highlight text-highlight-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-heading font-semibold mb-4">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    className="rounded" 
                    checked={selectedPriceRanges.includes("under-500")}
                    onChange={(e) => handlePriceRangeChange("under-500", e.target.checked)}
                  />
                  <span>Under ₹500</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    className="rounded" 
                    checked={selectedPriceRanges.includes("500-1000")}
                    onChange={(e) => handlePriceRangeChange("500-1000", e.target.checked)}
                  />
                  <span>₹500 - ₹1000</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    className="rounded" 
                    checked={selectedPriceRanges.includes("1000-2000")}
                    onChange={(e) => handlePriceRangeChange("1000-2000", e.target.checked)}
                  />
                  <span>₹1000 - ₹2000</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    className="rounded" 
                    checked={selectedPriceRanges.includes("above-2000")}
                    onChange={(e) => handlePriceRangeChange("above-2000", e.target.checked)}
                  />
                  <span>Above ₹2000</span>
                </label>
              </div>
              {selectedPriceRanges.length > 0 && (
                <button
                  onClick={() => setSelectedPriceRanges([])}
                  className="text-sm text-highlight hover:underline mt-2"
                >
                  Clear price filters
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} products
                {selectedCategory !== 'all' && (
                  <span className="ml-2">
                    in <span className="font-medium capitalize">{selectedCategory}</span> category
                  </span>
                )}
              </p>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => handleCategoryChange('all')}
                  className="text-sm text-highlight hover:underline mt-1"
                >
                  Clear category filter
                </button>
              )}
            </div>
          </div>

          <div className={viewMode === "grid" ? "grid-products" : "space-y-4"}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;