"use client"

import { Handle, Position, type NodeProps } from 'reactflow';
import { GitBranch } from 'lucide-react';

export function ConditionNode({ data }: NodeProps) {
  return (
    <div className="px-4 py-3 shadow-lg rounded-lg bg-background border-2 border-amber-500 min-w-[180px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-amber-500"
      />
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-md bg-amber-500/10">
          <GitBranch className="h-4 w-4 text-amber-500" />
        </div>
        <div className="font-semibold text-sm">Condition</div>
      </div>
      <div className="text-xs text-muted-foreground">{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="true"
        style={{ left: '30%' }}
        className="w-3 h-3 !bg-green-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="false"
        style={{ left: '70%' }}
        className="w-3 h-3 !bg-red-500"
      />
    </div>
  );
}
