import { Link, Outlet } from 'react-router-dom';

export function App() {
	return (
		<div>
			Hello world
			<Link to="/about">About </Link>
			<Link to="/">Home </Link>
			<Link to="/contact">Contact </Link>
			<Outlet />
		</div>
	);
}
