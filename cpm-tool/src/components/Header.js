import React from "react";
import { Button, AppBar, Toolbar, Typography, Box } from "@mui/material";

function Header({ user, signOut }) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Project Management Tool</Typography>
          {user ? (
            <>
              <Box sx={{ flexGrow: 1, padding: 1 }}>
                <Typography variant="h6">
                  {"welcome, " + user.username + "!"}
                </Typography>
              </Box>
              <Button color="inherit" onClick={signOut}>
                Sign out
              </Button>
            </>
          ) : (
            <Button color="inherit">Login</Button>
          )}
        </Toolbar>
      </AppBar>
      {/* Other components go here */}
    </div>
  );
}

export default Header;
