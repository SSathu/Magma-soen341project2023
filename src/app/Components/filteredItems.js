import { React, useState } from 'react'



async function filteredItems(props, data) {
  
  const filteredData = data.filter((el) => {
    //if no input the return the original
    if (props.input === '') {
      return el.jobTitle;
    }
    //return the item which contains the user input
    else {
      return el.jobTitle.text.toLowerCase().includes(props.input)
    }
  })
  return (
    <ul>
      {filteredData.map((item) => (
        <li key={item.id}>{item.jobTitle}</li>
      ))}
    </ul>
  )
}

export default filteredItems