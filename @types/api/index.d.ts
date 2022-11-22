/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.36.1070 on 2022-11-19 15:15:40.

interface CreateReportDto {
  reason: string
}

interface EchoDto {
  id: number
  uuid: string
  content: string
  createdTime: Date
  updatedTime: Date
}

interface Email {
  to: string[]
  subject: string
  content: string
}

interface EnumDataDto {
  description: string
  value: string
}

interface FileDto {
  id: number
  uuid: string
  filename: string
  status: Status
  created_time: Date
  updated_time: Date
}

interface ImageDto extends ComponentDto {
  id: number
  uuid: string
  label: string
  image_file: FileDto
  status: Status
  created_time: Date
  updated_time: Date
}

interface ImagesDto extends ComponentBo {
  images: ImageDto[]
}

interface InitDto {}

interface PageDto<M> {
  current: number
  total: number
  desire_size: number
  current_size: number
  data: M[]
}

interface Converter<M, N> {}

interface ResultDto<T> {
  result: T
}

interface UpvoteDto {
  id: number
  uuid: string
  type: UpvoteType
  upvote_num: number
}

interface VerificationCodeDto {
  code: number
  account: string
}

interface CommentDto extends RecComponentDto {
  id: number
  uuid: string
  author: UserBriefInfoDto
  project_id: number
  paragraph: ParagraphDto
  content: string
  topic: CommentTopicDto
  eldest_sub_comment: SubCommentDto
  second_sub_comment: SubCommentDto
  comment_num: number
  coin_num: number
  upvote_num: number
  status: Status
  created_time: Date
  updated_time: Date
}

interface CommentTopicDto extends RecComponentDto {
  id: number
  uuid: string
  user_id: number
  project_id: number
  top_id: number
  content: string
  businessStatus: BusinessStatus
  dataStatus: Status
  created_time: Date
  updated_time: Date
}

interface CreateCommentDto {
  paragraph_id: number
  topic_id: number
  content: string
}

interface CreateSubCommentDto {
  paragraph_id: number
  content: string
}

interface SubCommentDto extends RecComponentDto {
  id: number
  uuid: string
  author: UserBriefInfoDto
  target_sub_comment: TargetSubCommentDto
  project_id: number
  paragraph: ParagraphDto
  root_comment_id: number
  content: string
  comment_num: number
  coin_num: number
  upvote_num: number
  status: Status
  created_time: Date
  updated_time: Date
}

interface TargetSubCommentDto {}

interface CreateMdhParagraphComponentDto {
  name: string
  display_name: string
  data_schema: any
  config_schema: any
}

interface CreateMdhParagraphDto {
  text_content: string
  image_ids: number[]
  paragraph_component_data: { [index: string]: any }
  template_id: number
}

interface CreateStarDto {
  star: number
}

interface MdhParagraphComponentsDto {
  mdhParagraphComponents: MdhParagraphComponentDto[]
}

interface MdhParagraphDto extends ComponentDto, RecComponentDto {
  id: number
  uuid: string
  text_content: string
  images: ImageDto[]
  paragraph_data: { [index: string]: ObjectNode }
  template_id: number
  user: UserBriefInfoDto
  status: Status
  created_time: Date
  updated_time: Date
}

interface UpdateMdhParagraphTemplateDto {
  content_tags: string[]
  component_ids: number[]
  paragraph_config: { [index: string]: any }
}

interface UpdateParagraphGroupDto {
  title: string
}

interface ComponentDto {}

interface CreateParagraphDto {
  content: { [index: string]: any }
  type: ComponentType
  pre_position: number
}

interface CreateReferenceDto {
  project_id: number
  position: number
  target_type: string
  target_id: string
}

interface CreateTextComponentDto {
  content: string
}

interface CreateTextModificationDto {
  content: string
}

interface MdhParagraphComponentBriefDto extends Serializable {
  id: number
  uuid: string
  name: string
  version: number
  status: Status
  createdTime: Date
  updatedTime: Date
}

interface MdhParagraphComponentDto {
  id: number
  uuid: string
  name: string
  display_name: string
  data_schema: any
  config_schema: any
  version: number
  is_creative_component: boolean
  status: Status
  created_time: Date
  updated_time: Date
}

interface MdhParagraphTemplateDto {
  id: number
  uuid: string
  user_id: number
  components: MdhParagraphComponentBriefDto[]
  componentMap: { [index: string]: MdhParagraphComponentDto }
  config: { [index: string]: any }
  parent_template_id: number
  status: Status
  created_time: Date
  updated_time: Date
}

interface ParagraphDto extends RecComponentDto {
  id: number
  uuid: string
  user_id: number
  project_id: number
  paragraph_group_id: number
  component: ComponentDto
  component_type: ComponentType
  component_uuid: string
  businessStatus: ParagraphStatus
  dataStatus: Status
  created_time: Date
  updated_time: Date
}

interface ParagraphGroupDto extends ComponentDto, RecComponentDto {
  id: number
  uuid: string
  user_id: number
  title: string
  mdh_paragraph_template: MdhParagraphTemplateDto
  status: Status
  created_time: Date
  updated_time: Date
}

interface ParagraphsDto {
  paragraphs: ParagraphDto[]
}

interface TextDto extends ComponentDto {
  id: number
  uuid: string
  user_id: number
  content: string
  status: Status
  created_time: Date
  updated_time: Date
}

interface TextModificationDto {
  id: number
  uuid: string
  user_id: number
  text_id: number
  content: string
  dataStatus: Status
  businessStatus: ModificationStatus
  created_time: Date
  updated_time: Date
}

