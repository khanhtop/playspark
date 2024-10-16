import * as React from "react";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const Frame = styled.div`
  width: 350px;
  color : white;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 10px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;

const Button = styled.div`
  cursor: pointer;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Day = styled.div`
  width: 14.2%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  ${(props) =>
    props.isToday &&
    css`
      border: 1px solid #eee ;
      border-radius: 100%;
      color : white;
      font-weight: 700;
    `}

  ${(props) =>
    props.isSelected &&
    css`
      color: white;
    `}
`;

export function Calendar() {
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const MONTHS = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  function getStartDayOfMonth(date) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return startDate === 0 ? 7 : startDate;
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear(year) ? DAYS_LEAP : DAYS;

  return (
    <Frame>
      <Header >
        <button
          className=" rounded-md "
          onClick={() => setDate(new Date(year, month - 1, day))}
        >
          <svg
            className="w-4 h-4 stroke-current"
            fill="none"
            strokeLinecap ="round"
            strokeLinejoin="round"
            strokeWidth="4"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <div>
          {MONTHS[month]} {year}
        </div>
        <button
          className="rounded-md"
          onClick={() => setDate(new Date(year, month + 1, day))}
        >
          <svg
            className="w-4 h-4 stroke-current"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            stroke="currentColor"
            viewBox="0 0 24 24"
            
          >
            <path d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </Header>
      <Body>
        {DAYS_OF_THE_WEEK.map((d) => (
          <Day key={d}>
            <strong>{d}</strong>
          </Day>
        ))}
        {Array(days[month] + (startDay - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (startDay - 2);
            return (
              <Day
                className="text-[#758698]"
                key={index}
                isToday={d === today.getDate()}
                isSelected={d === day}
                onClick={() => setDate(new Date(year, month, d))}
              >
                {d > 0 ? d : ""}
              </Day>
            );
          })}
      </Body>
    </Frame>
  );
}
