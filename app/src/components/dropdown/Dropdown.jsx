import { BsThreeDotsVertical } from 'react-icons/bs'
import "./style.css"
import classNames from 'classnames'

const Dropdown = ({ type = "card", children }) => {

    const className = classNames({
            "top-1 right-1 absolute": type === "card",
            "top-4 md:top-auto right-2 absolute": type === "table",
        })

    const classNameContent = classNames("border border-primary pr-2",{
        "dropdown-content bg-slate-100 rounded -translate-x-1 translate-y-1": type === "card",
        "dropdown-content bg-slate-100 rounded -translate-x-1 translate-y-2": type === "table",
    })

    return (
        <div className={className}>
            <div className="dropdown dropdown-left dropdown-end">
                <label
                    tabIndex={0}
                    className="btn btn-circle btn-sm bg-transparent border-none hover:bg-slate-200"
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


