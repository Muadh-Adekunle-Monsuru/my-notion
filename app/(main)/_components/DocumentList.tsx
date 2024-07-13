'use client';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import Item from './Item';
import { cn } from '@/lib/utils';
import { FileIcon } from 'lucide-react';

interface Props {
	parentDocumentId?: Id<'documents'>;
	level?: number;
	data?: Doc<'documents'>;
}
export default function DocumentList({
	parentDocumentId,
	level = 0,
	data,
}: Props) {
	const params = useParams();
	const router = useRouter();
	const [expanded, setExpanded] = useState<Record<string, boolean>>({});

	const onExpand = (documentId: string) => {
		setExpanded((prev) => ({ ...prev, [documentId]: !prev[documentId] }));
	};

	const documents = useQuery(api.documents.getSidebar, {
		parentDocument: parentDocumentId,
	});

	const onRediret = (documentId: string) => {
		router.push(`/documents/${documentId}`);
	};

	if (documents === undefined) {
		return (
			<>
				<Item.Skeleton level={level} />
				{level === 0 && (
					<>
						<Item.Skeleton level={level} />
						<Item.Skeleton level={level} />
						<Item.Skeleton level={level} />
					</>
				)}
			</>
		);
	}
	return (
		<>
			<p
				style={{
					paddingLeft: level ? `${level * 12 + 25}px` : undefined,
				}}
				className={cn(
					'hidden text-sm font-medium text-muted-foreground',
					expanded && 'last:block',
					level === 0 && 'hidden'
				)}
			>
				Empty
			</p>
			{documents.map((document) => (
				<div key={document._id}>
					<Item
						id={document._id}
						onClick={() => onRediret(document._id)}
						label={document.title}
						icon={FileIcon}
						documentIcon={document.icon}
						active={params.documentId === document._id}
						level={level}
						onExpand={() => onExpand(document._id)}
						expanded={expanded[document._id]}
						creationTime={document._creationTime}
					/>
					{expanded[document._id] && (
						<DocumentList parentDocumentId={document._id} level={level + 1} />
					)}
				</div>
			))}
		</>
	);
}
