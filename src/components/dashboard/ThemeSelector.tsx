"use client"

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { themes } from '@/lib/themes';
import { User, Theme } from '@/lib/types';
import { Check, Zap, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ThemeSelectorProps {
  user: User;
  onUpdate: (updates: Partial<User>) => void;
}

export function ThemeSelector({ user, onUpdate }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState(user.theme);
  const [customColors, setCustomColors] = useState({
    background: '#667eea',
    linkBackground: '#667eea',
    cardBackground: '#ffffff',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleThemeSelect = async (themeId: string) => {
    setSelectedTheme(themeId);
    setIsSaving(true);
    try {
      await onUpdate({ theme: themeId });
      toast.success('Theme updated successfully');
    } catch (error) {
      toast.error('Failed to update theme');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCustomThemeApply = async () => {
    // For custom theme, we'd need to extend the theme system
    // For now, we'll just show a message
    toast.info('Custom theme builder coming soon!');
  };

  // Curated themes - the existing themes
  const curatedThemes = themes;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2">Theme</h3>
        <p className="text-sm text-muted-foreground">
          Customize the look and feel of your profile
        </p>
      </div>

      <Tabs defaultValue="curated" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="customizable" className="text-sm">
            Customizable
          </TabsTrigger>
          <TabsTrigger value="curated" className="text-sm">
            Curated
          </TabsTrigger>
        </TabsList>

        <TabsContent value="customizable" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5" />
              <h4 className="font-semibold">Create Custom Theme</h4>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bg-color">Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="bg-color"
                      type="color"
                      value={customColors.background}
                      onChange={(e) =>
                        setCustomColors({ ...customColors, background: e.target.value })
                      }
                      className="w-20 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={customColors.background}
                      onChange={(e) =>
                        setCustomColors({ ...customColors, background: e.target.value })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link-color">Link Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="link-color"
                      type="color"
                      value={customColors.linkBackground}
                      onChange={(e) =>
                        setCustomColors({ ...customColors, linkBackground: e.target.value })
                      }
                      className="w-20 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={customColors.linkBackground}
                      onChange={(e) =>
                        setCustomColors({ ...customColors, linkBackground: e.target.value })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card-color">Card Background</Label>
                  <div className="flex gap-2">
                    <Input
                      id="card-color"
                      type="color"
                      value={customColors.cardBackground}
                      onChange={(e) =>
                        setCustomColors({ ...customColors, cardBackground: e.target.value })
                      }
                      className="w-20 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={customColors.cardBackground}
                      onChange={(e) =>
                        setCustomColors({ ...customColors, cardBackground: e.target.value })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h5 className="text-sm font-medium mb-3">Preview</h5>
                <div
                  className="rounded-xl p-6 min-h-[200px] flex items-center justify-center"
                  style={{ background: customColors.background }}
                >
                  <div
                    className="rounded-lg p-6 shadow-lg"
                    style={{ backgroundColor: customColors.cardBackground }}
                  >
                    <div className="text-center mb-4">
                      <div className="text-5xl font-bold mb-2">Aa</div>
                      <p className="text-sm text-muted-foreground">Your custom theme</p>
                    </div>
                    <div
                      className="rounded-lg p-3 text-white text-center font-medium"
                      style={{ backgroundColor: customColors.linkBackground }}
                    >
                      Sample Link
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleCustomThemeApply} className="w-full">
                Apply Custom Theme
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="curated" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {curatedThemes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isSelected={selectedTheme === theme.id}
                onSelect={() => handleThemeSelect(theme.id)}
                isPremium={['cosmic', 'galaxy', 'neon', 'tropical'].includes(theme.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ThemeCardProps {
  theme: Theme;
  isSelected: boolean;
  onSelect: () => void;
  isPremium?: boolean;
}

function ThemeCard({ theme, isSelected, onSelect, isPremium = false }: ThemeCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'relative group rounded-xl overflow-hidden transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        isSelected && 'ring-2 ring-primary ring-offset-2'
      )}
    >
      {/* Theme Preview */}
      <div
        className="aspect-[3/4] flex flex-col items-center justify-center p-4 relative"
        style={{
          background: theme.backgroundImage
            ? `url(${theme.backgroundImage}), ${theme.background}`
            : theme.background,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
            <Check className="h-3 w-3 text-primary-foreground" />
          </div>
        )}

        {/* Premium Badge */}
        {isPremium && (
          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1.5">
            <Zap className="h-3 w-3 text-yellow-400 fill-yellow-400" />
          </div>
        )}

        {/* Card Preview */}
        <div
          className="rounded-lg p-4 shadow-lg w-full"
          style={{ backgroundColor: theme.cardBackground }}
        >
          <div
            className="text-3xl font-bold mb-3 text-center"
            style={{ color: theme.textColor }}
          >
            Aa
          </div>
          <div
            className="rounded-md h-8"
            style={{ backgroundColor: theme.linkBackground }}
          />
        </div>
      </div>

      {/* Theme Name */}
      <div className="bg-background/95 backdrop-blur-sm px-3 py-2 text-center border-t">
        <p className="text-sm font-medium truncate">{theme.name}</p>
      </div>
    </button>
  );
}
