"use client"

import { Handle, Position, type NodeProps } from 'reactflow';
import { Zap } from 'lucide-react';

export function TriggerNode({ data }: NodeProps) {
  return (
    <div className="px-4 py-3 shadow-lg rounded-lg bg-background border-2 border-green-500 min-w-[180px]">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-md bg-green-500/10">
          <Zap className="h-4 w-4 text-green-500" />
        </div>
        <div className="font-semibold text-sm">Trigger</div>
      </div>
      <div className="text-xs text-muted-foreground">{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-green-500"
      />
    </div>
  );
}
