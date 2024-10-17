const test = async () => {
  let value = Math.round(Math.random() * 14);
  setInterval(() => {
    console.log((Math.round(Math.random() * -1 * 8) + 4) / 10);
  }, 1000);
};
test();
