function randomColor(colorsArray: string[]): string {
  const randomColor =
    colorsArray[Math.floor(Math.random() * colorsArray.length)];
  return randomColor;
}

export default randomColor;
