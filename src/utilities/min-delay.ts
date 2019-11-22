import delay from './delay';

const minDelay = async (promise, minimumDelay) => {
  const options = {
    delayRejection: true,
  };

  let promiseError;

  if (options.delayRejection) {
    promise = promise.catch(error => {
      promiseError = error;
    });
  }

  const value = await Promise.all([promise, delay(minimumDelay)]);
  return promiseError ? Promise.reject(promiseError) : value[0];
};

export default minDelay;
