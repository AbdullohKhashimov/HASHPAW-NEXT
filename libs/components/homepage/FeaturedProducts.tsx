import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Property } from '../../types/property/property';
import { PropertiesInquiry } from '../../types/property/property.input';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { LIKE_TARGET_PROPERTY } from '../../../apollo/user/mutation';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { Message } from '../../enums/common.enum';
import { PropertyType } from '../../enums/property.enum';
import FeaturedProductCard from './FeaturedProductCard';

interface FeaturedProductProps {
	//TrendPropertiesProps
	initialInput: PropertiesInquiry;
}

const FeaturedProducts = (props: FeaturedProductProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [featuredProducts, setFeaturedProducts] = useState<Property[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargetProperty] = useMutation(LIKE_TARGET_PROPERTY);

	const {
		loading: getPropertiesLoading, //-> loading jarayoni yani backend dan data olish jarayonida qanaqadur animatsiyalarni korsatishimiz mumkun.
		data: getPropertiesData, //-> data kirib kelgandan keyin onComplete etapi ishga tushadi.
		error: getPropertiesError, //-> data kirib kelgunga qadar qandaydur errorlar hosil bolsa errorni korsatish.
		refetch: getPropertiesRefetch,
	} = useQuery(GET_PROPERTIES, {
		fetchPolicy: 'network-only', //->
		variables: { input: initialInput }, //-> variable lar bu qaysi turdagi malumotlarni serverga yuborish
		notifyOnNetworkStatusChange: true, //-> va qayta malumotlar ozgarganda update qilishda bu mantiq ishlatiladi. va bullar hammasi options ichida mujassam boladi.
		onCompleted: (data: T) => {
			// Filter out properties of type other than "OTHER"
			const filteredProducts = data?.getProperties?.list.filter(
				(property: Property) => property.propertyType === PropertyType.CAT,
			);
			setFeaturedProducts(filteredProducts);
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

	if (FeaturedProducts) console.log('FeaturedProducts:+++', FeaturedProducts);
	if (!FeaturedProducts) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'featured-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Featured Products</span>
					</Stack>
					<Stack className={'card-box'}>
						{featuredProducts.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Featured Products Empty
							</Box>
						) : (
							<Swiper
								className={'featured-property-swiper'}
								slidesPerView={'auto'}
								centeredSlides={true}
								spaceBetween={15}
								modules={[Autoplay]}
							>
								{featuredProducts.map((property: Property) => {
									return (
										<SwiperSlide key={property._id} className={'featured-property-slide'}>
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
			<Stack className={'featured-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Cats Line</span>
							<p> Listings of a range of cat breeds </p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'pagination-box'}>
								<WestIcon className={'swiper-featured-prev'} />
								<div className={'swiper-featured-pagination'}></div>
								<EastIcon className={'swiper-featured-next'} />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						{featuredProducts.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Featured Products Empty!
							</Box>
						) : (
							<Swiper
								className={'featured-property-swiper'}
								slidesPerView={'auto'}
								spaceBetween={10}
								modules={[Autoplay, Navigation, Pagination]}
								navigation={{
									nextEl: '.swiper-featured-next',
									prevEl: '.swiper-featured-prev',
								}}
								pagination={{
									el: '.swiper-featured-pagination',
								}}
							>
								{featuredProducts.map((property: Property) => {
									return (
										<SwiperSlide key={property._id} className={'featured-property-slide'}>
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
	}
};

FeaturedProducts.defaultProps = {
	initialInput: {
		page: 1,
		limit: 7,
		sort: 'propertyPrice',
		direction: 'DESC',
		search: {},
	},
};

export default FeaturedProducts;

/* fetchPolicy: 'cache-and-network',  //-> graphQL apollo client orqali graphql api request 
amalga oshirilganda malumotlar birinchi kelib cache ga saqlandi va undan keyin bu malumotlar 
viewga taqdim etiladi. Datalarni biz togridan togri ishlatishimiz mumkun yoki dataga biriktirlgan
malumotlarni biz saqlab pastda ishlatishimiz mumkun. 

Malumotlarni backend dan chaqirish va cache larga saqlash politikasi bolib ular fetchPolicy deb ataladi.
1: Cache-first -> birinchi agar ilgari backend dan chaqirilgan malumot cache ga saqlangan bolsa
bizning cache mizdan malumotni olib berib u backend ga request yubormas edi. 

2: network-only -> har safar birinchi browserga kirganimzda bizning malumotlarni faqatgina networkdan
qabul qiladi yani cache ga etiborni qaratmaydi. Networkdan malumotlarni olib cache ga yozishni davom etadi.

cache-and-network: birinchi navbatda browser update qilganda kirib kelib birinchi cache dagi malumotni izlaydi
va cacheda malumotlar mujassam bolsa ularni render qilib beradi va bu bilan tohtab qolmasdan
backend serverga ham requestni amalga oshiradi. aytaylik cachedagi malumot ishlatildi va networkdan kelgan malumot
qabul etildi va cache bn network ortasidagi malumotlar hech qanday mantiq amalga oshmaydi. Agar har hil mantiqlar bolsa
unday holda cachedan olingan malumotlarni eng ohirgi malumotlarga ozgaertirib networkdan kelgan malumotni 
userlarga taqdim etadi. 

3: cache-only: -> u bir marta backend dan malumot olib cache ga saqlangandan keyin 
qaytib backend ga request amalga oshirmaydi. Faqat cache dagi malumotlar bn kifoyalandi.

4: no-cache: -> tez tez request qilish mantigi bn amalga oshirilgan mantiqlar safida ishlatiladi.
bu juda network-only mantigiga oxshash buladi cache ni ignore qiladi

5: standby: -> kutish mantigi hisoblanadi.

*/
