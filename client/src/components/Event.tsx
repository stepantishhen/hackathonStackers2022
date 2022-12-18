import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { apiInstance } from '../api/api';
import '../index.css';
import Button from './Button';

interface EventProps {
	id: number;
	name: string;
	description: string;
	place: string;
	date: string;
	updatedAt?: string;
	tags?: string[];
	visitors?: [];
}

const Event = ({ id, name, description, place, date, visitors }: EventProps) => {
	const tags = ['tag1', 'tag2', 'tag3'];
	const [isSubscribed, setIsSubscribed] = useState(!!visitors?.length);
	console.log('visitors', visitors);

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
            max-md:border-none p-2 max-w-xs">
				{name} Lorem ipsum dolor Lorem ipsum dolor sit amet.
			</h3>
			<div className="text-md rounded-md bg-primary overflow-hidden grid ">
				<div className="">
					<div className=" font-montserrat p-4 pb-2 text-primaryContrast">
						{tags && (
							<div className="flex gap-2">
								{tags.map((tag) => (
									<span
										key={tag}
										className="text-sm text-primary bg-primaryContrast font-bold font-inter rounded-2xl px-4 py-1 mb-2">
										{tag}
									</span>
								))}
							</div>
						)}
						<p className=" font-medium line-clamp-5">
							{description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
							adipisci laborum harum consequuntur reiciendis officiis, unde totam voluptatem
							veritatis odit.
						</p>
					</div>
				</div>
			</div>

			<div className="text-sm py-2 font-bold max-md:flex flex-wrap gap-x-8">
				<p>Место: {place}</p>
				<div>
					<div>{dayjs(date).format('Начало DD.MM.YYYY в hh:mm')}</div>
				</div>
			</div>
			<Button
				className="uppercase font-montserrat font-black text-lg tracking-wide"
				handleClick={handleSubscribe}
				isActive={isSubscribed}
				placeholder={isSubscribed ? 'Участвую' : 'Участвовать'}
			/>
		</div>
	);
};

export default Event;
