import React from 'react';
import { Button, Link, Stack } from '@mui/material';

const Intro = () => {
	return (
		<Stack className={'intro'}>
			<Stack className={'intro-left'}>
				<p className={'intro1'}>
					<strong>HushPaw</strong> One-Stop Shop for All Things Pet!
				</p>
				<p className={'intro2'}>Explore Our Wide Range of Pet Products and Services!</p>
				<p className={'intro3'}>HushPaw brings Joy to Pets and Their Owners Every Day!</p>
			</Stack>
			<Stack className={'intro-right'}>
				<Link>
					<Button className={'intro-btn'}>Join Now</Button>
				</Link>
			</Stack>
		</Stack>
	);
};

export default function App() {
	return (
		<div>
			<Intro />
			{/* Add other components or content here */}
		</div>
	);
}
