import { type IQuestion, useGetQuestionsQuery } from "@/shared/api/baseApi";
import { useEffect, useState, useMemo } from 'react';
import type { To, NavigateOptions } from 'react-router-dom';
import { type QuestionsQueue } from "../ExactQuestionPage";


export interface QueueNavigationSet {
    nextArgs: [To, NavigateOptions] | null;
    prevArgs: [To, NavigateOptions] | null;
    isNextPageLoading: boolean;
    isPrevPageLoading: boolean;
    isNextDisabled: boolean;
    isPrevDisabled: boolean;
}

export default function useQueueNavigation(
    initialQueue: QuestionsQueue | undefined,
    currentSlug: string | undefined
): QueueNavigationSet {
    const [queue, setQueue] = useState<QuestionsQueue | undefined>(initialQueue);

    // Получаем плоский массив всех slug'ов для навигации
    const allSlugs = useMemo(() => {
        if (!queue) return [];
        const result: string[] = [];
        for (let page = 1; page <= queue.pagination.totalPages; page++) {
            const pageSlugs = queue.slugsMap.get(page) || [];
            result.push(...pageSlugs);
        }
        return result;
    }, [queue?.slugsMap, queue?.pagination.totalPages]);

    // Запрос для подгрузки следующей страницы
    const nextPage = (queue?.pagination.page ?? 1) + 1;
    const { data: nextPageData, isLoading: isLoadingNext } = useGetQuestionsQuery(
        {
            titleOrDescription: queue?.titleOrDescription,
            page: nextPage,
            limit: queue?.pagination.limit ?? 10,
            ...queue?.filters,
        },
        {
            skip: !queue || queue.pagination.page >= queue.pagination.totalPages || queue?.slugsMap.has(nextPage)
        }
    );

    // Запрос для подгрузки предыдущей страницы
    const prevPage = (queue?.pagination.page ?? 1) - 1;
    const { data: prevPageData, isLoading: isLoadingPrev } = useGetQuestionsQuery(
        {
            titleOrDescription: queue?.titleOrDescription,
            page: prevPage,
            limit: queue?.pagination.limit ?? 10,
            ...queue?.filters,
        },
        {
            skip: !queue || queue.pagination.page <= 1 || queue?.slugsMap.has(prevPage)
        }
    );

    // Добавляем следующую страницу в Map
    useEffect(() => {
        if (nextPageData?.data && queue && !queue.slugsMap.has(nextPage)) {
            const newSlugs = nextPageData.data.map((q: IQuestion) => q.slug);
            setQueue(prev => prev ? {
                ...prev,
                slugsMap: new Map(prev.slugsMap).set(nextPage, newSlugs),
            } : prev);
        }
    }, [nextPageData]);

    // Добавляем предыдущую страницу в Map
    useEffect(() => {
        if (prevPageData?.data && queue && !queue.slugsMap.has(prevPage)) {
            const newSlugs = prevPageData.data.map((q: IQuestion) => q.slug);
            setQueue(prev => prev ? {
                ...prev,
                slugsMap: new Map(prev.slugsMap).set(prevPage, newSlugs),
                currentIndex: prev.currentIndex + newSlugs.length,
                pagination: {
                    ...prev.pagination,
                    page: prevPage,
                },
            } : prev);
        }
    }, [prevPageData]);

    // Синхронизируем текущую позицию со slug из URL
    useEffect(() => {
        if (!queue || !currentSlug || allSlugs.length === 0) return;

        const actualIndex = allSlugs.findIndex(s => s === currentSlug);
        if (actualIndex === -1) return;

        let accumulated = 0;
        let foundPage = queue.pagination.page;
        for (let page = 1; page <= queue.pagination.totalPages; page++) {
            const pageSlugs = queue.slugsMap.get(page) || [];
            if (actualIndex < accumulated + pageSlugs.length) {
                foundPage = page;
                break;
            }
            accumulated += pageSlugs.length;
        }

        if (actualIndex !== queue.currentIndex || foundPage !== queue.pagination.page) {
            setQueue(prev => prev ? {
                ...prev,
                currentIndex: actualIndex,
                pagination: {
                    ...prev.pagination,
                    page: foundPage,
                },
            } : prev);
        }
    }, [currentSlug, allSlugs]);

    // Вычисляем навигационные аргументы
    const result: QueueNavigationSet = {
        nextArgs: null,
        prevArgs: null,
        isNextPageLoading: false,
        isPrevPageLoading: false,
        isNextDisabled: true,
        isPrevDisabled: true,
    };

    if (!queue || allSlugs.length === 0) {
        return result;
    }

    // Предыдущий вопрос
    const prevIndex = queue.currentIndex - 1;
    if (prevIndex >= 0) {
        const prevSlug = allSlugs[prevIndex];
        if (prevSlug) {
            // Находим страницу для предыдущего индекса
            let accumulated = 0;
            let prevPageNum = queue.pagination.page;
            for (let page = 1; page <= queue.pagination.totalPages; page++) {
                const pageSlugs = queue.slugsMap.get(page) || [];
                if (prevIndex < accumulated + pageSlugs.length) {
                    prevPageNum = page;
                    break;
                }
                accumulated += pageSlugs.length;
            }

            const updatedQueue: QuestionsQueue = {
                ...queue,
                currentIndex: prevIndex,
                pagination: {
                    ...queue.pagination,
                    page: prevPageNum,
                },
            };
            result.prevArgs = [`../${prevSlug}`, { state: { queue: updatedQueue }, replace: true }];
            result.isPrevDisabled = false;
        }
    } else if (queue.pagination.page > 1 && isLoadingPrev) {
        result.isPrevPageLoading = true;
    }

    // Следующий вопрос
    const nextIndex = queue.currentIndex + 1;
    if (nextIndex < allSlugs.length) {
        const nextSlug = allSlugs[nextIndex];
        if (nextSlug) {
            // Находим страницу для следующего индекса
            let accumulated = 0;
            let nextPageNum = queue.pagination.page;
            for (let page = 1; page <= queue.pagination.totalPages; page++) {
                const pageSlugs = queue.slugsMap.get(page) || [];
                if (nextIndex < accumulated + pageSlugs.length) {
                    nextPageNum = page;
                    break;
                }
                accumulated += pageSlugs.length;
            }

            const updatedQueue: QuestionsQueue = {
                ...queue,
                currentIndex: nextIndex,
                pagination: {
                    ...queue.pagination,
                    page: nextPageNum,
                },
            };
            result.nextArgs = [`../${nextSlug}`, { state: { queue: updatedQueue }, replace: true }];
            result.isNextDisabled = false;
        }
    } else if (queue.pagination.page < queue.pagination.totalPages && isLoadingNext) {
        result.isNextPageLoading = true;
    }

    result.isPrevPageLoading = isLoadingPrev && queue.pagination.page > 1;
    result.isNextPageLoading = isLoadingNext && queue.pagination.page < queue.pagination.totalPages;

    return result;
}