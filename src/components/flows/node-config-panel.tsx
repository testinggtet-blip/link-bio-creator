"use client"

import { X, Plus, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { type Node } from 'reactflow';
import { useState } from 'react';

interface NodeConfigPanelProps {
  node: Node;
  onClose: () => void;
  onUpdate: (data: any) => void;
}

export function NodeConfigPanel({ node, onClose, onUpdate }: NodeConfigPanelProps) {
  const [config, setConfig] = useState({
    name: node.data.config?.name || '',
    template: node.data.config?.template || '',
    condition: node.data.config?.condition || '',
    smartSending: node.data.config?.smartSending ?? true,
    skipCampaign: node.data.config?.skipCampaign ?? true,
    skipFlow: node.data.config?.skipFlow ?? true,
  });

  const handleSave = () => {
    onUpdate({ config });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  // Push Notification Configuration
  if (node.type === 'push-notification') {
    return (
      <div className="w-[400px] border-l bg-background flex flex-col h-full">
        {/* Header */}
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Web Push Notifications</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-semibold text-base mb-2">Web Push Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Configure your website to send push notifications to your customer's windows or Mac.
            </p>
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Name</Label>
            <Input
              id="name"
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              placeholder="Enter notification name"
              className="h-11"
            />
          </div>

          {/* Select Template */}
          <div className="space-y-2">
            <Label htmlFor="template" className="text-sm font-medium">Select Template</Label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <select
                  id="template"
                  value={config.template}
                  onChange={(e) => setConfig({ ...config, template: e.target.value })}
                  className="w-full h-11 px-3 pr-10 border rounded-md bg-background appearance-none"
                >
                  <option value="">Select a template</option>
                  <option value="welcome">Welcome Message</option>
                  <option value="promo">Promotional</option>
                  <option value="alert">Alert</option>
                  <option value="reminder">Reminder</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
              <Button size="sm" className="h-11 w-11 p-0 bg-teal-600 hover:bg-teal-700">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Turn into A/B Test Button */}
          <Button variant="outline" className="w-full h-11 justify-start text-teal-600 border-teal-200 hover:bg-teal-50">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            Turn into A/B Test
          </Button>

          {/* Condition Field */}
          <div className="space-y-2">
            <Label htmlFor="condition" className="text-sm font-medium">Condition</Label>
            <div className="relative">
              <select
                id="condition"
                value={config.condition}
                onChange={(e) => setConfig({ ...config, condition: e.target.value })}
                className="w-full h-11 px-3 pr-10 border rounded-md bg-background appearance-none"
              >
                <option value="">Select condition</option>
                <option value="subscribers-properties">Subscribers Properties</option>
                <option value="behavior">Behavior</option>
                <option value="location">Location</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            {config.condition === 'subscribers-properties' && (
              <div className="mt-2 p-3 bg-teal-50 border border-teal-200 rounded-md">
                <div className="text-xs font-medium text-teal-900 mb-1">Subscribers Properties</div>
                <div className="text-xs text-teal-700">Subscribers has done or not done</div>
              </div>
            )}
          </div>

          {/* Settings Section */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-base">Settings</h3>

            {/* Smart Sending Toggle */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Switch
                  id="smart-sending"
                  checked={config.smartSending}
                  onCheckedChange={(checked) => setConfig({ ...config, smartSending: checked })}
                />
                <Label htmlFor="smart-sending" className="text-sm font-medium cursor-pointer">
                  Turn on Smart Sending
                </Label>
              </div>
              <p className="text-xs text-muted-foreground ml-11">
                This message will not be sent to profiles who recently received another message from you. Smart Sending timeframes can be updated in{' '}
                <span className="text-teal-600 underline cursor-pointer">account settings</span>.
              </p>
            </div>

            {/* Skip Campaign Checkbox */}
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="skip-campaign"
                  checked={config.skipCampaign}
                  onCheckedChange={(checked) => setConfig({ ...config, skipCampaign: checked as boolean })}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label htmlFor="skip-campaign" className="text-sm font-medium cursor-pointer">
                    Skip profiles who have received a campaign message
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">Within the last 24 hours</p>
                </div>
              </div>
            </div>

            {/* Skip Flow Checkbox */}
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="skip-flow"
                  checked={config.skipFlow}
                  onCheckedChange={(checked) => setConfig({ ...config, skipFlow: checked as boolean })}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label htmlFor="skip-flow" className="text-sm font-medium cursor-pointer">
                    Skip profiles who have received a flow message
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">Within the last 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="border-t px-6 py-4 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={handleCancel} className="h-10 px-6">
            Cancel
          </Button>
          <Button onClick={handleSave} className="h-10 px-6 bg-teal-600 hover:bg-teal-700">
            Create
          </Button>
        </div>
      </div>
    );
  }

  // Default configuration for other node types
  return (
    <div className="w-80 border-l bg-background p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Node Configuration</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Card className="p-4 mb-4">
        <div className="text-xs text-muted-foreground mb-1">Node ID</div>
        <div className="font-mono text-sm">{node.id}</div>
      </Card>

      <div className="space-y-4">
        <div>
          <Label>Node Type</Label>
          <div className="mt-1.5 px-3 py-2 border rounded-md bg-muted text-sm">
            {node.type}
          </div>
        </div>

        <Button onClick={onClose} className="w-full">
          Close
        </Button>
      </div>
    </div>
  );
}