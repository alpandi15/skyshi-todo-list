import { useEffect, useState } from 'react'
import IconDelete from '../../statics/icons/icon-delete.svg'
import IconPencil from '../../statics/icons/icon-pencil.svg'
import IconAlert from '../../statics/icons/icon-alert.svg'
import { LIST_PRIORITY } from '../../constant'
import { API_HOST } from '../../constant'
import ModalDialog from '../../components/Dialog'
import Button from '../../components/Button'

const TodoItem = ({data, onUpdateList}) => {
  const [isChecked, setIsChecked] = useState(!!!data?.is_active)
  const [indicator, setIndicator] = useState(null)
  const [isDeleteShow, setIsDeleteShow] = useState(false);

  useEffect(() => {
    const find = LIST_PRIORITY?.find((x) => x?.priority === data?.priority)
    if (find) setIndicator(find?.color)
  }, [data?.priority])

  const onChange = async (e) => {
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
      return
    }
  }


  const onDelete = async () => {
    // setIsSubmitting(true)
    const res = await fetch(
      `${API_HOST}/todo-items/${data?.id}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    setIsDeleteShow(false)
    // setIsSubmitting(false)
    if (res?.ok) {
      await onUpdateList(data?.id)
      // setIsOpen(false)
      // onHandleSuccess()
      // await onRefresh()
      return
    }
    // setIsOpen(false)
  }


  return (
    <>
      <div className="bg-white mb-4 w-full h-[80px] flex items-center justify-between rounded-[12px] shadow-xl px-6 py-4">
        <div className="flex items-center">
          <input onChange={onChange} defaultChecked={isChecked} data-cy="todo-item-checkbox" className="mr-2 h-[24px] w-[24px] border-[1px] border-[#c7c7c7]" type="checkbox" />
          <div data-cy="todo-item-priority-indicator" className={`${indicator} w-[14px] h-[14px] rounded-full mx-4`}></div>
          <div data-cy="todo-item-title" className={`text-[18px] font-[500] ${isChecked ? 'line-through text-[#888888]' : ''}`}>{data?.title}</div>
          <img className="ml-[27px] cursor-pointer" alt="icon" data-cy="todo-item-edit-button" src={IconPencil} />
        </div>
        <img
          alt="delete"
          src={IconDelete}
          data-cy="todo-item-edit-button"
          className="cursor-pointer"
          onClick={() => setIsDeleteShow(!isDeleteShow)}
        />
      </div>

      {isDeleteShow && (
        <ModalDialog 
          isOpen={isDeleteShow}
          toggleModal={() => setIsDeleteShow(!isDeleteShow)}
          id="ModalDelete"
          dataCy="todo-modal-delete"
        >
          <div>
            <div className="w-full flex items-center justify-center mt-6">
              <img data-cy="modal-delete-icon" alt="icon-alert" src={IconAlert} className="align-middle" />
            </div>
            <div className="flex items-center justify-center mt-8">
              <p data-cy="modal-delete-title" className="text-[18px] text-center">
                Apakah anda yakin menghapus item
                <strong className="ml-1">{`“${data?.title}”`}</strong>
                ?
              </p>
            </div>
            <div className="flex items-center justify-center mt-12">
              <Button className="mx-2" dataCy="modal-delete-cancle-button" buttonType="secondary" value="Batal" onClick={() => setIsDeleteShow(!isDeleteShow)} />
              <Button className="mx-2" dataCy="modal-delete-confirm-button" disabled={false} buttonType="danger" value="Hapus" onClick={onDelete} />
            </div>
          </div>
        </ModalDialog>
      )}
    </>
  )
}

export default TodoItem
