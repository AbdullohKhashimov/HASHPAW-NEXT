import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="robots" content="index,follow" />
				<link rel="icon" type="image/png" href="/img/logo/weblogo.png" />
				{/* //-> to change later icon */}

				{/* SEO */}
				<meta name="keyword" content={'HashPaw, hashpaw.uz, devex mern, mern nestjs fullstack'} />
				<meta
					name={'description'}
					content={
						'Buy and sell pets and pet related products anywhere anytime in South Korea. Best Pets and pet related products at Best prices on hashpaw.uz | ' +
						'Покупайте и продавайте домашних животных и товары для животных в любое время в Южной Корее. Лучшие домашние животные и товары для животных по лучшим ценам на hashpaw.uz | ' +
						'한국에서 언제 어디서나 애완동물과 애완동물 관련 제품을 사고 파세요. hashpaw.uz에서 최고의 가격으로 최고의 애완동물과 애완동물 관련 제품을 구매하세요'
					}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
