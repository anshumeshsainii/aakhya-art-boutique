
import React from 'react';
import { X, Minus, Plus, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart = ({ isOpen, onClose }: ShoppingCartProps) => {
  const { state, removeFromCart, updateQuantity, clearCart, generateWhatsAppMessage } = useCart();

  const handleWhatsAppCheckout = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/917379340224?text=${message}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-playfair font-semibold text-royal-purple">
              Shopping Cart ({state.items.length})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-playfair font-semibold text-gray-600 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500">
                  Add some beautiful artwork to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.artwork.id} className="flex space-x-4 bg-gray-50 rounded-lg p-4">
                    <img
                      src={item.artwork.imageUrl}
                      alt={item.artwork.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-playfair font-semibold text-royal-purple">
                        {item.artwork.title}
                      </h4>
                      <p className="text-sm text-gray-600">{item.artwork.size}</p>
                      <p className="text-lg font-bold text-royal-purple">
                        ₹{item.artwork.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <button
                        onClick={() => removeFromCart(item.artwork.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.artwork.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-royal-purple transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.artwork.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-royal-purple transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-playfair font-semibold text-royal-purple">
                  Total:
                </span>
                <span className="text-2xl font-bold text-royal-purple">
                  ₹{state.total.toLocaleString()}
                </span>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full gold-button py-3 text-center"
                >
                  Buy via WhatsApp
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-gray-500 hover:text-red-500 transition-colors text-sm"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
