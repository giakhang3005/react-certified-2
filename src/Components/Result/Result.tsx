import { Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { questionsListLocal, selectedAnswers } = location.state || {};

    const [wrong, setWrong] = useState<number>(0);

    useEffect(() => {
        onCountWrong();
    }, [])

    const onGetStyle = (q: any, qIndex: number, answer: string) => {
        if (selectedAnswers.includes(answer)) {
            return { color: 'white', background: 'green' }
        }

        if (questionsListLocal[qIndex].correct_answer === answer) {
            return { color: 'white', background: 'red' }
        }

        return {}
    }

    const onGetResultBackground = () => {
        if (wrong <= 1) {
            return 'green'
        }

        if (wrong <= 3) {
            return 'yellow'
        }

        return 'red'
    }

    const onCountWrong = () => {
        let count = 0;
        questionsListLocal?.forEach((q: any, i: number) => {
            if (q.correct_answer !== selectedAnswers[i]) {
                count++;
            }
        })

        setWrong(count);
    }

    const onRetry = () => {
        navigate('/');
    }

    return (
        <Row>
            <Col span={4}></Col>
            <Col span={16}>
                <h2 style={{ textAlign: 'center' }}>RESULTS</h2>
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
                                                        <Button style={onGetStyle(q, i, a)}>{a}</Button>
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

                <div style={{textAlign: 'center', background: onGetResultBackground()}}>You scored {5 - wrong} out of 5</div>
                <Button onClick={onRetry} style={{marginTop: 7, width: '100%'}} type="primary">Create a new quiz</Button>
            </Col>
            <Col span={4}></Col>
        </Row>
    )
}

export default Result