import React from 'react';
import { 
  Smartphone, 
  Laptop, 
  Car, 
  Home, 
  Briefcase, 
  Shirt, 
  Armchair, 
  Trophy, 
  BookOpen, 
  Wrench, 
  Package,
  Layers
} from 'lucide-react';
import { CategoryType } from '../types';

interface CategoryIconProps {
  category: CategoryType | string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ category, className = 'w-5 h-5' }) => {
  switch (category) {
    case 'Mobiles':
      return <Smartphone className={className} />;
    case 'Electronics':
      return <Laptop className={className} />;
    case 'Vehicles':
      return <Car className={className} />;
    case 'Property':
      return <Home className={className} />;
    case 'Jobs':
      return <Briefcase className={className} />;
    case 'Fashion':
      return <Shirt className={className} />;
    case 'Home & Garden':
      return <Armchair className={className} />;
    case 'Sports':
      return <Trophy className={className} />;
    case 'Books':
      return <BookOpen className={className} />;
    case 'Services':
      return <Wrench className={className} />;
    case 'Other':
      return <Package className={className} />;
    default:
      return <Layers className={className} />;
  }
};
