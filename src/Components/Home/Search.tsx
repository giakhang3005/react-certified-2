import React, { useEffect, useState } from 'react'
import { useAPIs } from '../../useAPIs';
import { Button, Select, message } from 'antd';

type Props = {}

const Search = ({ onCreateQuiz }: any) => {
    const { onGetAllCategories } = useAPIs();
    const [categories, setCategories] = useState([]);
    const [difficulties, setDifficulties] = useState([]);
    const [selectedOpt, setSelectedOpt] = useState({
        category: null,
        difficulty: null
    })

    useEffect(() => {
        onInitCategories();
        onInitDifficulties();
    }, []);

    const onInitCategories = async () => {
        const result = await onGetAllCategories();

        if (!result) {
            message.error('Failed to get all categories');
            return;
        }

        const formatted = result.map((c: any) => ({ value: c.id, label: c.name }));
        setCategories(formatted);
    }

    const onInitDifficulties = () => {
        const _difficulties = [
            { value: 'easy', label: 'Easy' },
            { value: 'medium', label: 'Medium' },
            { value: 'hard', label: 'Hard' }
        ]

        setDifficulties(_difficulties as any);
    }

    const onChangeValue = (key: keyof typeof selectedOpt, newVal: any) => {
        setSelectedOpt(prev => ({ ...prev, [key]: newVal }));
    }

    const onCreate = () => {
        onCreateQuiz(selectedOpt.category, selectedOpt.difficulty);
    }


    return (
        <div className='search-container'>
            <Select id='categorySelect' onChange={(v) => onChangeValue('category', v)} value={selectedOpt.category} options={categories} placeholder="Select a category" size='large' className='search-select'></Select>
            <Select id='difficultySelect' onChange={(v) => onChangeValue('difficulty', v)} value={selectedOpt.difficulty} options={difficulties} placeholder="Select difficulty" size='large' className='search-select'></Select>
            <Button id='createBtn' onClick={onCreate} size='large'>Create</Button>
        </div>

    )
}

export default Search