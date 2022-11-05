import { useState, useRef, useEffect } from 'react'
import { useOutsideAlerter } from '../../libs/useOutsideAlerter'
import { LIST_PRIORITY } from '../../constant'

const InputDropdown = ({onHandleSelected, defaultValue}) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const onHandle = () => setOpen(!open)

  const wrapperRef = useRef(null)

  useOutsideAlerter(wrapperRef, () => {
    if (open) setOpen(false)
  })
  
  useEffect(() => {
    // initial value
    if (defaultValue) {
      const find = LIST_PRIORITY?.find((x) => x?.priority === defaultValue)
      setSelected(find)
    }
  }, [defaultValue])

  const onSelected = (id) => {
    const find = LIST_PRIORITY?.find((x) => Number(x?.id) === Number(id))
    setSelected(find)
    setOpen(false)
    onHandleSelected('priority', find?.priority)
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="mr-[18px]">
        <button
          onClick={onHandle}
          data-cy="modal-add-priority-dropdown"
          className="h-[52px] min-w-[205px] border-[1px] border-[#E5E5E5] flex items-center justify-center rounded"
        >
          <div data-cy="modal-add-priority-item" className="w-full flex items-center justify-between p-3">
            {selected ? (
              <div className="flex items-center">
                <div className={`${selected?.color} w-[14px] h-[14px] rounded-full mr-4`}></div>
                <div>{selected?.title}</div>
              </div>
            ) : (
              <div>Pilih Priority</div>
            )}
            <i className="material-icons">keyboard_arrow_down</i>
          </div>
        </button>
      </div>
      {open && (
        <div className="w-[205px] rounded-[6px] absolute border-[1px] bg-white top-[60px] shadow-lg">
          {LIST_PRIORITY.map((filter, index) => {
            return (
              <div data-cy={filter?.dataCy} key={index} onClick={() => onSelected(filter?.id)} className="flex items-center px-5 py-4 cursor-pointer relative border-b-[1px]">
                <div className="flex items-center">
                  <div data-cy="todo-item-priority-indicator" className={`w-[14px] h-[14px] rounded-full mr-4 ${filter?.color}`}></div>
                  <div data-cy="todo-item-title">{filter?.title}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default InputDropdown