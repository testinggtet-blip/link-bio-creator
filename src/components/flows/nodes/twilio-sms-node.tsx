import { Handle, Position } from 'reactflow';

export function TwilioSmsNode({ data }: any) {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden border-2 border-indigo-400 min-w-[280px]">
      <div className="bg-indigo-300 px-3 py-1.5">
        <div className="text-sm font-medium text-indigo-900">Twilio SMS</div>
      </div>
      <div className="bg-white px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-indigo-500/10 flex-shrink-0">
            <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-gray-900 mb-1">SMS</div>
            <div className="text-xs text-gray-500">You still have work to do</div>
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-indigo-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-indigo-500" />
    </div>
  );
}