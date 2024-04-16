import classNames from "classnames";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import "./style.css";

const Dropdown = ({ type = "card", children }) => {
    const className = classNames({
        "top-1 right-1 absolute": type === "card",
        "top-4 md:top-auto right-2 absolute": type === "table",
    });

    const classNameContent = classNames(
        "border border-primary pr-2 dropdown-content bg-slate-100 rounded-lg z-50",
        {
            "-translate-x-1 translate-y-1": type === "card",
            "-translate-x-1 -translate-y-10": type === "table",
            "-translate-x-2 -translate-y-1":
                type === "button" || type === "opas",
        }
    );

    if (children && Object.values(children).every((elem) => elem === false))
        return null;

    if (type === "button")
        return (
            <div className="dropdown dropdown-left">
                <label tabIndex={0} className="">
                    <button className="scaledown rounded-full group bg-action hover:bg-primary h-10 w-10 flex items-center justify-center">
                        <BsThreeDots
                            size={26}
                            className="text-white group-hover:text-white"
                        />
                    </button>
                </label>
                <div tabIndex={0} className={classNameContent}>
                    {children}
                </div>
            </div>
        );

    if (type === "opas")
        return (
            <div className="dropdown dropdown-left">
                <label tabIndex={0}>
                    <button className="btn btn-circle btn-outline btn-sm btn-primary hover:bg-primary !h-10 !w-10">
                        <BsThreeDots size={20} />
                    </button>
                </label>
                <div tabIndex={0} className={classNameContent}>
                    {children}
                </div>
            </div>
        );

    return (
        <div className={className}>
            <div className="dropdown dropdown-left dropdown-start">
                <label
                    tabIndex={0}
                    className="btn btn-circle btn-sm bg-transparent border-none hover:bg-slate-200 shadow-none"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <BsThreeDotsVertical className="text-primary text-2xl" />
                </label>
                <div
                    tabIndex={0}
                    className={classNameContent}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
