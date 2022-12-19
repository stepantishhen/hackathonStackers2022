import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiInstance } from '../api/api';
import { getUser, setUser } from '../features/userSlice';
import MainLayout from '../layouts/MainLayout';
import { RootState } from '../store';

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
		// console.log(localStorage.getItem('accessToken'));
		apiInstance.get(`/events?userId=${id}`).then((res) => {
			setEvents(res.data.data);
		});
	}, []);

	return (
		<MainLayout>
			<div className="mx-auto max-w-6xl py-6 w-full grid grid-cols-profileLayout grid-rows-profileLayout">
				<div className="profileGridElement">{firstName}</div>
				<div className="profileGridElement">{surname}</div>
				<div className="profileGridElement">{patronymic}</div>
				<div className="profileGridElement">{age}</div>
				<div className="profileGridElement">{TYPES[type]}</div>
				{type === 'admin' && <div className="profileGridElement">Создать мероприятие</div>}
				<div>
					{events.map((event) => (
						<div className="profileGridElement">{event.name}</div>
					))}
				</div>
			</div>
		</MainLayout>
	);
};

export default Profile;
