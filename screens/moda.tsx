import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Divider} from '@mui/material';
import styles from './styles.module.sass';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 480,
  bgcolor: 'background.paper',
  border: '5px',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface CustomModalProps {
  open: boolean;
  modalTitle: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
  onCancel: () => void;
  onSave: () => void;
  buttonText1: string;
  buttonText2: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  modalTitle,
  subtitle,
  children,
  onClose,
  onCancel,
  onSave,
  buttonText1,
  buttonText2,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={styles.modal}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            id="modal-title"
            variant="h6"
            className={styles.modalTitle}>
            {modalTitle}
          </Typography>
          <button className={styles.closeIcon} onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </Box>

        {subtitle && (
          <Typography variant="subtitle1" sx={{mt: 1, color: 'text.secondary'}}>
            {subtitle}
          </Typography>
        )}

        <Divider
          sx={{my: 2, backgroundColor: '#C72A42', height: 1, width: '100%'}}
        />

        <Box id="modal-description" sx={{mt: 2}}>
          {children}
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            onClick={onCancel}
            className={styles.buttonCancel}
            sx={{mr: 1}}>
            {buttonText1}
          </Button>
          <Button onClick={onSave} className={styles.buttonSave}>
            {buttonText2}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
