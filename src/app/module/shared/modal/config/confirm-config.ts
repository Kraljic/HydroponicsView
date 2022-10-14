import { ModalConfig } from '../modal-config.model';
const MODAL_CONFIRM_CONFIG: ModalConfig = new ModalConfig();

MODAL_CONFIRM_CONFIG.headerClass = 'bg-warning';
MODAL_CONFIRM_CONFIG.confirmClass = 'bg-warning';
MODAL_CONFIRM_CONFIG.denyBtnShow = false;
MODAL_CONFIRM_CONFIG.confirmText = 'component.modal.confirm';

export { MODAL_CONFIRM_CONFIG };
