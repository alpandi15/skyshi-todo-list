import Modal from 'react-modal'

const ModalComponent = ({
  isOpen,
  toggleModal,
  id,
  children,
  dataCy
}) => {
  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={toggleModal}
      contentLabel="ModalDialog"
      className="modal-content"
      overlayClassName="modal-overlay"
      closeTimeoutMS={300}
      id={id}
    >
      <div className="modal-body" data-cy={dataCy}>
        {children}
      </div>
    </Modal>
  )
}

export default ModalComponent