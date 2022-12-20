import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { apiInstance } from '../api/api';
import '../index.css';
import Button from './Button';

export interface EventProps {
	id: number;
	name: string;
	description: string;
	place: string;
	date: string;
	updatedAt?: string;
	tags?: string[];
	visitors?: [];
	withButton?: boolean;
	attended?: boolean;
}

const Event = ({
	id,
	name,
	description,
	place,
	date,
	visitors,
	withButton,
	attended,
}: EventProps) => {
	const tags = ['DevOps', 'WEB', 'Data-Science'];
	const [isSubscribed, setIsSubscribed] = useState(!!visitors?.length);
	const dispatch = useDispatch();

	const handleSubscribe = async () => {
		if (isSubscribed) {
			await apiInstance.post('/events/unsubscribe', {
				eventId: id,
			});
			setIsSubscribed(false);
		} else {
			await apiInstance.post('/events/subscribe', {
				eventId: id,
			});
			setIsSubscribed(true);
		}
	};

	return (
		<div
			className="p-4 rounded-md bg-primaryContrast  text-primary grid grid-cols-eventLayout grid-rows-eventLayout gap-4
        max-w-5xl max-md:event-mobile">
			<h3
				className="border uppercase text-2xl text-primary font-black tracking-wider grid place-content-center
            max-md:border-none py-2 px-2 max-w-xs max-md:max-w-full">
				{name}
			</h3>
			<div className="w-full text-md rounded-md bg-primary overflow-hidden grid ">
				<div className="">
					<div className=" font-montserrat p-4 text-primaryContrast ">
						{tags && (
							<div className="flex gap-2 ">
								{tags.map((tag) => (
									<span
										key={tag}
										className="flex items-center justify-center text-sm text-primary bg-primaryContrast font-bold font-inter rounded-2xl px-4 py-1 mb-2">
										{tag}
									</span>
								))}
							</div>
						)}
						<p className="font-medium overflow-hidden line-clamp-4">{description}</p>
					</div>
				</div>
			</div>

			<div className="text-sm py-2 font-bold max-md:flex flex-wrap gap-x-8">
				<p>Место: {place}</p>
				<div>
					<div>{dayjs(date).format('Начало DD.MM.YYYY в hh:mm')}</div>
				</div>
			</div>
			{withButton ? (
				<Button
					className="uppercase font-montserrat font-black text-lg tracking-wide"
					handleClick={handleSubscribe}
					isActive={isSubscribed}
					placeholder={isSubscribed ? 'Участвую' : 'Участвовать'}
				/>
			) : (
				<div className="text-white font-xl">
					Посетил(а):{attended ? <span>Да</span> : <span>Нет</span>}
				</div>
			)}
		</div>
	);
};

export default Event;
