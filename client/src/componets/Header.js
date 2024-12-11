import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authActions } from "../store";
import { AppBar, Typography, Toolbar, Box, Button, Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme } from "../utils/theme";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [value, setValue] = useState();

  return (
    <AppBar position="sticky" sx={{ background: `${darkTheme.bg}` }}>
      <Toolbar>
        <Typography variant="h4" sx={{ color: `${darkTheme.navbarText}` }}>
          Blogs Site
        </Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"} marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="login/"
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  fontFamily: "fantasy",
                  color: "white",
                  borderRadius: 10,
                }}
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="login/"
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: 10,
                }}
              >
                SignUp
              </Button>
            </>
          )}

          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/login"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="info"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
