import React from 'react';
import Container from '@material-ui/core/Container';
import Topbar from './components/topbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const DefaultLayout = ({ children }: { children: any }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.main}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <div className={classes.content}>{children}</div>
        </Container>
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      fontFamily: theme.typography.fontFamily,
    },
    content: {
      padding: 25,
    },
    main: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      background: '#f9f9f9',
    },
    root: {
      display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
  })
);

export default DefaultLayout;
