declare module '*.svg' {
	import React from 'react';
	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
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
