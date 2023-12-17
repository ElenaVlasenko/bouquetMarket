function getPriceString(price) {
  const priceStr = price.toString();

  if (priceStr.length <= 3) {
    return priceStr;
  }

  const chars = priceStr.split('');
  const head = chars.slice(0, chars.length - 3);
  const tail = chars.slice(chars.length - 3, chars.length);

  return `${head.join('')}&nbsp;${tail.join('')}`;
}

export {
  getPriceString,
};
