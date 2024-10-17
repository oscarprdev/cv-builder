import NewResumeForm from '../NewResumeForm/NewResumeForm';
import { Plus } from 'lucide-react';
import React from 'react';
import { Dialog } from '~/components/atoms/dialog/dialog';

const NewResumeDialog = () => {
	return (
		<Dialog
			data-testid="new-resume-dialog"
			trigger={
				<button className="relative grid h-[250px] w-[170px] place-items-center rounded-md border p-3 text-muted duration-300 hover:border-muted-foreground hover:bg-backgroundLight hover:text-white">
					<Plus size={40} />
					<label className="absolute bottom-4 cursor-pointer text-sm">
						Create new resume
					</label>
				</button>
			}
			title="Create new resume">
			<NewResumeForm />
		</Dialog>
	);
};

export default NewResumeDialog;
