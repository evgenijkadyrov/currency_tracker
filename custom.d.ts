declare module '*.svg' {
	import * as React from 'react';

	const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & { title?: string }
	>;

	export default ReactComponent;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.module.scss' {
	interface IClassNames {
		[className: string]: string;
	}
	const classNames: IClassNames;
	export = classNames;
}
declare const platform: 'mobile' | 'desktop';
