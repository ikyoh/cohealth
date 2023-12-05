import { useState, useCallback } from 'react'
import { GoSettings } from 'react-icons/go'
import { useGetCurrentAccount } from '../queryHooks/useAccount'
import { useQueryClient } from '@tanstack/react-query'
import Loader from '../components/Loader'


export const useFilterMandates = (props) => {

    //const { data: account, isLoading: isLoadingAccount } = useGetCurrentAccount()

    const queryClient = useQueryClient()
    const account = queryClient.getQueryData(['account'])

    const statusFilter = () => {

        if (account.roles.includes('ROLE_DOCTOR')) return 'édité'
        if (account.roles.includes('ROLE_NURSE')) return 'attribué'
        if (account.roles.includes('ROLE_COORDINATOR')) return 'édité'
        return 'all'

    }

    const [filters, setFilters] = useState({ status: statusFilter() })

    const handleChangeInput = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const handleChangeCheckbox = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.checked })
    }

    return {
        filters,
        filter:
            <div className="dropdown dropdown-left z-50">
                <label
                    tabIndex={0}
                    className="hover:cursor-pointer scaledown rounded-full h-12 w-12 flex items-center justify-center bg-transparent hover:bg-slate-200 border"
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <GoSettings size={30} className="text-primary" />
                </label>
                <div tabIndex={0} className="dropdown-content menu p-2 border border-primary bg-slate-100 rounded w-40">
                    <p className='text-sm'>
                        Statut
                    </p>
                    {(account.roles.includes('ROLE_COORDINATOR') || account.roles.includes('ROLE_DOCTOR')) &&
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-3">
                                <input
                                    type="radio"
                                    name="status"
                                    value="édité"
                                    className="radio checked:bg-primary"
                                    checked={filters.status === "édité"}
                                    onChange={handleChangeInput}
                                />
                                <span className="label-text">
                                    {account.roles.includes('ROLE_COORDINATOR') && "Édité"}
                                    {account.roles.includes('ROLE_DOCTOR') && "En attente"}
                                </span>
                            </label>
                        </div>
                    }
                    {account.roles.includes('ROLE_COORDINATOR') &&
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-3">
                                <input
                                    type="radio"
                                    name="status"
                                    value="attribué"
                                    className="radio checked:bg-primary"
                                    checked={filters.status === "attribué"}
                                    onChange={handleChangeInput}
                                />
                                <span className="label-text">Attribué</span>
                            </label>
                        </div>
                    }
                    {account.roles.includes('ROLE_NURSE') &&
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-3">
                                <input
                                    type="radio"
                                    name="status"
                                    value="attribué"
                                    className="radio checked:bg-primary"
                                    checked={filters.status === "attribué"}
                                    onChange={handleChangeInput}
                                />
                                <span className="label-text">A valider</span>
                            </label>
                        </div>
                    }
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-3">
                            <input
                                type="radio"
                                name="status"
                                value="accepté"
                                className={`radio checked:bg-primary`}
                                checked={filters.status === "accepté"}
                                onChange={handleChangeInput}
                            />
                            <span className="label-text">Accepté</span>
                        </label>
                    </div>
                    {account.roles.includes('ROLE_COORDINATOR') &&
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-3">
                                <input
                                    type="radio"
                                    name="status"
                                    value="refusé"
                                    className={`radio checked:bg-primary`}
                                    checked={filters.status === "refusé"}
                                    onChange={handleChangeInput}
                                />
                                <span className="label-text">Refusé</span>
                            </label>
                        </div>
                    }
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
                    {account.roles.includes('ROLE_COORDINATOR') &&
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
                    }
                </div>
            </div>
    }
}