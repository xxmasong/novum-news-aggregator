export async function delay(ms: number) {
  await new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

export const getScrollTop = () => {
  if (!document.body) return 0;

  const scrollTop = document.documentElement
    ? document.documentElement.scrollTop || document.body.scrollTop
    : document.body.scrollTop;

  return scrollTop;
};

export const getScrollBottom = () => {
  if (!document.body) return 0;

  const { scrollHeight } = document.body;
  const { innerHeight } = window;
  const scrollTop = getScrollTop();
  
  return scrollHeight - innerHeight - scrollTop;
};

export type Handlers<T> = {
  [type: string]: (state: T, action: any) => T;
};

export function createReducer<S>(handlers: Handlers<S>, initialState: S) {
  return (state: S = initialState, action: any) => {
    const handler = handlers[action.type];
    if (!handler) return state;
    return handler(state, action);
  };
}

export function updateKey<S, K extends keyof S>(
  state: S,
  key: K,
  value: S[K],
): S {
  return {
    ...state,
    [key]: value,
  };
}

export const escapeForUrl = (text: string): string => {
  return text
    .replace(
      /[^0-9a-zA-Zㄱ-힣.\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf -]/g,
      '',
    )
    .trim()
    .replace(/ /g, '-')
    .replace(/--+/g, '-');
};

export function safe<T>(callback: () => T) {
  try {
    return callback();
  } catch (e) {
    return null;
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function loadScript(url: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.onload = function onload() {
      resolve(null);
    };
    script.onerror = function onerror() {
      reject();
    };
    script.src = url;
    if (!document || !document.head) return;
    
    document.head.appendChild(script);
  });
}

export const ssrEnabled = process.env.NEXT_PUBLIC_SSR === 'enabled';
