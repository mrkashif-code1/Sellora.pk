export type CategoryType = 
  | 'Mobiles'
  | 'Electronics'
  | 'Vehicles'
  | 'Property'
  | 'Jobs'
  | 'Fashion'
  | 'Home & Garden'
  | 'Sports'
  | 'Books'
  | 'Services'
  | 'Other';

export type ItemCondition = 'Brand New' | 'Like New' | 'Excellent' | 'Good' | 'Fair';

export type AdStatus = 'active' | 'pending' | 'rejected' | 'sold';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  avatar: string;
  bio?: string;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  role: 'user' | 'admin';
  createdAt: string;
  isSuspended?: boolean;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  isNegotiable: boolean;
  category: CategoryType;
  subcategory?: string;
  condition: ItemCondition;
  images: string[];
  city: string;
  locality: string;
  sellerId: string;
  sellerName: string;
  sellerPhone: string;
  showPhone: boolean;
  whatsappEnabled: boolean;
  status: AdStatus;
  isFeatured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  rejectionReason?: string;
  specifications?: Record<string, string>;
}

export interface CategoryInfo {
  id: CategoryType;
  name: string;
  icon: string;
  count: number;
  subcategories: string[];
  popular: boolean;
  description: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  adId: string;
  text: string;
  createdAt: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  adId: string;
  adTitle: string;
  adPrice: number;
  adImage: string;
  sellerId: string;
  buyerId: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCountUser: number;
  unreadCountOther: number;
}

export interface Favorite {
  id: string;
  userId: string;
  adId: string;
  createdAt: string;
}

export interface AdReport {
  id: string;
  adId: string;
  adTitle: string;
  reporterId: string;
  reporterName: string;
  reason: 'Spam' | 'Fraud / Scam' | 'Inappropriate Content' | 'Wrong Category' | 'Duplicate Ad' | 'Other';
  details: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface SearchFilterParams {
  keyword?: string;
  category?: CategoryType | 'All';
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: ItemCondition | 'All';
  sortBy?: 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'popular';
  featuredOnly?: boolean;
}
