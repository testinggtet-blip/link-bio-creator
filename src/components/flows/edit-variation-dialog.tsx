"use client"

import { useState } from 'react';
import { X, ChevronDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface EditVariationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variationId: string;
  variationName?: string;
  onSave?: (template: string) => void;
}

export function EditVariationDialog({ 
  open, 
  onOpenChange, 
  variationId, 
  variationName,
  onSave 
}: EditVariationDialogProps) {
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleSave = () => {
    onSave?.(selectedTemplate);
    onOpenChange(false);
  };

  const variationLabel = variationId === 'variant-a' ? '1' : '2';
  const displayName = variationName || `Variation ${variationLabel}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-1">A/B Test</div>
              <DialogTitle className="text-xl font-semibold">
                Edit {displayName}
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0 -mr-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 py-6 space-y-4">
          {/* Select Template */}
          <div className="space-y-2">
            <Label htmlFor="template" className="text-sm font-medium">
              Select Template
            </Label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <select
                  id="template"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full h-11 px-3 pr-10 border rounded-md bg-background appearance-none"
                >
                  <option value="">Select a template</option>
                  <option value="welcome">Welcome Message</option>
                  <option value="promo">Promotional</option>
                  <option value="alert">Alert</option>
                  <option value="reminder">Reminder</option>
                  <option value="newsletter">Newsletter</option>
                  <option value="announcement">Announcement</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
              <Button 
                size="sm" 
                className="h-11 w-11 p-0 bg-teal-600 hover:bg-teal-700"
                title="Create new template"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
