import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export function useTheme() {
	const contextData = useContext(ThemeContext);

	return contextData;
}