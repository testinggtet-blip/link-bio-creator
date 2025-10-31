import { Handle, Position } from 'reactflow';

export function TrueFalseBranchNode({ data }: any) {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden border-2 border-cyan-400 min-w-[280px]">
      <div className="bg-cyan-300 px-3 py-1.5">
        <div className="text-sm font-medium text-cyan-900">True/False Branch</div>
      </div>
      <div className="bg-white px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-cyan-500/10 flex-shrink-0">
            <svg className="h-5 w-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-gray-900 mb-1">True/False Branch</div>
            <div className="text-xs text-gray-500">No conditions selected: evaluates to False</div>
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-cyan-500" />
      <Handle type="source" position={Position.Bottom} id="true" style={{ left: '30%' }} className="w-3 h-3 !bg-green-500" />
      <Handle type="source" position={Position.Bottom} id="false" style={{ left: '70%' }} className="w-3 h-3 !bg-red-500" />
    </div>
  );
}