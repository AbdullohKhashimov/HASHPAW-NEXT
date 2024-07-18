import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Property } from '../../types/property/property';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import PermContactCalendarSharpIcon from '@mui/icons-material/PermContactCalendarSharp';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import PinDropIcon from '@mui/icons-material/PinDrop';

interface FeaturedProductCard {
	property: Property;
	likePropertyHandler: any;
}

const FeaturedProductCard = (props: FeaturedProductCard) => {
	const { property, likePropertyHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailHandler = async (propertyId: string) => {
		console.log('ID:', propertyId);
		await router.push({ pathname: '/product/detail', query: { id: propertyId } });
	};

	if (device === 'mobile') {
		return (
			<Stack className="trend-card-box" key={property._id}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
					onClick={() => {
						pushDetailHandler(property._id);
					}}
				>
					<div>${property.propertyPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong
						className={'title'}
						onClick={() => {
							pushDetailHandler(property._id);
						}}
					>
						{property.propertyTitle}
					</strong>
					<p className={'desc'}>{property.propertyDesc ?? 'no description'}</p>
					<div className={'options'}>
						<div className={'options'}>
							<div>
								<PermContactCalendarSharpIcon style={{ color: 'red' }} />
								<span>{property.propertyAge} mos</span>
							</div>

							<div>
								<PetsOutlinedIcon
									style={{
										color: 'red',
										width: '20px',
										marginRight: '4px',
									}}
								/>
								<span>{property.propertyBreed}</span>
							</div>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeOutlinedIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
							<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<ThumbUpIcon style={{ color: 'blue' }} />
								) : (
									<ThumbUpIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="trend-card-box" key={property._id}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
					onClick={() => {
						pushDetailHandler(property._id);
					}}
				></Box>
				<Box component={'div'} className={'info'}>
					<strong
						className={'title'}
						onClick={() => {
							pushDetailHandler(property._id);
						}}
					>
						{property.propertyTitle}
					</strong>

					<p className={'desc'}>{property.propertyDesc ?? 'no description'}</p>

					<div className={'options'}>
						<div>
							<PermContactCalendarSharpIcon style={{ color: 'red' }} />
							<span>{property.propertyAge} mos</span>
						</div>
						<div>
							<PetsOutlinedIcon
								style={{
									color: 'red',
									width: '20px',
									marginRight: '4px',
								}}
							/>
							<span>{property.propertyBreed}</span>
						</div>
					</div>
					<Divider sx={{ mt: '12px', mb: '10px' }} />

					<div className={'bott'}>
						<div>${property.propertyPrice}</div>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeOutlinedIcon style={{ color: 'blue' }} />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
							<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<ThumbUpIcon style={{ color: 'blue' }} />
								) : (
									<ThumbUpIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default FeaturedProductCard;
