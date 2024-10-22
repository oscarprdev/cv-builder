import NewResumeForm from '../NewResumeForm/NewResumeForm';
import { Plus } from 'lucide-react';
import React from 'react';
import { Dialog } from '~/features/shared/presentation/components/ui/dialog/dialog';

const NewResumeDialog = () => {
	return (
		<Dialog
			data-testid="new-resume-dialog"
			trigger={
				<button className="relative grid h-[250px] w-[170px] place-items-center rounded-md border p-3 text-muted duration-300 hover:border-muted-foreground hover:bg-background-light hover:text-white">
					<Plus size={40} />
					<label className="absolute bottom-4 cursor-pointer text-sm">
						Create new resume
					</label>
				</button>
			}
			title="Create new resume"
			subTitle="Fullfill basic information to start building your resume">
			<NewResumeForm />
		</Dialog>
	);
};

export default NewResumeDialog;
