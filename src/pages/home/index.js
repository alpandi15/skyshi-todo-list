import { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import Button from '../../components/Button'
import IconDelete from '../../statics/icons/icon-delete.svg'
import {API_HOST, EMAIL} from '../../constant'
import ItemList from './Item'

const Home = () => {
  const [lists, setLists] = useState([])
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
          <Button leftIconName="add" dataCy='activity-add-button' value="Tambah" onClick={addActivity} />
        </div>
      </div>
      <div className="mt-16 mb-8">
        <div className="grid grid-cols-4 gap-6">
          {lists?.map((data, index) => <ItemList key={index} data={data} />)}
        </div>
        {lists?.total === 0 ? (
          <div className="flex justify-center">
            <img className="w-[767px] h-[490px] cursor-pointer" data-cy="activity-empty-state" alt="activity-empty-state" src="/images/activity-empty-state.png" />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Home