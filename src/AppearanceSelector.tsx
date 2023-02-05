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
import {List, ListItemButton, ListItemIcon, ListItemText, Popover, ToggleButton} from '@mui/material';
import {lightBlue} from '@mui/material/colors';
import {FC, useMemo, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {Appearance, appearanceRawState, appearanceState} from './appearance';

const iconMap = {
  light: LightMode,
  dark: DarkMode,
  system: Computer,
}

export const AppearanceSelector: FC = () => {
  const [appearanceRaw, setAppearanceRow] = useRecoilState(appearanceRawState);
  const appearance = useRecoilValue(appearanceState);
  const ButtonIcon = useMemo(() => iconMap[appearance], [appearance]);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = !!anchorEl;

  return <>
    <ToggleButton
      value={1}
      selected={open}
      onChange={(event) => setAnchorEl(event.currentTarget as HTMLButtonElement)}
      size="small"
    >
      <ButtonIcon sx={appearanceRaw !== 'system' && {color: lightBlue[500]} || {}}/>
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
      <List defaultValue={appearanceRaw}>
        {Object.entries(iconMap).map(([key, Icon]) =>
          <ListItemButton
            key={key}
            sx={appearanceRaw === key && {color: lightBlue[500]} || {}}
            onClick={() => {
              setAppearanceRow(key as Appearance);
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <Icon sx={appearanceRaw === key && {color: lightBlue[500]} || {}}/>
            </ListItemIcon >
            <ListItemText children={key}/>
          </ListItemButton>
        )}
      </List>
    </Popover>
  </>;
};
