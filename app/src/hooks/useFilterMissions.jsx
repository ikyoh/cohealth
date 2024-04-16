import { useState } from "react";
import { LuSettings2 } from "react-icons/lu";

export const useFilterMissions = (props) => {
    const [filters, setFilters] = useState({
        status: "en cours",
    });

    const handleChangeInput = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleChangeCheckbox = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.checked });
    };

    return {
        filters,
        filter: (
            <div className="dropdown dropdown-left">
                <label
                    tabIndex={0}
                    className="hover:cursor-pointer scaledown rounded-full h-10 w-10 flex items-center justify-center bg-action hover:bg-primary"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <LuSettings2 size={26} className="text-white" />
                </label>
                <div
                    tabIndex={0}
                    className="dropdown-content menu p-2 border border-primary bg-slate-100 rounded w-40"
                >
                    <p className="text-sm">Statut</p>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-3">
                            <input
                                type="radio"
                                name="status"
                                value="en cours"
                                className="radio checked:bg-primary"
                                checked={filters.status === "en cours"}
                                onChange={handleChangeInput}
                            />
                            <span className="label-text">En cours</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-3">
                            <input
                                type="radio"
                                name="status"
                                value="archivé"
                                className={`radio checked:bg-primary`}
                                checked={filters.status === "archivé"}
                                onChange={handleChangeInput}
                            />
                            <span className="label-text">Archivé</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-3">
                            <input
                                type="radio"
                                name="status"
                                value="annulé"
                                className={`radio checked:bg-primary`}
                                checked={filters.status === "annulé"}
                                onChange={handleChangeInput}
                            />
                            <span className="label-text">Annulé</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-3">
                            <input
                                type="radio"
                                name="status"
                                value="all"
                                className="radio checked:bg-primary"
                                checked={filters.status === "all"}
                                onChange={handleChangeInput}
                            />
                            <span className="label-text">Tous</span>
                        </label>
                    </div>
                </div>
            </div>
        ),
    };
};
