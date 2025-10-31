"use client"

import { Button } from '@/components/ui/button';
import { Save, Play, Download, Upload, Trash2, Undo, Redo } from 'lucide-react';

interface FlowToolbarProps {
  onSave?: () => void;
  onRun?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onClear?: () => void;
}

export function FlowToolbar({ onSave, onRun, onUndo, onRedo, onClear }: FlowToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-4 border-b bg-background">
      <Button variant="outline" size="sm" onClick={onSave}>
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>
      <Button size="sm" onClick={onRun}>
        <Play className="h-4 w-4 mr-2" />
        Run
      </Button>
      <div className="h-6 w-px bg-border mx-2" />
      <Button variant="ghost" size="sm" onClick={onUndo}>
        <Undo className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={onRedo}>
        <Redo className="h-4 w-4" />
      </Button>
      <div className="h-6 w-px bg-border mx-2" />
      <Button variant="ghost" size="sm">
        <Upload className="h-4 w-4 mr-2" />
        Import
      </Button>
      <Button variant="ghost" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
      <div className="flex-1" />
      <Button variant="ghost" size="sm" onClick={onClear}>
        <Trash2 className="h-4 w-4 mr-2" />
        Clear
      </Button>
    </div>
  );
}
