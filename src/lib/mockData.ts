import { User, Link } from './types';

// Mock database storage
let users: User[] = [
  {
    id: 1,
    username: 'johndoe',
    name: 'John Doe',
    bio: 'Digital Creator | Tech Enthusiast | Coffee Lover ☕',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    backgroundImage: '',
    theme: 'default',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    username: 'janedoe',
    name: 'Jane Doe',
    bio: 'Designer & Photographer 📸',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    backgroundImage: '',
    theme: 'ocean',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 3,
    username: 'alexsmith',
    name: 'Alex Smith',
    bio: 'Music Producer 🎵 | Content Creator',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    backgroundImage: '',
    theme: 'sunset',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
];

let links: Link[] = [
  {
    id: 1,
    userId: 1,
    title: 'Instagram',
    url: 'https://instagram.com/johndoe',
    icon: 'instagram',
    orderIndex: 0,
    clickCount: 145,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    userId: 1,
    title: 'Twitter',
    url: 'https://twitter.com/johndoe',
    icon: 'twitter',
    orderIndex: 1,
    clickCount: 98,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 3,
    userId: 1,
    title: 'YouTube',
    url: 'https://youtube.com/@johndoe',
    icon: 'youtube',
    orderIndex: 2,
    clickCount: 234,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 4,
    userId: 1,
    title: 'Portfolio',
    url: 'https://johndoe.com',
    icon: 'globe',
    orderIndex: 3,
    clickCount: 187,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 5,
    userId: 1,
    title: 'GitHub',
    url: 'https://github.com/johndoe',
    icon: 'github',
    orderIndex: 4,
    clickCount: 156,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// Helper functions
export const getUsers = () => users;

export const getUserByUsername = (username: string) => {
  return users.find(u => u.username.toLowerCase() === username.toLowerCase());
};

export const getUserById = (id: number) => {
  return users.find(u => u.id === id);
};

export const createUser = (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newUser: User = {
    ...userData,
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id: number, updates: Partial<User>) => {
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = {
      ...users[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return users[index];
  }
  return null;
};

export const deleteUser = (id: number) => {
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    // Also delete associated links
    links = links.filter(l => l.userId !== id);
    return true;
  }
  return false;
};

export const getLinksByUserId = (userId: number) => {
  return links
    .filter(l => l.userId === userId)
    .sort((a, b) => a.orderIndex - b.orderIndex);
};

export const createLink = (linkData: Omit<Link, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newLink: Link = {
    ...linkData,
    id: links.length > 0 ? Math.max(...links.map(l => l.id)) + 1 : 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  links.push(newLink);
  return newLink;
};

export const updateLink = (id: number, updates: Partial<Link>) => {
  const index = links.findIndex(l => l.id === id);
  if (index !== -1) {
    links[index] = {
      ...links[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return links[index];
  }
  return null;
};

export const deleteLink = (id: number) => {
  const index = links.findIndex(l => l.id === id);
  if (index !== -1) {
    links.splice(index, 1);
    return true;
  }
  return false;
};

export const updateLinkOrder = (userId: number, linkIds: number[]) => {
  linkIds.forEach((linkId, index) => {
    const link = links.find(l => l.id === linkId && l.userId === userId);
    if (link) {
      link.orderIndex = index;
      link.updatedAt = new Date().toISOString();
    }
  });
  return getLinksByUserId(userId);
};

export const incrementClickCount = (linkId: number) => {
  const link = links.find(l => l.id === linkId);
  if (link) {
    link.clickCount++;
    link.updatedAt = new Date().toISOString();
    return link;
  }
  return null;
};

// Analytics
export const getAnalytics = (userId: number) => {
  const userLinks = getLinksByUserId(userId);
  const totalClicks = userLinks.reduce((sum, link) => sum + link.clickCount, 0);
  
  // Generate mock data for clicks over time (last 7 days)
  const clicksOverTime = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    clicksOverTime.push({
      date: date.toISOString().split('T')[0],
      clicks: Math.floor(Math.random() * 50) + 10,
    });
  }

  return {
    totalClicks,
    totalLinks: userLinks.length,
    linkStats: userLinks.map(link => ({
      linkId: link.id,
      title: link.title,
      clicks: link.clickCount,
      url: link.url,
    })),
    clicksOverTime,
  };
};

// Admin stats
export const getAdminStats = () => {
  const totalUsers = users.length;
  const totalLinks = links.length;
  const totalClicks = links.reduce((sum, link) => sum + link.clickCount, 0);
  
  return {
    totalUsers,
    totalLinks,
    totalClicks,
    users: users.map(user => ({
      ...user,
      linkCount: links.filter(l => l.userId === user.id).length,
      totalClicks: links
        .filter(l => l.userId === user.id)
        .reduce((sum, l) => sum + l.clickCount, 0),
    })),
  };
};
