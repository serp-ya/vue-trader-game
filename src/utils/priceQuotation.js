export default (price) => {
  const toRiseThePrice = Math.random() > 0.4;
  const coefficient = Math.random() / 7;
  const diff = price * coefficient;
  let newPrice = price;

  if (toRiseThePrice) {
    newPrice += diff;
  } else {
    newPrice -= diff;
  }

  if (newPrice <= 10) {
    return 10;
  }

  return parseInt(newPrice, 10);
};
