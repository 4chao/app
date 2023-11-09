/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.36.1070 on 2022-11-19 15:15:40.

// 登录接口参数
interface LoginDto {
  account: string
  password: string
  authType: AuthType
}

// 登录返回用户信息接口
interface LoginUserDto {
  email: string
  phone: string
  username: string
  gender: string
  token: any
}

// 注册接口请求参数
interface RegisterDto {
  account: string
  password: string
  code: number
}

// 创建内容请求参数
interface CreateContentDto {
  uuid?: string
  createContentType: string
  contentText: string
  contentStruct?: string
}

// 兄弟节点子节点返回参数限制
interface NodeDto {
  uuid: string
  contentText: string
}

// 前端数据结构接口
// 渲染内容item
interface Iitem {
  id: string
  type: string
  textValue?: string
  list?: string[]
}

// 节点接口
interface INode {
  index: number
  httpFlag: boolean
  contentUuid: string
  contentList: Iitem[]
  // 前面节点的 index, 没有设为-1
  beforeNode: number
  // 下一个子节点的 index, 没有设为-1
  nextChild: number
  // 下一个兄弟节点的 index, 没有设为-1
  nextBrother: number
}
// 节点渲染树接口
interface ITree {
  titleText: string
  labels: string[]
  contentUuid: string
  contentList: Iitem[]
  brothers: INode[]
  children: INode[]
}

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
