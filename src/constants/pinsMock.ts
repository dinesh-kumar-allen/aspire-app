const getRandomPinImageData = () => {
  const random = Math.random() 
  const width = 300;
  const height = random > 0.5 ? 200 : 400;
  return {
    url: `https://placehold.co/${width}x${height}?rnd=${Math.random()}`,
    width: width,
    height: height,
  };
};

const getRandomPins = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    pinId: `pin_${index}_${Math.random().toString(36).substring(2, 15)}`,
    imageData: getRandomPinImageData(),
    title: `Pin index ${index}`,
    description: `Description ${Math.random().toString(36).substring(2, 15)}`,
  }));
};
const pinsMock = getRandomPins(40);

export default pinsMock;
