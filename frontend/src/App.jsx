import React from 'react'
import { RouterProvider } from 'react-router'
import AppRoutes from './AppRoutes.jsx'
import './style.scss'
import './features/shared/global.scss'
import AuthProvider from './features/auth/auth.context'
import router from './app.routes.jsx'
import { PostContextProvider } from './features/post/post.context.jsx'

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider >
        {/* <AppRoutes /> */}
        <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App
