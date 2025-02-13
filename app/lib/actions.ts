'use server';
 
import { signIn } from '@/auth';
import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth';
import { createClient } from '@/app/utils/subabase/server'

// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signOutAction() {
  // Create a supabase client using subbasessr
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()
  if (error) {
    // console.error('Error signing out:', error)
  }
  await redirect('/login')
}