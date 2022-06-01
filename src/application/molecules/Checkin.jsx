import { formatDistance } from 'date-fns/esm';
import React, { useState } from 'react';
import { deleteCheckin } from '../lib/requests';


function Checkin(props) {
  let {checkin, id} = props;
  let [deleting, setDeleting] = useState(false);
  let [isNew, setIsNew] = useState((new Date().getTime() - checkin[1]) < 500);
  if (isNew) {
    setTimeout(() => {
      setIsNew(false);
    }, 500);
  }


  let isNewClass = isNew ? 'new' : '';
  function removeCheckin() {
    setDeleting(true);
    setTimeout(() => {
      deleteCheckin(checkin[0]);
    }, 500);
  }

  let deleteClass = deleting ? 'deleting' : '';

  return (
    <li className={`checkin ${deleteClass} ${isNewClass}`}>
      {formatDistance(new Date(checkin[1]), new Date())}

      <div onClick={e => removeCheckin(checkin[0]) }><i className='fa fa-trash'></i></div>
    </li>
  );
}


export {
  Checkin
};
