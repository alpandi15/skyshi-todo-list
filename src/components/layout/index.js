import {Outlet} from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <header
        className="h-[105px] bg-[#16ABF8] flex items-center justify-center"
      >
        <div data-cy="header-background" className="max-w-screen-lg w-full">
          <div data-cy="header-title" className="uppercase text-[24px] font-bold text-white">To do list app</div>
        </div>
      </header>
      <div className="flex justify-center mt-[43px]">
        <div className="max-w-screen-lg w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout