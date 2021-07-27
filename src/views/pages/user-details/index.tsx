import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { fetchUserDetails } from '../../../application/state/users/users.actions';
import { fetchPosts } from '../../../application/state/posts/posts.actions';
import DefaultLayout from '../../layouts/default';
import Post from './components/post';
import { PersonalInfo, UserAddress, UserCompanyInfo } from './components/user-personal-info';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    highlightedText: {
      color: theme.palette.primary.main,
    },
    italics: {
      fontStyle: 'italic',
    },
    'user__details--personal': { marginBottom: 25 },
    'user__details--heading': {
      marginBottom: 20,
    },
    'user__details--heading--connector': {
      marginLeft: 5,
      marginRight: 5,
      fontWeight: 'normal',
    },
  })
);

const UsersDetails = () => {
  const classes = useStyles();

  const params: { id: string } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state?.users.filter((val: User) => val.id === parseInt(params.id)));
  const posts = useSelector((state: any) => state?.posts[params.id]);

  useEffect(() => {
    if (user.length === 0) {
      dispatch(fetchUserDetails(parseInt(params.id)));
    }
    if (!posts) {
      dispatch(fetchPosts(parseInt(params.id)));
    }
  }, []);

  return (
    <DefaultLayout>
      <Grid className={classes['user__details--personal']} container spacing={2}>
        <Grid xs={12} item>
          <h2 className={classes['user__details--heading']}>
            <Link to={'/'}>Users</Link>
            <span className={classes['user__details--heading--connector']}>&gt;</span>
            <span>{user[0]?.name}</span>
          </h2>
        </Grid>
        <Grid md={4} xs={12} item>
          <PersonalInfo user={user[0]} />
        </Grid>
        <Grid md={4} xs={12} item>
          <UserAddress user={user[0]} />
        </Grid>
        <Grid md={4} xs={12} item>
          <UserCompanyInfo user={user[0]} />
        </Grid>
      </Grid>
      <Grid className="user__posts" container spacing={2}>
        <Grid xs={12} item>
          <h2 className={classes['user__details--heading']}>Posts by {user[0]?.name}</h2>
        </Grid>
        {posts &&
          posts.map((val: Post) => {
            return (
              <Grid md={4} xs={12} item key={val.id}>
                <Post post={val} />
              </Grid>
            );
          })}
      </Grid>
    </DefaultLayout>
  );
};

export default UsersDetails;
