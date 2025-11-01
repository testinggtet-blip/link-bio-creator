"use client"

import { X, Plus, ChevronDown, Trash2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { type Node } from 'reactflow';
import { useState } from 'react';
import { ABTestDialog } from './ab-test-dialog';
import { useRouter } from 'next/navigation';

interface NodeConfigPanelProps {
  node: Node;
  onClose: () => void;
  onUpdate: (data: any) => void;
  onDelete: () => void;
}

interface Condition {
  id: string;
  type: string;
  subConditions: {
    field: string;
    operator: string;
    value: string;
    timeValue?: string;
    timeUnit?: string;
  }[];
}

interface ABVariation {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  percentage: number;
  template: string;
}

export function NodeConfigPanel({ node, onClose, onUpdate, onDelete }: NodeConfigPanelProps) {
  const router = useRouter();
  const [config, setConfig] = useState({
    name: node.data.config?.name || '',
    template: node.data.config?.template || '',
    smartSending: node.data.config?.smartSending ?? true,
    skipCampaign: node.data.config?.skipCampaign ?? true,
    skipFlow: node.data.config?.skipFlow ?? true,
  });

  const [conditions, setConditions] = useState<Condition[]>([
    {
      id: '1',
      type: 'properties-about-someone',
      subConditions: [
        { field: 'platform', operator: 'equals', value: 'MacOs' }
      ]
    },
    {
      id: '2',
      type: 'what-someone-has-done',
      subConditions: [
        { field: 'active-on-site', operator: 'at-least-once', value: 'in-the-last', timeValue: '30', timeUnit: 'days' }
      ]
    }
  ]);

  const [conditionOperator, setConditionOperator] = useState<'AND' | 'OR'>('AND');
  const [isABTest, setIsABTest] = useState(node.data.config?.isABTest ?? false);
  const [showABTestDialog, setShowABTestDialog] = useState(false);
  const [abVariations, setAbVariations] = useState<ABVariation[]>(
    node.data.config?.abVariations ?? []
  );
  const [editingVariation, setEditingVariation] = useState<string | null>(null);

  const handleSave = () => {
    onUpdate({ config: { ...config, isABTest, abVariations }, conditions });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleEnableABTest = () => {
    setShowABTestDialog(true);
  };

  const handleABTestSave = (data: any) => {
    setAbVariations(data.variations);
    setIsABTest(true);
    onUpdate({ 
      config: { ...config, isABTest: true, abVariations: data.variations }, 
      conditions 
    });
  };

  const handleEditVariation = (variationId: string) => {
    router.push(`/flows/ab-test/${variationId}`);
  };

  const updateVariationPercentage = (variantId: string, newPercentage: number) => {
    setAbVariations(prev => prev.map(v => {
      if (v.id === variantId) {
        return { ...v, percentage: newPercentage };
      }
      // Auto-adjust the other variation
      if (prev.length === 2) {
        const otherId = variantId === 'variant-a' ? 'variant-b' : 'variant-a';
        if (v.id === otherId) {
          return { ...v, percentage: 100 - newPercentage };
        }
      }
      return v;
    }));
  };

  const toggleVariationStatus = (variantId: string) => {
    setAbVariations(prev => prev.map(v => {
      if (v.id === variantId) {
        return { ...v, status: v.status === 'active' ? 'inactive' : 'active' };
      }
      return v;
    }));
  };

  const addCondition = (conditionGroupId: string) => {
    setConditions(conditions.map(cond => {
      if (cond.id === conditionGroupId) {
        return {
          ...cond,
          subConditions: [
            ...cond.subConditions,
            { field: '', operator: '', value: '' }
          ]
        };
      }
      return cond;
    }));
  };

  const addConditionGroup = () => {
    setConditions([
      ...conditions,
      {
        id: Date.now().toString(),
        type: '',
        subConditions: [{ field: '', operator: '', value: '' }]
      }
    ]);
  };

  const deleteCondition = (conditionGroupId: string, subConditionIndex?: number) => {
    if (subConditionIndex !== undefined) {
      setConditions(conditions.map(cond => {
        if (cond.id === conditionGroupId) {
          return {
            ...cond,
            subConditions: cond.subConditions.filter((_, idx) => idx !== subConditionIndex)
          };
        }
        return cond;
      }).filter(cond => cond.subConditions.length > 0));
    } else {
      setConditions(conditions.filter(cond => cond.id !== conditionGroupId));
    }
  };

  // Push Notification Configuration
  if (node.type === 'push-notification') {
    return (
      <div className="w-[400px] border-l bg-background flex flex-col h-full">
        {/* Header */}
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Web Push Notifications</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {!isABTest ? (
            <>
              {/* Description */}
              <div>
                <h3 className="font-semibold text-base mb-2">Web Push Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Configure your website to send push notifications to your customer's windows or Mac.
                </p>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                <Input
                  id="name"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  placeholder="Enter notification name"
                  className="h-11"
                />
              </div>

              {/* Select Template */}
              <div className="space-y-2">
                <Label htmlFor="template" className="text-sm font-medium">Select Template</Label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <select
                      id="template"
                      value={config.template}
                      onChange={(e) => setConfig({ ...config, template: e.target.value })}
                      className="w-full h-11 px-3 pr-10 border rounded-md bg-background appearance-none"
                    >
                      <option value="">Select a template</option>
                      <option value="welcome">Welcome Message</option>
                      <option value="promo">Promotional</option>
                      <option value="alert">Alert</option>
                      <option value="reminder">Reminder</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                  <Button size="sm" className="h-11 w-11 p-0 bg-teal-600 hover:bg-teal-700">
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Turn into A/B Test Button */}
              <Button 
                variant="outline" 
                className="w-full h-11 justify-start text-teal-600 border-teal-200 hover:bg-teal-50"
                onClick={handleEnableABTest}
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Turn into A/B Test
              </Button>

              {/* Conditions Builder */}
              <div className="space-y-4">
                {conditions.map((condition, groupIndex) => (
                  <div key={condition.id}>
                    {/* Condition Group */}
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-medium text-muted-foreground">Conditions</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteCondition(condition.id)}
                          className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Main Condition Type */}
                      <div className="relative">
                        <select
                          value={condition.type}
                          onChange={(e) => {
                            const newConditions = [...conditions];
                            newConditions[groupIndex].type = e.target.value;
                            setConditions(newConditions);
                          }}
                          className="w-full h-11 px-3 pr-10 border rounded-md bg-background appearance-none"
                        >
                          <option value="">Select condition</option>
                          <option value="properties-about-someone">Properties about someone</option>
                          <option value="what-someone-has-done">What someone has done(or not done)</option>
                          <option value="someone-is-in">Someone is in (or not in) a list</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>

                      {/* Sub-conditions with indentation */}
                      {condition.subConditions.map((subCond, subIndex) => (
                        <div key={subIndex} className="ml-6 space-y-3 border-l-2 border-gray-200 pl-4 relative">
                          {/* Delete sub-condition button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteCondition(condition.id, subIndex)}
                            className="absolute -left-3 top-0 h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 bg-background border"
                          >
                            <X className="h-3 w-3" />
                          </Button>

                          {/* First dropdown */}
                          <div className="relative">
                            <select
                              value={subCond.field}
                              onChange={(e) => {
                                const newConditions = [...conditions];
                                newConditions[groupIndex].subConditions[subIndex].field = e.target.value;
                                setConditions(newConditions);
                              }}
                              className="w-full h-11 px-3 pr-10 border rounded-md bg-background appearance-none"
                            >
                              <option value="">Select field</option>
                              {condition.type === 'properties-about-someone' && (
                                <>
                                  <option value="platform">Platform</option>
                                  <option value="device">Device</option>
                                  <option value="browser">Browser</option>
                                </>
                              )}
                              {condition.type === 'what-someone-has-done' && (
                                <>
                                  <option value="active-on-site">Active on site</option>
                                  <option value="viewed-product">Viewed product</option>
                                  <option value="made-purchase">Made purchase</option>
                                </>
                              )}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                          </div>

                          {/* Second dropdown */}
                          <div className="relative">
                            <select
                              value={subCond.operator}
                              onChange={(e) => {
                                const newConditions = [...conditions];
                                newConditions[groupIndex].subConditions[subIndex].operator = e.target.value;
                                setConditions(newConditions);
                              }}
                              className="w-full h-11 px-3 pr-10 border rounded-md bg-background appearance-none"
                            >
                              <option value="">Select operator</option>
                              {condition.type === 'properties-about-someone' && (
                                <>
                                  <option value="equals">Equals</option>
                                  <option value="not-equals">Not equals</option>
                                  <option value="contains">Contains</option>
                                </>
                              )}
                              {condition.type === 'what-someone-has-done' && (
                                <>
                                  <option value="at-least-once">At least once</option>
                                  <option value="zero-times">Zero times</option>
                                  <option value="at-least">At least</option>
                                </>
                              )}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                          </div>

                          {/* Third field - varies by condition type */}
                          {condition.type === 'properties-about-someone' ? (
                            <div className="relative">
                              <Input
                                value={subCond.value}
                                onChange={(e) => {
                                  const newConditions = [...conditions];
                                  newConditions[groupIndex].subConditions[subIndex].value = e.target.value;
                                  setConditions(newConditions);
                                }}
                                placeholder="Enter value (e.g., MacOs)"
                                className="h-11"
                              />
                            </div>
                          ) : condition.type === 'what-someone-has-done' && (
                            <>
                              <div className="relative">
                                <select
                                  value={subCond.value}
                                  onChange={(e) => {
                                    const newConditions = [...conditions];
                                    newConditions[groupIndex].subConditions[subIndex].value = e.target.value;
                                    setConditions(newConditions);
                                  }}
                                  className="w-full h-11 px-3 pr-10 border rounded-md bg-background appearance-none"
                                >
                                  <option value="">Select timeframe</option>
                                  <option value="in-the-last">in the last</option>
                                  <option value="ever">ever</option>
                                  <option value="between">between</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                              </div>

                              {/* Time value and unit */}
                              {subCond.value === 'in-the-last' && (
                                <div className="flex gap-2">
                                  <Input
                                    type="number"
                                    value={subCond.timeValue || ''}
                                    onChange={(e) => {
                                      const newConditions = [...conditions];
                                      newConditions[groupIndex].subConditions[subIndex].timeValue = e.target.value;
                                      setConditions(newConditions);
                                    }}
                                    placeholder="30"
                                    className="h-11 w-24"
                                  />
                                  <div className="relative flex-1">
                                    <select
                                      value={subCond.timeUnit || ''}
                                      onChange={(e) => {
                                        const newConditions = [...conditions];
                                        newConditions[groupIndex].subConditions[subIndex].timeUnit = e.target.value;
                                        setConditions(newConditions);
                                      }}
                                      className="w-full h-11 px-3 pr-10 border rounded-md bg-background appearance-none"
                                    >
                                      <option value="">Unit</option>
                                      <option value="days">Days</option>
                                      <option value="hours">Hours</option>
                                      <option value="weeks">Weeks</option>
                                      <option value="months">Months</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ))}

                      {/* Add Condition Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addCondition(condition.id)}
                        className="text-teal-600 border-teal-600 hover:bg-teal-50"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Condition
                      </Button>
                    </div>

                    {/* AND/OR Toggle between condition groups */}
                    {groupIndex < conditions.length - 1 && (
                      <div className="flex items-center justify-center gap-2 my-4">
                        <Button
                          variant={conditionOperator === 'AND' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setConditionOperator('AND')}
                          className={conditionOperator === 'AND' ? 'bg-gray-900 hover:bg-gray-800' : 'hover:bg-gray-50'}
                        >
                          AND
                        </Button>
                        <Button
                          variant={conditionOperator === 'OR' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setConditionOperator('OR')}
                          className={conditionOperator === 'OR' ? 'bg-gray-900 hover:bg-gray-800' : 'hover:bg-gray-50 text-muted-foreground'}
                        >
                          OR
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add Condition Group Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addConditionGroup}
                  className="text-teal-600 border-teal-600 hover:bg-teal-50"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Condition Group
                </Button>
              </div>

              {/* Settings Section */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-base">Settings</h3>

                {/* Smart Sending Toggle */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Switch
                      id="smart-sending"
                      checked={config.smartSending}
                      onCheckedChange={(checked) => setConfig({ ...config, smartSending: checked })}
                    />
                    <Label htmlFor="smart-sending" className="text-sm font-medium cursor-pointer">
                      Turn on Smart Sending
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground ml-11">
                    This message will not be sent to profiles who recently received another message from you. Smart Sending timeframes can be updated in{' '}
                    <span className="text-teal-600 underline cursor-pointer">account settings</span>.
                  </p>
                </div>

                {/* Skip Campaign Checkbox */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="skip-campaign"
                      checked={config.skipCampaign}
                      onCheckedChange={(checked) => setConfig({ ...config, skipCampaign: checked as boolean })}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <Label htmlFor="skip-campaign" className="text-sm font-medium cursor-pointer">
                        Skip profiles who have received a campaign message
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">Within the last 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* Skip Flow Checkbox */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="skip-flow"
                      checked={config.skipFlow}
                      onCheckedChange={(checked) => setConfig({ ...config, skipFlow: checked as boolean })}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <Label htmlFor="skip-flow" className="text-sm font-medium cursor-pointer">
                        Skip profiles who have received a flow message
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">Within the last 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* A/B Test View */}
              <div className="space-y-6">
                <div className="text-sm text-muted-foreground">
                  A/B Test is enabled. Configure your test variations below.
                </div>

                {abVariations.map((variation) => (
                  <div key={variation.id}>
                    {/* Status Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`h-2 w-2 rounded-full ${variation.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {variation.status}
                      </span>
                    </div>

                    {/* Variation Card */}
                    <div className="border rounded-lg border-l-4" style={{ borderLeftColor: variation.id === 'variant-a' ? '#8b5cf6' : '#ec4899' }}>
                      <div className="p-4">
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className="w-16 h-16 border rounded-lg flex items-center justify-center bg-muted/30">
                            <Mail className="h-8 w-8 text-muted-foreground" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <span 
                                className={`text-lg font-bold px-3 py-1 rounded ${
                                  variation.id === 'variant-a' 
                                    ? 'bg-purple-100 text-purple-700' 
                                    : 'bg-pink-100 text-pink-700'
                                }`}
                              >
                                {variation.id === 'variant-a' ? 'A' : 'B'} {variation.percentage}%
                              </span>
                              <span className="font-semibold">{variation.template || config.template}</span>
                            </div>

                            {/* Percentage Slider */}
                            <div className="space-y-1">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={variation.percentage}
                                onChange={(e) => updateVariationPercentage(variation.id, parseInt(e.target.value))}
                                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                                style={{
                                  background: `linear-gradient(to right, ${
                                    variation.id === 'variant-a' ? '#8b5cf6' : '#ec4899'
                                  } 0%, ${
                                    variation.id === 'variant-a' ? '#8b5cf6' : '#ec4899'
                                  } ${variation.percentage}%, #e5e7eb ${variation.percentage}%, #e5e7eb 100%)`
                                }}
                              />
                            </div>

                            {/* Warning Badge */}
                            <div className="inline-block bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded">
                              You still have work to do
                            </div>
                          </div>

                          {/* Document Icon */}
                          <button className="text-yellow-600 hover:text-yellow-700">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Edit Button */}
                      <button 
                        className="w-full py-3 border-t text-center font-semibold hover:bg-muted/50 transition-colors"
                        onClick={() => handleEditVariation(variation.id)}
                      >
                        Edit {variation.name || `Variation ${variation.id === 'variant-a' ? 'A' : 'B'}`}
                      </button>
                    </div>
                  </div>
                ))}

                {/* Back to Single View */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsABTest(false);
                    setAbVariations([]);
                  }}
                >
                  Remove A/B Test
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="border-t px-6 py-4 flex items-center justify-between gap-3">
          <Button 
            variant="outline" 
            onClick={onDelete}
            className="h-10 px-4 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Node
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleCancel} className="h-10 px-6">
              Cancel
            </Button>
            <Button onClick={handleSave} className="h-10 px-6 bg-teal-600 hover:bg-teal-700">
              Create
            </Button>
          </div>
        </div>

        {/* A/B Test Dialog */}
        <ABTestDialog
          open={showABTestDialog}
          onOpenChange={setShowABTestDialog}
          onEditVariation={handleEditVariation}
          onSave={handleABTestSave}
        />
      </div>
    );
  }

  // Default configuration for other node types
  return (
    <div className="w-80 border-l bg-background p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Node Configuration</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Card className="p-4 mb-4">
        <div className="text-xs text-muted-foreground mb-1">Node ID</div>
        <div className="font-mono text-sm">{node.id}</div>
      </Card>

      <div className="space-y-4">
        <div>
          <Label>Node Type</Label>
          <div className="mt-1.5 px-3 py-2 border rounded-md bg-muted text-sm">
            {node.type}
          </div>
        </div>

        <Button 
          variant="destructive" 
          onClick={onDelete}
          className="w-full"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Node
        </Button>

        <Button onClick={onClose} className="w-full">
          Close
        </Button>
      </div>
    </div>
  );
}