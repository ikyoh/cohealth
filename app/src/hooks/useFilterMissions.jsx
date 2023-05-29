import { useState, useCallback } from 'react';
import { GoSettings } from 'react-icons/go';

export const useFilterMission = (props) => {

    const [filters, setFilters] = useState({
        status: "en cours"
    })
    //useState(props ? props : "")

    const handleChangeInput = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const handleChangeCheckbox = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.checked })
    }

    return {
        filters,
        filter:
            <div className="dropdown dropdown-left">
                <label
                    tabIndex={0}
                    className="hover:cursor-pointer scaledown rounded-full h-12 w-12 flex items-center justify-center bg-transparent hover:bg-slate-200 border mr-5"
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <GoSettings size={30} className="text-primary" />
                </label>
                <div tabIndex={0} className="dropdown-content menu p-2 border border-primary bg-slate-100 rounded w-32">
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">En cours</span>
                            <input
                                type="radio"
                                name="status"
                                value="en cours"
                                className="radio checked:bg-primary"
                                checked={filters.status === "en cours"}
                                onChange={handleChangeInput}
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Archivé</span>
                            <input
                                type="radio"
                                name="status"
                                value="archivé"
                                className={`radio checked:bg-primary`}
                                checked={filters.status === "archivé"}
                                onChange={handleChangeInput}
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Annulé</span>
                            <input
                                type="radio"
                                name="status"
                                value="annulé"
                                className={`radio checked:bg-primary`}
                                checked={filters.status === "annulé"}
                                onChange={handleChangeInput}
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Suspendu</span>
                            <input
                                type="radio"
                                name="status"
                                value="suspendu"
                                className={`radio checked:bg-primary`}
                                checked={filters.status === "suspendu"}
                                onChange={handleChangeInput}
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Tous</span>
                            <input
                                type="radio"
                                name="status"
                                value="all"
                                className="radio checked:bg-primary"
                                checked={filters.status === "all"}
                                onChange={handleChangeInput}
                            />
                        </label>
                    </div>
                </div>
            </div>
    }
}