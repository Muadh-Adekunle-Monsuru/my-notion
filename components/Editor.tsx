'use client';
import React from 'react';

import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { useBlockNote, useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/core/style.css';
import '@blocknote/mantine/style.css';
import { useEdgeStore } from '@/lib/edgestore';

import { useTheme } from 'next-themes';
interface EditorProp {
	onChange: (value: string) => void;
	initialContent?: string;
	editable?: boolean;
}
export default function Editor({
	onChange,
	initialContent,
	editable,
}: EditorProp) {
	const { resolvedTheme } = useTheme();
	const { edgestore } = useEdgeStore();

	const handleUpload = async (file: File) => {
		const response = await edgestore.publicFiles.upload({
			file,
		});
		return response.url;
	};
	const editor = useCreateBlockNote({
		initialContent: initialContent
			? (JSON.parse(initialContent) as PartialBlock[])
			: undefined,
		uploadFile: handleUpload,
	});

	return (
		<div>
			<BlockNoteView
				editor={editor}
				editable={editable}
				onChange={() => onChange(JSON.stringify(editor.document, null, 2))}
				theme={resolvedTheme == 'dark' ? 'dark' : 'light'}
			/>
		</div>
	);
}
