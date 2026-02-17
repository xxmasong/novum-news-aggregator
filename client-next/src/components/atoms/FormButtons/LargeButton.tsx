'use client';

import { Button, ButtonProps, CircularProgress } from "@mui/material";
import Link from "next/link";

function LargeButton({
  sx,
  loading,
  to,
  ...props
}: ButtonProps & { to?: string; loading?: boolean }) {
  if (loading) {
    const { children, disabled, ...rest } = props;
    return (
      <Button
        fullWidth
        disabled
        sx={{ height: { xs: 40, sm: 60 }, maxWidth: 280, ...sx }}
        {...rest}
      >
        <CircularProgress size={24.5} color="inherit" />
      </Button>
    );
  }

  if (to) {
    return (
      <Button
        fullWidth
        sx={{ height: { xs: 40, sm: 60 }, maxWidth: 280, ...sx }}
        component={Link}
        href={to}
        {...props}
      />
    );
  }

  return (
    <Button
      fullWidth
      sx={{ height: { xs: 40, sm: 60 }, maxWidth: 280, ...sx }}
      {...props}
    />
  );
}

export default LargeButton;
