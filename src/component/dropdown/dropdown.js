import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function DropDown(props) {

  const classes = useStyles();
  const [sort, setName] = React.useState('');

  const handleChange = (event) => 
  {
    setName(event.target.value);
    if(props.whatToUpdate == "sort")
    {
        props.onClick.updateSort(event.target.value);
    }
    else if(props.whatToUpdate == "search")
    {
        props.onClick.updateSearch(event.target.value);
    }
    else
    {
        console.log("I DON'T KNOW WHAT TO UPDATE!");
    }
  };



  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{props.infoString}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          cvalue={sort}
          onChange={handleChange}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="city">City</MenuItem>
          <MenuItem value="email">Email</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}