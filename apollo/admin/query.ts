import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const GET_ALL_MEMBERS_BY_ADMIN = gql`
	query GetAllMembersByAdmin($input: MembersInquiry!) {
		getAllMembersByAdmin(input: $input) {
			list {
				_id
				memberType
				memberStatus
				memberAuthType
				memberPhone
				memberNick
				memberFullName
				memberImage
				memberAddress
				memberDesc
				memberWarnings
				memberBlocks
				memberProperties
				memberRank
				memberArticles
				memberPoints
				memberLikes
				memberViews
				deletedAt
				createdAt
				updatedAt
				accessToken
			}
			metaCounter {
				total
			}
		}
	}
`;

/**************************
 *        PROPERTY        *
 *************************/

export const GET_ALL_PROPERTIES_BY_ADMIN = gql`
	query GetAllPropertiesByAdmin($input: AllPropertiesInquiry!) {
		getAllPropertiesByAdmin(input: $input) {
			list {
				_id
				propertyType
				propertyStatus
				propertyLocation
				propertyAddress
				propertyTitle
				propertyPrice
				propertyAge
				propertyBreed
				propertySize
				propertyViews
				propertyLikes
				propertyComments
				propertyRank
				propertyImages
				propertyDesc
				propertyBarter
				propertyInjected
				memberId
				soldAt
				deletedAt
				constructedAt
				createdAt
				updatedAt
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberProperties
					memberArticles
					memberFollowers
					memberFollowings
					memberPoints
					memberLikes
					memberViews
					memberComments
					memberRank
					memberWarnings
					memberBlocks
					deletedAt
					createdAt
					updatedAt
					accessToken
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const GET_ALL_BOARD_ARTICLES_BY_ADMIN = gql`
	query GetAllBoardArticlesByAdmin($input: AllBoardArticlesInquiry!) {
		getAllBoardArticlesByAdmin(input: $input) {
			list {
				_id
				articleCategory
				articleStatus
				articleTitle
				articleContent
				articleImage
				articleViews
				articleLikes
				memberId
				createdAt
				updatedAt
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberWarnings
					memberBlocks
					memberProperties
					memberRank
					memberPoints
					memberLikes
					memberViews
					deletedAt
					createdAt
					updatedAt
					accessToken
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

/**************************
 *         COMMENT        *
 *************************/

export const GET_COMMENTS = gql`
	query GetComments($input: CommentsInquiry!) {
		getComments(input: $input) {
			list {
				_id
				commentStatus
				commentGroup
				commentContent
				commentRefId
				memberId
				createdAt
				updatedAt
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberWarnings
					memberBlocks
					memberProperties
					memberRank
					memberPoints
					memberLikes
					memberViews
					deletedAt
					createdAt
					updatedAt
					accessToken
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

/**************************
 *      NOTIFICATION      *
 *************************/

export const GET_NOTIFICATION = gql`
	query GetNotifications($input: GetNotificationsInquiry!) {
		getNotifications(input: $input) {
			list {
				_id
				notificationType
				notificationStatus
				notificationGroup
				notificationTitle
				notificationDesc
				authorId
				receiverId
				propertyId
				articleId
				createdAt
				updatedAt
			}
			metaCounter {
				total
			}
		}
	}
`;
