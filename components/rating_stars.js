import React, {Component} from "react";
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"

/**
 * Used for ratings. Shows 5 stars with the specified number of stars filled
 * @prop {number} stars - the number of filled stars to be shown
 */

class RatingStars extends Component {
    constructor(props) {
        super(props);

        if (!this.props || (!this.props.stars && this.props.stars !== 0)) {
            throw new Error("required stars prop not being passed\n" + this.props + "\n" + this.props.stars + "\n");
        } else if (typeof this.props.stars !== "number" ) {
            throw new Error(`Stars must be a number - Is: ${this.props.stars} (${typeof this.props.stars})\n`);
        } else if (this.props.stars > 5 || this.props.stars < 0) {
            throw new Error(`Stars must be between 0 and 5 inclusive - Is: ${this.props.stars}`)
        }
    }

    range = [0, 1, 2, 3, 4]

    render() {
        return (
            <>
                {this.range.map( num => {
                    return this.props.stars > num ? <StarIcon key={num} /> : <StarBorderIcon key={num} />
                })}
            </>
        );
    }
}

export default RatingStars;
