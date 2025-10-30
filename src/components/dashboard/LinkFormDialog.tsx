"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/types';
import { iconOptions } from '@/lib/linkIcons';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { useState } from 'react';

const linkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Please enter a valid URL'),
  icon: z.string().min(1, 'Please select an icon'),
  layout: z.enum(['classic', 'featured']).default('classic'),
  thumbnail: z.string().optional(),
});

type LinkFormData = z.infer<typeof linkSchema>;

interface LinkFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  userId: number;
  initialData?: Link;
  isLoading?: boolean;
}

export function LinkFormDialog({
  open,
  onOpenChange,
  onSubmit,
  userId,
  initialData,
  isLoading,
}: LinkFormDialogProps) {
  const [selectedLayout, setSelectedLayout] = useState<'classic' | 'featured'>(
    initialData?.layout || 'classic'
  );

  const form = useForm<LinkFormData>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: initialData?.title || '',
      url: initialData?.url || '',
      icon: initialData?.icon || 'link',
      layout: initialData?.layout || 'classic',
      thumbnail: initialData?.thumbnail || '',
    },
  });

  const handleSubmit = (data: LinkFormData) => {
    if (initialData) {
      onSubmit(data);
    } else {
      onSubmit({
        ...data,
        userId,
        orderIndex: 999,
        clickCount: 0,
      });
    }
  };

  const watchedLayout = form.watch('layout');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Link' : 'Add New Link'}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? 'Update your link details below.'
              : 'Add a new link to your profile.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My Instagram" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://instagram.com/username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {iconOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              {option.label}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="layout"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Layout</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedLayout(value as 'classic' | 'featured');
                      }}
                      defaultValue={field.value}
                      className="space-y-3"
                    >
                      {/* Classic Layout Option */}
                      <div className="flex items-start space-x-3 border rounded-lg p-4 hover:border-primary transition-colors">
                        <RadioGroupItem value="classic" id="classic" className="mt-1" />
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="classic" className="cursor-pointer">
                            <div className="font-semibold text-base">Classic</div>
                            <div className="text-sm text-muted-foreground">
                              Efficient, direct and compact.
                            </div>
                          </Label>
                          <div className="mt-3 flex items-center gap-3 p-3 bg-muted rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <ImageIcon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">Link preview</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Featured Layout Option */}
                      <div className="flex items-start space-x-3 border rounded-lg p-4 hover:border-primary transition-colors">
                        <RadioGroupItem value="featured" id="featured" className="mt-1" />
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="featured" className="cursor-pointer">
                            <div className="font-semibold text-base">Featured</div>
                            <div className="text-sm text-muted-foreground">
                              Make your link stand out with a larger, more attractive display.
                            </div>
                          </Label>
                          <div className="mt-3 rounded-lg overflow-hidden bg-muted">
                            <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                              <ImageIcon className="h-12 w-12 text-white/60" />
                            </div>
                            <div className="p-3">
                              <div className="text-sm font-medium">Featured link preview</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchedLayout === 'featured' && (
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail Image URL (Optional)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                        />
                        {field.value && (
                          <div className="relative aspect-video rounded-lg overflow-hidden border">
                            <img
                              src={field.value}
                              alt="Thumbnail preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : initialData ? 'Update' : 'Add Link'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}