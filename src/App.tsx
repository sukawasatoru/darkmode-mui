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

import {VolumeDown, VolumeUp} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Switch,
  Typography,
  useMediaQuery
} from '@mui/material';
import {useState} from 'react';
import {AppearanceSelector} from './AppearanceSelector';
import {Editor} from './Editor';

function App() {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mySelect, setMySelect] = useState(1);
  return (
    <Container>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography flexGrow={0}>
            isDark: {`${isDark}`}
          </Typography>
          <Box flexGrow={1} />
          <AppearanceSelector />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button>
            Text Button
          </Button>
          <Button variant="contained">
            Contained Button
          </Button>
          <Button variant="outlined">
            Outline Button
          </Button>
        </Stack>
        <FormControl>
          <InputLabel id="my-input-label">
            My Input Label
          </InputLabel>
          <Select
            labelId="my-input-label"
            id="my-select"
            label="My Select Label"
            value={mySelect}
            onChange={(data) => setMySelect(data.target.value as number)}
          >
            <MenuItem value={1}>
              One
            </MenuItem>
            <MenuItem value={2}>
              Tow
            </MenuItem>
            <MenuItem value={3}>
              Three
            </MenuItem>
          </Select>
        </FormControl>
        <Stack direction="row" spacing={2} alignItems="center">
          <VolumeDown/>
          <Slider/>
          <VolumeUp/>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Switch/>
          <Switch defaultChecked/>
        </Stack>
        <Editor />
      </Stack>
    </Container>
  );
}

export default App;
