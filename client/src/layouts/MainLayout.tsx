import React, { PropsWithChildren } from 'react';
import Header from '../components/Header';

const MainLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className=" max-w-[1920px] min-h-screen">
			<Header />
			<div className="px-2">{children}</div>
		</div>
	);
};

export default MainLayout;
