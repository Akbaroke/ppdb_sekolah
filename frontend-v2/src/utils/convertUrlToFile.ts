const convertUrlToFile = async (url: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const convertedFile = new File([blob], 'filename.png', {
    type: 'image/png',
  });
  return convertedFile;
};

export default convertUrlToFile;
