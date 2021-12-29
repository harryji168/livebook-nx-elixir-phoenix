const SETTINGS_KEY = "livebook:settings";

const DEFAULT_SETTINGS = {
  editor_auto_completion: true,
  editor_auto_signature: true,
};

/**
 * Stores the given settings in local storage.
 *
 * The given attributes are merged into the current settings.
 */
export function storeLocalSettings(settings) {
  const prevSettings = loadLocalSettings();
  const newSettings = { ...prevSettings, ...settings };

  try {
    const json = JSON.stringify(newSettings);
    localStorage.setItem(SETTINGS_KEY, json);
  } catch (error) {
    console.error(`Failed to store local settings, reason: ${error.message}`);
  }
}

/**
 * Loads settings from local storage.
 */
export function loadLocalSettings() {
  try {
    const json = localStorage.getItem(SETTINGS_KEY);
    const settings = json ? JSON.parse(json) : {};
    return { ...DEFAULT_SETTINGS, ...settings };
  } catch (error) {
    console.error(`Failed to load local settings, reason: ${error.message}`);
    return DEFAULT_SETTINGS;
  }
}
