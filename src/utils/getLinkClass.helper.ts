import classNames from 'classnames';

export const getLinkClass = (
	defaultClass: string,
	lightClass: string,
	theme: string
) =>
	classNames({
		[defaultClass]: true,
		[lightClass]: theme === 'light',
	});
