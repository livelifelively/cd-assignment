import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    post__wrapper: {
      height: '100%',
      padding: 20,
      border: '1px solid #d5d5d5',
      background: '#fff',
      borderRadius: 5,
    },
    'user__posts--sub-heading': {
      marginBottom: 10,
    },
  })
);

const Post = ({ post }: { post: Post }) => {
  const classes = useStyles();

  return (
    <div className={classes.post__wrapper}>
      <h3 className={classes['user__posts--sub-heading']}>{post.title}</h3>
      <div>{post.body}</div>
    </div>
  );
};

export default Post;
