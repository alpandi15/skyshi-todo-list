import { useState, useRef } from 'react'
import IconSort from '../../statics/icons/icon-sort.svg'
import { useOutsideAlerter } from '../../libs/useOutsideAlerter'
import { SORT_LIST as FILTERS } from '../../constant'

const Sort = ({onSorted}) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const onHandle = () => setOpen(!open)

  const wrapperRef = useRef(null)

  useOutsideAlerter(wrapperRef, () => setOpen(false))

  const onSelected = (id) => {
    setSelected(id)
    setOpen(false)
    onSorted(id)
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="mr-[18px]">
        <button
          onClick={onHandle}
          data-cy="todo-sort-button"
          className="h-[54px] w-[54px] rounded-full border-[1px] border-[#e5e5e5] flex items-center justify-center"
        >
          <img alt='sort' src={IconSort} />
        </button>
      </div>
      {open && (
        <div className="w-[235px] rounded-[6px] absolute border-[1px] bg-white top-[60px] shadow-lg">
          {FILTERS.map((filter, index) => {
            return (
              <div key={index} onClick={() => onSelected(filter?.id)} className="flex items-center px-5 py-4 cursor-pointer relative border-b-[1px]">
                <img data-cy="sort-selection-icon" alt={filter?.title} src={filter?.icon} />
                <div data-cy="sort-selection-title" className="ml-2 text-[#4A4A4A] text-[16px]">{filter?.title}</div>
                {filter?.id === selected ? (
                  <div className="absolute right-4">
                    <i data-cy="sort-selected" className="material-icons text-[#4A4A4A] text-[16px]">check</i>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Sort