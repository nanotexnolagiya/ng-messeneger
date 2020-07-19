export const Status = {
  type: String,
  enum: ['active', 'inactive'],
  default: 'active'
}

export const Roles = {
  type: String,
  enum: ['root', 'admin', 'moderator', 'member'],
  default: 'member'
}

export const Access = {
  type: String,
  enum: ['public', 'private'],
  default: 'active'
}
