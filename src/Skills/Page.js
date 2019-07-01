import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import skillInfo from '../utils/skillInfo';
import useStyles from './styles';

const SkillPage = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List>
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
      <div className={classes.buffer} />
    </React.Fragment>
  );
};

export default SkillPage;
