import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { useMutation, useQuery } from '@apollo/client';
import { LIKE_TARGET_PROPERTY } from '../../../apollo/user/mutation';
import { Message } from '../../enums/common.enum';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import FeaturedProductCard from './FeaturedProductCard';
import { Property } from '../../types/property/property';
import { PropertiesInquiry } from '../../types/property/property.input';

interface FeaturedProductsProps {
	initialInput: PropertiesInquiry;
}

const FeaturedProducts = (props: FeaturedProductsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [trendProducts, setTrendProducts] = useState<Property[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargerProperty] = useMutation(LIKE_TARGET_PROPERTY);

	/** HANDLERS **/

	const likePropertyHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
			// execute likeTargetProperty Mutation
			await likeTargerProperty({ variables: { input: id } });
			// execute getPropertiesRefetch
			// await getProductsRefetch({ input: initialInput });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR, likeTargetProperty', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (trendProducts) console.log('trendProperties==>:', trendProducts);
	if (!trendProducts) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>--------- Highlights --------- </span>
					</Stack>
					<Stack className={'card-box'}>
						{trendProducts.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								{/* Trends Empty */}
							</Box>
						) : (
							<Swiper
								className={'trend-property-swiper'}
								slidesPerView={'auto'}
								centeredSlides={true}
								spaceBetween={15}
								modules={[Autoplay]}
							>
								{trendProducts.map((property: Property) => {
									return (
										<SwiperSlide key={property._id} className={'trend-property-slide'}>
											<FeaturedProductCard property={property} likePropertyHandler={likePropertyHandler} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span> Recently Posted </span>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'pagination-box'}></div>
						</Box>
					</Stack>
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
					<Stack className={'card-box'}>
						{trendProducts.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								{/* Trends Empty */}
							</Box>
						) : (
							<Swiper
								className={'trend-property-swiper'}
								slidesPerView={'auto'}
								spaceBetween={15}
								modules={[Autoplay, Navigation, Pagination]}
								navigation={{
									nextEl: '.swiper-trend-next',
									prevEl: '.swiper-trend-prev',
								}}
								pagination={{
									el: '.swiper-trend-pagination',
								}}
							>
								{trendProducts.map((product: Property) => {
									return (
										<SwiperSlide key={product._id} className={'trend-property-slide'}>
											<FeaturedProductCard property={product} likePropertyHandler={likePropertyHandler} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

FeaturedProducts.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'productLikes',
		direction: 'DESC',
		search: {},
	},
};

export default FeaturedProducts;
