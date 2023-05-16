import React, {useState} from "react";

const Calculator = () => {

    const [dayValue, setDayValue] = useState('');
    const [monthValue, setMonthValue] = useState('');
    const [yearValue, setYearValue] = useState('');
    const [timeDiff, setTimeDiff] = useState(null);
    const [err, setErr] = useState('');

    const inputDate = new Date(yearValue, monthValue - 1, dayValue); 

    const handleDay = (e) => {
        setDayValue(e.target.value);
    };

    const handleMonth = (e) => {
        setMonthValue(e.target.value);
    };

    const handleYear = (e) => {
        setYearValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputDate) {
            setErr("Please enter a date.");
            return;
        }

        const diff = calculateTimeDiff(inputDate);

        setErr('');
        setTimeDiff(diff);
    }

    function calculateTimeDiff(inputDate) {
        const today = new Date();
        const input = new Date(inputDate)

        const yearDiff = today.getFullYear() - input.getFullYear();
        const monthDiff = today.getMonth() - input.getMonth(); 
        const dayDiff = today.getDate() - input.getDate();

        let years = yearDiff;
        let months = monthDiff;
        let days = dayDiff;

        if (dayDiff < 0){
            months--;
                const prevMonthLastDay = new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  0
                ).getDate();
                days = prevMonthLastDay - input.getDate() + today.getDate();
        }
        if (monthDiff < 0){
            years--;
            months = 12 - input.getMonth() + today.getMonth();
        }

        return{
            years, months, days
        }
    }

    console.log(timeDiff);

    return (
      <div className="flex justify-center items-center bg-[rgb(240,240,240)] w-full h-[100vh]">
        <div className="bg-white h-[650px] w-[840px] m-auto rounded-br-[250px] rounded-[40px]">
          <div className="flex flex-row mt-14 ml-[60px]">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row">
                <label htmlFor="dayInput">
                  <p className="uppercase text-lg font-semibold text-[#716f6f]">
                    day
                  </p>
                  <input
                    type="text"
                    value={dayValue}
                    placeholder="DD"
                    onChange={handleDay}
                    className="border ${err ? 'border-red-500' : 'border-[#dbdbdb]'}  focus:outline-none rounded-lg h-[72px] w-[156px] mr-8 px-4 py-2"
                  />
                </label>
                <label htmlFor="monthInput">
                  <p className="uppercase text-lg font-semibold text-[#716f6f]">
                    month
                  </p>
                  <input
                    type="text"
                    value={monthValue}
                    placeholder="MM"
                    onChange={handleMonth}
                    className={`border ${err ? 'border-red-500' : 'border-[#dbdbdb]'} focus:outline-none rounded-lg h-[72px] w-[156px] mr-8 px-4 py-2`}
                  />
                </label>
                <label htmlFor="yearInput">
                  <p className="uppercase text-lg font-semibold text-[#716f6f]">
                    year
                  </p>
                  <input
                    type="text"
                    value={yearValue}
                    placeholder="YYYY"
                    onChange={handleYear}
                    className="border ${err ? 'border-red-500' : 'border-[#dbdbdb]'} focus:outline-none rounded-lg h-[72px] w-[156px] px-4 py-2"
                  />
                </label>
              </div>
              <div className="flex flex-row">
                <div className="border-b-2 border-gray-200 h-[50px] w-[620px]"></div>
                <button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="75"
                    height="75"
                    viewBox="0 0 46 44"
                    className="bg-[#854dff] rounded-full"
                  >
                    <g
                      fill="none"
                      transform="scale(0.625) translate(14,14)"
                      stroke="#FFF"
                      stroke-width="2"
                    >
                      <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
                    </g>
                  </svg>
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col ml-[60px]">
            {timeDiff === null ? (
              <h1 className="text-8xl font-extrabold">
                <span className="text-[#854dff]">--</span>Years
              </h1>
            ) : (
              <h1 className="text-8xl font-extrabold">
                <span className="text-[#854dff]">{timeDiff.years}</span>Years
              </h1>
            )}
            {timeDiff === null ? (
              <h1 className="text-8xl font-extrabold">
                <span className="text-[#854dff]">--</span>Months
              </h1>
            ) : (
              <h1 className="text-8xl font-extrabold">
                <span className="text-[#854dff]">{timeDiff.months}</span>Months
              </h1>
            )}
            {timeDiff === null ? (
              <h1 className="text-8xl font-extrabold">
                <span className="text-[#854dff]">--</span>Days
              </h1>
            ) : (
              <h1 className="text-8xl font-extrabold">
                <span className="text-[#854dff]">{timeDiff.days}</span>Days
              </h1>
            )}
          </div>
        </div>
      </div>
    );
}

export default Calculator;