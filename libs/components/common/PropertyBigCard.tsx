import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Property } from '../../types/property/property';
import { REACT_APP_API_URL, topPropertyRank } from '../../config';
import { formatterStr } from '../../utils';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import PinDropIcon from '@mui/icons-material/PinDrop';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import { PropertyType } from '../../enums/property.enum';

interface PropertyBigCardProps {
	property: Property;
	likePropertyHandler?: any;
}

const PropertyBigCard = (props: PropertyBigCardProps) => {
	const { property, likePropertyHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** HANDLERS **/
	const goPropertyDetatilPage = (propertyId: string) => {
		router.push(`/property/detail?id=${propertyId}`);
	};

	/** Conditional Rendering **/

	const renderPropertyInfo = () => {
		if (property.propertyType === PropertyType.DOG || property.propertyType === PropertyType.CAT) {
			return (
				<div>
					<PetsOutlinedIcon
						style={{
							color: 'red',
							width: '20px',
							marginRight: '4px',
						}}
					/>
					<span>{property?.propertyBreed}</span>
				</div>
			);
		} else {
			return (
				<div>
					<CropSquareIcon
						style={{
							color: 'red',
							width: '20px',
							marginRight: '4px',
						}}
					/>
					<span>{property?.propertySize}</span>
				</div>
			);
		}
	};

	if (device === 'mobile') {
		return <div>PRODUCT BIG CARD</div>;
	} else {
		return (
			<Stack className="property-big-card-box" onClick={() => goPropertyDetatilPage(property?._id)}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages?.[0]})` }}
				>
					{property && property?.propertyRank >= topPropertyRank && (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					)}
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{property?.propertyTitle}</strong>
					<p className={'desc'}>{property?.propertyDesc ?? 'no description!'}</p>
					<div className={'options'}>
						{renderPropertyInfo()}
						<div>
							<PinDropIcon
								style={{
									color: 'red',
									width: '20px',
									marginRight: '4px',
								}}
							/>
							<span>{property?.propertyLocation}</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<div className={'price'} style={{ fontWeight: '600' }}>
							${formatterStr(property?.propertyPrice)}
						</div>
						<div className="buttons-box">
							<IconButton color={'default'}>
								<RemoveRedEyeOutlinedIcon style={{ color: 'blue' }} />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
							<IconButton
								color={'default'}
								onClick={(e) => {
									e.stopPropagation();
									likePropertyHandler(user, property?._id);
								}}
							>
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

export default PropertyBigCard;
