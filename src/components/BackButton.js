import { useNavigate } from 'react-router-dom'
import IconBack from '../statics/icons/icon-back-button.svg'

export const BackButton = ({dataCy, alt}) => {
  const navigate = useNavigate()

  const goBack = () => navigate(-1)

  return (
    <img
      className="w-[32px] h-[32px] mr-[20px] cursor-pointer"
      alt={alt}
      data-cy={dataCy}
      src={IconBack}
      onClick={goBack}
    />
  )
}