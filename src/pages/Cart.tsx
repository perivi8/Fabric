import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";


const Cart = () => {
  const { state, updateQuantity, removeItem } = useCart();
  const [notes, setNotes] = useState("");

  const subtotal = state.total;
  const shipping = subtotal > 2000 ? 0 : 200;
  const gstRate = 0.18; // 18% GST
  const gstAmount = subtotal * gstRate;
  const totalWithGst = subtotal + gstAmount + shipping;

  if (state.items.length === 0) {
    return (
      <div className="container-custom py-16">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-section-title mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Discover our beautiful fabric collection and add some items to your cart.
          </p>
          <Link to="/products">
            <Button className="btn-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/products">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
        <h1 className="text-section-title">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {state.items.map((item) => (
            <div key={item.id} className="fabric-card p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-card-title">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {item.material} • Color: {item.color}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center">{item.quantity}m</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-price">₹{(item.price * item.quantity).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">₹{item.price}/meter</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Notes */}
          <div className="fabric-card p-6">
            <h3 className="font-medium mb-3">Order Notes (Optional)</h3>
            <Textarea
              placeholder="Special instructions for your order..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="fabric-card p-6 sticky top-24">
            <h3 className="text-card-title mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{gstAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600" : ""}>
                  {shipping === 0 ? "Free" : `₹${shipping}`}
                </span>
              </div>
              {shipping === 0 && (
                <p className="text-sm text-green-600">
                  🎉 You saved ₹200 on shipping!
                </p>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total (incl. GST)</span>
                  <span className="text-highlight">₹{totalWithGst.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link to="/checkout" className="block">
                <Button className="w-full btn-primary">
                  Proceed to Checkout
                </Button>
              </Link>
              <Link to="/bulk-inquiry" className="block">
                <Button variant="outline" className="w-full">
                  Request Bulk Quote
                </Button>
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium mb-2">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Contact us for bulk orders or custom requirements.
              </p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                WhatsApp: +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;