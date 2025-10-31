"use client"

import { Handle, Position, type NodeProps } from 'reactflow';
import { Zap } from 'lucide-react';

export function TriggerNode({ data }: NodeProps) {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden border-2 border-yellow-400 min-w-[280px]">
      {/* Colored Header */}
      <div className="bg-yellow-300 px-3 py-1.5">
        <div className="text-sm font-medium text-yellow-900">{data.label || 'Trigger'}</div>
      </div>
      
      {/* White Content Area */}
      <div className="bg-white px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-yellow-500/10 flex-shrink-0">
            <Zap className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-gray-900 mb-1">
              {data.title || 'Trigger'}
            </div>
            <div className="text-xs text-gray-500">
              {data.description || 'Start your workflow'}
            </div>
          </div>
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-yellow-500"
      />
    </div>
  );
}