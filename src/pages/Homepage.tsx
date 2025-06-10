
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArtworkCard from '../components/ArtworkCard';
import { ArtworkData } from '../types/artwork';
import artworkData from '../data/artworks.json';

const Homepage = () => {
  const [data] = useState<ArtworkData>(artworkData as ArtworkData);
  const featuredArtworks = data.artworks.filter(artwork => artwork.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 royal-gradient opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&crop=center')`
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 animate-fade-in">
            Royal Art Gallery
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light animate-fade-in" style={{animationDelay: '0.3s'}}>
            Discover exquisite artwork by {data.artist.name}
          </p>
          <p className="text-lg mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.6s'}}>
            {data.artist.statement}
          </p>
          <div className="space-x-4 animate-fade-in" style={{animationDelay: '0.9s'}}>
            <Link to="/gallery" className="gold-button text-lg px-8 py-4">
              Browse Gallery
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-royal-purple font-medium px-8 py-4 rounded-lg transition-all duration-300"
            >
              Commission Art
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-royal-purple mb-6">
              Featured Collection
            </h2>
            <div className="w-24 h-1 bg-royal-gold mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Handpicked masterpieces that showcase the finest artistic expression and emotional depth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtworks.map((artwork, index) => (
              <div 
                key={artwork.id} 
                className="animate-scale-in"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <ArtworkCard artwork={artwork} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/gallery" className="royal-button text-lg px-8 py-4">
              View All Artwork
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-playfair font-bold text-royal-purple">
                Meet the Artist
              </h2>
              <div className="w-16 h-1 bg-royal-gold"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {data.artist.bio}
              </p>
              <Link to="/about" className="royal-button inline-block">
                Learn More
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=600&fit=crop&crop=center"
                  alt="Artist Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 royal-gradient rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 royal-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-playfair font-bold mb-6">
            Ready to Own a Masterpiece?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our collection and purchase directly through WhatsApp for a seamless experience
          </p>
          <div className="space-x-4">
            <Link to="/gallery" className="gold-button text-lg px-8 py-4">
              Browse Gallery
            </Link>
            <a
              href="https://wa.me/917379340224"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-royal-purple font-medium px-8 py-4 rounded-lg transition-all duration-300 inline-block"
            >
              Contact via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
