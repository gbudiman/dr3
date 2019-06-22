import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/styles/makeStyles';
import skillInfo from '../../utils/skillInfo';

const useStyles = makeStyles({
  primary: {
    color: 'white'
  },
  secondary: {
    color: 'white'
  }
});

const SkillPage = () => {
  const classes = useStyles();
  return (
    <List className='container'>
      {Object.keys(skillInfo).map(key => (
        <ListItem key={key}>
          <ListItemText
            className='skills'
            primary={skillInfo[key].name}
            primaryTypographyProps={classes.primary}
            secondary={skillInfo[key].description}
            secondaryTypographyProps={classes.secondary}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SkillPage;
