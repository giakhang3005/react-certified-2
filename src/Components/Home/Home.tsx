import React, { useState } from 'react'
import Search from './Search'
import { message } from 'antd';
import { useAPIs } from '../../useAPIs';
import Questions from './Questions';

type Props = {}

const Home = (props: Props) => {
    const { onGetQuestions } = useAPIs();
    const [questionsList, setQuestionsList] = useState([]);

    const onCreateQuiz = async (category: number, difficulty: string) => {
        const result = await onGetQuestions(category, difficulty);
        if (!result) {
            message.error('Failed to get questions');
            return;
        }

        setQuestionsList(result.results);
    }

    return (
        <>
            <Search onCreateQuiz={onCreateQuiz} />
            <Questions questionsList={questionsList} />
        </>
    )
}

export default Home