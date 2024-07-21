import React, { useCallback, useEffect, useState } from 'react';
import { Stack, Typography, OutlinedInput, Tooltip, IconButton } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { PropertyLocation, PropertyType } from '../../enums/property.enum';
import { PropertiesInquiry } from '../../types/property/property.input';
import { useRouter } from 'next/router';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: '200px',
		},
	},
};

interface FilterType {
	searchFilter: PropertiesInquiry;
	setSearchFilter: any;
	initialInput: PropertiesInquiry;
}

const Filter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [propertyLocation, setPropertyLocation] = useState<PropertyLocation[]>(Object.values(PropertyLocation));
	const [propertyType, setPropertyType] = useState<PropertyType[]>(Object.values(PropertyType));
	const [searchText, setSearchText] = useState<string>('');
	const [showMore, setShowMore] = useState<boolean>(false);

	/** LIFECYCLES **/
	useEffect(() => {
		if (searchFilter?.search?.locationList?.length === 0) {
			delete searchFilter.search.locationList;
			setShowMore(false);
			router.push(`/product?input=${JSON.stringify(searchFilter)}`, undefined, { scroll: false }).then();
		}

		if (searchFilter?.search?.typeList?.length === 0) {
			delete searchFilter.search.typeList;
			router.push(`/product?input=${JSON.stringify(searchFilter)}`, undefined, { scroll: false }).then();
		}

		if (searchFilter?.search?.locationList) setShowMore(true);
	}, [searchFilter]);

	/** HANDLERS **/
	const propertyLocationSelectHandler = useCallback(
		async (event: any, newLocationList: any) => {
			try {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: { ...searchFilter.search, locationList: newLocationList },
					})}`,
					undefined,
					{ scroll: false },
				);
			} catch (err) {
				console.error('ERROR, propertyLocationSelectHandler:', err);
			}
		},
		[searchFilter, router],
	);

	const propertyTypeSelectHandler = useCallback(
		async (event: any, newTypeList: any) => {
			try {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: { ...searchFilter.search, typeList: newTypeList },
					})}`,
					undefined,
					{ scroll: false },
				);
			} catch (err) {
				console.error('ERROR, propertyTypeSelectHandler:', err);
			}
		},
		[searchFilter, router],
	);

	const propertyPriceHandler = useCallback(
		async (value: any, type: any) => {
			const newPricesRange = {
				...searchFilter.search.pricesRange,
				[type]: value * 1,
			};
			await router.push(
				`/product?input=${JSON.stringify({
					...searchFilter,
					search: { ...searchFilter.search, pricesRange: newPricesRange },
				})}`,
				undefined,
				{ scroll: false },
			);
		},
		[searchFilter, router],
	);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(`/product?input=${JSON.stringify(initialInput)}`, undefined, { scroll: false });
		} catch (err) {
			console.error('ERROR, refreshHandler:', err);
		}
	};

	if (device === 'mobile') {
		return <div>PRODUCTS FILTER</div>;
	} else {
		return (
			<Stack className={'filter-main'}>
				<Stack className={'find-your-home'} mb={'40px'}>
					<Typography className={'title-main'}>Get Your Pet Today</Typography>
					<Stack className={'input-box'}>
						<OutlinedInput
							value={searchText}
							type={'text'}
							className={'search-input'}
							placeholder={'Any breed type in your thoughts?'}
							onChange={(e) => setSearchText(e.target.value)}
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									setSearchFilter({
										...searchFilter,
										search: { ...searchFilter.search, text: searchText },
									});
								}
							}}
							endAdornment={
								<>
									<CancelRoundedIcon
										onClick={() => {
											setSearchText('');
											setSearchFilter({
												...searchFilter,
												search: { ...searchFilter.search, text: '' },
											});
										}}
									/>
								</>
							}
						/>
						<img src={'/img/icons/search_icon.png'} alt={''} />
						<Tooltip title="Reset">
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						Locations List
					</p>
					<Stack
						className={`property-location`}
						style={{ height: showMore ? '253px' : '115px' }}
						onMouseEnter={() => setShowMore(true)}
						onMouseLeave={() => {
							if (!searchFilter?.search?.locationList) {
								setShowMore(false);
							}
						}}
					>
						<ToggleButtonGroup
							value={searchFilter?.search?.locationList || []}
							onChange={propertyLocationSelectHandler}
							aria-label="property locations"
							className="property-location-toggle-group"
						>
							{propertyLocation.map((location) => (
								<ToggleButton
									key={location}
									value={location}
									aria-label={location}
									className="property-location-toggle-button"
								>
									{location}
								</ToggleButton>
							))}
						</ToggleButtonGroup>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Product Category</Typography>
					<ToggleButtonGroup
						value={searchFilter?.search?.typeList || []}
						onChange={propertyTypeSelectHandler}
						aria-label="property types"
						className="property-type-toggle-group"
					>
						{propertyType.map((type) => (
							<ToggleButton key={type} value={type} aria-label={type} className="property-type-toggle-button">
								{type}
							</ToggleButton>
						))}
					</ToggleButtonGroup>
				</Stack>
				<Stack className={'find-your-home'}>
					<Typography className={'title'}>Price Range</Typography>
					<Stack className="square-year-input">
						<input
							type="number"
							placeholder="$ min"
							min={0}
							value={searchFilter?.search?.pricesRange?.start ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									propertyPriceHandler(e.target.value, 'start');
								}
							}}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ max"
							value={searchFilter?.search?.pricesRange?.end ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									propertyPriceHandler(e.target.value, 'end');
								}
							}}
						/>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Filter;
