import faker from "faker";

export const fakeList = (dates, count) => {
  const res = [];
  for (let i = 0; i < count; i++) {
    res.push({
      id: i,
      title: `JET ${faker.random.word().toUpperCase()}`,
      dates,
      image: faker.random.image(),
    });
  }
  return res;
};
