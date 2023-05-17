import React, {useState} from "react";

const Calculator = () => {

    const [dayValue, setDayValue] = useState('');
    const [monthValue, setMonthValue] = useState('');
    const [yearValue, setYearValue] = useState('');
    const [timeDiff, setTimeDiff] = useState(null);
    const [err, setErr] = useState('');


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

        const inputDate = new Date(yearValue, monthValue - 1, dayValue); 


        if (!dayValue || !monthValue || !yearValue){
            setErr('Please enter a complete date.');
            return;
        }

        if (isNaN(inputDate.getTime())){
            setErr('Please enter a valid date.');
            return;
        }

        const diff = calculateTimeDiff(inputDate);

        setErr("");
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
      <div className="flex flex-col items-center bg-[rgb(240,240,240)] w-full min-h-screen">
        <h1 className="text-center mt-4 text-7xl sm:text-8xl">Age Calculator</h1>
        <div className="bg-white max-w-[520px] m-auto mt-4 sm:min-w-[840px] sm:mx-0 rounded-br-[70px] sm:rounded-br-[250px] rounded-[20px] sm:rounded-[40px]">
          <div className="flex flex-row w-1/2 mt-4 sm:mt-14 ml-4 sm:ml-[60px]">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row sm:justify-between">
                <div className="flex flex-col">
                  <label htmlFor="dayInput">
                    <p className="uppercase text-sm font-semibold text-[#716f6f]">
                      day
                    </p>
                    <input
                      type="text"
                      value={dayValue}
                      placeholder="DD"
                      onChange={handleDay}
                      className={`border ${
                        err ? "border-red-500" : "border-[#dbdbdb]"
                      }  focus:outline-none rounded-lg h-[72px] w-full mr-8 px-4 py-2`}
                    />
                  </label>
                  {err ? <p className="text-xs text-red-500">{err}</p> : ""}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="monthInput">
                    <p className="uppercase text-sm font-semibold text-[#716f6f]">
                      month
                    </p>
                    <input
                      type="text"
                      value={monthValue}
                      placeholder="MM"
                      onChange={handleMonth}
                      className={`border ${
                        err ? "border-red-500" : "border-[#dbdbdb]"
                      } focus:outline-none rounded-lg h-[72px] w-full mr-8 px-4 py-2`}
                    />
                  </label>
                  {err ? <p className="text-xs text-red-500">{err}</p> : ""}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="yearInput">
                    <p className="uppercase text-sm font-semibold text-[#716f6f]">
                      year
                    </p>
                    <input
                      type="text"
                      value={yearValue}
                      placeholder="YYYY"
                      onChange={handleYear}
                      className={`border ${
                        err ? "border-red-500" : "border-[#dbdbdb]"
                      } focus:outline-none rounded-lg h-[72px] w-full px-4 py-2`}
                    />
                  </label>
                  {err ? <p className="text-xs text-red-500">{err}</p> : ""}
                </div>
              </div>
              <div className="flex flex-row">
                <div className="border-b-2 border-gray-200 w-[250px] sm:w-[620px]"></div>
                <button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="75"
                    height="75"
                    viewBox="0 0 46 44"
                    className="bg-[#854dff] rounded-full mt-4"
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
          <div className="flex flex-col m-auto sm:ml-[60px]">
            {timeDiff === null || err ? (
              <h1 className="text-7xl sm:text-8xl font-extrabold">
                <span className="text-[#854dff]">--</span>years
              </h1>
            ) : (
              <h1 className="text-7xl sm:text-8xl font-extrabold">
                <span className="text-[#854dff]">{timeDiff.years}</span>years
              </h1>
            )}
            {timeDiff === null || err ? (
              <h1 className="text-7xl sm:text-8xl font-extrabold">
                <span className="text-[#854dff]">--</span>months
              </h1>
            ) : (
              <h1 className="text-7xl sm:text-8xl font-extrabold">
                <span className="text-[#854dff]">{timeDiff.months}</span>months
              </h1>
            )}
            {timeDiff === null || err ? (
              <h1 className="text-7xl sm:text-8xl font-extrabold">
                <span className="text-[#854dff]">--</span>days
              </h1>
            ) : (
              <h1 className="text-7xl sm:text-8xl font-extrabold mb-2 md:mb-4 px-1">
                <span className="text-[#854dff]">{timeDiff.days}</span>days
              </h1>
            )}
          </div>
        </div>
      </div>
    );
}

export default Calculator;