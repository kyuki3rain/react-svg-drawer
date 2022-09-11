import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useConfig } from "../hooks/useConfigModal";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 3,
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ConfigModal = () => {
  const [state, setState] = useState<Map<string, string>>(new Map());
  const { isOpen, type, configList, saveConfig, closeModalWithoutMode } =
    useConfig();

  const handleClose = () => {
    closeModalWithoutMode();
    setState(new Map());
  };

  useEffect(() => {
    setState((prev) => {
      configList?.map((c) => {
        prev.set(c.key, c.defaultValue);
      });
      return new Map(prev);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      open={isOpen}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {configList?.map((config) => (
          <TextField
            label={config.key}
            variant="outlined"
            key={`${type}_${config.key}`}
            value={state.get(config.key) ?? ""}
            onChange={(e) => {
              setState((prev) => new Map(prev.set(config.key, e.target.value)));
            }}
          />
        ))}
        <Button onClick={() => saveConfig(state)} style={{ marginTop: 10 }}>
          OK
        </Button>
      </Box>
    </Modal>
  );
};

export default ConfigModal;
