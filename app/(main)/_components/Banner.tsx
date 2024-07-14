'use client';

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ConfirmModal from './modals/ConfirmModal';
interface Props {
	documentId: Id<'documents'>;
}
export default function Banner({ documentId }: Props) {
	const router = useRouter();
	const remove = useMutation(api.documents.remove);
	const restore = useMutation(api.documents.restore);

	const onRemove = () => {
		const promise = remove({ id: documentId });

		toast.promise(promise, {
			loading: 'Deleting note...',
			success: 'Note deleted',
			error: 'Error deleting note',
		});
		router.push('/documents');
	};

	const onRestore = () => {
		const promise = restore({ id: documentId });

		toast.promise(promise, {
			loading: 'Restoring note...',
			success: 'Note restored',
			error: 'Error note',
		});
	};
	return (
		<div className='w-full bg-rose-300 text-center text-sm p-2 text-whte flex items-center gap-x-2  justify-center'>
			<p>This note is in the Trash</p>
			<Button
				size={'sm'}
				onClick={onRestore}
				variant={'outline'}
				className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-3 h-auto font-normal'
			>
				Restore note
			</Button>
			<ConfirmModal onConfirm={onRemove}>
				<Button
					size={'sm'}
					variant={'destructive'}
					className='border-white  hover:bg-primary/5 text-white hover:text-white p-1 px-3 h-auto font-normal'
				>
					Delete forever
				</Button>
			</ConfirmModal>
		</div>
	);
}
