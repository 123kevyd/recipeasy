import { Box, Card, CardContent, CardHeader, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import React, { Component } from 'react';

class AddRecipeRestriction extends Component {
    render() { 
        return (
            <Card>
                <CardHeader title="Restrictions"/>
                <CardContent>   
                    <FormControl fullWidth>
                        <InputLabel id="restriction-label">Tags</InputLabel>
                        <Select
                            labelId='restriction-label'
                            MenuProps = {{
                                PaperProps: {
                                style: {
                                    maxHeight: 180,
                                    width: 250
                                }
                                }
                            }}
                            fullWidth
                            multiple
                            onChange={(event) => this.props.handleChange(event.target.value)}
                            value={this.props.state.newRecipe.tags}
                            input={<OutlinedInput label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                                </Box>
                            )}>
                            {this.props.restrictions.map((restriction) => (
                                <MenuItem
                                key={restriction.value}
                                value={restriction.title}
                                >
                                    {restriction.title}
                                </MenuItem>
                            ))}        
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>
        );
    }
}
 
export default AddRecipeRestriction;