"use client"

import { User, Link } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Eye } from 'lucide-react';
import { getThemeById } from '@/lib/themes';
import { getLinkIcon } from '@/lib/linkIcons';
import { useRouter } from 'next/navigation';

interface LivePreviewProps {
  user: User;
  links: Link[];
}

export function LivePreview({ user, links }: LivePreviewProps) {
  const router = useRouter();
  const theme = getThemeById(user.theme);

  const previewStyle = {
    background: user.backgroundImage
      ? `url(${user.backgroundImage})`
      : theme.background,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const handleViewPublic = () => {
    router.push(`/${user.username}`);
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <h3 className="font-semibold">Live Preview</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleViewPublic}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative">
        {/* Phone mockup frame */}
        <div className="aspect-[9/16] max-h-[600px] mx-auto">
          <div
            className="w-full h-full overflow-y-auto"
            style={previewStyle}
          >
            <div className="min-h-full flex items-center justify-center p-6">
              <div
                className="w-full max-w-md rounded-2xl p-6 shadow-xl"
                style={{
                  backgroundColor: theme.cardBackground,
                  color: theme.textColor,
                }}
              >
                {/* Profile Section */}
                <div className="text-center mb-5">
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4"
                    style={{ borderColor: theme.accentColor }}
                  />
                  <h1 className="text-xl font-bold mb-1.5">{user.name}</h1>
                  <p className="text-xs opacity-80">{user.bio}</p>
                </div>

                {/* Links */}
                <div className="space-y-2.5">
                  {links.length === 0 ? (
                    <p className="text-center text-sm opacity-60 py-8">
                      No links yet
                    </p>
                  ) : (
                    links.map((link) => {
                      const IconComponent = getLinkIcon(link.icon);
                      const layout = link.layout || 'classic';

                      if (layout === 'featured') {
                        return (
                          <div
                            key={link.id}
                            className="rounded-xl overflow-hidden transition-all cursor-pointer hover:scale-[1.02]"
                            style={{
                              backgroundColor: theme.linkBackground,
                              color: theme.linkTextColor,
                            }}
                          >
                            {link.thumbnail && (
                              <div className="aspect-video w-full overflow-hidden">
                                <img
                                  src={link.thumbnail}
                                  alt={link.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="p-4">
                              <div className="flex items-center gap-2.5">
                                <IconComponent className="h-4 w-4 flex-shrink-0" />
                                <span className="font-medium text-sm flex-1 truncate">
                                  {link.title}
                                </span>
                                <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 opacity-60" />
                              </div>
                            </div>
                          </div>
                        );
                      }

                      // Classic layout
                      return (
                        <div
                          key={link.id}
                          className="rounded-lg p-3 transition-all cursor-pointer hover:scale-105"
                          style={{
                            backgroundColor: theme.linkBackground,
                            color: theme.linkTextColor,
                          }}
                        >
                          <div className="flex items-center gap-2.5">
                            <IconComponent className="h-4 w-4 flex-shrink-0" />
                            <span className="font-medium text-sm flex-1 truncate">
                              {link.title}
                            </span>
                            <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 opacity-60" />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}