import React, {Component} from "react";
import {Card, CardHeader, CardContent, List, ListItem, ListItemText, ListItemIcon} from "@mui/material";
import NoiseControlOffIcon from "@mui/icons-material/NoiseControlOff";

/**
 * Used for ratings. Shows 5 stars with the specified number of stars filled
 * @prop {string} title - the title of the card
 * @prop {array[string]} list - an array of strings to be turned into a list
 */

class RecipeCardList extends Component {
    constructor(props) {
        super(props)

        if (!this.props || !this.props.title && this.props.title !== "") {
            throw new Error("Required title prop not found");
        } else if (!this.props.list && this.props.list !== []) {
            throw new Error("Required list prop not found");
        } else if (typeof this.props.title !== "string") {
            throw new Error(`Prop title must be a string - Is ${this.props.title} (${typeof this.props.title}) `);
        } else if (!Array.isArray(this.props.list)) {
            throw new Error(`Prop list must be an array - Is ${this.props.list} (${typeof this.props.list}) `);
        } else if (!this.props.list.every((elem) => {return typeof elem === "string"})) {
            throw new Error(`Prop list must be an array of strings - Is ${this.props.list}`);
        }
    }

    render() {
        return (
            <>
                <Card>
                    <CardHeader title={this.props.title} />
                    <CardContent>
                        <List>
                            {this.props.list.map( listItem =>
                                <ListItem key={listItem}>
                                    <ListItemIcon>
                                        <NoiseControlOffIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={listItem} />
                                </ListItem>
                            )}
                        </List>
                    </CardContent>
                </Card>
            </>
        );
    }
}

export default RecipeCardList;
