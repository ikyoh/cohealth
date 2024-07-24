import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { itemsPerPage } from "../../config/api.config";

const Pagination = ({ totalItems = 5, page, setPage }) => {
    const pageCount = Math.ceil(totalItems / itemsPerPage);

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    };

    if (pageCount <= 1) return null;
    else
        return (
            <div className="bg-slate-100 w-full md:pr-5">
                <ReactPaginate
                    forcePage={page - 1}
                    breakLabel="..."
                    nextLabel={<MdKeyboardArrowRight />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel={<MdKeyboardArrowLeft />}
                    renderOnZeroPageCount={null}
                    breakClassName={"w-8 h-8 text-center block hover:bg-white"}
                    marginPagesDisplayed={2}
                    containerClassName={
                        "flex justify-center md:justify-end gap-2 text-primary py-6"
                    }
                    pageLinkClassName={
                        "flex justify-center items-center w-8 h-8 text-center block hover:bg-white transition ease-in-out active:scale-[0.9] duration-100"
                    }
                    activeClassName={"border-primary/60 border-b-4"}
                    previousClassName={
                        "flex items-center text-3xl hover:bg-white block h-8 w-8 transition ease-in-out active:scale-[0.9] duration-100"
                    }
                    nextClassName={
                        "flex items-center text-3xl hover:bg-white block h-8 w-8 transition ease-in-out active:scale-[0.9] duration-100"
                    }
                />
            </div>
        );
};

export default Pagination;
