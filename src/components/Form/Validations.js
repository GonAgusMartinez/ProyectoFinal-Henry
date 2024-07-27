export const validateName = (name) => {
  return name.length > 5 && name.length < 40;
};

export const validateDescription = (description) => {
  return description.length > 10 && description.length < 1000;
};

export const validateImage = (url) => {
  const pattern = /\.(png|jpg|gif)$/i;
  return pattern.test(url);
};

export const validatePrice = (price) => {
  return price > 1 && price < 1000000;
};