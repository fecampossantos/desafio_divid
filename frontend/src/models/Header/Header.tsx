import React from  'react'


const Header = ({title} : {title:string}) => {
    return(
        <div className="App-header">
            <h1>{title}</h1>
        </div>
    )
}

export default Header