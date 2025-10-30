import {
  Instagram,
  Twitter,
  Youtube,
  Github,
  Linkedin,
  Facebook,
  Globe,
  Mail,
  Music,
  ShoppingCart,
  Video,
  Camera,
  MessageCircle,
  Phone,
  MapPin,
  Heart,
  Star,
  Zap,
  Link as LinkIcon,
} from 'lucide-react';

export const iconOptions = [
  { value: 'instagram', label: 'Instagram', icon: Instagram },
  { value: 'twitter', label: 'Twitter', icon: Twitter },
  { value: 'youtube', label: 'YouTube', icon: Youtube },
  { value: 'github', label: 'GitHub', icon: Github },
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { value: 'facebook', label: 'Facebook', icon: Facebook },
  { value: 'globe', label: 'Website', icon: Globe },
  { value: 'mail', label: 'Email', icon: Mail },
  { value: 'music', label: 'Music', icon: Music },
  { value: 'shop', label: 'Shop', icon: ShoppingCart },
  { value: 'video', label: 'Video', icon: Video },
  { value: 'camera', label: 'Camera', icon: Camera },
  { value: 'message', label: 'Message', icon: MessageCircle },
  { value: 'phone', label: 'Phone', icon: Phone },
  { value: 'location', label: 'Location', icon: MapPin },
  { value: 'heart', label: 'Heart', icon: Heart },
  { value: 'star', label: 'Star', icon: Star },
  { value: 'zap', label: 'Zap', icon: Zap },
  { value: 'link', label: 'Link', icon: LinkIcon },
];

export const getLinkIcon = (iconName: string) => {
  const icon = iconOptions.find(opt => opt.value === iconName);
  return icon ? icon.icon : LinkIcon;
};
