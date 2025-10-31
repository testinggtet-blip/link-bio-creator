"use client"

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Link2, 
  BarChart3, 
  Palette, 
  QrCode, 
  Smartphone, 
  Zap,
  ArrowRight,
  Check,
  Star,
  Users,
  TrendingUp,
  GitBranch,
  Bell
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const features = [
    {
      icon: Zap,
      title: 'Visual Flow Builder',
      description: 'Create workflows with drag-and-drop canvas interface',
    },
    {
      icon: GitBranch,
      title: 'Conditional Logic',
      description: 'Add branching and decision nodes to your flows',
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Send alerts across multiple channels instantly',
    },
    {
      icon: Link2,
      title: 'Integrations',
      description: 'Connect with webhooks, APIs, and external services',
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Track flow execution and performance metrics',
    },
    {
      icon: Smartphone,
      title: 'Real-time Updates',
      description: 'Monitor your workflows as they execute in real-time',
    },
  ];

  const themes = [
    { name: 'Ocean', gradient: 'from-blue-400 to-blue-600' },
    { name: 'Sunset', gradient: 'from-orange-400 to-pink-600' },
    { name: 'Forest', gradient: 'from-green-400 to-emerald-600' },
    { name: 'Galaxy', gradient: 'from-purple-400 to-indigo-600' },
    { name: 'Candy', gradient: 'from-pink-400 to-rose-600' },
    { name: 'Neon', gradient: 'from-cyan-400 to-teal-600' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <div className="container mx-auto px-4 py-20 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6" variant="secondary">
              <Star className="h-3 w-3 mr-1" />
              Visual Workflow Automation
            </Badge>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Build Flows Visually
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Design powerful notification workflows with our intuitive drag-and-drop canvas. No code required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link href="/flows">
                  Start Building
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg">
                <Link href="/flows">
                  View Demo
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-4xl font-bold mb-1">10K+</div>
              <div className="text-muted-foreground">Active Flows</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <GitBranch className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold mb-1">50K+</div>
              <div className="text-muted-foreground">Nodes Created</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Bell className="h-8 w-8 text-pink-600" />
              </div>
              <div className="text-4xl font-bold mb-1">1M+</div>
              <div className="text-muted-foreground">Notifications Sent</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features to automate your notification workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Node Types Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Powerful Node Types
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build complex workflows with our versatile node library
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Trigger', icon: Zap, color: 'green', description: 'Start your workflow' },
              { name: 'Action', icon: Palette, color: 'blue', description: 'Perform actions' },
              { name: 'Condition', icon: GitBranch, color: 'amber', description: 'Add logic branches' },
              { name: 'Notification', icon: Bell, color: 'purple', description: 'Send alerts' },
            ].map((node, index) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Card className={`p-6 border-2 border-${node.color}-500 hover:shadow-xl transition-shadow`}>
                    <div className={`w-12 h-12 rounded-lg bg-${node.color}-500/10 flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 text-${node.color}-500`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{node.name}</h3>
                    <p className="text-sm text-muted-foreground">{node.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Start building your first workflow in minutes with our intuitive visual editor
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link href="/flows">
                Create Your First Flow
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">Qwik Notify</h3>
              <p className="text-sm">
                Visual workflow automation for modern teams.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/flows" className="hover:text-white">Flow Builder</Link></li>
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Templates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">API Docs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
            <p>© 2024 Qwik Notify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}