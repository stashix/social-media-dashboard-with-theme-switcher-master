const THEME_KEY = "theme-preference";
const THEME_OPTIONS = {
    light: 'light', 
    dark: 'dark'
};
const THEME_TOGGLE_ID = "theme-toggle";

const getStoredTheme = () => {
    const storedTheme = window.localStorage.getItem(THEME_KEY);

    if(storedTheme == null)
        return null;

    if (!Object.values(THEME_OPTIONS).some(x => x == storedTheme)) {
        window.localStorage.removeItem(THEME_KEY);
        return null;
    }

    return storedTheme;
}

const themeToggle = document.getElementById(THEME_TOGGLE_ID);

themeToggle.addEventListener('change', event => {
    const preferredTheme = event.target.checked
        ? THEME_OPTIONS.dark
        : THEME_OPTIONS.light;

    window.localStorage.setItem(THEME_KEY, preferredTheme);
    document.body.dataset.preferredTheme = preferredTheme;
});

const storedThemePreference = getStoredTheme();

if (storedThemePreference == null) {
    const prefersLightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;

    themeToggle.checked = !prefersLightTheme;
    document.body.dataset.preferredTheme = !prefersLightTheme
        ? THEME_OPTIONS.dark
        : THEME_OPTIONS.light;
} else {
    themeToggle.checked = storedThemePreference === THEME_OPTIONS.dark;
    document.body.dataset.preferredTheme = storedThemePreference;
}
