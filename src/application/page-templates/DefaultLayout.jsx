import React from 'react';

function DefaultLayout(props) {

    return (
        <>
            <HeaderDefault />
            <div className="home-layout">
                {props.children}
            </div>
        </>
    )
}

export {
    DefaultLayout
}