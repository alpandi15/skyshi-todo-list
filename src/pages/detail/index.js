import { memo, useCallback, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/Button'
import EmptyState from '../../statics/images/todo-empty-state.png'
import FormEdit from './FormEdit'
import { API_HOST } from '../../constant'
import Sort from './Sort'

const MemoFormEdit = memo(FormEdit)

const Detail = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentData, setCurrentData] = useState(null)
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

  return (
    <div>
      <div className="flex items-center justify-between">
        <MemoFormEdit data={currentData} />
        <div className="flex items-center">
          <Sort />
          <Button leftIconName="add" dataCy='activity-add-button' value="Tambah" />
        </div>
      </div>
      <div className="mt-16 mb-8">
        <div className="flex justify-center" data-cy="todo-empty-state">
          <img
            className="cursor-pointer"
            alt="empty"
            src={EmptyState}
          />
        </div>
      </div>
    </div>
  )
}

export default Detail