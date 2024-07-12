'use client';
import { Spinner } from '@/components/spinner';
import { useConvexAuth } from 'convex/react';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';
import Navigation from './_components/Navigation';

export default function MainLayout({ children }: { children: ReactNode }) {
	const { isAuthenticated, isLoading } = useConvexAuth();
	if (isLoading) {
		return (
			<div className='h-full flex items-center justify-center'>
				<Spinner />
			</div>
		);
	}

	if (!isAuthenticated) {
		return redirect('/');
	}

	return (
		<div className='h-full flex dark:bg-[#1f1f1f]'>
			<Navigation />
			<main className='flex-1 h-full overflow-y-auto'>{children}</main>
		</div>
	);
}
