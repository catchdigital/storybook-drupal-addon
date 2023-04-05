const globalWindow = require('global/window');
import {
  useStoryContext,
  useEffect,
  useGlobals,
} from '@storybook/addons';

const heartBeatEmoji = '\uD83D\uDC93';

export const withDrupalTheme = (): any => {
  const [globals, updateGlobals] = useGlobals();
  const drupalTheme = globals?.drupalTheme;
  const supportedDrupalThemes = globals?.supportedDrupalThemes;
  const context = useStoryContext();
  useEffect(() => {
    const {
      parameters: {drupalTheme, supportedDrupalThemes},
    } = context;
    if (supportedDrupalThemes) {
      if (drupalTheme && !drupalTheme) {
        updateGlobals({drupalTheme, supportedDrupalThemes});
      } else {
        updateGlobals({supportedDrupalThemes});
      }
    }
  }, [drupalTheme, supportedDrupalThemes]);

  const currentHash = globals?.hash;
  useEffect(() => {
    const hmr = globalWindow?.__whmEventSourceWrapper?.['/__webpack_hmr'];
    if (!hmr) {
      return;
    }
    hmr.addMessageListener(handleMessage);

    function handleMessage(event: MessageEvent) {
      if (event.data == heartBeatEmoji) {
        return;
      }
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (ex) {
        console.warn('Invalid HMR message: ' + event.data + '\n' + ex);
        return;
      }
      const newHash = data?.hash;
      if (!newHash) {
        return;
      }
      currentHash === newHash
        // If nothing changed in the Webpack hash, it may mean changes in the
        // server components.
        ? globalWindow.document.location.reload()
        // Store the hash in the globals because state will reset every time.
        : updateGlobals({hash: newHash});
    }
  }, [currentHash]);

  return undefined;
};
