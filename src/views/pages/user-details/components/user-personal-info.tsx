import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    highlightedText: {
      color: theme.palette.primary.main,
    },
    italics: {
      fontStyle: 'italic',
    },
    wrapper: {
      height: '100%',
      padding: 20,
      border: '1px solid #d5d5d5',
      background: '#fff',
      borderRadius: 5,
    },
    marginRight5: {
      marginRight: 5,
    },
    'user__details--sub-heading': {
      marginBottom: 10,
    },
  })
);

export const PersonalInfo = ({ user }: { user: User }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <h3 className={classes['user__details--sub-heading']}>Contact Info</h3>
      <div>
        Username: <span>{user?.username}</span>
      </div>
      <div>
        {'Email: '}
        <a href={`mailto:${user?.email}`} className={classes.highlightedText}>
          {user?.email}
        </a>
      </div>
      <div>
        Phone: <span className={classes.highlightedText}>{user?.phone}</span>
      </div>
      <div>
        {'Website: '}
        <a href={`http://${user?.website}`} target="_blank" className={classes.highlightedText} rel="noreferrer">
          {user?.website}
        </a>
      </div>
    </div>
  );
};

export const UserAddress = ({ user }: { user: User }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <h3 className={classes['user__details--sub-heading']}>Address</h3>
      <div>
        <span className={classes.marginRight5}>{user?.address.suite}</span>
        <span className={classes.marginRight5}>{user?.address.street},</span>
        <span className={classes.marginRight5}>{user?.address.city},</span>
        <span className={classes.marginRight5}>{user?.address.zipcode}</span>
      </div>
    </div>
  );
};

export const UserCompanyInfo = ({ user }: { user: User }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <h3 className={classes['user__details--sub-heading']}>Company</h3>
      <div>
        <div>{user?.company.name}</div>
        <div>{user?.company.bs}</div>
        <div>
          <span className={classes.italics}>{`"${user?.company.catchPhrase}"`}</span>
        </div>
      </div>
    </div>
  );
};
