'use server';

import { z } from 'zod';
import { supabase } from '@/lib/supabase';

const waitlistSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export async function addToWaitlist(prevState: any, formData: FormData) {
  const validatedFields = waitlistSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Invalid data',
      message: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { name, email } = validatedFields.data;

  const { error } = await supabase
    .from('waitlist')
    .insert([{ name, email }]);

  if (error) {
    if (error.code === '23505') { // Unique violation
        return { success: false, error: 'You are already on the waitlist!' };
    }
    return { success: false, error: 'Something went wrong. Please try again.' };
  }

  return { success: true, message: 'You have been added to the waitlist!' };
}
