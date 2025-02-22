'use client';

import { useScrollTop } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { useConvexAuth } from 'convex/react';
import { Loader } from 'lucide-react';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import { Spinner } from '@/components/spinner';
import Link from 'next/link';

export default function NavBar() {
	const scrolled = useScrollTop();
	const { isAuthenticated, isLoading } = useConvexAuth();
	return (
		<div
			className={cn(
				'z-50 bg-background fixed top-0 flex w-full items-center p-6 dark:bg-[#1f1f1f]',
				scrolled && 'border-b shadow-sm'
			)}
		>
			<Logo />
			<div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 '>
				{isLoading && <Spinner />}
				{!isAuthenticated && !isLoading && (
					<>
						<SignInButton mode='modal'>
							<Button variant={'link'} size={'sm'}>
								Log in
							</Button>
						</SignInButton>
						<SignInButton mode='modal'>
							<Button size={'sm'}>Get Jotion Free</Button>
						</SignInButton>
					</>
				)}
				{isAuthenticated && !isLoading && (
					<>
						<Button variant={'ghost'} size={'sm'} asChild>
							<Link href={'/documents'}>Enter Dashboard</Link>
						</Button>
						<UserButton afterSignOutUrl='/' />
					</>
				)}
				<ModeToggle />
			</div>
		</div>
	);
}
