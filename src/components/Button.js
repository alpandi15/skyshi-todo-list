const Button = ({
  value,
  dataCy,
  leftIconName,
  type="button",
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      data-cy={dataCy}
    >
      <div className="bg-[#16ABF8] h-[54px] rounded-[45px] px-[14px] py-[13px] flex items-center">
        {leftIconName ? (
          <i className="material-icons text-[24px] text-white">{leftIconName}</i>
        ) : null}
        <div className="text-white font-[600] text-[18px] ml-2">{value}</div>
      </div>
    </button>
  )
}

export default Button