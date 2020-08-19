import React from 'react'
import './NesContainer.css'

const NesContainer = ({title}, props) => {
    return(
        <>
        <div className="nes-container">
            <p className="nes-title">Container is dark</p>
              <p>hello</p>
        </div>
        <div className="nes-container-rounded">
            BLAH
        </div>
        </>
    )
}

export default NesContainer