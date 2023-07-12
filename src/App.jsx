import React, { useEffect } from 'react';
import { AuthProvider } from './hooks/auth-context';
import { DataProvider } from './hooks/data-context';
import RequireAuth from './Login/RequireAuth';

export default function App () {

return   <DataProvider>
            <AuthProvider>
                  <RequireAuth />
            </AuthProvider>
         </DataProvider>

}
