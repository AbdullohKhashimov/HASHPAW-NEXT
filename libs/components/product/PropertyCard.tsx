import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';

import { Property } from '../../types/property/property';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL, topPropertyRank } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface PropertyCardType {
	property: Property;
	likePropertyHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const PropertyCard = (props: PropertyCardType) => {
	const { property, likePropertyHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = property?.propertyImages[0]
		? `${REACT_APP_API_URL}/${property?.propertyImages[0]}`
		: '/img/banner/header1.svg';

	if (device === 'mobile') {
		return <div>PRODUCT CARD</div>;
	} else {
		return (
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/product/detail',
							query: { id: property?._id },
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					{property && property?.propertyRank === topPropertyRank && (
						<Box component={'div'} className={'top-badge'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<Typography>TOP</Typography>
						</Box>
					)}
					<Box component={'div'} className={'price-box'}>
						<Typography>${formatterStr(property?.propertyPrice)}</Typography>
					</Box>
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/product/detail',
									query: { id: property?._id },
								}}
							>
								<Typography>{property.propertyTitle}</Typography>
							</Link>
						</Stack>
						<Stack className="address">
							<Typography>{property.propertyLocation}</Typography>
						</Stack>
					</Stack>

					<Stack className="divider"></Stack>
					<Stack className="type-buttons">
						{!recentlyVisited && (
							<Stack className="buttons">
								<IconButton color={'default'}>
									<RemoveRedEyeOutlinedIcon style={{ color: 'blue' }} />
								</IconButton>
								<Typography className="view-cnt">{property?.propertyViews}</Typography>
								<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
									{myFavorites ? (
										<ThumbUpIcon color="primary" />
									) : property?.meLiked && property?.meLiked[0]?.myFavorite ? (
										<ThumbUpIcon color="primary" />
									) : (
										<ThumbUpIcon />
									)}
								</IconButton>
								<Typography className="view-cnt">{property?.propertyLikes}</Typography>
							</Stack>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default PropertyCard;
