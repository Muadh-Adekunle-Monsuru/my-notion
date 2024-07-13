'use client';
import React from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Props {
	children: React.ReactNode;
	onConfirm: () => void;
}
export default function ConfirmModal({ children, onConfirm }: Props) {
	const handleConfirm = (e: React.MouseEvent) => {
		e.stopPropagation();
		onConfirm();
	};
	return (
		<AlertDialog>
			<AlertDialogTrigger onClick={(e) => e.stopPropagation()}>
				{children}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={(e) => e.stopPropagation()}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>{' '}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
