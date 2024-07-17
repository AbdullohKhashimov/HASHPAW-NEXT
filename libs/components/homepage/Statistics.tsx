import { Box, Container, Stack } from '@mui/material';
import React from 'react';
import Divider from '../divider';

export default function Statistics() {
	return (
		<div className={'static-frame'}>
			<Container>
				<Stack className={'info'}>
					<Stack className={'static-box'}>
						<Box className={'static-text'}>Cafes</Box>
						<Box className={'static-num'}>5+</Box>
					</Stack>

					<Divider height="6" width="36" bg="#c7c7cd;" />

					<Stack className={'static-box'}>
						<Box className={'static-text'}>Since</Box>
						<Box className={'static-num'}>2021</Box>
					</Stack>

					<Divider height="6" width="36" bg="#c7c7cd;" />

					<Stack className={'static-box'}>
						<Box className={'static-text'}>Drinks</Box>
						<Box className={'static-num'}>30+</Box>
					</Stack>

					<Divider height="6" width="36" bg="#c7c7cd;" />

					<Stack className={'static-box'}>
						<Box className={'static-text'}>Clients</Box>
						<Box className={'static-num'}>500+</Box>
					</Stack>
				</Stack>
			</Container>
		</div>
	);
}
