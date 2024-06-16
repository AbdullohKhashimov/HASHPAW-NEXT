import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Property } from '../../types/property/property';
import { PropertiesInquiry } from '../../types/property/property.input';
import TrendPropertyCard from './TrendPropertyCard';
import { useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { T } from '../../types/common';

interface TrendPropertiesProps {
	initialInput: PropertiesInquiry;
}

const TrendProperties = (props: TrendPropertiesProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [trendProperties, setTrendProperties] = useState<Property[]>([]);

	/** APOLLO REQUESTS **/

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
			setTrendProperties(data?.getProperties?.list); //-> backend dan birinchi data olinganda onComplete ishga tushadi.
		},
	});
	/** HANDLERS **/

	if (trendProperties) console.log('trendProperties:+++', trendProperties);
	if (!trendProperties) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Trend Properties</span>
					</Stack>
					<Stack className={'card-box'}>
						{trendProperties.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Trends Empty
							</Box>
						) : (
							<Swiper
								className={'trend-property-swiper'}
								slidesPerView={'auto'}
								centeredSlides={true}
								spaceBetween={15}
								modules={[Autoplay]}
							>
								{trendProperties.map((property: Property) => {
									return (
										<SwiperSlide key={property._id} className={'trend-property-slide'}>
											<TrendPropertyCard property={property} />
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
							<span>Trend Properties</span>
							<p>Trend is based on likes</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'pagination-box'}>
								<WestIcon className={'swiper-trend-prev'} />
								<div className={'swiper-trend-pagination'}></div>
								<EastIcon className={'swiper-trend-next'} />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						{trendProperties.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Trends Empty
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
								{trendProperties.map((property: Property) => {
									return (
										<SwiperSlide key={property._id} className={'trend-property-slide'}>
											<TrendPropertyCard property={property} />
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

TrendProperties.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'propertyLikes',
		direction: 'DESC',
		search: {},
	},
};

export default TrendProperties;

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
