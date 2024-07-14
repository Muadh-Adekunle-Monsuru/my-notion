'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import Toolbar from '@/components/Toolbar';
import Cover from '@/components/Cover';
import { Skeleton } from '@/components/ui/skeleton';
import { ApiError } from 'next/dist/server/api-utils';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
interface Props {
	params: {
		documentId: Id<'documents'>;
	};
}

export default function page({ params }: Props) {
	const Editor = useMemo(
		() => dynamic(() => import('@/components/Editor'), { ssr: false }),
		[]
	);
	const document = useQuery(api.documents.getById, {
		documentId: params.documentId,
	});

	const update = useMutation(api.documents.update);

	const onChange = (content: string) => {
		update({
			id: params.documentId,
			content,
		});
	};
	if (document == undefined) {
		return (
			<div className='md:max-w-3xl lg:max-w-4xl mx-auto mt-10'>
				<div className='space-y-4 pl-8 pt-4'>
					<Skeleton className='h-14 w-[50%]' />
					<Skeleton className='h-14 w-[80%]' />
					<Skeleton className='h-14 w-[40%]' />
					<Skeleton className='h-14 w-[60%]' />
				</div>
			</div>
		);
	}

	if (document == null) {
		return <div>Not found</div>;
	}

	return (
		<div className='pb-40'>
			<Cover url={document.coverImage} />
			<div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
				<Toolbar initialData={document} />
				<Editor onChange={onChange} initialContent={document.content} />
			</div>
		</div>
	);
}
