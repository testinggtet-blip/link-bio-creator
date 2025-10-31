"use client"

import { Zap, Settings, GitBranch, Bell } from 'lucide-react';
import { Card } from '@/components/ui/card';

const nodeTypes = [
  {
    type: 'trigger',
    label: 'Trigger',
    icon: Zap,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    description: 'Start your workflow',
  },
  {
    type: 'action',
    label: 'Action',
    icon: Settings,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    description: 'Perform an action',
  },
  {
    type: 'condition',
    label: 'Condition',
    icon: GitBranch,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    description: 'Add conditional logic',
  },
  {
    type: 'notification',
    label: 'Notification',
    icon: Bell,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    description: 'Send notifications',
  },
];

export function NodesSidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 border-r bg-background p-4 overflow-y-auto">
      <h2 className="text-sm font-semibold mb-4 text-muted-foreground uppercase">
        Nodes
      </h2>
      <div className="space-y-3">
        {nodeTypes.map((node) => {
          const Icon = node.icon;
          return (
            <Card
              key={node.type}
              className="p-3 cursor-move hover:shadow-md transition-shadow"
              draggable
              onDragStart={(e) => onDragStart(e, node.type)}
            >
              <div className="flex items-start gap-3">
                <div className={`${node.bgColor} ${node.color} p-2 rounded-lg`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">{node.label}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {node.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">
          Templates
        </h2>
        <div className="space-y-2">
          <Card className="p-3 cursor-pointer hover:bg-accent transition-colors">
            <h3 className="font-medium text-sm">Welcome Flow</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Send welcome notifications to new users
            </p>
          </Card>
          <Card className="p-3 cursor-pointer hover:bg-accent transition-colors">
            <h3 className="font-medium text-sm">Alert System</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Monitor and alert on specific conditions
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
