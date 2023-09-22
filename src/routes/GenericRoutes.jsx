import SideBarLayout from "../layouts/SideBarLayout";
import ArtistDetailPage from "../pages/ArtistDetailPage";
import ArtistsPage from "../pages/ArtistsPage";
import UserDetailPage from "../pages/UserDetailPage";
import UsersPage from "../pages/UsersPage";

const GenericRoutes = [
  {
    path: "/",
    element: <SideBarLayout />,
    children: [
      {
        index: true,
        element: <ArtistsPage></ArtistsPage>,
      },
      {
        path: "/artists/:id",
        element: <ArtistDetailPage></ArtistDetailPage>,
      },
      {
        path: "/users",
        element: <UsersPage></UsersPage>,
      },
      {
        path: "/users/:id",
        element: <UserDetailPage></UserDetailPage>,
      },
    ],
  },
];

export default GenericRoutes;
