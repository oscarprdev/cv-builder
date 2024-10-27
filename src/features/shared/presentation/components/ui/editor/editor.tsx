import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip/tooltip';
import { Highlight } from '@tiptap/extension-highlight';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
	BoldIcon,
	HighlighterIcon,
	ItalicIcon,
	List,
	ListOrdered,
	UnderlineIcon,
} from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Toggle } from '~/features/shared/presentation/components/ui/toggle/toggle';

const Editor = ({ content, onChange }: { content: string; onChange?: (value: string) => void }) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Highlight,
			TextAlign,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
		],
		onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
		parseOptions: { preserveWhitespace: 'full' },
		editorProps: {
			attributes: {
				placeholder: 'Write a short summary of your experience',
				class: 'prose prose-sm text-muted max-h-[200px] max-w-none overflow-y-scroll dark:prose-invert focus:outline-none [&_*]:my-2',
			},
		},
		content,
	});

	return (
		<>
			<div className="flex flex-wrap gap-0.5 border p-1">
				<EditorTooltip
					tooltipText="Bold"
					pressed={Boolean(editor?.isActive('bold'))}
					onPressed={() => Boolean(editor?.chain().focus().toggleBold().run())}>
					<BoldIcon size={14} />
				</EditorTooltip>
				<EditorTooltip
					tooltipText="Italic"
					pressed={Boolean(editor?.isActive('italic'))}
					onPressed={() => Boolean(editor?.chain().focus().toggleItalic().run())}>
					<ItalicIcon size={14} />
				</EditorTooltip>
				<EditorTooltip
					tooltipText="Underline"
					pressed={Boolean(editor?.isActive('underline'))}
					onPressed={() => Boolean(editor?.chain().focus().toggleUnderline().run())}>
					<UnderlineIcon size={14} />
				</EditorTooltip>
				<EditorTooltip
					tooltipText="Highlight"
					pressed={Boolean(editor?.isActive('highlight'))}
					onPressed={() => Boolean(editor?.chain().focus().toggleHighlight().run())}>
					<HighlighterIcon size={14} />
				</EditorTooltip>
				<EditorTooltip
					tooltipText="Bullet list"
					pressed={Boolean(editor?.isActive('bulletList'))}
					onPressed={() => Boolean(editor?.chain().focus().toggleBulletList().run())}>
					<List size={14} />
				</EditorTooltip>
				<EditorTooltip
					tooltipText="Ordered list"
					pressed={Boolean(editor?.isActive('orderedList'))}
					onPressed={() => Boolean(editor?.chain().focus().toggleOrderedList().run())}>
					<ListOrdered size={14} />
				</EditorTooltip>
			</div>
			<EditorContent
				editor={editor}
				className="grid min-h-[160px] w-full rounded-sm border bg-transparent px-3 py-2 text-sm placeholder:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
			/>
		</>
	);
};

const EditorTooltip = ({
	tooltipText,
	pressed,
	onPressed,
	children,
}: PropsWithChildren<{
	tooltipText: string;
	pressed: boolean;
	onPressed: () => boolean;
}>) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						aria-label={`Toggle ${tooltipText.toLowerCase()}`}
						pressed={pressed}
						onPressedChange={onPressed}>
						{children}
					</Toggle>
				</TooltipTrigger>
				<TooltipContent side="top" className="m-2 rounded-md bg-background-hover px-2 py-1">
					<p className="text-xs text-white">{tooltipText}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default Editor;
