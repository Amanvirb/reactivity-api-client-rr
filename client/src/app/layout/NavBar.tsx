import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../assets/logo.png";
import { CardMedia, CircularProgress, ListItem } from "@mui/material";
import useAxios from "../hooks/useAxios";
import { router } from "./Routes";
import { pages } from "../common/options/navBarOpt";
import { signOut } from "../../features/users/account/accountSlice";
import { useAppDispatch } from "../store/configureStore";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { pending } from "../common/options/sliceOpt";
import { Link, NavLink } from "react-router-dom";
import CommonButton from "../common/CommonButton";

function NavBar() {
  const [anchors, setAnchors] = React.useState<[] | HTMLElement[]>([]);

  // const { isMobile, isMediumScreen } = useUtilities();

  const { user, fbLoginHandler, accountStatus } = useAxios();
  const dispatch = useAppDispatch();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    const currentAnchors = [...anchors];

    const selectedAnchor = currentAnchors.find(
      (x) => x.id === event.currentTarget.id
    );

    if (!selectedAnchor) {
      currentAnchors.push(event.currentTarget);
      setAnchors(currentAnchors);
    }
  };

  const handleCloseNavMenu = (routeId?: string) => {
    if (routeId) {
      router.navigate(routeId);
    }
    setAnchors([]);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#5097A4", height: 75 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <CardMedia
              component="img"
              sx={{
                width: { xs: 20, md: 50 },
                display: { xs: "none", md: "flex" },
                // display: isMediumScreen ? "flex" : "none",
                mr: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              image={logo}
              alt="Logo"
              src="/"
            />
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              // display: isMediumScreen ? "flex" : "none",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              id="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchors.find((x) => x.id === "menu-appbar")}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted={false}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchors.some((x) => x.id === "menu-appbar"))}
              onClose={() => handleCloseNavMenu()}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {user &&
                pages.map((page) => (
                  <MenuItem
                    key={page.text}
                    onClick={() => handleCloseNavMenu(page.routeId)}
                  >
                    <Typography variant="body2" textAlign="center">{page.text}</Typography>
                  </MenuItem>
                ))}
              {user && (
                <MenuItem onClick={() => dispatch(signOut())}>
                  <Typography variant="body2" textAlign="center">Logout</Typography>
                </MenuItem>
              )}
              {!user && (
                <Box>
                  <MenuItem onClick={() => router.navigate("/loginform")}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>

                  <MenuItem onClick={() => router.navigate("/registerform")}>
                    <Typography textAlign="center">Register</Typography>
                  </MenuItem>

                  <MenuItem onClick={() => router.navigate("/loginform")}>
                    {accountStatus === pending ? (
                      <CircularProgress />
                    ) : (
                      <FacebookLogin
                        appId="775048717388894"
                        style={{
                          backgroundColor: "#4267b2",
                          color: "#fff",
                          fontSize: "10px",
                          padding: "2px 2px",
                          border: "none",
                          borderRadius: "1px",
                        }}
                        onSuccess={(response: any) => {
                          console.log("Login Success", response);
                          fbLoginHandler(response.accessToken);
                        }}
                        onFail={(response: any) => {
                          console.log("Login Failed", response);
                        }}
                      />
                    )}
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </Box>
          <Link to="/">
            <CardMedia
              component="img"
              sx={{
                width: { xs: 20, md: 50 },
                display: { xs: "flex", md: "none" },
                mr: 1,
              }}
              image={logo}
              alt="Activities"
            />
          </Link>
          {user && (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {pages.map((page) => (
                <ListItem
                  disablePadding={true}
                  component={NavLink}
                  to={page.routeId}
                  key={page.text}
                  // sx={navStyles}
                >
                  {page.text}
                </ListItem>
              ))}
              <CommonButton
                text="Create Activity"
                onClickHandler={() => router.navigate("/createactivity")}
              />
            </Box>
          )}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {user && (
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ display: { xs: "flex" }, mr: 1}}
                >
                  Hi {user.username.toUpperCase()}
                </Typography>

                <Tooltip title="Profile">
                  <IconButton
                    sx={{ p: 0 }}
                    size="large"
                    aria-label="account of current user"
                    aria-controls="profile-menubar"
                    id="profile-menubar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <Avatar alt="Profile" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="profile-menubar"
                  anchorEl={anchors.find((x) => x.id === "profile-menubar")}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  // keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(
                    anchors.some((x) => x.id === "profile-menubar")
                  )}
                  onClose={() => handleCloseNavMenu()}
                >
                  <MenuItem
                    onClick={() =>
                      handleCloseNavMenu(`/userprofile/${user.username}`)
                    }
                  >
                    <Typography variant="body2" textAlign="center">My Profile</Typography>
                  </MenuItem>
                  {/* {profile.map((pr) => (
                    <MenuItem
                      key={pr.text}
                      onClick={() => handleCloseNavMenu(pr.routeId)}
                    >
                      <Typography textAlign="center">{pr.text}</Typography>
                    </MenuItem>
                  ))} */}
                  <MenuItem onClick={() => dispatch(signOut())}>
                    <Typography variant="body2" textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
            {!user && (
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <CommonButton
                  text="Login"
                  onClickHandler={() => router.navigate("/loginform")}
                />
                <CommonButton
                  text="Register"
                  onClickHandler={() => router.navigate("/registerform")}
                />
                {accountStatus === pending ? (
                  <CircularProgress />
                ) : (
                  <FacebookLogin
                    appId="775048717388894"
                    style={{
                      backgroundColor: "#4267b2",
                      color: "#fff",
                      fontSize: "16px",
                      padding: "12px 24px",
                      border: "none",
                      borderRadius: "4px",
                    }}
                    onSuccess={(response: any) => {
                      console.log("Login Success", response);
                      fbLoginHandler(response.accessToken);
                    }}
                    onFail={(response: any) => {
                      console.log("Login Failed", response);
                    }}
                  />
                )}
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
