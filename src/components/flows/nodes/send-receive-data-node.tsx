import { Handle, Position } from 'reactflow';

export function SendReceiveDataNode({ data }: any) {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden border-2 border-pink-400 min-w-[280px]">
      <div className="bg-pink-300 px-3 py-1.5">
        <div className="text-sm font-medium text-pink-900">Send and Receive Data</div>
      </div>
      <div className="bg-white px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-pink-500/10 flex-shrink-0">
            <svg className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-gray-900 mb-1">Webhook</div>
            <div className="text-xs text-gray-500">You still have work to do</div>
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-pink-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-pink-500" />
    </div>
  );
}