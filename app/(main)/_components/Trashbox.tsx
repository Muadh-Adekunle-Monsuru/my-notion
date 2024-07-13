'use client';
import { Spinner } from '@/components/spinner';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { Search, Trash, Undo } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import ConfirmModal from './modals/ConfirmModal';

export default function Trashbox() {
	const router = useRouter();
	const params = useParams();
	const documents = useQuery(api.documents.getTrash);
	const restore = useMutation(api.documents.restore);
	const remove = useMutation(api.documents.remove);

	const [search, setSearch] = useState('');
	const filtered = documents?.filter((document) => {
		return document.title.toLowerCase().includes(search.toLowerCase());
	});

	const onClick = (documentId: string) => {
		router.push(`/documents/${documentId}`);
	};

	const onRestore = (e: React.MouseEvent, documentId: Id<'documents'>) => {
		e.stopPropagation();
		const promise = restore({ id: documentId });
		toast.promise(promise, {
			loading: 'Restoring note',
			success: 'Note Restored',
			error: 'Failed to restore note',
		});
	};

	const onRemove = (documentId: Id<'documents'>) => {
		const promise = remove({ id: documentId });
		toast.promise(promise, {
			loading: 'Deleting note',
			success: 'Note Permanently Deleted',
			error: 'Failed to Delete note',
		});
		if (params.documentId == documentId) {
			router.replace('/documents');
		}
	};

	if (documents === undefined) {
		return (
			<div className='h-full flex items-center justify-center p-4'>
				<Spinner size={'lg'} />
			</div>
		);
	}

	return (
		<div className='text-sm'>
			<div className='flex items-center gap-x-1 p-2'>
				<Search className='h-4 w-4' />
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className='h-7 px-2 focus-visible:ring-transparent bg-secondary'
					placeholder='Filter by page title...'
				/>
			</div>
			<div className='mt-2 px-1 pb-1'>
				<p className='hidden last:block text-xs text-center text-muted-foreground pb-2'>
					Empty
				</p>
				{filtered?.map((document) => (
					<div
						key={document._id}
						role='button'
						onClick={() => onClick(document._id)}
						className=' group text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between p-1'
					>
						<span className='truncate pl-2'>{document.title}</span>
						<div className='flex gap-1 items-center'>
							<div role='button' onClick={(e) => onRestore(e, document._id)}>
								<Undo className='opacity-0 w-5 h-5 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-sm p-1 group-hover:opacity-100' />
							</div>
							<ConfirmModal onConfirm={() => onRemove(document._id)}>
								<div role='button'>
									<Trash className='opacity-0 w-5 h-5 hover:bg-neutral-200 dark:hover:bg-neutral-600  rounded-sm p-1 group-hover:opacity-100' />
								</div>
							</ConfirmModal>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
