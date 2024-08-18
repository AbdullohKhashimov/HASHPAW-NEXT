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
import Link from 'next/link';

interface FoodListProps {
	initialInput: PropertiesInquiry;
}

const FoodList = (props: FoodListProps) => {
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
				(property: Property) => property.propertyType === PropertyType.FOOD,
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
			<Stack className={'food-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Range of Products</span>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'food-property-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={15}
							modules={[Autoplay]}
						>
							{topProperties.map((property: Property) => {
								return (
									<SwiperSlide className={'food-property-slide'} key={property?._id}>
										<FoodListCard property={property} likePropertyHandler={likePropertyHandler} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'food-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Range of Products</span>
							<p>List of Cat and Dog foods</p>
						</Box>
						<Box component={'div'} className={'right'}>
							{/* <div className={'more-box'}>
								<Link href={'/product'}>
									<span>See All Categories</span>
								</Link>
								<img src="/img/icons/rightup.svg" alt="" />
							</div> */}
							<div className={'pagination-box'}>
								<WestIcon className={'swiper-food-prev'} />
								<div className={'swiper-food-pagination'}></div>
								<EastIcon className={'swiper-food-next'} />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'food-property-swiper'}
							slidesPerView={'auto'}
							spaceBetween={15}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-food-next',
								prevEl: '.swiper-food-prev',
							}}
							pagination={{
								el: '.swiper-food-pagination',
							}}
						>
							{topProperties.map((property: Property) => {
								return (
									<SwiperSlide className={'food-property-slide'} key={property?._id}>
										<FoodListCard property={property} likePropertyHandler={likePropertyHandler} />
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

FoodList.defaultProps = {
	initialInput: {
		page: 1,
		limit: 7,
		sort: 'propertyPrice',
		direction: 'DESC',
		search: {},
	},
};

export default FoodList;
