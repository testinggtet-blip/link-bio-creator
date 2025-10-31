import { Handle, Position } from 'reactflow';
import { Mail } from 'lucide-react';

export function PushNotificationNode({ data }: any) {
  const isABTest = data.config?.isABTest;
  const abVariations = data.config?.abVariations || [];

  // A/B Test View
  if (isABTest && abVariations.length > 0) {
    return (
      <div className="shadow-lg rounded-lg overflow-hidden border-2 border-purple-400 min-w-[320px] max-w-[380px]">
        <div className="bg-purple-300 px-3 py-1.5">
          <div className="text-sm font-medium text-purple-900">Push Notifications - A/B Test</div>
        </div>
        <div className="bg-white p-4 space-y-4">
          {abVariations.map((variation: any) => (
            <div key={variation.id}>
              {/* Status Badge */}
              <div className="flex items-center gap-2 mb-2">
                <div className={`h-2 w-2 rounded-full ${variation.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {variation.status}
                </span>
              </div>

              {/* Variation Card */}
              <div 
                className="border rounded-md border-l-4 overflow-hidden" 
                style={{ borderLeftColor: variation.id === 'variant-a' ? '#8b5cf6' : '#ec4899' }}
              >
                <div className="p-3">
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="w-12 h-12 border rounded-md flex items-center justify-center bg-gray-50">
                      <Mail className="h-6 w-6 text-gray-400" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span 
                          className={`text-sm font-bold px-2 py-0.5 rounded ${
                            variation.id === 'variant-a' 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-pink-100 text-pink-700'
                          }`}
                        >
                          {variation.id === 'variant-a' ? 'A' : 'B'} {variation.percentage}%
                        </span>
                        <span className="text-sm font-semibold text-gray-900">{variation.template}</span>
                      </div>

                      {/* Warning Badge */}
                      <div className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">
                        You still have work to do
                      </div>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="border-t bg-gray-50 px-3 py-2 text-center">
                  <span className="text-xs font-semibold text-gray-700">
                    Edit {variation.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-purple-500" />
        <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-purple-500" />
      </div>
    );
  }

  // Default Single View
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