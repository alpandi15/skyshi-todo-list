import {useState, useLayoutEffect} from 'react'
import {createPortal} from 'react-dom'

function createWrapperAndAppendToBody(wrapperId) {
  const wrapperElement = document.createElement('div')

  wrapperElement.setAttribute("id", wrapperId)

  document.body.appendChild(wrapperElement)

  return wrapperElement
}

function ReactPortal({ children, wrapperId = 'modal-dialog', backdropId = 'modal-backdrop' }) {
  const [wrapperElement, setWrapperElement] = useState(null);

  useLayoutEffect(() => {
    let backdropElement = document.getElementById(backdropId)
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    if (!backdropElement) {
      backdropElement = createWrapperAndAppendToBody(backdropId);
    }
  
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }

    setWrapperElement(element);

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
      if (backdropElement.parentNode) {
        backdropElement.parentNode.removeChild(backdropElement);
      }
    }
  }, [backdropId, wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

const ModalDialog = ({children, isOpen, toggleModal}) => {
  if (!isOpen) return null
  return (
    <ReactPortal>
      <div className="modal">
        <button onClick={toggleModal} className="close-btn">
          Close
        </button>
        <div className="">{children}</div>
      </div>
    </ReactPortal>
  )
}

export default ModalDialog