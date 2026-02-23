import React, { memo, useCallback, useEffect } from 'react';
import { useGlobals } from 'storybook/manager-api';
import { IconButton, WithTooltip, TooltipLinkList } from 'storybook/internal/components';
import { PaintBrushIcon } from '@storybook/icons';
import { ADDON_ID, THEME_KEY, CARBON_THEMES, type CarbonTheme } from '../constants';

const THEME_LABELS: Record<CarbonTheme, string> = {
  [CARBON_THEMES.WHITE]: 'White',
  [CARBON_THEMES.G10]: 'Gray 10',
  [CARBON_THEMES.G90]: 'Gray 90',
  [CARBON_THEMES.G100]: 'Gray 100',
};

export const Tool = memo(function CarbonThemeSwitcher() {
  const [globals, updateGlobals] = useGlobals();
  const currentTheme = (globals[THEME_KEY] as CarbonTheme) || CARBON_THEMES.WHITE;

  const setTheme = useCallback(
    (theme: CarbonTheme) => {
      updateGlobals({
        [THEME_KEY]: theme,
      });

      // Update the theme attribute on both manager and preview HTML elements
      const managerRoot = document.documentElement;
      const previewIframe = document.querySelector('#storybook-preview-iframe') as HTMLIFrameElement;

      if (managerRoot) {
        managerRoot.setAttribute('storybook-carbon-theme', theme);
      }

      if (previewIframe?.contentDocument?.documentElement) {
        previewIframe.contentDocument.documentElement.setAttribute('storybook-carbon-theme', theme);
      }
    },
    [updateGlobals],
  );

  // Set initial theme on mount
  useEffect(() => {
    setTheme(currentTheme);
  }, []);

  const themeOptions = Object.values(CARBON_THEMES).map((theme) => ({
    id: theme,
    title: THEME_LABELS[theme],
    active: currentTheme === theme,
    onClick: () => setTheme(theme),
  }));

  return (
    <WithTooltip placement="top" trigger="click" closeOnOutsideClick tooltip={<TooltipLinkList links={themeOptions} />}>
      <IconButton key={ADDON_ID} title="Change Carbon theme">
        <PaintBrushIcon />
      </IconButton>
    </WithTooltip>
  );
});
