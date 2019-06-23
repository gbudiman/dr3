import React from 'react';
import './SkillPage.scss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import grey from '@material-ui/core/colors/grey';
import makeStyles from '@material-ui/styles/makeStyles';
import skillInfo from '../../utils/skillInfo';

const useStyles = makeStyles({
  primary: {
    fontFamily: 'Alegreya, serif',
    fontSize: '18px',
    textDecoration: 'underline',
  },
  secondary: {
    fontFamily: 'Alegreya, serif',
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
            primaryTypographyProps={{ className: classes.primary }}
            secondary={skillInfo[key].description}
            secondaryTypographyProps={{ className: classes.secondary }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SkillPage;
