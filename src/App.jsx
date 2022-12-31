import { useState, useRef } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import MusicInput from './components/MusicInput';
import MusicTracker from './components/MusicTracker';

function App() {
    // ID값 설정
    const newID = useRef(1);
    const [input, setInput] = useState([{ date: '', iamge: '', diary: '' }]);
    // const [input, setInput] = useState({ date: '', iamge: '', diary: '' });

    //
    const inputMusicHandler = (date, image, diary) => {
        const music = {
            // id: newID.current,
            date: date,
            image: image,
            diary: diary,
        };
        newID.current += 1;
        setInput([...input, music]);
        // setInput(music);
    };

    return (
        <div className='App'>
            <MusicInput inputMusic={inputMusicHandler} />
            {/* <Calendar inputItem={input} /> */}
            <MusicTracker inputItem={input} />
        </div>
    );
}

export default App;
