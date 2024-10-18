import { RouterProvider } from 'react-router-dom';

// project import
import router from './routes/index';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { AuthProvider } from 'context/authContext';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ScrollTop>
    </ThemeCustomization>
  );
}
