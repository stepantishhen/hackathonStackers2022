import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import MainLayout from '../layouts/MainLayout';
import { useLocation } from 'react-router-dom';
import { apiInstance } from '../api/api';
import axios from 'axios';

export const Scanner = (props) => {
	const [message, setMessage] = useState('Ожидает сканирования');
	let timeout: null | NodeJS.Timeout = null;

	return (
		// userid
		// eventid
		// post /events/scan

		<MainLayout>
			<div className="max-w-[500px]">
				<QrReader
					onResult={async (result, error) => {
						if (!result || timeout) return;

						try {
							const {
								data: { data },
							} = await apiInstance.post('/events/scan', JSON.parse(result.getText()));

							setMessage(`${data.firstName} ${data.surname} - успешно отсканирован`);
						} catch (error) {
							if (axios.isAxiosError(error) && error.response?.status === 409) {
								setMessage(`Пользователь уже отсканирован`);
							} else {
								setMessage('Ошибка при сканировании');
							}
						} finally {
							if (timeout) clearTimeout(timeout);

							timeout = setTimeout(() => {
								setMessage('Ожидает сканирования');
								timeout = null;
							}, 3000);
						}

						// if (!!error) {
						// 	console.info(error);
						// }
					}}
					style={{ width: '100%' }}
				/>
			</div>
			{message}
		</MainLayout>
	);
};
