import moment from "moment";

export const getInitials = (text: string) => {
  const textArr = text.split(" ");

  if (textArr.length > 1) {
    return `${textArr[0].charAt(0)}${textArr[1].charAt(0)}`;
  }

  return textArr[0].charAt(0);
};

export const formatDate = (date: Date): string => {
  return moment(date).format("DD MMM YYYY");
};
