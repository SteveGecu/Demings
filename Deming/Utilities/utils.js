async function wait(millis) {
  return new Promise((resolve, rej) => {
    setTimeout(() => {
      resolve();
    }, millis);
  })
}

function range(i) {
  return [...Array(i).keys()]
}

module.exports = {
  wait,
  range,
}