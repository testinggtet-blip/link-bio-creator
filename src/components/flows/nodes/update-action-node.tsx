import { Handle, Position } from 'reactflow';

export function UpdateActionNode({ data }: any) {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden border-2 border-purple-400 min-w-[280px]">
      <div className="bg-purple-300 px-3 py-1.5">
        <div className="text-sm font-medium text-purple-900">Create or Update Person</div>
      </div>
      <div className="bg-white px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-purple-500/10 flex-shrink-0">
            <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-gray-900 mb-1">Create or Update Person</div>
            <div className="text-xs text-gray-500">You still have work to do</div>
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-purple-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-purple-500" />
    </div>
  );
}