export interface NavBarRoute {
  text: string;
  routeId: string;
}

export const pages: NavBarRoute[] = [
  { text: "Files", routeId: "/files" },
  { text: "Activities", routeId: "/activities" },
  { text: "Blog", routeId: "/blog" },
];

