import { Box, Container, Stack } from '@mui/material';
import React from 'react';

export default function Statistics() {
	return (
		<div className={'static-frame'}>
			<Container>
				<Stack className={'info'}>
					<Stack className={'static-box'}>
						<Box className={'static-num'} component="div">
							5+
						</Box>
						<Box className={'static-text'} component="div">
							Ratings
						</Box>
					</Stack>

					<Stack className={'static-box'}>
						<Box className={'static-num'} component="div">
							2022
						</Box>
						<Box className={'static-text'} component="div">
							Established in
						</Box>
					</Stack>

					<Stack className={'static-box'}>
						<Box className={'static-num'} component="div">
							1000+
						</Box>
						<Box className={'static-text'} component="div">
							Products
						</Box>
					</Stack>

					<Stack className={'static-box'}>
						<Box className={'static-num'} component="div">
							1000+
						</Box>
						<Box className={'static-text'} component="div">
							Reviews
						</Box>
					</Stack>
				</Stack>
			</Container>
		</div>
	);
}
