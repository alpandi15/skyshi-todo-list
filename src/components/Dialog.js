import {useState, useLayoutEffect, useEffect} from 'react'
import {createPortal} from 'react-dom'

function createWrapperAndAppendToBody(wrapperId) {
  const wrapperElement = document.createElement('div')

  wrapperElement.setAttribute("id", wrapperId)
  // wrapperElement.onclick = () => alert('Test')

  document.body.appendChild(wrapperElement)

  return wrapperElement
}

function ReactPortal({ children, wrapperId = 'modal-dialog', toggleModal}) {
  const [wrapperElement, setWrapperElement] = useState(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let elementOverlay = document.getElementById('modal-backdrop');
    let systemCreated = false;
  
    if (!elementOverlay) {
      elementOverlay = document.createElement('div')
    
      elementOverlay.setAttribute("id", 'modal-backdrop')
      elementOverlay.onclick = () => alert('Test')
      document.body.appendChild(elementOverlay)
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
      if (elementOverlay.parentNode) {
        elementOverlay.parentNode.removeChild(elementOverlay);
      }
      document.body.classList.remove('overflow-hidden', 'pr-[15px]')
    }
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

const ModalDialog = ({children, isOpen, toggleModal, dataCy, classNameDialogCenter}) => {
  if (!isOpen) return null
  return (
    <ReactPortal>
      <div className={`modal-dialog-centered ${classNameDialogCenter??''}`} onClick={toggleModal}>
        <div className="modal-content" data-cy={dataCy}>{children}</div>
      </div>
    </ReactPortal>
  )
}

export default ModalDialog