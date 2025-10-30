"use client"

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { User, Link } from '@/lib/types';
import { getThemeById } from '@/lib/themes';
import { getLinkIcon } from '@/lib/linkIcons';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PublicProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const [user, setUser] = useState<User | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (username) {
      fetchProfileData();
    }
  }, [username]);

  const fetchProfileData = async () => {
    try {
      // Fetch user by username
      const userResponse = await fetch(`/api/users/username/${username}`);
      if (!userResponse.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      const userData = await userResponse.json();
      setUser(userData);

      // Fetch user's links
      const linksResponse = await fetch(`/api/links?userId=${userData.id}`);
      const linksData = await linksResponse.json();
      setLinks(linksData);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = async (link: Link) => {
    // Track click
    try {
      await fetch(`/api/links/click/${link.id}`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Failed to track click:', error);
    }

    // Open link
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return notFound();
  }

  const theme = getThemeById(user.theme);

  const containerStyle = {
    background: user.backgroundImage
      ? `url(${user.backgroundImage})`
      : theme.background,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      style={containerStyle}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div
          className="rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-sm"
          style={{
            backgroundColor: theme.cardBackground,
            color: theme.textColor,
          }}
        >
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="relative inline-block mb-6">
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 shadow-lg"
                style={{ borderColor: theme.accentColor }}
              />
            </div>
            <h1 className="text-4xl font-bold mb-3">{user.name}</h1>
            <p className="text-lg opacity-90 max-w-md mx-auto">{user.bio}</p>
          </motion.div>

          {/* Links */}
          <div className="space-y-4">
            {links.length === 0 ? (
              <p className="text-center opacity-60 py-8">No links available</p>
            ) : (
              links.map((link, index) => {
                const IconComponent = getLinkIcon(link.icon);
                return (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                    onClick={() => handleLinkClick(link)}
                    className="w-full rounded-xl p-5 transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-xl"
                    style={{
                      backgroundColor: theme.linkBackground,
                      color: theme.linkTextColor,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme.linkHoverBackground;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = theme.linkBackground;
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <IconComponent className="h-6 w-6 flex-shrink-0" />
                      <span className="font-semibold text-lg flex-1 text-left">
                        {link.title}
                      </span>
                      <ExternalLink className="h-5 w-5 flex-shrink-0 opacity-70" />
                    </div>
                  </motion.button>
                );
              })
            )}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center mt-12 opacity-60 text-sm"
          >
            <p>Powered by LinkBio</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
