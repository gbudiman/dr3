import React from 'react';
import Disqus from 'disqus-react';
import Typography from '@material-ui/core/Typography';
import './styles.scss';

const FeedbackPage = () => {
  const disqusShortname = 'DRpaedia3';
  const disqusConfig = {
    url: 'http://drpaedia3.herokuapp.com',
    identifier: 'index',
    title: 'DRpaedia3'
  };

  return (
    <div className='disqus'>
      <Typography className='header' variant='h6'>
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
