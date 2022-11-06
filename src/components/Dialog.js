import {useState, useLayoutEffect} from 'react'
import {createPortal} from 'react-dom'

function createWrapperAndAppendToBody(wrapperId, onClick) {
  const wrapperElement = document.createElement('div')
  if (onClick) {
    wrapperElement.onclick = onClick
  }
  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)

  return wrapperElement
}

function ReactPortal({ children, wrapperId = 'modal-dialog', backdropId = 'modal-backdrop', toggleModal}) {
  const [wrapperElement, setWrapperElement] = useState(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let elementBackdrop = document.getElementById(backdropId);
    let systemCreated = false;

    if (!elementBackdrop) {
      elementBackdrop = createWrapperAndAppendToBody(backdropId, toggleModal);
    }

    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }

    setWrapperElement(element);

    document.body.classList.add('overflow-hidden', 'pr-[15px]')

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
      if (elementBackdrop.parentNode) {
        elementBackdrop.parentNode.removeChild(elementBackdrop);
      }
      document.body.classList.remove('overflow-hidden', 'pr-[15px]')
    }
  }, [backdropId, toggleModal, wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

const ModalDialog = ({children, isOpen, toggleModal, dataCy, className}) => {
  if (!isOpen) return null
  return (
    <ReactPortal toggleModal={toggleModal}>
      <div className={`modal-dialog-centered ${className??''}`}>
        <div className="modal-content" data-cy={dataCy}>{children}</div>
      </div>
    </ReactPortal>
  )
}

export default ModalDialog