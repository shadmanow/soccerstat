import React from 'react';

export const Page404 = ({location}) =>
  <div className='whoops-404'>
    <h1>Resource not fount at {location.pathname}</h1>
  </div>