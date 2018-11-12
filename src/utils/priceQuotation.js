export default (price) => {
  const toRiseThePrice = Math.random() > 0.5;
  const coefficient = Math.random();
  const diff = price * coefficient;
  let newPrice = price;

  if (toRiseThePrice) {
    newPrice += diff;
  } else {
    newPrice -= diff;
  }

  if (newPrice <= 0) {
    return price;
  }

  return parseInt(newPrice, 10);
};
