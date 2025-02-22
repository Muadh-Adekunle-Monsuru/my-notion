'use client';

import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
	const { isAuthenticated, isLoading } = useConvexAuth();
	return (
		<div className='max-w-3xl space-y-4'>
			<h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
				Your Ideas, Documents, & Plans. Unified. Welcome to
				<span className='underline'> Jotion</span>
			</h1>
			<h3 className=' text-base sm:text-xl md:text-2xl font-medium'>
				Jotion is the connected workspace where <br /> better, faster work
				happens.
			</h3>
			{isLoading && (
				<div className='w-full flex items-center justify-center'>
					<Spinner size={'lg'} />
				</div>
			)}
			{isAuthenticated && !isLoading && (
				<Button asChild>
					<div>
						<Link href={'/documents'}>Enter Dashboard</Link>
						<ArrowRight className='h-4 w-4 ml-2' />
					</div>
				</Button>
			)}
			{!isAuthenticated && !isLoading && (
				<SignInButton mode='modal'>
					<Button asChild>
						<div>
							Get Jotion
							<ArrowRight className='h-4 w-4 ml-2' />
						</div>
					</Button>
				</SignInButton>
			)}
		</div>
	);
}
