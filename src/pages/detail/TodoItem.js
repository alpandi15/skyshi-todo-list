import { useEffect, useState, memo } from 'react'
import IconDelete from '../../statics/icons/icon-delete.svg'
import IconPencil from '../../statics/icons/icon-pencil.svg'
import IconAlert from '../../statics/icons/icon-alert.svg'
import { LIST_PRIORITY } from '../../constant'
import { API_HOST } from '../../constant'
import ModalDialog from '../../components/Dialog'
import Button from '../../components/Button'
import InputDropdown from '../../components/form/InputDropdown'

const TodoItem = ({data, onUpdateList, onRefresh}) => {
  const [isChecked, setIsChecked] = useState(!!!data?.is_active)
  const [indicator, setIndicator] = useState(null)
  const [isDeleteShow, setIsDeleteShow] = useState(false);
  const [isEditShow, setIsEditShow] = useState(false);

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
    if (res?.ok) {
      await onUpdateList(data?.id)
      return
    }
  }


  return (
    <>
      <div className="bg-white mb-4 w-full h-[80px] flex items-center justify-between rounded-[12px] shadow-xl px-6 py-4">
        <div className="flex items-center">
          <input onChange={onChange} defaultChecked={isChecked} data-cy="todo-item-checkbox" className="mr-2 h-[24px] w-[24px] border-[1px] border-[#c7c7c7]" type="checkbox" />
          <div data-cy="todo-item-priority-indicator" className={`${indicator} w-[14px] h-[14px] rounded-full mx-4`}></div>
          <div data-cy="todo-item-title" className={`text-[18px] font-[500] ${isChecked ? 'line-through text-[#888888]' : ''}`}>{data?.title}</div>
          <img
            className="ml-[27px] cursor-pointer"
            alt="icon"
            data-cy="todo-item-edit-button"
            src={IconPencil}
            onClick={() => setIsEditShow(!isEditShow)}
          />
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
      {isEditShow && (
        <ModalDialog 
          isOpen={isEditShow}
          toggleModal={() => setIsEditShow(!isEditShow)}
          dataCy="modal-edit-item"
          className="modal-md"
        >
          <ModalEditForm
            data={data}
            toggleModal={() => setIsEditShow(!isEditShow)}
            onRefresh={onRefresh}
          />
        </ModalDialog>
      )}
    </>
  )
}

export default TodoItem


const ModalEditForm = memo(({data, toggleModal, onRefresh}) => {
  const [values, setValues] = useState({
    title: data?.title,
    priority: data?.priority
  })

  const onChangeValue = (name, value) => {
    setValues({
      ...values,
      [name]: value
    })
  }

  const onSubmit = async () => {
    const res = await fetch(
      `${API_HOST}/todo-items/${data?.id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          is_active: data?.is_active,
          ...values
        })
      }
    )
    if (res?.ok) {
      await onRefresh()
      toggleModal()
      return
    }
    alert('Error')
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-4 pb-3 border-b-[1px]">
        <div className="text-[18px] font-[600]" data-cy="modal-add-title">Tambah List Item</div>
        <div>
          <i data-cy="modal-add-close-button" className="material-icons text-[#A4A4A4] cursor-pointer" onClick={toggleModal}>close</i>
        </div>
      </div>
      <div className="py-4 px-4">
        <div className="mt-4">
          <div className="uppercase font-[600] text-[12px] mb-2">Nama List Item</div>
          <input
            name="title"
            onChange={(e) => onChangeValue(e.target.name, e.target.value)}
            defaultValue={values?.title}
            className="px-4 py-2 h-[52px] bg-white appearance-none border-[1px] border-[#E5E5E5] w-full text-strong-gray leading-tight focus:outline-none focus:border-[#555555] rounded"
          />
        </div>
        <div className="mt-4">
          <div className="uppercase font-[600] text-[12px] mb-2">Priority</div>
          <InputDropdown onHandleSelected={onChangeValue} defaultValue={values?.priority} />
        </div>
      </div>
      <div className="flex items-center justify-end mt-4 border-t-[1px] pt-4">
        <Button disabled={!!!values?.title || !!!values?.priority} onClick={onSubmit} dataCy="modal-add-save-button" value="Simpan" />
      </div>
    </div>
  )
})