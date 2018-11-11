export default [
  'currencyFormat',
  (value, currencySign = '$') => {
    const valueStr = String(value);
    const valueArrReversed = [...valueStr].reverse();
    const charsCount = valueArrReversed.length;

    for (let i = charsCount; i > 0; i -= 1) {
      if ((i % 3) === 0 && i !== charsCount) {
        valueArrReversed.splice(i, 0, '.');
      }
    }
    return currencySign + valueArrReversed.reverse().join('');
  },
];
