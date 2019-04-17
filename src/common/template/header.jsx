import React from 'react'

export default props => (
    <div className='main-header' >
        <a href='#' className='logo'>
            <span className='logo-mini'><b>BH</b>M</span>
            <span className='logo-lg'>
                <i className='fa fa-globe'></i>
                <b> Gestão BH Map</b>
            </span>
        </a>
        <nav className='navbar navbar-static-top'>
            <a href className='sidebar-toggle' data-toggle='offcanvas'></a>
        </nav>
    </div>
)