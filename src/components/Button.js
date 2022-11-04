const Button = ({
  value,
  dataCy,
  leftIconName,
  type="button",
  buttonType = "primary",
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      data-cy={dataCy}
      className={
        buttonType === 'primary' ? 'btn btn-primary'
          : buttonType === 'danger' ? 'btn btn-danger'
          : buttonType === 'secondary' ? 'btn btn-secondary'
          : 'btn'
        }
    >
      {leftIconName ? (
        <i className="material-icons text-[24px] text-white">{leftIconName}</i>
      ) : null}
      <span className={`text-white font-[600] text-[18px] ${leftIconName ? 'ml-2' : ''}`}>{value}</span>
    </button>
  )
}

export default Button