"use client"

import { 
  MessageSquare, 
  Mail, 
  MessageCircle,
  RefreshCw,
  ArrowLeftRight,
  Clock,
  GitBranch,
  GitMerge,
  Target,
  Octagon
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const nodeCategories = [
  {
    category: 'MESSAGES',
    color: 'text-cyan-500',
    nodes: [
      {
        type: 'push-notification',
        label: 'Push Notifications',
        icon: MessageSquare,
      },
      {
        type: 'email',
        label: 'Emails',
        icon: Mail,
      },
      {
        type: 'twilio-sms',
        label: 'Twilio SMS',
        icon: MessageCircle,
      },
    ],
  },
  {
    category: 'ACTIONS',
    color: 'text-cyan-500',
    nodes: [
      {
        type: 'update-action',
        label: 'Update Action',
        icon: RefreshCw,
      },
      {
        type: 'send-receive-data',
        label: 'Send and Receive Data',
        icon: ArrowLeftRight,
      },
    ],
  },
  {
    category: 'DELAYS',
    color: 'text-cyan-500',
    nodes: [
      {
        type: 'time-delay',
        label: 'Time Delay',
        icon: Clock,
      },
    ],
  },
  {
    category: 'CONDITIONS',
    color: 'text-cyan-500',
    nodes: [
      {
        type: 'true-false-branch',
        label: 'True/False Branch',
        icon: GitBranch,
      },
      {
        type: 'multi-split-branch',
        label: 'Multi-split Branch',
        icon: GitMerge,
      },
      {
        type: 'random-cohort-branch',
        label: 'Random Cohort Branch',
        icon: Target,
      },
      {
        type: 'exit',
        label: 'Exit',
        icon: Octagon,
      },
    ],
  },
];

export function NodesSidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 border-r bg-background p-4 overflow-y-auto">
      <div className="space-y-6">
        {nodeCategories.map((category) => (
          <div key={category.category}>
            <h2 className={`text-sm font-bold mb-3 ${category.color} flex items-center gap-1.5`}>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
              {category.category}
            </h2>
            <div className="space-y-2">
              {category.nodes.map((node) => {
                const Icon = node.icon;
                return (
                  <div
                    key={node.type}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-move transition-colors"
                    draggable
                    onDragStart={(e) => onDragStart(e, node.type)}
                  >
                    <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground">{node.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}