'use client';
import { DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/clerk-react';
import {
	DropdownMenu,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import { useMutation } from 'convex/react';
import {
	ChevronDown,
	ChevronRight,
	LucideIcon,
	MoreHorizontal,
	Plus,
	Trash,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
interface ItemProp {
	id?: Id<'documents'>;
	documentIcon?: string;
	active?: boolean;
	expanded?: boolean;
	isSearch?: boolean;
	level?: number;
	onExpand?: () => void;
	label: string;
	onClick?: () => void;
	icon: LucideIcon;
	creationTime?: number;
}
export default function Item({
	id,
	documentIcon,
	active,
	expanded,
	isSearch,
	level = 0,
	label,
	onExpand,
	onClick,
	icon: Icon,
	creationTime,
}: ItemProp) {
	const create = useMutation(api.documents.create);
	const archive = useMutation(api.documents.archive);
	const onArchive = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!id) return;
		const promise = archive({ id });
		toast.promise(promise, {
			loading: 'Moving to trash...',
			success: 'Note moved to trash 🗑️',
			error: 'Failed to archive note.',
		});
	};
	const { user } = useUser();
	const router = useRouter();
	const date = new Date(creationTime ?? '');

	const handleExpand = (event: React.MouseEvent) => {
		event.stopPropagation();
		onExpand?.();
	};

	const onCreate = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!id) return;
		const promise = create({
			title: 'Untitled',
			parentDocument: id,
		}).then((documentId) => {
			if (!expanded) {
				onExpand?.();
			}
			// router.push(`documents/${documentId}`);
		});

		toast.promise(promise, {
			loading: '📝Creating a new note...',
			success: 'New note created✨',
			error: 'Failed to create a new note⛔',
		});
	};
	const ChevronIcon = expanded ? ChevronDown : ChevronRight;
	return (
		<div
			onClick={onClick}
			role='button'
			style={{ paddingLeft: level ? `${level * 12 + 12}px` : '12px' }}
			className={cn(
				'group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium select-none',
				active && 'bg-primary/5 text-primary'
			)}
		>
			{!!id && (
				<div
					role='button'
					className='h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1'
					onClick={handleExpand}
				>
					<ChevronIcon className='h-4 w-4 shrink-0 text-muted-foreground' />
				</div>
			)}
			{documentIcon ? (
				<div className='shrink-0 mr-2 text-[18px]'>{documentIcon}</div>
			) : (
				<Icon className='shrink-0 h-[18px] mr-2 text-muted-foreground' />
			)}
			<span className='truncate'>{label}</span>
			{isSearch && (
				<p className='text-xs ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
					<kbd>CTRL</kbd> + <kbd>k</kbd>
				</p>
			)}

			{!!id && (
				<div className='ml-auto flex items-center gap-x-2'>
					<DropdownMenu>
						<DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
							<div
								role='button'
								className='opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'
							>
								<MoreHorizontal className='w-4 h-4 text-muted-foreground' />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							onClick={(e) => e.stopPropagation()}
							className='w-60'
							align='start'
							side='right'
							forceMount
						>
							<DropdownMenuItem onClick={onArchive}>
								<div className='flex gap-1 items-center cursor-pointer focus-visible:ring-transparent hover:ring-0'>
									<Trash className='h-4 w-4 mr-2' />
									<p>Delete</p>
								</div>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<div className='text-xs text-muted-foreground p-2'>
								Created on: {date.toISOString().slice(0, 10)}
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
					<div
						role='button'
						onClick={onCreate}
						className='opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'
					>
						<Plus className='h-4 w-4 text-muted-foreground' />
					</div>
				</div>
			)}
		</div>
	);
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
	return (
		<div
			style={{
				paddingLeft: level ? `${level * 12 + 25}px` : '12px',
			}}
			className='flex gap-x-2 py-[3px] '
		>
			<Skeleton className='h-4 w-4' />
			<Skeleton className='h-4 w-[30%]' />
		</div>
	);
};
