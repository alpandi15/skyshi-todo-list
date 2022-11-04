import { useState, useRef, useEffect } from 'react'
import { BackButton } from '../../components/BackButton'
import IconPencil from '../../statics/icons/icon-pencil.svg'
import { useOutsideAlerter } from '../../libs/useOutsideAlerter'
import { API_HOST } from '../../constant'

const FormEdit = ({data}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [value, setValue] = useState(null)

  const wrapperRef = useRef(null)

  useEffect(() => {
    setValue(data?.title)
  }, [data?.title])

  const updateTitle = async () => {
    if (isEdit) {
      setIsEdit(false)
      const res = await fetch(
        `${API_HOST}/activity-groups/${data?.id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: value
          })
        }
      )
      if (res?.ok) {
        return
      }
    }
  }

  useOutsideAlerter(wrapperRef, () => updateTitle())

  if (isEdit) {
    return (
      <div ref={wrapperRef} className="flex items-center">
        <BackButton alt="icon-back-button" dataCy="todo-back-button" />
        <div className="flex items-center">
          <input
            onChange={(e) => setValue(e?.target?.value)}
            autoFocus
            defaultValue={value}
            className="h-[60px] font-[700] text-[36px] disabled:opacity-75 bg-transparent appearance-none border-b-[1px] border-[#ECEDEF] w-full text-strong-gray leading-tight focus:outline-none focus:border-[#555555]"
          />
          <img className="ml-[27px] cursor-pointer" alt="icon" data-cy="todo-title-edit-button" src={IconPencil} />
        </div>
      </div>
    )
  }

  return (
    <div ref={wrapperRef} className="flex items-center" onClick={() => setIsEdit(true)}>
      <BackButton alt="icon-back-button" dataCy="todo-back-button" />
      <div className="flex items-center">
        <div data-cy="activity-title" className="font-[700] text-[36px]">{value}</div>
        <img className="ml-[27px] cursor-pointer" alt="icon" data-cy="todo-title-edit-button" src={IconPencil} />
      </div>
    </div>
  )
}

export default FormEdit