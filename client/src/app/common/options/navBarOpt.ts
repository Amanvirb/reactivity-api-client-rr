export interface NavBarRoute {
  text: string;
  routeId: string;
}

export const pages: NavBarRoute[] = [
  { text: "About us", routeId: "/aboutus" },
  { text: "Activities", routeId: "/activities" },
  // { text: "Errors", routeId: "/" },
  { text: "Blog", routeId: "/blog" },
  // { text: "Form", routeId: "/form" },
];

// const currrentUser = localStorage.getItem("currentuser");

export const profile: NavBarRoute[] = [
  // { text: "Profile", routeId: `/userprofile/${currrentUser}` },
  // { text: "Account", routeId: "/" },
  // { text: "Dashboard", routeId: "/" },
];
