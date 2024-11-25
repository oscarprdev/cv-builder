'use client';

import React, { PropsWithChildren } from 'react';
import { Button } from '~/features/shared/presentation/components/ui/button/button';
import { Dialog } from '~/features/shared/presentation/components/ui/dialog/dialog';

const AddNewCustomItemButton = ({ children }: PropsWithChildren) => {
	return (
		<Dialog
			trigger={<Button className="mt-5 w-full">Add new experience</Button>}
			title="New experience">
			{children}
		</Dialog>
	);
};

export default AddNewCustomItemButton;
