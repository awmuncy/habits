function FootprintsEssentials(props) {
  return (
    <div className='essentials status-add'>
      <span className='status-icon add'>

      </span>
      <div className='title-and-type'>
        <h2>{props.habit.title}</h2>
        <span className='interval'>1 day, 2 hours</span>
        <span className='grace-period-expires'>
        Grace period ends in 5 hours
          {/* Shows up 3/4 through grace period */}
        </span>
      </div>
      <div className='meta'>
        <span className='idk'>
        5 hours {/*  */}
        </span>
        <span><i class='fa fa-plus'></i></span>
      </div>
    </div>
  );
}
