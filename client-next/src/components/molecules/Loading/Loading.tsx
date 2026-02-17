import CircularProgress from '@mui/material/CircularProgress';

import { FullSizeCenteredFlexBox } from '@/styles/styled';
import { themedPalette } from '@/styles/themes';

function Loading() {
  return (
    <FullSizeCenteredFlexBox>
      <CircularProgress color='success' />
    </FullSizeCenteredFlexBox>
  );
}

export default Loading;
