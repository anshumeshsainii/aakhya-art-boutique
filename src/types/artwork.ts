
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
  limitedEdition?: boolean;
  arPreviewUrl?: string;
}

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  review: string;
  date: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
}

export interface ArtworkData {
  artist: Artist;
  artworks: Artwork[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
}
