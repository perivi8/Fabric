import { Link, useLocation } from "react-router-dom";
import { CheckCircle, Package, MessageCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderSuccess = () => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;
  
  const orderId = "JCT" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'debit': return 'Debit Card';
      case 'credit': return 'Credit Card';
      case 'netbanking': return 'Internet Banking';
      default: return 'Online Payment';
    }
  };

  return (
    <div className="container-custom py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-section-title mb-4">Order Placed Successfully!</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Thank you for your order. We're processing it and will notify you once it's shipped.
        </p>

        {/* Order Details Card */}
        <div className="fabric-card p-8 mb-8 text-left">
          {/* Order Items */}
          {orderDetails?.items && (
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Order Items</h3>
              <div className="space-y-3">
                {orderDetails.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} meters × ₹{item.price}/meter
                      </p>
                    </div>
                    <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Order Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-mono font-medium">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Date:</span>
                  <span>{new Date().toLocaleDateString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>₹{orderDetails?.subtotal?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%):</span>
                  <span>₹{orderDetails?.gstAmount?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span>{orderDetails?.shipping === 0 ? 'Free' : `₹${orderDetails?.shipping || 0}`}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="text-highlight">₹{orderDetails?.total?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span>{getPaymentMethodName(orderDetails?.paymentMethod || '')}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Delivery Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <Package className="w-4 h-4 mr-2 mt-0.5 text-highlight" />
                  <div>
                    <p className="font-medium">Estimated Delivery</p>
                    <p className="text-muted-foreground">{estimatedDelivery}</p>
                  </div>
                </div>
                {orderDetails?.customerInfo && (
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium mb-1">Shipping Address:</p>
                    <p className="text-sm">
                      {orderDetails.customerInfo.firstName} {orderDetails.customerInfo.lastName}<br/>
                      {orderDetails.customerInfo.address}<br/>
                      {orderDetails.customerInfo.city}, {orderDetails.customerInfo.state} {orderDetails.customerInfo.pincode}
                    </p>
                  </div>
                )}
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-800 text-sm">
                    📦 Your order will be carefully packaged and shipped within 1-2 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center"
          >
            <Button className="btn-accent">
              <MessageCircle className="w-4 h-4 mr-2" />
              Reorder via WhatsApp
            </Button>
          </a>
          <Link to="/products">
            <Button variant="outline">
              Continue Shopping
            </Button>
          </Link>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
        </div>

        {/* What's Next */}
        <div className="bg-muted/50 p-6 rounded-lg">
          <h3 className="font-semibold mb-4">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="w-8 h-8 bg-highlight text-highlight-foreground rounded-full flex items-center justify-center mx-auto mb-2">
                1
              </div>
              <p className="font-medium">Order Processing</p>
              <p className="text-muted-foreground">We'll prepare your fabrics with care</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-highlight text-highlight-foreground rounded-full flex items-center justify-center mx-auto mb-2">
                2
              </div>
              <p className="font-medium">Quality Check</p>
              <p className="text-muted-foreground">Each fabric is inspected before shipping</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-highlight text-highlight-foreground rounded-full flex items-center justify-center mx-auto mb-2">
                3
              </div>
              <p className="font-medium">Delivery</p>
              <p className="text-muted-foreground">Safe delivery to your doorstep</p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Need help with your order? We're here to assist you.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/contact">
              <Button variant="ghost" size="sm">Contact Support</Button>
            </Link>
            <a href="mailto:info@jaichitratextile.com">
              <Button variant="ghost" size="sm">Email Us</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;