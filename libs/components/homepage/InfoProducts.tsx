import React from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';

// interface StaticInfoProps {
// 	initialInput: PropertiesInquiry;
// }

const StaticInfo = (props: any) => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <Stack>Mobile Static Data</Stack>;
	} else {
		return (
			<Stack className={'container'}>
				<Stack className={'hgts-container'}>
					<Stack className={'highlights-up'}>
						<Box component={'div'} className={'hgts-up'}>
							<div className={'hgts-hold'}>
								<p className={'hgts-ttl'}>HushPaw</p>
								<p className={'hgts-text'}>
									Our recent Adopt a Pet Day was a huge success, with over 50 pets finding their forever homes. Thank
									you to everyone who participated and made this event memorable.
								</p>
								<p className={'hgts-place'}>Adopt a Pet Day Success!</p>
								<p className={'hgts-section'}>Details @HushPaw.com</p>
							</div>
							<div>
								{' '}
								<img className={'hgts-img'} src="/img/banner/girldog.png" alt="" />
							</div>
						</Box>
						<Box component={'div'} className={'hgts-down'}>
							<div className={'hgts-hold'}>
								<p className={'hgts-ttl'}>HushPaw</p>
								<p className={'hgts-place'}>
									We are thrilled to introduce our new exotic pet section, featuring a variety of reptiles, birds, and
									small mammals. Come check out our unique and fascinating new additions!
								</p>
								<p className={'hgts-section'}>New Exotic Pet Section Opening soon!</p>
							</div>
							<div>
								<img className={'hgts-img'} src="/img/banner/reptiles.png" alt="" />
							</div>
						</Box>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default StaticInfo;
