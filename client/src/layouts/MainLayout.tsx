import React, { PropsWithChildren } from 'react';
import Header from '../components/Header';

const MainLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className=" max-w-[1920px] min-h-screen">
			<Header />
			{children}
		</div>
	);
};

export default MainLayout;
