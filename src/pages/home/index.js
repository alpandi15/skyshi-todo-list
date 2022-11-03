import { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import Modal from 'react-modal'
import Button from '../../components/Button'
import IconDelete from '../../statics/icons/icon-delete.svg'
import {API_HOST, EMAIL} from '../../constant'

const Home = () => {
  const [lists, setLists] = useState([])
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const fetchData = useCallback(async () => {
    const res = await fetch(
      `${API_HOST}/activity-groups?email=${EMAIL}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    if (res?.ok) {
      const resData = await res.json()
      console.log(resData);
      setLists(resData?.data)
      return
    }
    console.log('ERROR ', res)
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
      console.log(res);
      await fetchData()
      return
    }
    console.log('ERROR ', res)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div data-cy="activity-title" className="font-[700] text-[36px]">Activity</div>
        <div>
          <Button leftIconName="add" dataCy='activify-add-button' value="Tambah" onClick={addActivity} />
        </div>
      </div>
      <div className="mt-16 mb-8">
        <div className="grid grid-cols-4 gap-6">
          {lists?.map((data, index) => {
            return (
              <div
                data-cy="activity-item"
                className="relative px-[27px] py-[22px] shadow-[0px_4px_8px_rgba(0,0,0,0.15)] w-full bg-white rounded-[12px] h-[234px]"
                key={index}
              >
                <div className="h-[158px] cursor-pointer">
                  <h4 data-cy='activity-item-title' className="text-[18px] font-[700]">{data?.title}</h4>
                </div>
                <div className="absolute b-0 w-[calc(100%-54px)] flex items-center justify-between">
                  <span data-cy="activity-item-date" className="text-[#888]">{moment(data?.created_at).format('DD MMMM YYYY')}</span>
                  <img onClick={toggleModal} alt="delete" src={IconDelete} data-cy="activity-item-delete-button" className="cursor-pointer" />
                </div>
              </div>
            )
          })}
        </div>
        {lists?.total === 0 ? (
          <div className="flex justify-center">
            <img className="w-[767px] h-[490px] cursor-pointer" data-cy="activity-empty-state" alt="activity-empty-state" src="/images/activity-empty-state.png" />
          </div>
        ) : null}
      </div>
      <Modal 
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="modal-content"
        overlayClassName="modal-overlay"
        closeTimeoutMS={300}
      >
        <div>Data Modal</div>
      </Modal>
    </div>
  )
}

export default Home