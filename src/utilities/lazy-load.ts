import { directive } from 'lit-html';

const resolved = new WeakSet();
const lazyLoad = directive((importPromise, value) => part => {
  if (!resolved.has(part)) {
    importPromise.then(() => {
      resolved.add(part);
    });
  }
  part.setValue(value);
  window.dispatchEvent(new CustomEvent('lazy-load-complete'));
});

export { lazyLoad, lazyLoad as default };
