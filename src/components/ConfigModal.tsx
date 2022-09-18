import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useConfigModal } from "../operators/useConfigModal";

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
  const { isOpen, type, draftConfigs, onChange, handleClose, saveConfig } =
    useConfigModal();

  return (
    <Modal
      open={isOpen}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {[...draftConfigs].map((config) => (
          <TextField
            label={config[0]}
            variant="outlined"
            key={`${type}_${config[0]}`}
            value={draftConfigs.get(config[0]) ?? ""}
            onChange={(e) => onChange(config[0], e.target.value)}
          />
        ))}
        <Button
          onClick={() => saveConfig(draftConfigs)}
          style={{ marginTop: 10 }}
        >
          OK
        </Button>
      </Box>
    </Modal>
  );
};

export default ConfigModal;
