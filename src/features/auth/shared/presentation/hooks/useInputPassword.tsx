import { useEffect, useState } from 'react';

export const useInputPassword = ({
	onListenPasswordValidations,
}: {
	onListenPasswordValidations: (isValid: boolean) => void;
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

	return {
		passwordValidations,
		isPasswordVisible,
		togglePasswordVisibility,
		onPasswordChange,
	};
};
