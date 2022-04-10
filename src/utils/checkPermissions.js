const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return

  throw new Error('Not authorized to access this route')
}

export default checkPermissions
