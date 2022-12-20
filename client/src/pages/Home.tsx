import { useEffect, useState } from 'react';
import { apiInstance } from '../api/api';
import Event, { EventProps } from '../components/Event';
import MainLayout from '../layouts/MainLayout';

const Home = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		apiInstance.get('/events').then((res) => {
			setEvents(res.data.data);
		});
	}, []);

	return (
		<MainLayout>
			<h1 className="text-center text-4xl font-black uppercase py-4">Мероприятия</h1>
			<div className="max-w-4xl mx-auto pb-6 flex flex-col gap-4 flex-wrap">
				{events &&
					events.map((event: EventProps) => <Event key={event.id} withButton={true} {...event} />)}
			</div>
		</MainLayout>
	);
};

export default Home;
