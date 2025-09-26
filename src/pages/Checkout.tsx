import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Building2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/contexts/CartContext";


const Checkout = () => {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("debit");
  const [formData, setFormData] = useState({
    // Customer Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    
    // Shipping Address
    address: "",
    city: "",
    state: "",
    pincode: "",
    
    // Payment
    saveInfo: false
  });

  const subtotal = state.total;
  const shipping = subtotal > 2000 ? 0 : 200;
  const gstRate = 0.18;
  const gstAmount = subtotal * gstRate;
  const totalWithGst = subtotal + gstAmount + shipping;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      navigate("/order-success", {
        state: {
          orderDetails: {
            items: state.items,
            subtotal,
            gstAmount,
            shipping,
            total: totalWithGst,
            customerInfo: formData,
            paymentMethod
          }
        }
      });
    }, 1000);
  };

  const steps = [
    { id: 1, name: "Customer Info", completed: currentStep > 1 },
    { id: 2, name: "Shipping", completed: currentStep > 2 },
    { id: 3, name: "Payment", completed: currentStep > 3 },
    { id: 4, name: "Review", completed: false }
  ];

  return (
    <div className="container-custom py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/cart">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>
        </Link>
        <h1 className="text-section-title">Checkout</h1>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.completed || currentStep === step.id
                    ? "bg-highlight text-highlight-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step.id}
              </div>
              <span className={`ml-2 text-sm ${currentStep === step.id ? "font-medium" : "text-muted-foreground"}`}>
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${step.completed ? "bg-highlight" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Customer Information */}
            {currentStep === 1 && (
              <div className="fabric-card p-6">
                <h3 className="text-card-title mb-6">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
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
                      required
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <Button type="button" onClick={() => setCurrentStep(2)} className="btn-primary">
                    Continue to Shipping
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Shipping Address */}
            {currentStep === 2 && (
              <div className="fabric-card p-6">
                <h3 className="text-card-title mb-6">Shipping Address</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Street address"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button type="button" onClick={() => setCurrentStep(3)} className="btn-primary">
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <div className="fabric-card p-6">
                <h3 className="text-card-title mb-6">Payment Method</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="debit" id="debit" />
                      <CreditCard className="w-5 h-5 text-highlight" />
                      <div className="flex-1">
                        <Label htmlFor="debit" className="cursor-pointer">Debit Card</Label>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay debit cards</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="credit" id="credit" />
                      <CreditCard className="w-5 h-5 text-highlight" />
                      <div className="flex-1">
                        <Label htmlFor="credit" className="cursor-pointer">Credit Card</Label>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay credit cards</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Building2 className="w-5 h-5 text-highlight" />
                      <div className="flex-1">
                        <Label htmlFor="netbanking" className="cursor-pointer">Internet Banking</Label>
                        <p className="text-sm text-muted-foreground">All major Indian banks supported</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
                
                <div className="mt-6 flex items-center space-x-2">
                  <Checkbox
                    id="saveInfo"
                    checked={formData.saveInfo}
                    onCheckedChange={(checked) => handleInputChange("saveInfo", checked as boolean)}
                  />
                  <Label htmlFor="saveInfo" className="text-sm">
                    Save my information for faster checkout next time
                  </Label>
                </div>
                
                <div className="mt-6 flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button type="button" onClick={() => setCurrentStep(4)} className="btn-primary">
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Review Order */}
            {currentStep === 4 && (
              <div className="fabric-card p-6">
                <h3 className="text-card-title mb-6">Review Your Order</h3>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity} meters</p>
                      </div>
                      <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Customer Details Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium mb-2">Customer Information</h4>
                    <p className="text-sm">{formData.firstName} {formData.lastName}</p>
                    <p className="text-sm">{formData.email}</p>
                    <p className="text-sm">{formData.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <p className="text-sm">{formData.address}</p>
                    <p className="text-sm">{formData.city}, {formData.state} {formData.pincode}</p>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(3)}>
                    Back
                  </Button>
                  <Button type="submit" className="btn-primary">
                    Place Order - ₹{totalWithGst.toLocaleString()}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="fabric-card p-6 sticky top-24">
            <h3 className="text-card-title mb-4">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}m</span>
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 border-t pt-4">
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
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total (incl. GST)</span>
                  <span className="text-highlight">₹{totalWithGst.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;