import { MessageGroup, MessageStatus } from '../../enums/message.enum';
import { Member } from '../member/member';
import { MeLiked, TotalCounter } from '../property/property';

export interface MessageDto {
	_id: string;
	messageStatus: MessageStatus;
	messageGroup: MessageGroup;
	messageContent: string;
	messageRefId: string;
	memberId: string;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface MessagesDto {
	list: MessageDto[];
	metaCounter: TotalCounter[];
}
