import { ModalConfig } from '../modal-config.model';
const MODAL_SAVE_CONFIG: ModalConfig = new ModalConfig();

MODAL_SAVE_CONFIG.headerClass = 'bg-warning';
MODAL_SAVE_CONFIG.confirmClass = 'bg-warning';
MODAL_SAVE_CONFIG.denyBtnShow = false;
MODAL_SAVE_CONFIG.confirmText = 'component.modal.save';

export { MODAL_SAVE_CONFIG };
