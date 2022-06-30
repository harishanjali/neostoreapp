import React from 'react'

export default function Pagination(props) {
    let {data,pagehandler} = props;
    let pageNumbers = [];
    for(let i=1;i<=Math.ceil(data.length/6);i++){
      pageNumbers.push(i);
    }
  return (
    <div className='pagination'>
        <center >
            {pageNumbers.map(page=>(<div className='page-button' onClick={()=>pagehandler(page)}>{page}</div>))}
        </center>
    </div>
  )
}
