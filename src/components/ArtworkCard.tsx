
import { Link } from 'react-router-dom';
import { Artwork } from '../types/artwork';

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  const generateWhatsAppLink = () => {
    const message = `Hello Aakhya, I'm interested in purchasing "${artwork.title}". Please provide payment details.`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/917379340224?text=${encodedMessage}`;
  };

  return (
    <div className="artwork-card group">
      <div className="relative overflow-hidden">
        <Link to={`/artwork/${artwork.id}`}>
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full gold-button text-center block"
            >
              Buy via WhatsApp
            </a>
          </div>
        </div>
        {artwork.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-royal-gold text-royal-purple px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 space-y-3">
        <Link to={`/artwork/${artwork.id}`}>
          <h3 className="text-xl font-playfair font-semibold text-royal-purple hover:text-royal-gold transition-colors">
            {artwork.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="capitalize bg-gray-100 px-2 py-1 rounded">{artwork.category}</span>
          <span>{artwork.size}</span>
        </div>
        
        <p className="text-gray-700 text-sm line-clamp-2">{artwork.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-royal-purple">₹{artwork.price.toLocaleString()}</span>
          <span className="text-sm text-gray-500">{artwork.medium}</span>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
