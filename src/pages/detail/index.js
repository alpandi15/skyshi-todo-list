import { useParams } from "react-router-dom"
const Detail = () => {
  const params = useParams()
  console.log('PARAMS ', params)
  return (
    <div>Detail</div>
  )
}

export default Detail