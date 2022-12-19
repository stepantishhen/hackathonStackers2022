import {
	Avatar,
	Box,
	Button,
	Container,
	CssBaseline,
	Grid,
	Link,
	TextField,
	ThemeProvider,
	Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiInstance } from '../api/api';
import Event from '../components/Event';
import EventCreateForm from '../components/EventCreateForm';
import { getUser, setUser } from '../features/userSlice';
import MainLayout from '../layouts/MainLayout';
import { RootState } from '../store';
import theme from '../theme';

const Profile = () => {
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const { age, id, firstName, surname, patronymic, type } = user;
	const [events, setEvents] = useState([]);

	const TYPES: any = {
		visitor: 'Пользователь',
		admin: 'Администратор',
	};

	useEffect(() => {
		dispatch(getUser());
		apiInstance.get(`/events/user`).then((res) => {
			setEvents(res.data.data);
		});
		console.log(type);
	}, []);

	console.log(events);
	const navigate = useNavigate();
	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const date = data.get('date');

		await apiInstance.post('/events', {
			name: data.get('name'),
			description: data.get('description'),
			date: dayjs(date),
			place: data.get('place'),
			tags: ['AI', 'ML', 'DL'],
		});

		console.log(data.get('name'), data.get('description'), data.get('date'), data.get('place'));

		navigate('/');
	};

	return (
		<MainLayout>
			<div className="mx-auto max-w-5xl py-6 w-full flex flex-col">
				<div className="text-5xl font-extrabold mb-4">
					{firstName} {surname} {patronymic}
				</div>
				<div className="profileGridElement">{age}</div>
				{type === 'admin' && <div className="profileGridElement">Создать мероприятие</div>}
				<div className="flex flex-col gap-4">
					<h2 className="text-4xl font-bold">Мои ивенты</h2>
					<div className="flex flex-col gap-4">
						{events.map((event) => (
							<div key={event.id}>
								<Event {...event.Event} attended={event.attended} />
							</div>
						))}
					</div>
					<EventCreateForm handleSubmit={handleSubmit} />
				</div>
			</div>
		</MainLayout>
	);
};

export default Profile;
