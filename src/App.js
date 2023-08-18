import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage, { loader as homePageLoader } from './layout/HomePage';
import Error from './components/Error';
import DetailPage, { loader as detailPageLoader} from './layout/DetailPage';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />} errorElement={<Error />}>
    <Route index element={<HomePage />} loader={homePageLoader} />
    <Route path="/:country" element={<DetailPage />} loader={detailPageLoader} />
  </Route>
));

function scrollToTop() {
  window.scrollTo(0, 0);
}

router.subscribe((toState, fromState) => {
  if(fromState) {
    scrollToTop();
  }
});

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
