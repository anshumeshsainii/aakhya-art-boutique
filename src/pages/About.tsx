
import { useState } from 'react';
import { ArtworkData } from '../types/artwork';
import artworkData from '../data/artworks.json';

const About = () => {
  const [data] = useState<ArtworkData>(artworkData as ArtworkData);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 royal-gradient opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=1200&h=600&fit=crop&crop=center')`
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold animate-fade-in">
            About {data.artist.name}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-playfair font-bold text-royal-purple mb-6">
                  Artistic Journey
                </h2>
                <div className="w-16 h-1 bg-royal-gold mb-6"></div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {data.artist.bio}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {data.artist.statement}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-playfair font-semibold text-royal-purple mb-4">
                  Artistic Philosophy
                </h3>
                <blockquote className="text-gray-700 italic text-lg leading-relaxed">
                  "Every brushstroke carries emotion, every color tells a story. 
                  Through my art, I aim to create a dialogue between the viewer and the canvas, 
                  where imagination meets reality and dreams take tangible form."
                </blockquote>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=600&fit=crop&crop=center"
                  alt={`${data.artist.name} - Artist Portrait`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 royal-gradient rounded-full opacity-20"></div>
              <div className="absolute -top-8 -left-8 w-24 h-24 gold-gradient rounded-full opacity-30"></div>
            </div>
          </div>

          {/* Skills & Specializations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 royal-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">🎨</span>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-royal-purple mb-3">
                Traditional Painting
              </h3>
              <p className="text-gray-700">
                Specializing in oil and acrylic paintings with classical techniques and modern interpretations.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 royal-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">🖼️</span>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-royal-purple mb-3">
                Portrait Art
              </h3>
              <p className="text-gray-700">
                Creating lifelike portraits that capture not just appearance but the essence of the subject.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 royal-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">✨</span>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-royal-purple mb-3">
                Custom Commissions
              </h3>
              <p className="text-gray-700">
                Collaborating with clients to create personalized artwork that tells their unique story.
              </p>
            </div>
          </div>

          {/* Experience & Recognition */}
          <div className="bg-royal-purple text-white rounded-lg p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold mb-4">
                Experience & Recognition
              </h2>
              <div className="w-16 h-1 bg-royal-gold mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-royal-gold mb-2">10+</div>
                <div className="text-lg">Years of Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-royal-gold mb-2">200+</div>
                <div className="text-lg">Artworks Created</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-royal-gold mb-2">150+</div>
                <div className="text-lg">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-royal-gold mb-2">5+</div>
                <div className="text-lg">Exhibitions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-playfair font-bold text-royal-purple mb-6">
            Ready to Commission Your Own Masterpiece?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Let's collaborate to create something unique and meaningful. 
            Whether it's a portrait, landscape, or abstract piece, every commission is a new adventure.
          </p>
          <div className="space-x-4">
            <a
              href="https://wa.me/917379340224"
              target="_blank"
              rel="noopener noreferrer"
              className="gold-button text-lg px-8 py-4"
            >
              Start a Commission
            </a>
            <a
              href={`mailto:${data.artist.email}`}
              className="royal-button text-lg px-8 py-4"
            >
              Send Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
