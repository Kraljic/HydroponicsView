import { ModalConfig } from '../modal-config.model';
const MODAL_DELETE_CONFIG: ModalConfig = new ModalConfig();

MODAL_DELETE_CONFIG.headerClass = 'bg-danger';
MODAL_DELETE_CONFIG.confirmClass = 'bg-danger';
MODAL_DELETE_CONFIG.confirmText = 'component.modal.delete';

export { MODAL_DELETE_CONFIG };
