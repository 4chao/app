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
  hello: get<{}, { content: string }>()("/hello"),
  paramEcho: get<{ content: string }, EchoDto>()("/echo"),
  pathEcho: get<{ content: string }, EchoDto>()("/echo/{content}"),
  // 上传文件
  upload: post<{ file: string }, {}>()("/file"),
  // 点赞
  upvote: post<{}, UpvoteDto>()("/upvote/{upvoteTypeName}/{upvoteId}"),
  //  举报
  report: post<{}, {}>()("/report/{reportTypeName}/{reportId}"),
  // 获取指定enum的内容
  getEnum: get<{}, {}>()("/enum/{enumName}"),
  // 获取enum的列表
  getEnumList: get<{}, {}>()("/enum_list"),
  // 匿名账户登录
  anonymousLogin: post<LoginDto, LoginUserDto>()("/anonymous/login"),
  // 登录
  login: post<LoginDto, LoginUserDto>()("/login"),
  // 注册
  register: post<CreateUserDto, UserDto>()("/register"),
  // 获取验证码
  getVerificationCode: get<{ account: string }, {}>()("/verification_code"),
  // 检验验证码
  verifyVerificationCode: post<VerificationCodeDto, ResultDto<boolean>>()("/verification_code"),
  // 检验验证码并根据账户存在与否进行登录注册
  verifyVerificationCodeLoginRegister: get<VerificationCodeDto, LoginUserDto>()("/verification_code"),
  // 更新当前登录者的信息
  updateSelf: put<UpdateUserDto, UserDto>()("/self"),
  // 获取当前登录者的信息
  getSelf: get<{}, UserDto>()("/self"),
  // 获取其他人的信息
  getUser: get<{}, UserDto>()("/user/{id}"),
  getUserExist: get<{}, ResultDto<boolean>>()("/user/username/{username}/exist"),
  // 创建文本段落的修改
  createParaTextModification: post<CreateTextModificationDto, TextModificationDto>()("/text/{textId}/text_modification"),

  // 创建项目的标签
  createTag: post<CreateTagDto, TagDto>()("/tag"),
  // // 创建项目的标签
  // createProjectTag: post<CreateProjectTagDto, TagDto>()("/project/{projectId}/tag"),
  // 获取项目的推荐
  getProjectRecommend: get<{ size: number; offset: number }, RecommendDto>()("/project"),
  // 创建项目
  createProject: post<CreateProjectDto, ProjectDto>()("/project"),
  // 获取项目详情
  getProject: get<{}, ProjectDto>()("/project/{id}"),
  // 获取项目页
  getProjectPage: get<Page, PageDto<ProjectDto>>()("/project/page"),
  // 创建项目段落
  createProjectParagraph: post<CreateParagraphDto, ParagraphDto>()("/project/{project_id}/paragraph"),
  // 获取项目的段落
  getProjectParagraph: get<Page, PageDto<ParagraphDto>>()("/project/{project_id}/paragraph/page"),
  // 更新段落状态
  updateParagraphStatus: put<UpdateParagraphStatusDto, ParagraphDto>()("/project/{project_id}/paragraph/{paragraph_id}/status"),

  // 创建项目评论
  createProjectComment: post<CreateCommentDto, CommentDto>()("/project/{project_id}/comment"),
  // 创建项目子评论
  createProjectSubComment: post<CreateSubCommentDto, CommentDto>()("/project/{project_id}/comment/{comment_id}/sub_comment/{targetSubCommentId}"),
  // 获取项目评论页
  getProjectCommentPage: get<Page, PageDto<CommentDto>>()("/project/{project_id}/comment/page"),
  // 获取段落评论页
  getParagraphCommentPage: get<Page, PageDto<CommentDto>>()("/project/{project_id}/paragraph/{paragraph_id}/comment/page"),
  // 获取项目子评论页
  getProjectSubCommentPage: get<Page, PageDto<CommentDto>>()("/project/{project_id}/comment/{comment_id}/sub_comment/page/"),
  // 获取评论两人讨论
  getConversationPage: get<Page & { interlocutor_ids: number[] }, PageDto<CommentDto>>()("/project/{project_id}/comment/{root_comment_id}/conversation_page"),
  // 获取多维段落组件列表
  getMdhParagraphComponents: get<{}, MdhParagraphComponentsDto[]>()("/mdh_paragraph_component"),
  // 创建多维段落
  createMdhParagraph: post<CreateMdhParagraphDto, MdhParagraphDto>()("/project/{project_id}/paragraph_group/{paragraph_group_id}/mdh_paragraph"),
  // 更新多维段落模板配置
  updateMdhParagraphTemplate: put<UpdateMdhParagraphTemplateDto, MdhParagraphTemplateDto>()("/mdh_paragraph_template/{mdh_paragraph_template_id}"),
  // 更新段落组配置
  updateParagraphGroup: put<UpdateParagraphGroupDto, ParagraphGroupDto>()("/project/{project_id}/paragraph_group/{paragraph_group_id}"),
};

export const manage_map = {
  // 登录
  managerLogin: post<LoginDto, LoginUserDto>()("/manage/login"),
  // 获取段落页
  managerGetParagraphPage: post<Page & { type?: ParagraphStatus }, PageDto<ParagraphDto>>()("/manage/paragraph/page"),
  // 创建多维段落组件
  createMdhParagraphComponent: post<CreateMdhParagraphComponentDto, MdhParagraphComponentDto>()("/manage/mdh_paragraph_component"),
};
