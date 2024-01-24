import { UserField, UserRoles } from '~/constant/enum'

export interface RegisterReqBody {
  username: string
  email: string
  password: string
  full_name: string
  phone: string
  address: string
  role?: UserRoles
  field?: UserField
  account_number?: string
  account_name?: string
  bank_name?: string
  qr_img?: string
}

export interface TokenPayLoad {
  user_id: string
}
