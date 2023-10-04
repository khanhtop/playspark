export function getMuxAsset(id, animated = true) {
  const animatedUrl = `https://image.mux.com/${id}/animated.gif?start=0`;
  const staticUrl = `https://image.mux.com/${id}/thumbnail.jpg?start=0`;
  return animated ? animatedUrl : staticUrl;
}
