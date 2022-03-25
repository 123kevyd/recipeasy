import React, { Component } from 'react';
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

class RatingStars extends Component {
    range = [0, 1, 2, 3, 4]
    render() { 
        return (
            <>
                { this.range.map( num => {
                    return this.props.stars > num ? <StarIcon key={num} /> : <StarBorderIcon key={num} />
                })}
            </>
        );
    }
}
 
export default RatingStars;