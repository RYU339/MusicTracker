import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays } from 'date-fns';
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';
import './style/Calendar.scss';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className='header row'>
            <div className='col col-start'>
                <span className='text'>
                    <span className='text month'>{format(currentMonth, 'M')}월</span>
                    {format(currentMonth, 'yyyy')}
                </span>
            </div>
            <div className='col col-end'>
                <MdOutlineArrowLeft onClick={prevMonth} />
                <MdOutlineArrowRight onClick={nextMonth} />
            </div>
        </div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className='col' key={i}>
                {date[i]}
            </div>
        );
    }

    return <div className='days row'>{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, inputItem }) => {
    const [currentDay, setCurrentDay] = useState('');
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = `${format(day, 'yyyy')}-${format(day, 'MM')}-${format(day, 'dd')}`;
            days.push(
                <div
                    className={`col cell ${!isSameMonth(day, monthStart) ? 'disabled' : isSameDay(day, selectedDate) ? 'selected' : format(currentMonth, 'M') !== format(day, 'M') ? 'not-valid' : 'valid'}`}
                    key={day}
                    id={cloneDay}
                    onClick={() => {
                        //     setCurrentDay(cloneDay);
                        //     console.log(currentDay)
                    }}
                    style={{ backgroundSize: 'cover' }}
                    // map..돌려야지
                    // style={{ backgroundImage: `url(${cloneDay === inputItem.date ? inputItem.image : ''})`, backgroundSize: 'cover' }}
                    // style={inputItem.map((item) => (item.date === cloneDay ? { backgroundImage: `url(${item.image})` } : { backgroundImage: `url(${item.image})` }))}
                    // title={`${cloneDay === inputItem.date ? inputItem.diary : ''}`}
                >
                    <span className={format(currentMonth, 'M') !== format(day, 'M') ? 'text not-valid' : ''}>{formattedDate}</span>
                </div>
            );

            day = addDays(day, 1);
        }
        rows.push(
            <div className='row' key={day}>
                {days}
            </div>
        );
        days = [];
    }
    const div = document.getElementsByClassName('col cell');
    for (let i = 0; i < div.length; i++) {
        inputItem.map((item) => {
            if (item.date === div[i].id) {
                div[i].style.backgroundImage = `url(${item.image})`;
                div[i].title = `${item.diary}`;
            }
        });
    }
    return <div className='body'>{rows}</div>;
};
// div를 다 그린 뒤에 backgroundImage를 집어넣는다

const Calendar = ({ inputItem }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    // const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    // const onDateClick = (day) => {
    //     setSelectedDate(day);
    //     console.log(selectedDate);
    // };
    return (
        <div className='calendar'>
            <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
            <RenderDays />
            <RenderCells currentMonth={currentMonth} inputItem={inputItem} />
            {/* <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} inputItem={inputItem} /> */}
        </div>
    );
};

export default Calendar;
