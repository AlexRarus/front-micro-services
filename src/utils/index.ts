export const inIframe: any = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};
