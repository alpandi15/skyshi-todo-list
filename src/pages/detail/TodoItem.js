import { useEffect, useState } from 'react'
import IconDelete from '../../statics/icons/icon-delete.svg'
import IconPencil from '../../statics/icons/icon-pencil.svg'
import { LIST_PRIORITY } from '../../constant'
import { API_HOST } from '../../constant'

const TodoItem = ({data}) => {
  const [isChecked, setIsChecked] = useState(!!!data?.is_active)
  const [indicator, setIndicator] = useState(null)

  useEffect(() => {
    const find = LIST_PRIORITY?.find((x) => x?.priority === data?.priority)
    if (find) setIndicator(find?.color)
  }, [data?.priority])

  const onChange = async (e) => {
    console.log(e?.target?.checked)
    setIsChecked(e?.target?.checked)
    const res = await fetch(
      `${API_HOST}/todo-items/${data?.id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          is_active: !e?.target?.checked
        })
      }
    )
    if (res?.ok) {
      console.log(await res.json())
      return
    }
  }

  return (
    <div className="bg-white mb-4 w-full h-[80px] flex items-center justify-between rounded-[12px] shadow-xl px-6 py-4">
      <div className="flex items-center">
        <input onChange={onChange} defaultChecked={isChecked} data-cy="todo-item-checkbox" className="mr-2 h-[24px] w-[24px] border-[1px] border-[#c7c7c7]" type="checkbox" />
        <div data-cy="todo-item-priority-indicator" className={`${indicator} w-[14px] h-[14px] rounded-full mx-4`}></div>
        <div data-cy="todo-item-title" className={`text-[18px] font-[500] ${isChecked ? 'line-through text-[#888888]' : ''}`}>{data?.title}</div>
        <img className="ml-[27px] cursor-pointer" alt="icon" data-cy="todo-item-edit-button" src={IconPencil} />
      </div>
      <img alt="delete" src={IconDelete} data-cy="todo-item-edit-button" className="cursor-pointer" />
    </div>
  )
}

export default TodoItem
