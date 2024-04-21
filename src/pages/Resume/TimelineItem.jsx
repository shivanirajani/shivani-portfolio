

const TimelineItem = ({ degree,work, place, date, grade, description }) => {
  return (
    <li className="timeline-item">
           <h4 className="h4 timeline-item-title">{degree}</h4>
           <h4 className="h4 timeline-item-title">{work}</h4>
      <h4 className="h4 timeline-item-title">{place}</h4>
      <span>{date}</span>
      <h4 className="h4 timeline-item-title">{grade}</h4>
      <p className="timeline-text">{description}</p>
    </li>
  );
}

export default TimelineItem;