import { Direction } from '../../enums/common.enum';
import { MessageGroup } from '../../enums/message.enum';

export interface MessageInputDto {
	messageGroup?: MessageGroup;
	messageContent: string;
	memberEmail?: string;
	memberPhone?: string;
	memberName?: string;
	messageRefId: string;
	memberId?: string;
}

export interface MSISearch {
	messageRefId: string;
}

export interface MessageInquiryDto {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: MSISearch;
}
