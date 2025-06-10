
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Artwork } from '../types/artwork';
import { useCart } from '../contexts/CartContext';

interface EnhancedArtworkCardProps {
  artwork: Artwork;
}

const EnhancedArtworkCard = ({ artwork }: EnhancedArtworkCardProps) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(artwork.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(artwork);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(artwork.id);
    } else {
      addToWishlist(artwork);
    }
  };

  return (
    <div className="artwork-card group relative">
      <div className="relative overflow-hidden">
        <Link to={`/artwork/${artwork.id}`}>
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-4 left-4 right-4 space-y-3">
            <div className="flex space-x-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-royal-gold hover:bg-royal-gold-light text-royal-purple font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  inWishlist 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 space-y-2">
          {artwork.featured && (
            <span className="bg-royal-gold text-royal-purple px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
              <Star className="w-3 h-3 fill-current" />
              <span>Featured</span>
            </span>
          )}
          {artwork.limitedEdition && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Limited Edition
            </span>
          )}
        </div>

        {/* Wishlist indicator */}
        {inWishlist && (
          <div className="absolute top-4 right-4">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
          </div>
        )}
      </div>
      
      <div className="p-6 space-y-3 bg-gradient-to-b from-white to-gray-50">
        <Link to={`/artwork/${artwork.id}`}>
          <h3 className="text-xl font-playfair font-semibold text-royal-purple hover:text-royal-gold transition-colors">
            {artwork.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="capitalize bg-royal-purple/10 text-royal-purple px-3 py-1 rounded-full font-medium">
            {artwork.category}
          </span>
          <span className="font-medium">{artwork.size}</span>
        </div>
        
        <p className="text-gray-700 text-sm line-clamp-2 leading-relaxed">
          {artwork.description}
        </p>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <span className="text-2xl font-bold text-royal-purple">
            ₹{artwork.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {artwork.medium}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedArtworkCard;
