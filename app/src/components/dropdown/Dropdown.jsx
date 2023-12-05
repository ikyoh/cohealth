import { BsThreeDotsVertical, BsThreeDots } from 'react-icons/bs'
import "./style.css"
import classNames from 'classnames'

const Dropdown = ({ type = "card", children }) => {

    const className = classNames({
        "top-1 right-1 absolute": type === "card",
        "top-4 md:top-auto right-2 absolute": type === "table",
    })

    const classNameContent = classNames("border border-primary pr-2 dropdown-content bg-slate-100 rounded z-50", {
        "-translate-x-1 translate-y-1": type === "card",
        "-translate-x-1 translate-y-2": type === "table",
        "-translate-x-2 translate-y-1": type === "button" || type === "opas",
    })

    
    if (children && Object.values(children).every((elem) => elem === false)) return null

    if (type === "button") return (
        <div className="dropdown dropdown-left">
            <label tabIndex={0} className=''>
                <button className="btn btn-circle btn-primary hover:bg-primary">
                    <BsThreeDots size={30} />
                </button>
            </label>
            <div tabIndex={0} className={classNameContent}>
                {children}
            </div>
        </div>
    )

    if (type === "opas") return (
        <div className="dropdown dropdown-left">
            <label tabIndex={0}>
                <button className="btn btn-circle btn-outline btn-sm btn-primary hover:bg-primary m-2 !h-10 !w-10">
                    <BsThreeDots size={20} />
                </button>
            </label>
            <div tabIndex={0} className={classNameContent}>
                {children}
            </div>
        </div>
    )


    return (
        <div className={className}>
            <div className="dropdown dropdown-left dropdown-end">
                <label
                    tabIndex={0}
                    className="btn btn-circle btn-sm bg-transparent border-none hover:bg-slate-200 shadow-none"
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <BsThreeDotsVertical className='text-primary text-2xl' />
                </label>
                <div tabIndex={0} className={classNameContent}
                    onClick={(e) => { e.stopPropagation() }}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Dropdown


