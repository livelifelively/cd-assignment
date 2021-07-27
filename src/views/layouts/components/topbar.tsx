import React from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const Topbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="absolute">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Canada Drives SFE Assignment
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default Topbar;
