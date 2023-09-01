import AuthGuard from "./AuthGuard";
import { GAME_TOKEN, S3_BUCKET } from "../utils/Constants";
import ProtectedRoute from "./ProtectedRoute";
import AccessCollectibles from "../components/pages/AccessCollectibles/AccessCollectibles";
import Header from "../components/common/Header/Header";
import HomeVideo from "../components/pages/HomeVideo/HomeVideo";
import AboutUs from "../components/pages/AboutUs/AboutUs";
import Yoga from "../components/pages/Yoga/Yoga";
import Dhyana from "../components/pages/Dhyana/Dhyana";
import ProtectedLogin from "./Protectedlogin";
import Login from "../components/pages/Login/Login";
import SelectAsset from "../components/pages/SelectAsset/SelectAsset";
import ViewAsset from "../components/pages/ViewAsset/ViewAsset";
import SharePage from "../components/pages/SharePage/SharePage";
import Homepage from "../components/pages/Homepage/Homepage";
import Checkout from "../components/pages/Checkout/Checkout";
import ContinueGame from "../components/pages/ContinueGame/ContinueGame";
import Participation from "../components/pages/Participation/Participation";
import QuesPage from "../components/pages/QuesPage/QuesPage";
import Mycollectible from "../components/pages/Mycollectible/Mycollectible";
import Games from "../components/pages/Games/Games";
import ContactUs from "../components/pages/ContactUs/ContactUs";
import QuestionRight from "../components/pages/QuestionRight/QuestionRight";


const routes = [
  {
    path: `login`,
    element: (
      <Login />
    ),
  },
  {
    path: "question",
    element: (
      <ProtectedRoute>
        {/* <Header /> */}
        <QuesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "games",
    element: <Games />,
  },
  {
    path: "continue",
    element: <ContinueGame />,
  },
  {
    path: "participation",
    element: <Participation />,
  },
  {
    path: "home",
    element: <Homepage />,
  },
  {
    path: "my-collectibles",
    element: (
      <ProtectedRoute>
        <Header logo={S3_BUCKET.OLD_LOGO} />
        <Mycollectible />
      </ProtectedRoute>
    ),
  },
  {
    path: "view-asset",
    element: (
      <ProtectedRoute>
        <Header />
        <ViewAsset />
      </ProtectedRoute>
    ),
  },
  {
    path: "select-asset",
    element: (
      <ProtectedRoute>
        <Header />
        <SelectAsset />
      </ProtectedRoute>
    ),
  },
  {
    path: "product",
    element: <AccessCollectibles />,
  },
  {
    index: true,
    element: (

      <HomeVideo />

    ),
  },
  {
    path: "about-us",
    element: <AboutUs />,
  },
  {
    path: "navigator",
    element: <Homepage />,
  },
  {
    path: "collectibles",
    element: <AccessCollectibles />,
  },
  {
    path: "share",
    element: (
      <ProtectedRoute>
        {/* <Header /> */}
        <SharePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "checkout",
    element: (
      <ProtectedRoute>
        <Header />
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    path: "yoga",
    element: <Yoga />,
  },
  {
    path: "dhyana",
    element: <Dhyana />,
  },
  {
    path: "contact",
    element: <ContactUs />
  },{
    path: "question-right",
    element: <QuestionRight/>,
  }
];


export default routes;
