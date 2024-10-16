import { CircleCheck, Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import React from 'react';
import { Input } from '~/components/atoms/input/input';
import { cn } from '~/lib/utils/cn';

const InputPasswordForm = ({
	onListenPasswordValidations,
	disabled,
}: {
	onListenPasswordValidations: (isValid: boolean) => void;
	disabled: boolean;
}) => {
	const [passwordValidations, setPasswordValidations] = useState({
		value: '',
		length: false,
		special: false,
	});
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(prevState => {
			return !prevState;
		});
	};

	const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPasswordValidations(prev => ({ ...prev, value }));

		if (value.length >= 8) {
			setPasswordValidations(prev => ({ ...prev, length: true }));
		} else {
			setPasswordValidations(prev => ({ ...prev, length: false }));
		}

		if (value.match(/[!@#$%^&*(),.?":{}|<>]/)) {
			setPasswordValidations(prev => ({ ...prev, special: true }));
		} else {
			setPasswordValidations(prev => ({ ...prev, special: false }));
		}
	};

	useEffect(() => {
		onListenPasswordValidations(Object.values(passwordValidations).every(Boolean));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [passwordValidations]);

	return (
		<label htmlFor="password" className="flex flex-col gap-2 text-sm">
			Password
			<div className="relative">
				<Input
					id="password"
					disabled={disabled}
					type={isPasswordVisible ? 'text' : 'password'}
					name="password"
					placeholder="Enter your password"
					onInput={onPasswordChange}
					required
				/>
				<button
					type="button"
					className="absolute right-2 top-3"
					onClick={togglePasswordVisibility}>
					{isPasswordVisible ? (
						<EyeOff
							data-testid="eye-off-icon"
							size={15}
							className="text-muted hover:text-white"
						/>
					) : (
						<Eye
							data-testid="eye-icon"
							size={15}
							className="text-muted hover:text-white"
						/>
					)}
				</button>
			</div>
			<div className="flex flex-col items-start gap-1 text-xs text-muted">
				<div
					className={cn(
						passwordValidations.length || !passwordValidations.value
							? 'text-muted'
							: 'text-destructive',
						'flex items-center gap-1'
					)}>
					<CircleCheck data-testid="check-icon" size={14} />
					<p>Must be at least 8 characters</p>
				</div>
				<div
					className={cn(
						passwordValidations.special || !passwordValidations.value
							? 'text-muted'
							: 'text-destructive',
						'flex items-center gap-1'
					)}>
					<CircleCheck data-testid="check-icon" size={14} />
					<p>Must contain one special character</p>
				</div>
			</div>
		</label>
	);
};

export default InputPasswordForm;
