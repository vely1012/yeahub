export function getVisiblePages(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [1];

    if (currentPage <= 3) {
        for (let i = 2; i <= 4; i++) {
            pages.push(i);
        }
        pages.push('ellipsis');
    }
    else if (currentPage >= totalPages - 2) {
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
            if (i !== 1) pages.push(i);
        }
    }
    else {
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
    }

    if (pages[pages.length - 1] === totalPages) {
        return pages;
    }
    return [...pages, totalPages];
};