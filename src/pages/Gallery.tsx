
import { useState, useMemo } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import EnhancedArtworkCard from '../components/EnhancedArtworkCard';
import ShoppingCart as ShoppingCartComponent from '../components/ShoppingCart';
import { ArtworkData } from '../types/artwork';
import { useCart } from '../contexts/CartContext';
import artworkData from '../data/artworks.json';

const Gallery = () => {
  const [data] = useState<ArtworkData>(artworkData as ArtworkData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { state } = useCart();

  const categories = ['all', ...new Set(data.artworks.map(artwork => artwork.category))];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-1000', label: 'Under ₹1,000' },
    { value: '1000-2000', label: '₹1,000 - ₹2,000' },
    { value: '2000-3000', label: '₹2,000 - ₹3,000' },
    { value: '3000+', label: 'Above ₹3,000' },
  ];

  const filteredAndSortedArtworks = useMemo(() => {
    let filtered = data.artworks.filter(artwork => {
      const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           artwork.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || artwork.category === selectedCategory;
      
      let matchesPrice = true;
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
        if (max) {
          matchesPrice = artwork.price >= parseInt(min) && artwork.price <= parseInt(max);
        } else {
          matchesPrice = artwork.price >= parseInt(min);
        }
      }

      return matchesSearch && matchesCategory && matchesPrice && artwork.available;
    });

    // Sort artworks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'title':
          return a.title.localeCompare(b.title);
        default: // newest
          return b.featured ? 1 : -1; // Featured items first
      }
    });

    return filtered;
  }, [data.artworks, searchTerm, selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-cream via-white to-royal-cream/50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-royal-gold/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-cormorant font-bold text-royal-purple mb-4">
                Art Gallery
              </h1>
              <p className="text-lg text-gray-700">
                Discover {data.artworks.length} exquisite pieces of artwork
              </p>
            </div>
            
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative gold-button flex items-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {state.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="glass-morphism rounded-xl shadow-lg p-6 mb-8 luxury-shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search artwork..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-royal-gold/30 rounded-lg focus:ring-2 focus:ring-royal-purple focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-royal-gold/30 rounded-lg focus:ring-2 focus:ring-royal-purple focus:border-transparent bg-white/80 backdrop-blur-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            {/* Price Range */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-3 border border-royal-gold/30 rounded-lg focus:ring-2 focus:ring-royal-purple focus:border-transparent bg-white/80 backdrop-blur-sm"
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-royal-gold/30 rounded-lg focus:ring-2 focus:ring-royal-purple focus:border-transparent bg-white/80 backdrop-blur-sm"
            >
              <option value="newest">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="title">Title: A to Z</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600 font-montserrat">
            Showing {filteredAndSortedArtworks.length} of {data.artworks.length} artworks
          </p>
        </div>

        {/* Gallery Grid */}
        {filteredAndSortedArtworks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 royal-gradient rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-cormorant font-semibold text-gray-600 mb-2">
              No artworks found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAndSortedArtworks.map((artwork, index) => (
              <div 
                key={artwork.id}
                className="animate-fade-in-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <EnhancedArtworkCard artwork={artwork} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shopping Cart Sidebar */}
      <ShoppingCartComponent 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </div>
  );
};

export default Gallery;
