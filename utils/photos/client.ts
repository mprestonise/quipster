'use client'

import { redirectToPath } from './server';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

  export async function uploadPhoto(
    e: React.FormEvent<HTMLFormElement>,
    uuid: Record<string, unknown> | undefined,
    requestFunc: (formData: FormData, user: Record<string, unknown> | undefined) => Promise<string>,
    router: AppRouterInstance | null = null
  ): Promise<boolean | void> {
    // Prevent default form submission refresh
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget);
    const redirectUrl: string = await requestFunc(formData, uuid);
  
    if (router) {
      // If client-side router is provided, use it to redirect
      return router.push(redirectUrl);
    } else {
      // Otherwise, redirect server-side
      return await redirectToPath(redirectUrl);
    }
  }