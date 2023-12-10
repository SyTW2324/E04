


export const fetchImageUrl = async (image_id: string): Promise<string> => {
  console.log('fetching image url')
  console.log(image_id)
  const response = await fetch(`https://teal-monkey-hem.cyclic.app/api/images?image_id=${image_id}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};