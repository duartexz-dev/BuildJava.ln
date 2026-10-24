(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const paletteButtons = [...document.querySelectorAll('[data-palette-choice]')];
  const customColor = document.getElementById('customColor');
  const customColorControl = document.getElementById('customColorControl');
  const paletteNames = new Set(['purple', 'blue', 'pink', 'mono']);
  const themeKey = 'builder-java-theme';
  const paletteKey = 'builder-java-palette';
  const customColorKey = 'builder-java-custom-color';

  const isHexColor = (value) => /^#[\da-f]{6}$/i.test(value);
  const toHex = (channels) => `#${channels
    .map((channel) => Math.round(channel).toString(16).padStart(2, '0'))
    .join('')}`;
  const parseHex = (value) => value.match(/[\da-f]{2}/gi).map((channel) => parseInt(channel, 16));
  const luminance = (channels) => channels
    .map((channel) => channel / 255)
    .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
    .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
  const contrastRatio = (first, second) => {
    const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
    return (values[0] + 0.05) / (values[1] + 0.05);
  };

  function setAccessibleAccentColors() {
    const accent = getComputedStyle(root).getPropertyValue('--accent').trim();
    if (!isHexColor(accent)) {
      throw new Error(`Unsupported accent color: ${accent}`);
    }

    const accentChannels = parseHex(accent.slice(1));
    const backgrounds = ['--page', '--surface'].map((property) => {
      const color = getComputedStyle(root).getPropertyValue(property).trim();
      if (!isHexColor(color)) {
        throw new Error(`Unsupported ${property} color: ${color}`);
      }
      return parseHex(color.slice(1));
    });
    const textColor = root.dataset.theme === 'dark' ? [245, 245, 245] : [23, 19, 38];
    let readableAccent = accentChannels;

    for (let step = 1; step <= 100; step += 1) {
      const ratio = step / 100;
      readableAccent = accentChannels.map((channel, index) => (
        channel * (1 - ratio) + textColor[index] * ratio
      ));
      if (backgrounds.every((background) => contrastRatio(readableAccent, background) >= 4.5)) {
        break;
      }
    }

    const darkForeground = [9, 9, 9];
    const lightForeground = [255, 255, 255];
    const foreground = contrastRatio(accentChannels, darkForeground)
      >= contrastRatio(accentChannels, lightForeground)
      ? darkForeground
      : lightForeground;

    root.style.setProperty('--accent-text', toHex(readableAccent));
    root.style.setProperty('--accent-contrast', toHex(foreground));
  }

  function syncPaletteControls(palette) {
    paletteButtons.forEach((button) => {
      const isActive = button.dataset.paletteChoice === palette;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    customColorControl.classList.toggle('active', palette === 'custom');
  }

  function setPalette(palette, color = customColor.value) {
    root.style.removeProperty('--accent');
    root.style.removeProperty('--accent-strong');
    root.style.removeProperty('--accent-rgb');

    if (palette === 'custom' && isHexColor(color)) {
      const channels = color.slice(1).match(/.{2}/g).map((channel) => parseInt(channel, 16));
      root.style.setProperty('--accent', color);
      root.style.setProperty('--accent-strong', toHex(channels.map((channel) => channel * 0.78)));
      root.style.setProperty('--accent-rgb', channels.join(', '));
      customColor.value = color;
      localStorage.setItem(customColorKey, color);
    }

    root.dataset.palette = palette;
    root.style.removeProperty('--accent-text');
    root.style.removeProperty('--accent-contrast');
    setAccessibleAccentColors();
    syncPaletteControls(palette);
    localStorage.setItem(paletteKey, palette);
  }

  function setTheme(theme) {
    const isDark = theme === 'dark';
    root.dataset.theme = isDark ? 'dark' : 'light';
    if (root.dataset.palette) {
      setAccessibleAccentColors();
    }
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    themeToggle.querySelector('i').className = `bi ${isDark ? 'bi-sun' : 'bi-moon-stars'} me-2`;
    themeToggle.querySelector('span').textContent = isDark ? 'Light mode' : 'Dark mode';
    themeColorMeta.content = isDark ? '#030303' : '#faf9ff';
    localStorage.setItem(themeKey, isDark ? 'dark' : 'light');
  }

  const savedTheme = localStorage.getItem(themeKey);
  const savedPalette = localStorage.getItem(paletteKey);
  const savedCustomColor = localStorage.getItem(customColorKey);

  if (savedCustomColor && isHexColor(savedCustomColor)) {
    customColor.value = savedCustomColor;
  }
  setTheme(savedTheme === 'dark' ? 'dark' : 'light');
  setPalette(savedPalette === 'custom'
    ? (isHexColor(savedCustomColor) ? 'custom' : 'purple')
    : (paletteNames.has(savedPalette) ? savedPalette : 'purple'));

  themeToggle.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  paletteButtons.forEach((button) => {
    button.addEventListener('click', () => setPalette(button.dataset.paletteChoice));
  });

  customColor.addEventListener('input', () => setPalette('custom', customColor.value));
})();