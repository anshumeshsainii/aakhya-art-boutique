
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import ArtworkCard from '../components/ArtworkCard';
import { ArtworkData, Artwork } from '../types/artwork';
import artworkData from '../data/artworks.json';

const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [data] = useState<ArtworkData>(artworkData as ArtworkData);
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [relatedArtworks, setRelatedArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    const foundArtwork = data.artworks.find(art => art.id === id);
    setArtwork(foundArtwork || null);

    if (foundArtwork) {
      const related = data.artworks
        .filter(art => art.id !== id && art.category === foundArtwork.category)
        .slice(0, 3);
      setRelatedArtworks(related);
    }
  }, [id, data.artworks]);

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-playfair font-bold text-royal-purple mb-4">
            Artwork Not Found
          </h1>
          <Link to="/gallery" className="royal-button">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/gallery" 
            className="inline-flex items-center space-x-2 text-royal-purple hover:text-royal-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Gallery</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg bg-white p-4">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            
            {artwork.featured && (
              <div className="text-center">
                <span className="bg-royal-gold text-royal-purple px-4 py-2 rounded-full font-semibold">
                  ⭐ Featured Artwork
                </span>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-playfair font-bold text-royal-purple mb-4">
                {artwork.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
                <span className="capitalize bg-gray-100 px-3 py-1 rounded-full">
                  {artwork.category}
                </span>
                <span>•</span>
                <span>{artwork.size}</span>
                <span>•</span>
                <span>{artwork.medium}</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-playfair font-semibold text-royal-purple mb-3">
                About This Piece
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {artwork.description}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-3xl font-bold text-royal-purple">
                    ₹{artwork.price.toLocaleString()}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    {artwork.available ? 'Available for purchase' : 'Currently unavailable'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Medium</p>
                  <p className="font-semibold">{artwork.medium}</p>
                </div>
              </div>

              {artwork.available && (
                <WhatsAppButton 
                  artwork={artwork} 
                  className="w-full justify-center text-lg py-4"
                />
              )}
            </div>

            <div className="bg-royal-purple text-white rounded-lg p-6">
              <h3 className="text-lg font-playfair font-semibold mb-3">
                Interested in Custom Work?
              </h3>
              <p className="text-gray-200 mb-4">
                Commission a personalized piece from {data.artist.name}. 
                Discuss your vision and create something unique for your space.
              </p>
              <Link 
                to="/contact" 
                className="gold-button inline-block"
              >
                Request Commission
              </Link>
            </div>
          </div>
        </div>

        {/* Related Artworks */}
        {relatedArtworks.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-playfair font-bold text-royal-purple mb-8 text-center">
              More from this Collection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArtworks.map((relatedArtwork) => (
                <ArtworkCard key={relatedArtwork.id} artwork={relatedArtwork} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkDetail;
