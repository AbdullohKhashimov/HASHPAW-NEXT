import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import TopPropertyCard from './TopPropertyCard';
import { PropertiesInquiry } from '../../types/property/property.input';
import { Property } from '../../types/property/property';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { useMutation, useQuery } from '@apollo/client';
import { T } from '../../types/common';
import { LIKE_TARGET_PROPERTY } from '../../../apollo/user/mutation';
import { Message } from '../../enums/common.enum';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import FoodListCard from './FoodListCard';
import { PropertyType } from '../../enums/property.enum';
import OtherProductsCard from './OtherProductsCard';

interface OtherProductsProps {
	initialInput: PropertiesInquiry;
}

const OtherProducts = (props: OtherProductsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [topProperties, setTopProperties] = useState<Property[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargetProperty] = useMutation(LIKE_TARGET_PROPERTY);

	const {
		loading: getPropertiesLoading, //-> loading jarayoni yani backend dan data olish jarayonida qanaqadur animatsiyalarni korsatishimiz mumkun.
		data: getPropertiesData, //-> data kirib kelgandan keyin onComplete etapi ishga tushadi.
		error: getPropertiesError, //-> data kirib kelgunga qadar qandaydur errorlar hosil bolsa errorni korsatish.
		refetch: getPropertiesRefetch,
	} = useQuery(GET_PROPERTIES, {
		fetchPolicy: 'cache-and-network', //->
		variables: { input: initialInput }, //-> variable lar bu qaysi turdagi malumotlarni serverga yuborish
		notifyOnNetworkStatusChange: true, //-> va qayta malumotlar ozgarganda update qilishda bu mantiq ishlatiladi. va bullar hammasi options ichida mujassam boladi.
		onCompleted: (data: T) => {
			const filteredProperties = data?.getProperties?.list.filter(
				(property: Property) => property.propertyType === PropertyType.OTHER,
			);
			setTopProperties(filteredProperties); //-> backend dan birinchi data olinganda onComplete ishga tushadi.
		},
	});
	/** HANDLERS **/

	const likePropertyHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
			//execute likeTargetProperty Mutation
			await likeTargetProperty({ variables: { input: id } });

			// execute getPropertiesRefetch
			await getPropertiesRefetch({ input: initialInput });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('Error, on likeTargetProperty', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (device === 'mobile') {
		return (
			<Stack className={'info-box'}>
				<span>Featured Supplements</span>{' '}
			</Stack>
			// <Stack className={'other-properties'}>
			// 	<Stack className={'container'}>
			// 		<Stack className={'info-box'}>
			// 			<span>Featured Supplements</span>
			// 		</Stack>
			// 		<Stack className={'card-box'}>
			// 			<Swiper
			// 				className={'other-property-swiper'}
			// 				slidesPerView={'auto'}
			// 				centeredSlides={true}
			// 				spaceBetween={15}
			// 				modules={[Autoplay]}
			// 			>
			// 				{topProperties.map((property: Property) => {
			// 					return (
			// 						<SwiperSlide className={'other-property-slide'} key={property?._id}>
			// 							<OtherProductsCard property={property} likePropertyHandler={likePropertyHandler} />
			// 						</SwiperSlide>
			// 					);
			// 				})}
			// 			</Swiper>
			// 		</Stack>
			// 	</Stack>
			// </Stack>
		);
	} else {
		return (
			<Stack className={'other-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Featured Supplements</span>
							<p>Line offers variety of supplements and toys your pets need</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'pagination-box'}>
								<WestIcon className={'swiper-other-prev'} />
								<div className={'swiper-other-pagination'}></div>
								<EastIcon className={'swiper-other-next'} />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'other-property-swiper'}
							slidesPerView={'auto'}
							spaceBetween={15}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-other-next',
								prevEl: '.swiper-other-prev',
							}}
							pagination={{
								el: '.swiper-other-pagination',
							}}
						>
							{topProperties.map((product: Property) => {
								return (
									<SwiperSlide className={'other-property-slide'} key={product?._id}>
										<OtherProductsCard property={product} likePropertyHandler={likePropertyHandler} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

OtherProducts.defaultProps = {
	initialInput: {
		page: 1,
		limit: 7,
		sort: 'propertyLikes',
		direction: 'DESC',
		search: {},
	},
};

export default OtherProducts;
