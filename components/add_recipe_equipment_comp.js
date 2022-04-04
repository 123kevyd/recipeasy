import { Button, Card, CardContent, CardHeader, MenuItem, Select, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { Component } from 'react';

class AddRecipeEquipment extends Component {
    render() { 
        return (
            <Card>
                <CardHeader title="Equipement"/>
                <CardContent>
                    {this.props.currEquipment.map((equip, index)=>{
                        return (
                            <Box key={index}>
                                <Stack direction="row" spacing={3} >
                                    <Select
                                        defaultValue = ""
                                        label="Equipment"
                                        fullWidth
                                        onChange={(event) => this.props.handleContent(event.target.value,index)}
                                        value={equip}
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
                                    {this.props.currEquipment.length > 1 && (
                                        <Button variant='contained' onClick={() => this.props.handleDelete(index)}>Delete</Button>
                                    )}
                                </Stack>
                                {this.props.currEquipment.length - 1 === index && (
                                    <Box mt={2}>
                                        <Button variant='contained' onClick={() => this.props.handleAdd()}>Add Equipement</Button>
                                    </Box>
                                )}
                            </Box>
                            );
                    })}
                </CardContent>
            </Card>
        );
    }
}
 
export default AddRecipeEquipment;