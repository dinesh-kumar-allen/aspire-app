const days = [{
    day:'Mon',
    dayValue: 1
}, {
    day:'Tue',
    dayValue: 2
}, {
    day:'Wed',
    dayValue: 3
}, {
    day:'Thu',
    dayValue: 4
}, {
    day:'Fri',
    dayValue: 5
}, {
    day: 'Sat',
    dayValue: 6
}, {
    day: 'Sun',
    dayValue: 0
}];
const Header = () => {
  return (
    <div className="grid grid-cols-7">
        {days.map((day) => (
            <div key={day.dayValue} className="text-center border-1 border-gray-200 p-2 font-bold">{day.day}</div>
        ))}
    </div>
  )
};

export default Header;