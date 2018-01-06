import React from 'react';
function Memo(props){
    return(
            <li className="list">
                <h3>{props.memo_name}</h3>
            </li>
    );
}

export default Memo;