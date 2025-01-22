import { useState } from 'react'
import Search from './Search'
import { Spin, message } from 'antd';
import { useAPIs } from '../../useAPIs';
import Questions from './Questions';

const Home = () => {
    const { onGetQuestions } = useAPIs();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [questionsList, setQuestionsList] = useState([]);

    const onCreateQuiz = async (category: number, difficulty: string) => {
        setIsLoading(true);
        const result = await onGetQuestions(category, difficulty);
        setIsLoading(false)
        if (!result) {
            message.error('Failed to get questions');
            return;
        }

        setQuestionsList(result.results);
    }

    return (
        <Spin spinning={isLoading} tip="Preparing Data...">
            <Search onCreateQuiz={onCreateQuiz} setIsLoading={setIsLoading}/>
            <Questions questionsList={questionsList} />
        </Spin>
    )
}

export default Home