import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import skillInfo from '../utils/skillInfo';
import useStyles from './styles';

const SkillPage = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List>
        {Object.keys(skillInfo).map(key => (
          <ListItem key={key} className={classes.noFlex}>
            <div className={classes.flexigrid}>
              <div className={classes.primary}>{skillInfo[key].name}</div>
              <div className={classes.page}>
                Starting page: {skillInfo[key].startingPage}
              </div>
            </div>
            <div className={classes.flexigrid}>
              <div className={classes.secondary}>
                {skillInfo[key].description}
              </div>
            </div>
          </ListItem>
        ))}
      </List>
      <div className={classes.buffer} />
    </React.Fragment>
  );
};

export default SkillPage;
