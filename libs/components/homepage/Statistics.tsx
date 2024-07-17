import { Box, Container, Stack } from '@mui/material';
import React from 'react';

export default function Statistics() {
	return (
		<div className={'static-frame'}>
			<Container>
				<Stack className={'info'}>
					<Stack className={'static-box'}>
						<Box className={'static-num'}>5+</Box>
						<Box className={'static-text'}>Ratings</Box>
					</Stack>

					<Stack className={'static-box'}>
						<Box className={'static-num'}>2022</Box>
						<Box className={'static-text'}>Established in</Box>
					</Stack>

					<Stack className={'static-box'}>
						<Box className={'static-num'}>1000+</Box>
						<Box className={'static-text'}>Products</Box>
					</Stack>

					<Stack className={'static-box'}>
						<Box className={'static-num'}>1000+</Box>
						<Box className={'static-text'}>Reviews</Box>
					</Stack>
				</Stack>
			</Container>
		</div>
	);
}
