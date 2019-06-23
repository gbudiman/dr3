import React from 'react';
import Disqus from 'disqus-react';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  disqus: {
    width: '100%',
    textAlign: 'center',
    color: grey[400],
    fontFamily: 'Alegreya, serif'
  },
  header: {
    fontFamily: 'Alegreya, serif'
  }
});

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
      <div className='footer'>
        <div className='text'>Gloria Budiman - DRpaedia 3.0.0</div>
      </div>
    </div>
  );
};

/* <div id='disqus_thread' />
  <script>
  var disqus_config = function () {
    this.page.url = 'http://drpaedia3.herokuapp.com'; // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = 'index'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};
function () {
    // DON'T EDIT BELOW THIS LINE
    var d = document,
        s = d.createElement('script');
    s.src = 'https://drpaedia3.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);}
    </script>   */

export default FeedbackPage;
