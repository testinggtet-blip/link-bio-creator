"use client"

import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { LinkFormDialog } from './LinkFormDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from '@/lib/types';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LinkManagerProps {
  userId: number;
  links: Link[];
  onLinksUpdate: (links: Link[]) => void;
}

export function LinkManager({ userId, links, onLinksUpdate }: LinkManagerProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = links.findIndex((link) => link.id === active.id);
      const newIndex = links.findIndex((link) => link.id === over.id);

      const newLinks = arrayMove(links, oldIndex, newIndex);
      onLinksUpdate(newLinks);

      // Update order on server
      try {
        await fetch('/api/links/reorder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            linkIds: newLinks.map(l => l.id),
          }),
        });
      } catch (error) {
        console.error('Failed to reorder links:', error);
      }
    }
  };

  const handleAddLink = async (linkData: Omit<Link, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(linkData),
      });
      const newLink = await response.json();
      onLinksUpdate([...links, newLink]);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Failed to add link:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditLink = async (linkData: Partial<Link>) => {
    if (!editingLink) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/links/${editingLink.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(linkData),
      });
      const updatedLink = await response.json();
      onLinksUpdate(links.map(l => l.id === updatedLink.id ? updatedLink : l));
      setEditingLink(null);
    } catch (error) {
      console.error('Failed to update link:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLink = async (linkId: number) => {
    if (!confirm('Are you sure you want to delete this link?')) return;

    try {
      await fetch(`/api/links/${linkId}`, { method: 'DELETE' });
      onLinksUpdate(links.filter(l => l.id !== linkId));
    } catch (error) {
      console.error('Failed to delete link:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Your Links</h3>
          <p className="text-sm text-muted-foreground">
            Drag and drop to reorder your links
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New
        </Button>
      </div>

      {links.length === 0 ? (
        <Alert>
          <AlertDescription>
            You haven't added any links yet. Click "Create New" to get started!
          </AlertDescription>
        </Alert>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={links.map(l => l.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {links.map((link) => (
                <SortableItem
                  key={link.id}
                  link={link}
                  onEdit={() => setEditingLink(link)}
                  onDelete={() => handleDeleteLink(link.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <LinkFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddLink}
        userId={userId}
        isLoading={isLoading}
      />

      {editingLink && (
        <LinkFormDialog
          open={!!editingLink}
          onOpenChange={(open) => !open && setEditingLink(null)}
          onSubmit={handleEditLink}
          userId={userId}
          initialData={editingLink}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}