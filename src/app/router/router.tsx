import { createBrowserRouter, /*Navigate*/ } from 'react-router-dom'
import Layout from '@/shared/ui/Layout/Layout'
import HomePage from '@/pages/HomePage/HomePage'
import ExactQuestion from '@/pages/ExactQuestionPage/ExactQuestionPage'
import QuestionsList from '@/pages/QuestionsList/QuestionsListPage'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'questions',
                children: [

                    {
                        index: true,
                        element: <QuestionsList />,
                    },
                    {
                        path: ':questionId',
                        element: <ExactQuestion />
                    },
                ]
            },
            // {
            //     path: 'not-found',
            //     element: <NotFound />,
            // },
            // {
            //     path: '*',
            //     element: <Navigate to='/not-found' replace />
            // },
        ],
    },
])