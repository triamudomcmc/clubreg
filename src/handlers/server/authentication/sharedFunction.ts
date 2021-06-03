export const generateExpireTime = (liveSpan) => {
  return (new Date().getTime()) + liveSpan
}