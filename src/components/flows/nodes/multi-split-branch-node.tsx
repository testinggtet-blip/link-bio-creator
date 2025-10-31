import { Handle, Position } from 'reactflow';

export function MultiSplitBranchNode({ data }: any) {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden border-2 border-lime-400 min-w-[280px]">
      <div className="bg-lime-300 px-3 py-1.5">
        <div className="text-sm font-medium text-lime-900">Multi-Split Branch</div>
      </div>
      <div className="bg-white px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-lime-500/10 flex-shrink-0">
            <svg className="h-5 w-5 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500">No condition selected</div>
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-lime-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-lime-500" />
    </div>
  );
}