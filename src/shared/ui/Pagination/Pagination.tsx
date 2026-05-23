import { getVisiblePages } from '@/shared/ui/Pagination/lib/getVisiblePages';
import ForwardArrow from '@/assets/icons/forward-arrow.svg?react'
import { usePage } from "./usePage";

import './Pagination.css'

interface PaginationParams {
    limit: number,
    total: number
}

function Pagination({ limit, total }: PaginationParams) {
    const { page, setPage } = usePage();

    return <div className="pagination">
        <button
            className="pagination__turn-page pagination__turn-page_prev"
            onClick={() => setPage(prev => prev - 1)}
            disabled={page === 1}
        >
            <ForwardArrow className="pagination__turn-page-arrow pagination__turn-page-arrow_left" />
        </button>

        {getVisiblePages(page, Math.ceil(total / limit)).map((item, idx) => (
            item === 'ellipsis'
                ? <span key={`ellipsis-${idx}`} className="pagination__page-index pagination__page-index_ellipsis">...</span>
                : <span
                    key={item}
                    className={"pagination__page-index " + (item === page ? "pagination__page-index_current" : "")}
                    onClick={() => setPage(item)}
                >{item}</span>
        ))}

        <button
            className="pagination__turn-page pagination__turn-page_next"
            onClick={() => setPage(prev => prev + 1)}
            disabled={page === Math.ceil(total / limit)}
        >
            <ForwardArrow className="pagination__turn-page-arrow" />
        </button>
    </div>
}

export default Pagination