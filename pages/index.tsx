import { NextPage } from 'next';
import useDeviceDetect from '../libs/hooks/useDeviceDetect';
import withLayoutMain from '../libs/components/layout/LayoutHome';
import CommunityBoards from '../libs/components/homepage/CommunityBoards';
import TopAgents from '../libs/components/homepage/TopAgents';
import TopProperties from '../libs/components/homepage/TopProperties';
import { Stack } from '@mui/material';
import Advertisement from '../libs/components/homepage/Advertisement';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import FeaturedProducts from '../libs/components/homepage/FeaturedProducts';
import Statistics from '../libs/components/homepage/Statistics';
import InfoProducts from '../libs/components/homepage/InfoProducts';
import DogsListings from '../libs/components/homepage/DogsListings';
import FoodList from '../libs/components/homepage/FoodList';
import OtherProducts from '../libs/components/homepage/OtherProducts';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const Home: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return (
			<Stack className={'home-page'}>
				<Advertisement />
				<TopProperties />
				<TopAgents />
			</Stack>
		);
	} else {
		return (
			<Stack className={'home-page'}>
				<Statistics />
				<FeaturedProducts />
				<InfoProducts />
				<DogsListings />
				<FoodList />
				<Advertisement />
				<TopProperties />
				<OtherProducts />
				<TopAgents />
				<CommunityBoards />
			</Stack>
		);
	}
};

export default withLayoutMain(Home);

// graphql backend serverga graphql request yuborish 3 usuli bor:
//1: useQuery and useMutation
//2: Apollo client togridan togri
//3: Axios orqali -> rasm yuklash uchun ishlatamiz
