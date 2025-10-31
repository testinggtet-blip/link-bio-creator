"use client"

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { type Node } from 'reactflow';
import { useState } from 'react';

interface NodeConfigPanelProps {
  node: Node;
  onClose: () => void;
  onUpdate: (data: any) => void;
}

export function NodeConfigPanel({ node, onClose, onUpdate }: NodeConfigPanelProps) {
  const [label, setLabel] = useState(node.data.label || '');
  const [description, setDescription] = useState(node.data.description || '');

  const handleSave = () => {
    onUpdate({ label, description });
  };

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
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Enter node label"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter node description"
            className="mt-1.5"
            rows={3}
          />
        </div>

        {node.type === 'trigger' && (
          <div>
            <Label htmlFor="trigger-type">Trigger Type</Label>
            <select
              id="trigger-type"
              className="w-full mt-1.5 px-3 py-2 border rounded-md bg-background"
            >
              <option>Webhook</option>
              <option>Schedule</option>
              <option>Manual</option>
              <option>Event</option>
            </select>
          </div>
        )}

        {node.type === 'action' && (
          <div>
            <Label htmlFor="action-type">Action Type</Label>
            <select
              id="action-type"
              className="w-full mt-1.5 px-3 py-2 border rounded-md bg-background"
            >
              <option>HTTP Request</option>
              <option>Database Query</option>
              <option>Transform Data</option>
              <option>Send Email</option>
            </select>
          </div>
        )}

        {node.type === 'condition' && (
          <>
            <div>
              <Label htmlFor="condition-field">Field</Label>
              <Input
                id="condition-field"
                placeholder="e.g., status"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="condition-operator">Operator</Label>
              <select
                id="condition-operator"
                className="w-full mt-1.5 px-3 py-2 border rounded-md bg-background"
              >
                <option>equals</option>
                <option>not equals</option>
                <option>greater than</option>
                <option>less than</option>
                <option>contains</option>
              </select>
            </div>
            <div>
              <Label htmlFor="condition-value">Value</Label>
              <Input
                id="condition-value"
                placeholder="Enter value"
                className="mt-1.5"
              />
            </div>
          </>
        )}

        {node.type === 'notification' && (
          <>
            <div>
              <Label htmlFor="notification-channel">Channel</Label>
              <select
                id="notification-channel"
                className="w-full mt-1.5 px-3 py-2 border rounded-md bg-background"
              >
                <option>Email</option>
                <option>SMS</option>
                <option>Push</option>
                <option>Slack</option>
              </select>
            </div>
            <div>
              <Label htmlFor="notification-message">Message</Label>
              <Textarea
                id="notification-message"
                placeholder="Enter notification message"
                className="mt-1.5"
                rows={4}
              />
            </div>
          </>
        )}

        <Button onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
