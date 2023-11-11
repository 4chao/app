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
  // 获取注册验证码接口
  getCode: post<{ account: string }, {}>()("/send_verify_code"),
  // 注册接口
  register: post<RegisterDto, {}>()("/register"),
  // 登录接口
  login: post<LoginDto, LoginUserDto>()("/login"),

  // 工具组接口
  // 创建内容标题
  createContentTitle: post<{ titleText: string; labels: string[] }, {}>()("/create_title"),
  // 创建文章内容
  createContent: post<CreateContentDto, { uuid: string }>()("/create_content"),

  // 信息流接口
  // 获取发现推荐list
  getPecommendation: post<{}, { recommendation: [] }>()("/get_recommendation"),
  // 获取作品标题
  getTitle: post<{ uuid: string }, { titleText: string; labels: string[] }>()("/get_title_info"),
  // 获取作品内容
  getContent: post<{ uuid: string }, { contentText: string; contentStruct: string }>()("/get_content_text"),
  // 获得兄弟节点、子节点
  getOtherNode: post<{ uuid: string }, { brothers: NodeDto[]; children: NodeDto[] }>()("/get_preview"),
};

export const manage_map = {};
