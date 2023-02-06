/*
 * Copyright 2023 sukawasatoru
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Computer, DarkMode, LightMode} from '@mui/icons-material';
import {List, ListItemButton, ListItemIcon, ListItemText, Popover, ToggleButton, useColorScheme} from '@mui/material';
import {lightBlue} from '@mui/material/colors';
import type {Mode} from '@mui/system/cssVars/useCurrentColorScheme';
import {FC, useMemo, useState} from 'react';

const iconMap = {
  light: LightMode,
  dark: DarkMode,
  system: Computer,
}

export const AppearanceSelector: FC = () => {
  const {mode, setMode} = useColorScheme();
  const ButtonIcon = useMemo(() => iconMap[mode || 'system'], [mode]);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = !!anchorEl;

  return <>
    <ToggleButton
      value={1}
      selected={open}
      onChange={(event) => setAnchorEl(event.currentTarget as HTMLButtonElement)}
      size="small"
    >
      <ButtonIcon sx={mode !== 'system' && {color: lightBlue[500]} || {}}/>
    </ToggleButton>
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: -100,
      }}
      onClose={() => setAnchorEl(null)}
    >
      <List defaultValue={mode || 'system'}>
        {Object.entries(iconMap).map(([key, Icon]) =>
          <ListItemButton
            key={key}
            sx={mode === key && {color: lightBlue[500]} || {}}
            onClick={() => {
              setMode(key as Mode);
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <Icon sx={mode === key && {color: lightBlue[500]} || {}}/>
            </ListItemIcon >
            <ListItemText children={key}/>
          </ListItemButton>
        )}
      </List>
    </Popover>
  </>;
};
