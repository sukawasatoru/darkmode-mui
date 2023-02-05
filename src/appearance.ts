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

import {PaletteMode} from '@mui/material';
import {atom, selector} from 'recoil';

export type Appearance = 'system' | 'light' | 'dark';

export const appearanceRawState = atom<Appearance>({
  key: 'appearanceRaw',
  default: 'system',
  effects: [
    ({setSelf, onSet, resetSelf}) => {
      console.log(`[appearanceRaw] effects[0]`);

      const key = 'appearance';
      const storageValue = localStorage.getItem(key) as Appearance | string | null;
      switch (storageValue) {
        case 'system':
        case 'light':
        case 'dark':
          setSelf(storageValue);
          break;
        case null:
          console.log(`[appearanceRaw] effects[0] ignore null`);
          break;
        default:
          console.log(`[appearanceRaw] effects[0] reset value: ${storageValue}`);
          resetSelf();
      }

      // ref. https://recoiljs.org/docs/guides/atom-effects/#local-storage-persistence
      onSet((newValue, _, isReset) => {
        console.log(`[appearanceRaw] onSet: ${newValue}`);
        isReset ?
          localStorage.removeItem(key) :
          localStorage.setItem(key, newValue);
      });
    },
  ]
});

const isSystemDarkState = atom<boolean>({
  key: 'isSystemDark',
  default: false,
  effects: [
    ({setSelf}) => {
      console.log(`[isSystemDark] effects[0]`);
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setSelf(mediaQuery.matches);

      const cb = (ev: MediaQueryListEvent) => setSelf(ev.matches);
      mediaQuery.addEventListener('change', cb);

      return () => mediaQuery.removeEventListener('change', cb);
    },
  ]
});

export const appearanceState = selector<PaletteMode>({
  key: 'appearance',
  get: ({get}) => {
    console.log(`[appearance] get`);
    const raw = get(appearanceRawState);
    const isSystemDark = get(isSystemDarkState);
    switch (raw) {
      case 'light':
      case 'dark':
        return raw;
      case 'system':
        return isSystemDark ? 'dark' : 'light';
    }
  },
});
