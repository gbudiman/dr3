import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import grey from '@material-ui/core/colors/grey';
import makeStyles from '@material-ui/styles/makeStyles';
import skillInfo from '../utils/skillInfo';

const useStyles = makeStyles({
  primary: {
    color: grey[400],
    fontFamily: 'Alegreya, serif',
    fontSize: '18px',
    textDecoration: 'underline'
  },
  secondary: {
    color: grey[400],
    fontFamily: 'Alegreya, serif',
    textAlign: 'justify',
    textJustify: 'auto'
  },
  page: {
    color: grey[500],
    fontFamily: 'Alegreya, serif',
    fontStyle: 'italic'
  },
  flexigrid: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  buffer: {
    height: '64px'
  },
  noFlex: {
    display: 'inline-block'
  }
});

const SkillPage = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List className='container'>
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