interface UpdateParagraphStatusDto {
  status: ParagraphStatus
}

interface CreateProjectDto {
  title: string
  description: string
  cover_id: number
  tag_ids: number[]
  status: ProjectStatus
}

interface CreateProjectTagDto {
  id: number
}

interface CreateTagDto {
  name: string
  description: string
}

interface ProjectDto extends RecComponentDto {
  id: number
  title: string
  description: string
  cover: ImageDto
  user: UserBriefInfoDto
  contributors: UserBriefInfoDto[]
  paragraph_groups: ParagraphGroupDto[]
  tags: TagDto[]
  paragraph_ids: number[]
  coin_num: number
  comment_num: number
  participant_num: number
  upvote_num: number
  favorite_num: number
  paragraph_num: number
  pend_review_paragraph_num: number
  review_failed_paragraph_num: number
  normal_paragraph_num: number
  hidden_paragraph_num: number
  deleted_paragraph_num: number
  banned_paragraph_num: number
  dataStatus: Status
  businessStatus: ProjectStatus
  created_time: Date
  updated_time: Date
}

interface TagDto {
  id: number
  description: string
  uuid: string
  name: string
}

interface UpdateProjectDto {
  title: string
  description: string
  cover_id: number
  tag_ids: number[]
}

interface RecComponentDto extends Serializable {}

interface RecommendDto {
  recommendItems: RecommendItemDto[]
}

interface RecommendItemDto extends Serializable {
  id: number
  uuid: string
  userId: number
  projectId: number
  paragraphGroupId: number
  component: RecComponentDto
  componentType: RecommendType
  componentUuid: string
  businessStatus: ParagraphStatus
  dataStatus: Status
  createdTime: Date
  updatedTime: Date
}

interface CreateUserDto {}

interface LoginDto {
  account: string
  password: string
  auth_type: AuthType
  code: number
  token: string
}

interface LoginSystemUserDto {
  id: number
  nickname: string
  token: string
  roles: string[]
  status: Status
}

interface LoginUserDto {
  id: number
  uuid: string
  email: string
  phone: string
  username: string
  gender: Gender
  avatar: string
  signature: string
  nickname: string
  is_anonymous: boolean
  project_num: number
  comment_num: number
  coin_num: number
  upvote_num: number
  experience_point: number
  setting_json: string
  token: string
  roles: Role[]
  status: Status
  created_time: Date
  updated_time: Date
  is_exist: boolean
}

interface RegisterDto {
  account: string
  password: string
  code: number
  username: string
}

interface SystemLoginDto {
  account: string
  password: string
}

interface TokenDto {
  token: string
}

interface UpdateUserAuthDto {
  password: string
}

interface UpdateUserDto {
  nickname: string
  gender: Gender
  avatar: string
  signature: string
}

interface UpdateUserRoleDto {
  roles: string[]
}

interface UserAuthInfoDto {
  id: number
  uuid: string
  email: string
  phone: string
  username: string
  gender: string
  avatar: string
  signature: string
  nickname: string
  project_num: string
  comment_num: string
  coin_num: string
  upvote_num: string
  experience_point: string
  setting_json: string
  token: string
  roles: string[]
  status: string
  created_time: string
}

interface UserBriefInfoDto {
  id: number
  username: string
  gender: Gender
  avatar: string
  signature: string
  nickname: string
  experience_point: number
}

interface UserDto extends RecComponentDto {
  id: number
  username: string
  gender: Gender
  avatar: string
  signature: string
  nickname: string
  experience_point: number
}

interface ComponentBo extends Serializable {}

interface ObjectNode extends ContainerNode<ObjectNode>, Serializable {}

interface Serializable {}

interface ContainerNode<T> extends BaseJsonNode, JsonNodeCreator {}

interface BaseJsonNode extends Serializable {}

interface JsonNodeCreator {}

type Status = 'NORMAL' | 'HIDDEN' | 'BANNED' | 'DELETED'

type UpvoteType = 'COMMENT' | 'COMMENT_TOPIC' | 'PROJECT' | 'TAG' | 'USER' | 'TEXT_MODIFICATION' | 'SUB_COMMENT' | 'REFERENCE'

type BusinessStatus = 'NORMAL'

type ComponentType = 'TEXT' | 'IMAGE' | 'PROJECT' | 'PARAGRAPH' | 'USER' | 'COMMENT' | 'MDH_PARAGRAPH' | 'PARAGRAPH_GROUP'

type ParagraphStatus = 'PEND_REVIEW' | 'REVIEW_PASS' | 'REVIEW_FAILED'

type ModificationStatus = 'PEND_REVIEW' | 'REVIEW_PASS' | 'REVIEW_FAILED'

type ProjectStatus = 'UNPUBLISHED' | 'PUBLISHED'

type RecommendType =
  | 'COMMENT'
  | 'COMMENT_TOPIC'
  | 'PROJECT'
  | 'TAG'
  | 'USER'
  | 'TEXT_MODIFICATION'
  | 'SUB_COMMENT'
  | 'REFERENCE'
  | 'MDH_PARAGRAPH'
  | 'PARAGRAPH_GROUP'
  | 'UNKNOWN'

type AuthType = 'PASSWORD' | 'TOKEN' | 'CODE' | 'WECHAT' | 'QQ'

type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN'

type Role = 'NONE' | 'ANONYMOUS' | 'USER' | 'STAFF' | 'DEVELOPER' | 'MANAGER' | 'SYSTEM'
