import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Head from 'next/head';
import Top from '../Top';
import Footer from '../Footer';
import { Stack } from '@mui/material';
import { getJwtToken, updateUserInfo } from '../../auth';
import Chat from '../Chat';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useTranslation } from 'next-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const withLayoutBasic = (Component: any) => {
	return (props: any) => {
		const router = useRouter();
		const { t, i18n } = useTranslation('common');
		const device = useDeviceDetect();
		const [authHeader, setAuthHeader] = useState<boolean>(false);
		const user = useReactiveVar(userVar);

		const memoizedValues = useMemo(() => {
			let title = '',
				desc = '',
				descPart1 = '',
				descPart2 = '',
				descPart3 = '',
				bgImage = '';

			switch (router.pathname) {
				case '/product':
					title = 'Product Search';
					desc = 'Great to have you with us again!';
					bgImage = '/img/banner/pets.png';
					break;
				case '/agent':
					title = 'Dealers';
					desc = 'Perfect Spot for Your Pet Store';
					bgImage = '/img/banner/hpage.png';
					break;
				case '/agent/detail':
					title = 'Dealer Page';
					desc = '';
					bgImage = '/img/banner/agentdet.webp';
					break;
				case '/mypage':
					title = 'my page';
					desc = 'List / Purchase';
					bgImage = '/img/banner/cs.png';
					break;
				case '/community':
					title = '';
					desc = 'Welcome to our vibrant community';
					descPart2 = 'Connect, share, and grow with like-minded individuals! ';
					descPart3 = '-who share their passions and interests.';

					bgImage = '/img/banner/comu.png';

					break;
				case '/community/detail':
					title = '';
					desc = 'Feel free to leave comments or feedbacks';
					bgImage = '/img/banner/comu.png';
					break;
				case '/cs':
					title = 'Customer Support';
					desc = 'We are glad to help you today as well';
					descPart1 = 'If you have any questions -';
					descPart2 = '-Please do not hesitate to contact us!';
					bgImage = '/img/banner/cs.png';
					break;
				case '/account/join':
					title = 'Login/Signup';
					desc = 'Authentication Process';
					bgImage = '/img/banner/cuties.png';
					setAuthHeader(true);
					break;
				case '/member':
					title = 'Member Page';
					desc = '';
					bgImage = '/img/banner/cutie.png';
					break;
				default:
					break;
			}

			return { title, desc, descPart1, descPart2, descPart3, bgImage };
		}, [router.pathname]);

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		/** HANDLERS **/

		if (device == 'mobile') {
			return (
				<>
					<Head>
						<title>HushPaw</title>
						<meta name={'title'} content={`HushPaw`} />
					</Head>
					<Stack id="mobile-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		} else {
			return (
				<>
					<Head>
						<title>HushPaw</title>
						<meta name={'title'} content={`HushPaw`} />
					</Head>
					<Stack id="pc-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack
							className={`header-basic ${authHeader && 'auth'}`}
							style={{
								backgroundImage: `url(${memoizedValues.bgImage})`,
								backgroundSize: 'contain',
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'right',
							}}
						>
							<Stack className={'container'}>
								<strong>{t(memoizedValues.title)}</strong>
								<span> {t(memoizedValues.desc)}</span>
								<span> {t(memoizedValues.descPart1)}</span>
								<span> {t(memoizedValues.descPart2)}</span>
								<span>{t(memoizedValues.descPart3)}</span>
							</Stack>
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Chat />

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		}
	};
};

export default withLayoutBasic;
