import React from 'react';
import Disqus from 'disqus-react';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

const FeedbackPage = () => {
  const classes = useStyles();
  const disqusShortname = 'DRpaedia3';
  const disqusConfig = {
    url: 'http://drpaedia3.herokuapp.com',
    identifier: 'index',
    title: 'DRpaedia3'
  };

  return (
    <div className={classes.disqus}>
      <Typography className={classes.header} variant='h6'>
        Feedback
      </Typography>
      <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
        Comments
      </Disqus.CommentCount>
      <p />
      <Disqus.DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
};

export default FeedbackPage;
