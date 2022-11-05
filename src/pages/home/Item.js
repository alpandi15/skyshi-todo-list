import {useState} from 'react'
import moment from 'moment'
import 'moment/locale/id'
import {useNavigate} from 'react-router-dom'
// import ModalComponent from '../../components/Modal'
import IconDelete from '../../statics/icons/icon-delete.svg'
import IconAlert from '../../statics/icons/icon-alert.svg'
import Button from '../../components/Button'
import { API_HOST } from '../../constant'
import ModalDialog from '../../components/Dialog'

const ItemList = ({data, onRefresh, onHandleSuccess}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  function toggleModal() {
    setIsOpen(!isOpen);
    setIsSubmitting(false)
  }

  const deleteActivity = async () => {
    setIsSubmitting(true)
    const res = await fetch(
      `${API_HOST}/activity-groups/${data?.id}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    setIsSubmitting(false)
    if (res?.ok) {
      setIsOpen(false)
      onHandleSuccess()
      await onRefresh()
      return
    }
    setIsOpen(false)
  }

  return (
    <>
      <div
        data-cy="activity-item"
        className="card-item"
      >
        <div className="h-[158px] cursor-pointer" onClick={() => navigate(`/detail/${data?.id}`)}>
          <h4 data-cy='activity-item-title' className="text-[18px] font-[700]">{data?.title}</h4>
        </div>
        <div className="absolute b-0 w-[calc(100%-54px)] flex items-center justify-between">
          <span data-cy="activity-item-date" className="text-[#888]">{moment(data?.created_at).format('DD MMMM YYYY')}</span>
          <img onClick={toggleModal} alt="delete" src={IconDelete} data-cy="activity-item-delete-button" className="cursor-pointer" />
        </div>
      </div>

      {isOpen && (
        <ModalDialog 
          isOpen={isOpen}
          toggleModal={toggleModal}
          id="ModalDelete"
          dataCy="todo-modal-delete"
        >
          <div>
            <div className="w-full flex items-center justify-center mt-6">
              <img data-cy="modal-delete-icon" alt="icon-alert" src={IconAlert} className="align-middle" />
            </div>
            <div className="flex items-center justify-center mt-8">
              <p data-cy="modal-delete-title" className="text-[18px] text-center">
                Apakah anda yakin menghapus activity
                <strong className="ml-1">{`“${data?.title}”`}</strong>
                ?
              </p>
            </div>
            <div className="flex items-center justify-center mt-12">
              <Button className="mx-2" dataCy="modal-delete-cancle-button" buttonType="secondary" value="Batal" onClick={toggleModal} />
              <Button className="mx-2" dataCy="modal-delete-confirm-button" disabled={isSubmitting} buttonType="danger" value="Hapus" onClick={deleteActivity} />
            </div>
          </div>
        </ModalDialog>
      )}
    </>
  )
}

export default ItemList