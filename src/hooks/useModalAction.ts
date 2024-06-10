import { useState } from 'react';

interface IModalAction {
	handleModalClose: () => void;
	handleModalOpen: () => void;
	isModalActive: boolean;
}
export const useModalAction = (): IModalAction => {
	const [isModalActive, setModalActive] = useState(false);
	const handleModalOpen = () => {
		setModalActive(true);
	};
	const handleModalClose = () => {
		setModalActive(false);
	};
	return {
		handleModalOpen,
		handleModalClose,
		isModalActive,
	};
};
