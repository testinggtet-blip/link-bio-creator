import { Handle, Position } from 'reactflow';

export function PushNotificationNode({ data }: any) {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden border-2 border-yellow-400 min-w-[280px]">
      <div className="bg-yellow-300 px-3 py-1.5">
        <div className="text-sm font-medium text-yellow-900">Push Notifications</div>
      </div>
      <div className="bg-white px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-yellow-500/10 flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-gray-900 mb-1">Push</div>
            <div className="text-xs text-gray-500">You still have work to do</div>
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-yellow-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-yellow-500" />
    </div>
  );
}