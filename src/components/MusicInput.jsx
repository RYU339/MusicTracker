import React, { useState } from 'react';
import './style/MusicInput.scss';

const MusicInput = ({ inputMusic }) => {
    // 날짜
    const [date, setDate] = useState('');
    // 이미지 주소
    const [image, setImage] = useState('');
    // 한 줄 일기
    const [diary, setDiary] = useState('');

    // 날짜 저장
    const dateChangeHandler = (e) => setDate(e.target.value);
    // 이미지 주소 저장
    const imageChangeHandler = (e) => setImage(e.target.value);
    // 일기 저장
    const diaryChangeHandler = (e) => setDiary(e.target.value);

    const submitHandler = (e) => {
        e.preventDefault();
        if (date.trim() === '') return;
        inputMusic(date, image, diary);
        setDate('');
        setImage('');
        setDiary('');
    };
    console.log(date);

    return (
        <form className='MusicInput' onSubmit={submitHandler}>
            <h2>Music Tracker</h2>
            <input type='date' value={date} onChange={dateChangeHandler} />
            <input type='text' placeholder='이미지 주소' value={image} onChange={imageChangeHandler} />
            <textarea value={diary} placeholder='오늘의 기분은?' onChange={diaryChangeHandler}></textarea>
            <button type='submit'>입력</button>
        </form>
    );
};

export default MusicInput;
