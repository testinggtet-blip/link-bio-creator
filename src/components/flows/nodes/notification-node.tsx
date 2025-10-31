"use client"

import { Handle, Position, type NodeProps } from 'reactflow';
import { Bell } from 'lucide-react';

export function NotificationNode({ data }: NodeProps) {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden border-2 border-blue-400 min-w-[280px]">
      {/* Colored Header */}
      <div className="bg-blue-300 px-3 py-1.5">
        <div className="text-sm font-medium text-blue-900">{data.label || 'Notification'}</div>
      </div>
      
      {/* White Content Area */}
      <div className="bg-white px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-blue-500/10 flex-shrink-0">
            <Bell className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-gray-900 mb-1">
              {data.title || 'Notification'}
            </div>
            <div className="text-xs text-gray-500">
              {data.description || 'You still have work to do'}
            </div>
          </div>
        </div>
      </div>
      
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-blue-500"
      />
    </div>
  );
}