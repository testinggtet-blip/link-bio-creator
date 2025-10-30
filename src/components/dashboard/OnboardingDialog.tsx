"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';

const usernameSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, hyphens, and underscores')
    .toLowerCase(),
});

type UsernameFormData = z.infer<typeof usernameSchema>;

interface OnboardingDialogProps {
  open: boolean;
  onComplete: (username: string) => void;
  userId: number;
}

export function OnboardingDialog({ open, onComplete, userId }: OnboardingDialogProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UsernameFormData>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: '',
    },
  });

  const checkUsernameAvailability = async (username: string) => {
    if (username.length < 3) {
      setIsAvailable(null);
      return;
    }

    setIsChecking(true);
    try {
      const response = await fetch(`/api/users/username/${username}`);
      if (response.status === 404) {
        setIsAvailable(true);
      } else {
        setIsAvailable(false);
      }
    } catch (error) {
      console.error('Failed to check username:', error);
      setIsAvailable(null);
    } finally {
      setIsChecking(false);
    }
  };

  const handleUsernameChange = (value: string) => {
    form.setValue('username', value);
    setIsAvailable(null);
    
    // Debounce the availability check
    const timeoutId = setTimeout(() => {
      if (value.length >= 3 && /^[a-zA-Z0-9_-]+$/.test(value)) {
        checkUsernameAvailability(value);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const onSubmit = async (data: UsernameFormData) => {
    if (!isAvailable) {
      toast.error('Please choose an available username');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: data.username }),
      });

      if (!response.ok) {
        throw new Error('Failed to set username');
      }

      toast.success('Welcome! Your profile is ready.');
      onComplete(data.username);
    } catch (error) {
      console.error('Failed to set username:', error);
      toast.error('Failed to set username. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome! 👋</DialogTitle>
          <DialogDescription>
            Choose a unique username for your profile URL
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="johndoe"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleUsernameChange(e.target.value);
                        }}
                        className="pr-10"
                      />
                    </FormControl>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isChecking && (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      )}
                      {!isChecking && isAvailable === true && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                      {!isChecking && isAvailable === false && (
                        <X className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  </div>
                  <FormDescription>
                    Your profile will be at: <strong>yoursite.com/{field.value || 'username'}</strong>
                  </FormDescription>
                  {!isChecking && isAvailable === false && (
                    <p className="text-sm text-destructive">
                      This username is already taken
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting || !isAvailable || isChecking}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting up...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}