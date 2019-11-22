const createAbortError = () => {
  const error = new Error('Delay aborted');
  error.name = 'AbortError';
  return error;
};

const createDelay = ({ clearTimeout: defaultClear, setTimeout: set, willResolve }) => (ms, { value, signal } = {} as any) => {
  if (signal && signal.aborted) {
    return Promise.reject(createAbortError());
  }

  let timeoutId;
  let settle;
  let rejectFn;
  const clear = defaultClear || clearTimeout;

  const signalListener = () => {
    clear(timeoutId);
    rejectFn(createAbortError());
  };

  const cleanup = () => {
    if (signal) {
      signal.removeEventListener('abort', signalListener);
    }
  };

  const delayPromise: any = new Promise((resolve, reject) => {
    settle = () => {
      cleanup();
      if (willResolve) {
        resolve(value);
      } else {
        reject(value);
      }
    };

    rejectFn = reject;
    timeoutId = (set || setTimeout)(settle, ms);
  });

  if (signal) {
    signal.addEventListener('abort', signalListener, { once: true });
  }

  delayPromise.clear = () => {
    clear(timeoutId);
    timeoutId = null;
    cleanup();
    settle();
  };

  return delayPromise;
};

const delay: any = createDelay({ willResolve: true } as any);
delay.reject = createDelay({ willResolve: false } as any);
delay.createWithTimers = ({ clearTimeout, setTimeout }) => {
  const delay: any = createDelay({ clearTimeout, setTimeout, willResolve: true });
  delay.reject = createDelay({ clearTimeout, setTimeout, willResolve: false });
  return delay;
};

export default delay;
