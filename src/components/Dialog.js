import {useState, useLayoutEffect, useEffect} from 'react'
import {createPortal} from 'react-dom'

function createWrapperAndAppendToBody(wrapperId) {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)

  return wrapperElement
}

function ReactPortal({ children, wrapperId = 'modal'}) {
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

const ModalDialog = ({children, isOpen, toggleModal, dataCy, className}) => {
  const [show, setShow] = useState(false)

  useLayoutEffect(() => {
    document.body.classList.add('overflow-hidden', 'pr-[15px]')

    return () => {
      document.body.classList.remove('overflow-hidden', 'pr-[15px]')
    }
  }, [toggleModal]);

  useEffect(() => {
    setTimeout(() => {
      setShow(isOpen)
    }, [100])
  }, [isOpen])

  if (!isOpen) return null
  return (
    <ReactPortal>
      <div id="modal-dialog" className={`${show ? 'show' : ''}`} onClick={toggleModal}>
        <div className={`modal-dialog-centered ${className??''}`} onClick={(e) => e.stopPropagation()}>
          <div className="modal-content" data-cy={dataCy}>{children}</div>
        </div>
      </div>
    </ReactPortal>
  )
}

export default ModalDialog