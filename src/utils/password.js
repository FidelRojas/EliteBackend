export const generateNewPassword = (length) => {
  return Math.random().toString(36).slice(-length)
}
