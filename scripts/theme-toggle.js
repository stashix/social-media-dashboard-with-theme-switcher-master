const getStoredTheme = () => {
    const storedTheme = window.localStorage.getItem('theme-preference');

    if (storedTheme != null && storedTheme !== 'light' && storedTheme !== 'dark') {
        window.localStorage.removeItem('theme-preference');
        return null;
    }

    return storedTheme;
}

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('change', event => {
    const preferredTheme = event.target.checked
        ? "dark"
        : "light";

    window.localStorage.setItem('theme-preference', preferredTheme);
    document.body.dataset.preferredTheme = preferredTheme;
});

const storedThemePreference = getStoredTheme();

if (storedThemePreference == null) {
    const prefersLightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;

    themeToggle.checked = !prefersLightTheme;
    document.body.dataset.preferredTheme = !prefersLightTheme
        ? "dark"
        : "light";
} else {
    themeToggle.checked = storedThemePreference === 'dark';
    document.body.dataset.preferredTheme = storedThemePreference;
}
