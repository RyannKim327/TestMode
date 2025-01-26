const utils = require("./../utils");

module.exports = (defaultFunc, api, ctx) => {
  return (setAdminRoom = (threadID, callback) => {
    let _resolve = () => {};
    let _reject = () => {};

    const promiseFunction = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    if (
      utils.getType(callback) !== "Function" &&
      utils.getType(callback) !== "AsyncFunction"
    ) {
      callback = (error, data) => {
        if (error) {
          _reject(error);
        }
        _resolve(data);
      };
    }
    if (typeof threadID === "string" || typeof threadID === "number") {
      api.getThreadInfo(threadID, (error, data) => {
        if (error) {
          _reject(error);
        }
        _resolve(data.participantIDs);
      });
    }

    return promiseFunction;
  });
};
