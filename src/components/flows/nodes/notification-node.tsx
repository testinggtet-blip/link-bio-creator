"use client"

import { Handle, Position, type NodeProps } from 'reactflow';
import { Bell } from 'lucide-react';

export function NotificationNode({ data }: NodeProps) {
  return (
    <div className="px-4 py-3 shadow-lg rounded-lg bg-background border-2 border-purple-500 min-w-[180px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-purple-500"
      />
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-md bg-purple-500/10">
          <Bell className="h-4 w-4 text-purple-500" />
        </div>
        <div className="font-semibold text-sm">Notification</div>
      </div>
      <div className="text-xs text-muted-foreground">{data.label}</div>
    </div>
  );
}
