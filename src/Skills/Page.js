import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import skillInfo from '../utils/skillInfo';
import './styles.scss';

export default () => (
  <React.Fragment>
    <div className='builder'>
      <List>
        {Object.keys(skillInfo).map(key => (
          <ListItem key={key} className='noFlex'>
            <div className='flexigrid'>
              <div className='primary'>{skillInfo[key].name}</div>
              <div className='page'>
                Starting page: {skillInfo[key].startingPage}
              </div>
            </div>
            <div className='flexigrid'>
              <div className='secondary'>{skillInfo[key].description}</div>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
    <div className='buffer' />
  </React.Fragment>
);
