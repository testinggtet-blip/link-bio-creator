"use client"

import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ABVariation {
  id: string;
  title: string;
  status: 'active' | 'inactive';
  percentage: number;
  subtitle: string;
}

interface ABTestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditVariation: (variationId: string) => void;
  onSave?: (data: any) => void;
}

export function ABTestDialog({ open, onOpenChange, onEditVariation, onSave }: ABTestDialogProps) {
  const [variations, setVariations] = useState<ABVariation[]>([
    {
      id: 'variant-a',
      title: 'Title 1',
      status: 'active',
      percentage: 100,
      subtitle: 'You still have work to do'
    },
    {
      id: 'variant-b',
      title: 'Title 2',
      status: 'inactive',
      percentage: 0,
      subtitle: 'You still have work to do'
    }
  ]);

  const [testParams, setTestParams] = useState({
    subject: true,
    content: false,
    winnerBy: 'button-clicked',
    duration: 1,
    durationUnit: 'hours',
    testGroupSize: 10,
    fallbackWinner: 'variant-2'
  });

  const updateVariationPercentage = (variantId: string, newPercentage: number) => {
    setVariations(prev => prev.map(v => {
      if (v.id === variantId) {
        return { ...v, percentage: newPercentage };
      }
      // Auto-adjust the other variation
      const otherId = variantId === 'variant-a' ? 'variant-b' : 'variant-a';
      if (v.id === otherId) {
        return { ...v, percentage: 100 - newPercentage };
      }
      return v;
    }));
  };

  const handleSave = () => {
    onSave?.({ variations, testParams });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 max-h-[90vh] flex flex-col">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">A/B Test</DialogTitle>
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

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Variations Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Variations</h3>
            
            {variations.map((variation, index) => (
              <div key={variation.id}>
                {/* Status Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <div className={`h-2 w-2 rounded-full ${variation.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {variation.status}
                  </span>
                </div>

                {/* Variation Card */}
                <div 
                  className={`border-2 rounded-lg p-4 ${
                    variation.status === 'active' 
                      ? 'border-purple-400 bg-purple-50/50' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{variation.title}</span>
                        <span 
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            variation.id === 'variant-a' 
                              ? 'bg-purple-500 text-white' 
                              : 'bg-pink-500 text-white'
                          }`}
                        >
                          {variation.id === 'variant-a' ? 'A' : 'B'} {variation.percentage}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{variation.subtitle}</p>
                    </div>
                  </div>

                  {/* Percentage Slider */}
                  <div className="mb-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={variation.percentage}
                      onChange={(e) => updateVariationPercentage(variation.id, parseInt(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${
                          variation.id === 'variant-a' ? '#8b5cf6' : '#ec4899'
                        } 0%, ${
                          variation.id === 'variant-a' ? '#8b5cf6' : '#ec4899'
                        } ${variation.percentage}%, #e5e7eb ${variation.percentage}%, #e5e7eb 100%)`
                      }}
                    />
                  </div>

                  {/* Edit Button */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => onEditVariation(variation.id)}
                  >
                    Edit Variation {variation.id === 'variant-a' ? 'A' : 'B'}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Test Parameters Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Test Parameters</h3>

            {/* Subject/Content Checkboxes */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="subject"
                  checked={testParams.subject}
                  onCheckedChange={(checked) => 
                    setTestParams({ ...testParams, subject: checked as boolean })
                  }
                />
                <Label htmlFor="subject" className="text-sm cursor-pointer">Subject</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="content"
                  checked={testParams.content}
                  onCheckedChange={(checked) => 
                    setTestParams({ ...testParams, content: checked as boolean })
                  }
                />
                <Label htmlFor="content" className="text-sm cursor-pointer">Content</Label>
              </div>
            </div>

            {/* Choose Winner by */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Choose Winner by</Label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="opened"
                    checked={testParams.winnerBy === 'opened'}
                    onCheckedChange={(checked) => 
                      checked && setTestParams({ ...testParams, winnerBy: 'opened' })
                    }
                  />
                  <Label htmlFor="opened" className="text-sm cursor-pointer">Opened</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="button-clicked"
                    checked={testParams.winnerBy === 'button-clicked'}
                    onCheckedChange={(checked) => 
                      checked && setTestParams({ ...testParams, winnerBy: 'button-clicked' })
                    }
                  />
                  <Label htmlFor="button-clicked" className="text-sm cursor-pointer">Button Clicked</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="manual"
                    checked={testParams.winnerBy === 'manual'}
                    onCheckedChange={(checked) => 
                      checked && setTestParams({ ...testParams, winnerBy: 'manual' })
                    }
                  />
                  <Label htmlFor="manual" className="text-sm cursor-pointer">Manual</Label>
                </div>
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Duration</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={testParams.duration}
                  onChange={(e) => setTestParams({ ...testParams, duration: parseInt(e.target.value) || 1 })}
                  className="w-20 h-10"
                  min="1"
                />
                <div className="relative flex-1">
                  <select
                    value={testParams.durationUnit}
                    onChange={(e) => setTestParams({ ...testParams, durationUnit: e.target.value })}
                    className="w-full h-10 px-3 pr-10 border rounded-md bg-background appearance-none"
                  >
                    <option value="hours">Hour</option>
                    <option value="days">Days</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                <div className="flex border rounded-md overflow-hidden">
                  <button
                    className={`px-4 py-2 text-sm font-medium ${
                      testParams.durationUnit === 'hours' 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-background text-muted-foreground'
                    }`}
                    onClick={() => setTestParams({ ...testParams, durationUnit: 'hours' })}
                  >
                    Hours
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium border-l ${
                      testParams.durationUnit === 'days' 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-background text-muted-foreground'
                    }`}
                    onClick={() => setTestParams({ ...testParams, durationUnit: 'days' })}
                  >
                    Days
                  </button>
                </div>
              </div>
            </div>

            {/* Size of the test Group */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Size of the test Group</Label>
                <button className="h-4 w-4 rounded-full border border-gray-400 flex items-center justify-center text-xs text-gray-500">
                  i
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <select
                    value={testParams.testGroupSize}
                    onChange={(e) => setTestParams({ ...testParams, testGroupSize: parseInt(e.target.value) })}
                    className="w-full h-10 px-3 pr-10 border rounded-md bg-background appearance-none"
                  >
                    <option value="10">10%</option>
                    <option value="20">20%</option>
                    <option value="30">30%</option>
                    <option value="40">40%</option>
                    <option value="50">50%</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                <div className="flex gap-2 bg-muted px-3 py-2 rounded-md text-sm">
                  <button className="bg-teal-500 text-white px-3 py-1 rounded">10%</button>
                  <button className="text-muted-foreground px-3 py-1">20%</button>
                </div>
              </div>
            </div>

            {/* Fallback Winner */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                If the outcome is not up to mark then make the winner
              </Label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="variant-1"
                    checked={testParams.fallbackWinner === 'variant-1'}
                    onCheckedChange={(checked) => 
                      checked && setTestParams({ ...testParams, fallbackWinner: 'variant-1' })
                    }
                  />
                  <Label htmlFor="variant-1" className="text-sm cursor-pointer">Variant 1</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="variant-2"
                    checked={testParams.fallbackWinner === 'variant-2'}
                    onCheckedChange={(checked) => 
                      checked && setTestParams({ ...testParams, fallbackWinner: 'variant-2' })
                    }
                  />
                  <Label htmlFor="variant-2" className="text-sm cursor-pointer">Variant 2</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="do-later"
                    checked={testParams.fallbackWinner === 'do-later'}
                    onCheckedChange={(checked) => 
                      checked && setTestParams({ ...testParams, fallbackWinner: 'do-later' })
                    }
                  />
                  <Label htmlFor="do-later" className="text-sm cursor-pointer">I'll do it later</Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
