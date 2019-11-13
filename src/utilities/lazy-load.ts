import { directive } from 'lit-html';

const resolved = new WeakSet();
const lazyLoad = directive((importPromise, value) => async part => {
  if (!resolved.has(part)) {
    try {
      await importPromise;
      resolved.add(part);
    } catch(error){
      console.warn(error);
    }
  }
  part.setValue(value);
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('lazy-load-complete', { bubbles: true, composed: true }));
  }, 400);
});

export { lazyLoad, lazyLoad as default };