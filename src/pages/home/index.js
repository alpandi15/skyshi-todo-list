import { useCallback, useEffect, useState } from 'react'
import Button from '../../components/Button'
import {API_HOST, EMAIL} from '../../constant'
import ItemList from './Item'
import IconIcon from '../../statics/icons/icon-information.svg'
import ModalDialog from '../../components/Dialog'

const Home = () => {
  // const [isLoading, setIsLoading] = useState(true)
  const [lists, setLists] = useState([])
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);

  useEffect(() => {
    document.title = 'Dashboard | To Do List'
  }, [])

  const fetchData = useCallback(async () => {
    // setIsLoading(true)
    const res = await fetch(
      `${API_HOST}/activity-groups?email=${EMAIL}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    // setIsLoading(false)
    if (res?.ok) {
      const resData = await res.json()
      setLists(resData?.data)
      return
    }
  }, [])

  useEffect(() => {
    (async () => {
      await fetchData()
    })()
  }, [fetchData])

  const addActivity = async () => {
    const res = await fetch(
      `${API_HOST}/activity-groups`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: EMAIL,
          title: 'New Activity'
        })
      }
    )
    if (res?.ok) {
      await fetchData()
      return
    }
  }

  function toggleModalSuccess() {
    setIsOpenSuccess(!isOpenSuccess);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div data-cy="activity-title" className="font-[700] text-[36px]">Activity</div>
        <div>
          <Button leftIconName="add" dataCy='activity-add-button' value="Tambah" onClick={addActivity} />
        </div>
      </div>
      <div className="mt-16 mb-8">
        {lists?.length ? (
          <div className="grid grid-cols-4 gap-6">
            {lists?.map((data, index) => (
              <ItemList
                key={index}
                data={data}
                onRefresh={fetchData}
                onHandleSuccess={toggleModalSuccess}
              />
            ))}
          </div>
        ) : null}
        {lists?.length === 0 ? (
          <div className="flex justify-center">
            <img onClick={addActivity} className="w-[767px] h-[490px] cursor-pointer" data-cy="activity-empty-state" alt="activity-empty-state" src="/images/activity-empty-state.png" />
          </div>
        ) : null}
      </div>

      {isOpenSuccess && (
        <ModalDialog 
          isOpen={isOpenSuccess}
          toggleModal={toggleModalSuccess}
          id="ModalInformation"
          dataCy="todo-modal-information"
        >
          <div className="w-full">
            <div className="flex items-center">
              <img data-cy="modal-information-icon" alt="icon-alert" src={IconIcon} className="align-middle" />
              <p data-cy="modal-information-title" className="font-[500] text-[14px] text-center ml-[13px]">
                Activity berhasil dihapus
              </p>
            </div>
          </div>
        </ModalDialog>
      )}
    </div>
  )
}

export default Home