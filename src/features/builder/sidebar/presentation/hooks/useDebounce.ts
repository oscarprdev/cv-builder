export const useDebounce = () => {
	const debounce = function <I>(callback: (args: I) => void, delay: number) {
		let timeoutId: NodeJS.Timeout;
		return (...args: [I]) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => callback(...args), delay);
		};
	};

	return {
		debounce,
	};
};
