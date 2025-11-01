"use client"

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function EditVariationPage() {
  const router = useRouter();
  const params = useParams();
  const variationId = params.variationId as string;
  
  const [template, setTemplate] = useState('');
  const [showTemplateSelector, setShowTemplateSelector] = useState(true);

  const variationNumber = variationId === 'variant-a' ? '1' : '2';

  const handleCreateTemplate = () => {
    // Logic to create new template
    console.log('Create new template');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <h1 className="text-4xl font-bold mb-2">A/B Test</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Edit Variations Title */}
          <div>
            <h2 className="text-2xl font-semibold">Edit Variations {variationNumber}</h2>
          </div>

          {/* Select Template Section */}
          <div className="border-2 border-gray-300 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-lg font-medium">Select Template</Label>
            </div>

            <div className="flex items-center gap-3">
              {/* Template Dropdown */}
              <div className="flex-1 relative">
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="w-full h-12 px-4 pr-12 border-2 border-gray-300 rounded-lg bg-white appearance-none text-base focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                >
                  <option value="">Select a template</option>
                  <option value="welcome">Welcome Email</option>
                  <option value="promo">Promotional Email</option>
                  <option value="reminder">Reminder Email</option>
                  <option value="notification">Notification Email</option>
                  <option value="newsletter">Newsletter</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Create Template Button */}
              <Button
                onClick={handleCreateTemplate}
                className="h-12 w-12 p-0 bg-teal-600 hover:bg-teal-700 rounded-lg flex-shrink-0"
              >
                <Plus className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Back Button */}
          <div className="pt-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="h-11 px-6"
            >
              Back to A/B Test
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
