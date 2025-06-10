
export interface Artist {
  name: string;
  bio: string;
  phone: string;
  email: string;
  socialMedia: {
    instagram: string;
    facebook: string;
  };
  statement: string;
}

export interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  size: string;
  medium: string;
  category: string;
  imageUrl: string;
  available: boolean;
  featured: boolean;
}

export interface ArtworkData {
  artist: Artist;
  artworks: Artwork[];
}
