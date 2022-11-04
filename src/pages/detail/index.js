import { useParams } from 'react-router-dom'
import Button from '../../components/Button'
import { BackButton } from '../../components/BackButton'

const Detail = () => {
  const params = useParams()
  console.log('PARAMS ', params)
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BackButton alt="icon-back-button" dataCy="todo-back-button" />
          <div data-cy="activity-title" className="font-[700] text-[36px]">New Activity</div>
        </div>
        <div>
          <Button leftIconName="add" dataCy='activity-add-button' value="Tambah" />
        </div>
      </div>
    </div>
  )
}

export default Detail