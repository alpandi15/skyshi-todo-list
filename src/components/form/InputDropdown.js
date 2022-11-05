import { useState, useRef } from 'react'
import { useOutsideAlerter } from '../../libs/useOutsideAlerter'

const FILTERS = [
  {id: 1, priority: 'very-high', title: 'Very High', color: 'bg-[#ED4C5C]', dataCy: 'modal-add-priority-very-high'},
  {id: 2, priority: 'high', title: 'High', color: 'bg-[#F8A541]', dataCy: 'modal-add-priority-high'},
  {id: 3, priority: 'medium', title: 'Medium', color: 'bg-[#00A790]', dataCy: 'modal-add-priority-medium'},
  {id: 4, priority: 'low', title: 'Low', color: 'bg-[#428BC1]', dataCy: 'modal-add-priority-low'},
  {id: 5, priority: 'very-low', title: 'Very Low', color: 'bg-[#8942C1]', dataCy: 'modal-add-priority-very-low'},
]

const InputDropdown = ({onHandleSelected}) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const onHandle = () => setOpen(!open)

  const wrapperRef = useRef(null)

  useOutsideAlerter(wrapperRef, () => {
    if (open) setOpen(false)
  })

  const onSelected = (id) => {
    const find = FILTERS?.find((x) => Number(x?.id) === Number(id))
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
          {FILTERS.map((filter, index) => {
            return (
              <div data-cy={filter?.dataCy} key={index} onClick={() => onSelected(filter?.id)} className="flex items-center px-5 py-4 cursor-pointer relative border-b-[1px]">
                <div className="flex items-center">
                  <div className={`w-[14px] h-[14px] rounded-full mr-4 ${filter?.color}`}></div>
                  <div>{filter?.title}</div>
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