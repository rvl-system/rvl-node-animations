# RVL-Node Animations

Helper methods to create animations for RVL-Node.

Documentation coming soon!

## Usage

```typescript
import {
  createWaveParameters,
  createSolidColorWave,
  createColorCycleWave
} from 'rvl-node-animations';

const myWaveParameters = createWaveParameters(
   // Create a solid-cyan, half-way transparent color
  createSolidColorWave(128, 255, 255, 128),

  // Create a fully opaque, slow color cycle that will show throw the cyan wave
  createColorCycleWave(2, 255)
);
```

# License

Copyright (c) Bryan Hughes <bryan@nebri.us>

This file is part of Raver Lights Node Animations.

Raver Lights Node Animations is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Raver Lights Node Animations is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Raver Lights Node Animations.  If not, see <http://www.gnu.org/licenses/>.
