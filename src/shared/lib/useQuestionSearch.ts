import { useQueryParam } from "./useQueryParam"

export default function useQuestionSearch() {
    const [questionSearch, setQuestionSearch] = useQueryParam("question-search")
    
    return ({
        questionSearch: questionSearch ?? undefined,
        setQuestionSearch
    })
}