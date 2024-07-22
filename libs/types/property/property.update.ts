import { PropertyLocation, PropertySize, PropertyStatus, PropertyType } from '../../enums/property.enum';

export interface PropertyUpdate {
	_id: string;
	propertyType?: PropertyType;
	propertyStatus?: PropertyStatus;
	propertyLocation?: PropertyLocation;
	propertyAddress?: string;
	propertyTitle?: string;
	propertyPrice?: number;
	propertyBreed?: string;
	propertySize?: string;
	propertyAge?: number;
	propertyViews?: number;
	propertyLikes?: number;
	propertyComments?: number;
	propertyRank?: number;
	propertyImages?: string[];
	propertyDesc?: string;
	propertyBarter?: boolean;
	propertyInjected?: boolean;
	memberId?: string;
	soldAt?: Date;
	deletedAt?: Date;
}
