import {useState, useLayoutEffect, useEffect} from 'react'
import {createPortal} from 'react-dom'

function createWrapperAndAppendToBody(wrapperId, onClick) {
  const wrapperElement = document.createElement('div')

  wrapperElement.setAttribute("id", wrapperId)
  wrapperElement.onclick = onClick
  console.log('ONCLICK ', wrapperId, onClick)
  document.body.appendChild(wrapperElement)

  return wrapperElement
}

function ReactPortal({ children, wrapperId = 'modal-dialog', toggleModal}) {
  const [wrapperElement, setWrapperElement] = useState(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

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
      document.body.classList.remove('overflow-hidden', 'pr-[15px]')
    }
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

const ModalDialog = ({children, isOpen, toggleModal, dataCy}) => {
  if (!isOpen) return null
  return (
    <ReactPortal>
      <div id="modal-backdrop"></div>
      <div className="modal-dialog-centered" onClick={toggleModal}>
        <div className="modal-content" data-cy={dataCy}>{children}</div>
      </div>
    </ReactPortal>
  )
}

export default ModalDialog