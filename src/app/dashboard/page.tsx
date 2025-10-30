"use client"

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LinkManager } from '@/components/dashboard/LinkManager';
import { ProfileEditor } from '@/components/dashboard/ProfileEditor';
import { LivePreview } from '@/components/dashboard/LivePreview';
import { AnalyticsDashboard } from '@/components/dashboard/AnalyticsDashboard';
import { QRCodeGenerator } from '@/components/dashboard/QRCodeGenerator';
import { OnboardingDialog } from '@/components/dashboard/OnboardingDialog';
import { ThemeSelector } from '@/components/dashboard/ThemeSelector';
import { User, Link } from '@/lib/types';
import { Link2, BarChart3, QrCode, Settings, Palette } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Mock user ID (in real app, this would come from auth)
  const userId = 1;

  useEffect(() => {
    fetchUserData();
    fetchLinks();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
      
      // Show onboarding if username is default or missing
      if (!data.username || data.username === 'user1' || data.username.startsWith('user')) {
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLinks = async () => {
    try {
      const response = await fetch(`/api/links?userId=${userId}`);
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      console.error('Failed to fetch links:', error);
    }
  };

  const handleUserUpdate = async (updates: Partial<User>) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updatedUser = await response.json();
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleLinksUpdate = (updatedLinks: Link[]) => {
    setLinks(updatedLinks);
  };

  const handleOnboardingComplete = (username: string) => {
    setShowOnboarding(false);
    if (user) {
      setUser({ ...user, username });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-6">
          <p className="text-destructive">Failed to load user data</p>
        </Card>
      </div>
    );
  }

  return (
    <>
      <OnboardingDialog
        open={showOnboarding}
        onComplete={handleOnboardingComplete}
        userId={userId}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your links and customize your profile
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <Tabs defaultValue="links" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 mb-6">
                    <TabsTrigger value="links" className="flex items-center gap-2">
                      <Link2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Links</span>
                    </TabsTrigger>
                    <TabsTrigger value="theme" className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      <span className="hidden sm:inline">Theme</span>
                    </TabsTrigger>
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span className="hidden sm:inline">Profile</span>
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      <span className="hidden sm:inline">Analytics</span>
                    </TabsTrigger>
                    <TabsTrigger value="qr" className="flex items-center gap-2">
                      <QrCode className="h-4 w-4" />
                      <span className="hidden sm:inline">QR Code</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="links">
                    <LinkManager
                      userId={userId}
                      links={links}
                      onLinksUpdate={handleLinksUpdate}
                    />
                  </TabsContent>

                  <TabsContent value="theme">
                    <ThemeSelector user={user} onUpdate={handleUserUpdate} />
                  </TabsContent>

                  <TabsContent value="profile">
                    <ProfileEditor user={user} onUpdate={handleUserUpdate} />
                  </TabsContent>

                  <TabsContent value="analytics">
                    <AnalyticsDashboard userId={userId} />
                  </TabsContent>

                  <TabsContent value="qr">
                    <QRCodeGenerator username={user.username} />
                  </TabsContent>
                </Tabs>
              </Card>
            </div>

            {/* Live Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <LivePreview user={user} links={links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}