import { createBrowserRouter, /*Navigate*/ } from 'react-router-dom'
import Layout from '@/shared/ui/Layout/Layout'
import HomePage from '@/pages/HomePage/HomePage'
import ExactQuestionPage from '@/pages/ExactQuestionPage/ExactQuestionPage'
import QuestionsListPage from '@/pages/QuestionsList/QuestionsListPage'

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
                        element: <QuestionsListPage />,
                    },
                    {
                        path: ':questionSlug',
                        element: <ExactQuestionPage />
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