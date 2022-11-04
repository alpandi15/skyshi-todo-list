import { memo, useCallback, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/Button'
import EmptyState from '../../statics/images/todo-empty-state.png'
import FormEdit from './FormEdit'
import { API_HOST } from '../../constant'
import ModalComponent from '../../components/Modal'
import Sort from './Sort'

const MemoFormEdit = memo(FormEdit)

const Detail = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentData, setCurrentData] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams()

  const fetchData = useCallback(async () => {
    if (params?.activityId) {
      setIsLoading(true)
      const res = await fetch(
        `${API_HOST}/activity-groups/${params?.activityId}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      setIsLoading(false)
      if (res?.ok) {
        const resData = await res.json()
        setCurrentData(resData)
        console.log(resData)
        return
      }
    }
  }, [params?.activityId])

  useEffect(() => {
    (async () => {
      await fetchData()
    })()
  }, [fetchData])

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const onSorted = (id) => {
    console.log(id)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <MemoFormEdit data={currentData} />
        <div className="flex items-center">
          <Sort onSorted={onSorted} />
          <Button leftIconName="add" dataCy='activity-add-button' value="Tambah" onClick={toggleModal} />
        </div>
      </div>
      <div className="mt-16 mb-8">
        <div className="flex justify-center" data-cy="todo-empty-state">
          <img
            onClick={toggleModal}
            className="cursor-pointer"
            alt="empty"
            src={EmptyState}
          />
        </div>
      </div>

      {isOpen && (
        <ModalComponent 
          isOpen={isOpen}
          toggleModal={toggleModal}
          id="ModalForm"
          dataCy="todo-modal-delete"
        >
          <div className="w-[750px]">
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
                  className="px-4 py-2 h-[52px] bg-white appearance-none border-[1px] border-[#E5E5E5] w-full text-strong-gray leading-tight focus:outline-none focus:border-[#555555] rounded"
                />
              </div>
              <div className="mt-4">
                <div className="uppercase font-[600] text-[12px] mb-2">Priority</div>
                <input
                  className="px-4 py-2 h-[52px] bg-white appearance-none border-[1px] border-[#E5E5E5] w-full text-strong-gray leading-tight focus:outline-none focus:border-[#555555] rounded"
                />
              </div>
            </div>
            <div className="flex items-center justify-end mt-12">
              <Button dataCy="modal-add-save-button" value="Simpan" />
            </div>
          </div>
        </ModalComponent>
      )}
    </div>
  )
}

export default Detail