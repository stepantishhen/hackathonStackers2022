import React, { useEffect, useState } from 'react';
import { apiInstance } from '../api/api';
import Event from '../components/Event';
import MainLayout from '../layouts/MainLayout';

const Home = () => {
	const [events, setEvents] = useState([]);
	useEffect(() => {
		apiInstance.get('/events').then((res) => {
			console.log(res.data.data);
			setEvents(res.data.data);
		});
	}, []);
	return (
		<MainLayout>
			<div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-4 flex-wrap">
				{events && events.map((event) => <Event key={event.id} {...event} />)}
			</div>
		</MainLayout>
	);
};

export default Home;
