import React from "react";
import { Stack, TextField, Button } from "@mui/material";
import { Controller } from "react-hook-form";
import { useStyleForm } from "../../hooks/useStyleForm";

const StyleForm: React.FC = () => {
  const { control, handleSubmit, onSubmit, keys } = useStyleForm();

  if (keys.length === 0) return null;

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      sx={{
        m: 2,
        width: "25ch",
        boxSizing: "content-box",
        bgcolor: "background.paper",
        transform: "translate(0%, 0%)",
        p: 2,
      }}
    >
      {keys.map((key) => (
        <Controller
          key={key}
          name={key}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="text"
              label={key}
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
      ))}
      <Button variant="contained" type="submit">
        update
      </Button>
    </Stack>
  );
};

export default StyleForm;
