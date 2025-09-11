import React from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import SvgIcon from "@/core/components/Icon";

interface CommonModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showActions?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 2,
  width: "750px",
  maxHeight: "80vh",
  overflowY: "auto",
};

const CommonModal: React.FC<CommonModalProps> = ({
  open,
  onClose,
  title,
  children,
  showActions = false,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Title */}
        {title && (
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
            <Box width="95%">{title}</Box>
            <IconButton onClick={onClose}>
              <SvgIcon component="close" size={30} fill="#5C5C5C" />
            </IconButton>
          </Box>
        )}

        {/* Body */}
        <Box>{children}</Box>

        {/* Actions */}
        {showActions && (
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <Button onClick={onClose}>{cancelText}</Button>
            {onConfirm && (
              <Button onClick={onConfirm} variant="contained" color="primary">
                {confirmText}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CommonModal;
