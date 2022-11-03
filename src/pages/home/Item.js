import {useState} from 'react'
import moment from 'moment'
import 'moment/locale/id'
import ModalComponent from '../../components/Modal'
import IconDelete from '../../statics/icons/icon-delete.svg'

const ItemList = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div
        data-cy="activity-item"
        className="relative px-[27px] py-[22px] shadow-[0px_4px_8px_rgba(0,0,0,0.15)] w-full bg-white rounded-[12px] h-[234px]"
      >
        <div className="h-[158px] cursor-pointer">
          <h4 data-cy='activity-item-title' className="text-[18px] font-[700]">{data?.title}</h4>
        </div>
        <div className="absolute b-0 w-[calc(100%-54px)] flex items-center justify-between">
          <span data-cy="activity-item-date" className="text-[#888]">{moment(data?.created_at).format('DD MMMM YYYY')}</span>
          <img onClick={toggleModal} alt="delete" src={IconDelete} data-cy="activity-item-delete-button" className="cursor-pointer" />
        </div>
      </div>

      {isOpen && (
        <ModalComponent 
          isOpen={isOpen}
          toggleModal={toggleModal}
          id="ModalDelete"
          dataCy="todo-modal-delete"
        >
          <div>{data?.title}</div>
        </ModalComponent>
      )}
    </>
  )
}

export default ItemList