import { Button, Card, CardContent, CardHeader, MenuItem, Select, Stack, TextField } from '@mui/material';
import React, { Component } from 'react';

class AddRecipeEquipment extends Component {
    render() { 
        return (
            <Card>
                <CardHeader title="Equipement"/>
                <CardContent>
                    {this.props.state.newRecipe.equipment.map((equipment, index)=>{
                        return (
                            <>
                                <Stack direction="row" spacing={3}>
                                    <Select
                                        defaultValue = ""
                                        label="Equipment"
                                        fullWidth
                                        onChange={(event) => this.props.handleContent(event.target.value,index)}
                                        value={equipment.name}
                                        >
                                        {this.props.equipment.map(({ title } = equipment) => (
                                            <MenuItem
                                            key={title}
                                            value={title}
                                            >
                                                {title}
                                            </MenuItem>
                                        ))}         
                                    </Select>
                                    {this.props.state.newRecipe.equipment.length > 1 && (
                                        <Button variant='contained' onClick={() => this.props.handleDelete(index)}>Delete</Button>
                                    )}
                                </Stack>
                                {this.props.state.newRecipe.equipment.length - 1 === index && (
                                    <Button variant='contained' onClick={() => this.props.handleAdd()}>Add Equipement</Button>
                                )}
                            </>
                        );
                    })}
                </CardContent>
            </Card>
        );
    }
}
 
export default AddRecipeEquipment;