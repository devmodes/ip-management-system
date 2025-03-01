export const getInitials = (text: string) => {
  const textArr = text.split(" ");

  if (textArr.length > 1) {
    return `${textArr[0].charAt(0)}${textArr[1].charAt(0)}`;
  }

  return textArr[0].charAt(0);
};
