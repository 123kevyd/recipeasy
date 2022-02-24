import React, { Component, Fragment } from 'react';
import Button from '@mui/material/Button';

function browseRecipes() {
    return (
        <Button variant="contained" onClick={() => {console.log('clicked');}}>test</Button>
    )
}

export default browseRecipes