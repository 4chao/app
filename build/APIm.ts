export const map = {
  BackendLogin: {
    url: '/backend/login',
    type: 'POST',
  },
  CreateUser: {
    url: '/backend/user',
    type: 'POST',
  },
  CreateUserRole: {
    url: '/backend/user/:id/role',
    type: 'POST',
  },
  DeleteUserRole: {
    url: '/backend/user/:id/role',
    type: 'DELETE',
  },
  GetAuthUserInfo: {
    url: '/backend/user/:id',
    type: 'GET',
  },
  GetParagraphStatus: {
    url: '/paragraph/status_list',
    type: 'GET',
  },
  GetUserPage: {
    url: '/backend/user_page',
    type: 'GET',
  },
  GetUserProjectPage: {
    url: '/user/:id/project_page',
    type: 'GET',
  },
  GetUserRole: {
    url: '/backend/role',
    type: 'GET',
  },
  GetUserStatus: {
    url: '/backend/status',
    type: 'GET',
  },
  RefreshToken: {
    url: '/backend/token',
    type: 'GET',
  },
  SystemLogin: {
    url: '/backend/system/login',
    type: 'POST',
  },
  UpdateSystemConfig: {
    url: '/backend/system/config',
    type: 'PATCH',
  },
  UpdateUserStatus: {
    url: '/backend/user/:id/status',
    type: 'PATCH',
  },
  CreateParagraph: {
    url: '/paragraph',
    type: 'POST',
  },
  CreateProject: {
    url: '/project',
    type: 'POST',
  },
  GetProjectParagraphPage: {
    url: '/project/:id/paragraph_page',
    type: 'GET',
  },
  GetProjectVisibilityList: {
    url: '/project/visibility_list',
    type: 'GET',
  },
  Create_reference: {
    url: '/reference',
    type: 'POST',
  },
  Echo: {
    url: '/echo/:content',
    type: 'GET',
  },
  GetAuthToken: {
    url: '/auth/token',
    type: 'POST',
  },
  GetSelf: {
    url: '/user',
    type: 'GET',
  },
  GetText: {
    url: '/text/:id',
    type: 'GET',
  },
  GetToken: {
    url: '/token',
    type: 'GET',
  },
  GetUser: {
    url: '/user/:id',
    type: 'GET',
  },
  GetVerificationCode: {
    url: '/verification_code',
    type: 'GET',
  },
  Login: {
    url: '/login',
    type: 'POST',
  },
  Register: {
    url: '/register',
    type: 'POST',
  },
  UpdateUserInfo: {
    url: '/user',
    type: 'PUT',
  },
  UpdateUserPassword: {
    url: '/auth/user/password',
    type: 'PUT',
  },
}
