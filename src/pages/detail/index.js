import { memo, useCallback, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/Button'
import EmptyState from '../../statics/images/todo-empty-state.png'
import FormEdit from './FormEdit'
import { API_HOST } from '../../constant'
import Sort from './Sort'
import InputDropdown from '../../components/form/InputDropdown'
import ModalDialog from '../../components/Dialog'
import TodoItem from './TodoItem'
// import { SORT_LIST } from '../../constant'

const MemoFormEdit = memo(FormEdit)
const MemoTodoItem = memo(TodoItem)

const Detail = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentData, setCurrentData] = useState(null)
  const [listTodo, setListTodo] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams()

  useEffect(() => {
    document.title = 'Detail | To Do List'
  }, [])

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
        const {todo_items, ...others} = resData
        setCurrentData(others)
        setListTodo(todo_items??[])
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
    // terbaru
    if (id === 1) {
      const update = listTodo?.sort((a, b) => (a.id < b.id) ? 1 : -1)
      setListTodo(update)
      console.log(update)
      return
    }
    // terlama
    if (id === 2) {
      const update = listTodo?.sort((a, b) => (a.id > b.id) ? 1 : -1)
      setListTodo(update)
      console.log(update)
      return
    }
  }

  const onDeleteTodo = (id) => {
    const update = listTodo?.filter((x) => Number(x?.id) !== Number(id))
    setListTodo(update)
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
        {
          listTodo?.length ? (
            <div>
              {
                listTodo?.map((list, index) => {
                  return (
                    <MemoTodoItem
                      data={list}
                      key={index}
                      onUpdateList={onDeleteTodo}
                      onRefresh={fetchData}
                    />
                  )
                })
              }
            </div>
          ) : (
            <div className="flex justify-center" data-cy="todo-empty-state">
              <img
                onClick={toggleModal}
                className="cursor-pointer"
                alt="empty"
                src={EmptyState}
              />
            </div>
          )
        }
      </div>

      {isOpen && (
        <ModalDialog 
          isOpen={isOpen}
          toggleModal={toggleModal}
          dataCy="modal-add-item"
          className="modal-md"
        >
          <ModalForm
            activityId={params?.activityId}
            toggleModal={toggleModal}
            onRefresh={fetchData}
          />
        </ModalDialog>
      )}
    </div>
  )
}

export default Detail

const ModalForm = memo(({toggleModal, activityId, onRefresh}) => {
  const [values, setValues] = useState({
    title: null,
    priority: null
  })

  const onChangeValue = (name, value) => {
    setValues({
      ...values,
      [name]: value
    })
  }

  const onSubmit = async () => {
    const res = await fetch(
      `${API_HOST}/todo-items`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activity_group_id: activityId,
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
            className="px-4 py-2 h-[52px] bg-white appearance-none border-[1px] border-[#E5E5E5] w-full text-strong-gray leading-tight focus:outline-none focus:border-[#555555] rounded"
          />
        </div>
        <div className="mt-4">
          <div className="uppercase font-[600] text-[12px] mb-2">Priority</div>
          <InputDropdown onHandleSelected={onChangeValue} />
        </div>
      </div>
      <div className="flex items-center justify-end mt-4 border-t-[1px] pt-4">
        <Button disabled={!!!values?.title || !!!values?.priority} onClick={onSubmit} dataCy="modal-add-save-button" value="Simpan" />
      </div>
    </div>
  )
})