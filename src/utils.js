/**
 * 获取一个从 0 ~ max-1 的整数
 */
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

