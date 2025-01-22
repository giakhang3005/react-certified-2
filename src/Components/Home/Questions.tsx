import { Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Questions = ({ questionsList }: any) => {
    if (!questionsList || questionsList.length === 0) return;

    const navigate = useNavigate();

    const [selectedAnswers, setSelectedAnswers] = useState(Array(questionsList.length).fill(null));
    const [questionsListLocal, setQuestionsListLocal] = useState(questionsList);

    useEffect(() => {
        onRandomAnswers();
        setSelectedAnswers(Array(questionsList.length).fill(null))
    }, [questionsList])

    const onRandomAnswers = () => {
        if (!questionsListLocal) return;
        let _questionsListLocal: any[] = [];

        questionsList.forEach((question: any) => {
            const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);
            _questionsListLocal.push({ ...question, answers })
        });

        setQuestionsListLocal(_questionsListLocal);
    }

    const onSelectAnswers = (qIndex: number, answer: string) => {
        setSelectedAnswers((prev: any) => {
            const updated = [...prev];
            updated[qIndex] = answer;
            return updated;
        })
    }

    const onCheckSubmitButtonStatus = () => {
        const idx = selectedAnswers.findIndex(a => a === null);

        return idx !== -1;
    }

    const onSubmit = () => {
        navigate('/result', { state: { questionsListLocal, selectedAnswers } })
    }

    return (
        <Row>
            <Col span={4}></Col>
            <Col span={16}>
                <ul className='questions-list'>
                    {
                        questionsListLocal?.map((q: any, i: number) => {
                            return (
                                <li key={i} className='question'>
                                    <div className="question-title">{i + 1}. {q.question}</div>
                                    <ul className='answers-list'>
                                        {
                                            q.answers?.map((a: string, j: number) => {
                                                return (
                                                    <li key={j} className='answer'>
                                                        <Button
                                                            onClick={() => onSelectAnswers(i, a)}
                                                            type={selectedAnswers.includes(a) ? 'primary' : 'default'}>{a}</Button>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </li>
                            )
                        })
                    }
                </ul>

                {!onCheckSubmitButtonStatus() && <Button onClick={onSubmit} type="primary" style={{ width: '100%' }} >Submit</Button>}
            </Col>
            <Col span={4}></Col>
        </Row>

    )
}

export default Questions