const timeLine = Array.from({ length: 25 }, (_, index) => {
    if (index === 0) {
        return {
            value: "__:__",
        }
    }
    return {
        value: `${index > 10 ? `${index-1}:00` : `0${index-1}:00`}`,
    }
})


const Timeline = () => {
    return <div className="grid grid-rows-25">
        {timeLine.map((time) => (
            <div key={time.value} className="text-sm p-0">{time.value}</div>
        ))}
    </div>
}

export default Timeline;