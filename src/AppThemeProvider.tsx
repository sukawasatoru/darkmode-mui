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

import {createTheme, ThemeProvider} from '@mui/material';
import {FC, ReactNode} from 'react';
import {useRecoilValue} from 'recoil';
import {appearanceState} from './appearance';

export interface Props {
  children: ReactNode;
}

export const AppThemeProvider: FC<Props> = ({children}) => {
  console.log("AppTheme rendered");

  const appearance = useRecoilValue(appearanceState);

  const theme = createTheme({
    palette: {
      mode: appearance,
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
