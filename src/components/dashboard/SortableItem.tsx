"use client"

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { Link } from '@/lib/types';
import { getLinkIcon } from '@/lib/linkIcons';
import { Badge } from '@/components/ui/badge';

interface SortableItemProps {
  link: Link;
  onEdit: () => void;
  onDelete: () => void;
}

export function SortableItem({ link, onEdit, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const IconComponent = getLinkIcon(link.icon);
  const layout = link.layout || 'classic';

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="group relative p-4 hover:shadow-md transition-all"
    >
      {/* Drag Handle - Top Center */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Edit & Delete Buttons - Show on Hover in Right Corner */}
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={onEdit}
          title="Edit link"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 hover:bg-destructive/10"
          onClick={onDelete}
          title="Delete link"
        >
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex items-center gap-3">
        {/* Icon/Thumbnail */}
        {link.thumbnail && layout === 'featured' ? (
          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
            <img
              src={link.thumbnail}
              alt={link.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
            <IconComponent className="h-5 w-5" />
          </div>
        )}

        {/* Title & URL */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-base truncate">{link.title}</h4>
            {layout === 'featured' && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                Featured
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">{link.url}</p>
        </div>

        {/* Click Count */}
        <div className="flex-shrink-0 text-sm text-muted-foreground font-medium">
          {link.clickCount} clicks
        </div>
      </div>
    </Card>
  );
}