import { PropertyLocation, PropertySize, PropertyStatus, PropertyType } from '../../enums/property.enum';
import { Direction } from '../../enums/common.enum';

export interface PropertyInput {
	propertyType: PropertyType;
	propertyLocation: PropertyLocation;
	propertyAddress: string;
	propertyTitle: string;
	propertyPrice: number;
	propertyAge: number;
	propertyBreed: string;
	propertySize: PropertySize;
	propertyImages: string[];
	propertyDesc?: string;
	propertyBarter?: boolean;
	propertyInjected?: boolean;
	memberId?: string;
	constructedAt?: Date;
}

interface PISearch {
	memberId?: string;
	locationList?: PropertyLocation[];
	typeList?: PropertyType[];
	options?: string[];
	breedList?: string[];
	pricesRange?: Range;
	sizeList?: SizesRange[];
	agesRange?: Range;
	text?: string;
}

export interface PropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: PISearch;
}

interface APISearch {
	propertyStatus?: PropertyStatus;
}

export interface AgentPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: APISearch;
}

interface ALPISearch {
	propertyStatus?: PropertyStatus;
	propertyLocationList?: PropertyLocation[];
}

export interface AllPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}

interface SizesRange {
	minSize: number;
	maxSize: number;
}
