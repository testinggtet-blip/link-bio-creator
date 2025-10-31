"use client"

import { Handle, Position, type NodeProps } from 'reactflow';
import { Settings } from 'lucide-react';

export function ActionNode({ data }: NodeProps) {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden border-2 border-pink-400 min-w-[280px]">
      {/* Colored Header */}
      <div className="bg-pink-300 px-3 py-1.5">
        <div className="text-sm font-medium text-pink-900">{data.label || 'Action'}</div>
      </div>
      
      {/* White Content Area */}
      <div className="bg-white px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-pink-500/10 flex-shrink-0">
            <Settings className="h-5 w-5 text-pink-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-gray-900 mb-1">
              {data.title || 'Action'}
            </div>
            <div className="text-xs text-gray-500">
              {data.description || 'Perform an action'}
            </div>
          </div>
        </div>
      </div>
      
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-pink-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-pink-500"
      />
    </div>
  );
}