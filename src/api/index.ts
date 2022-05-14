/// <reference types="api" />
type S<url> = url extends `${infer _}/{${infer P}}${infer ex}` ? P | S<ex> : never;
type getParams<url> = Record<S<url>, string | number>;
type FReq<Req, Res> = (req?: Partial<Req>) => Promise<Partial<Res>>;
type M<type> = <req, res>() => <U extends string>(url: U) => FReq<getParams<U> & req, res>;
const factory = <Type extends string>(type: Type) => (() => (url) => ({ type, url })) as unknown as M<Type>;
const post = factory("POST");
const get = factory("GET");
const del = factory("DELETE");
const put = factory("PUT");

type Page = { page?: number; size?: number; last_time?: number };

export const map = {
  paramEcho: get<{ content: string }, EchoDto>()("/echo"),
  pathEcho: get<{ content: string }, EchoDto>()("/echo/{content}"),
  // 登录
  login: post<LoginDto, LoginUserDto>()("/login"),
  // 注册
  register: post<CreateUserDto, UserDto>()("/register"),
  // 获取验证码
  getVerificationCode: get<{ account: string }, VerificationCodeDto>()("/verification_code"),
  // 更新本人的信息
  updateSelfInfo: put<UpdateUserDto, UserDto>()("/self"),
  // 获取其他人的信息
  getUserInfo: get<{ id: number }, UserDto>()("/user/{id}"),
  // 创建项目的标签
  createProjectTag: post<CreateProjectTagDto, ProjectTagDto>()("/project_tag"),
  // 创建项目
  createProject: post<CreateProjectDto, ProjectDto>()("/project"),
  // 获取项目详情
  getProject: get<{}, ProjectDto>()("/project/{id}"),
  // 获取项目页
  getProjectPage: get<Page, PageDto<ProjectDto>>()("/project/page/"),
  // 创建项目段落
  createProjectParagraph: post<CreateParagraphDto, ParagraphDto>()("/project/{project_id}/paragraph"),
  // 获取项目的段落
  getProjectParagraph: get<Page, PageDto<ParagraphDto>>()("/project/{project_id}/paragraph/page"),
  // 创建项目评论
  createProjectComment: post<CreateCommentDto, CommentDto>()("/project/{project_id}/comment"),
  // 创建项目子评论
  createProjectSubComment: post<CreateSubCommentDto, CommentDto>()("/project/{project_id}/comment/{comment_id}/sub_comment"),
  // 获取项目评论页
  getProjectCommentPage: get<Page, PageDto<CommentDto>>()("/project/{project_id}/comment/page/"),
  // 获取项目子评论页
  getProjectSubCommentPage: get<Page, PageDto<CommentDto>>()("/project/{project_id}/comment/{comment_id}/sub_comment/page/"),
  // 点赞
  upvote: post<{ upvote_type: UpvoteType }, UpvoteDto>()("/upvote/{upvote_type}/{upvote_id}"),
  // 举报
  report: post<{}, {}>()("/report/{report_type}/{report_id}"),
};
