import React from 'react';
import QueryProvider from './QueryProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return <QueryProvider>{children}</QueryProvider>;
};

export default Providers;
