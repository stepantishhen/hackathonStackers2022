import dayjs from 'dayjs';
import { apiInstance } from '../api/api';
import '../index.css';

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

const Event = ({ id, name, description, place, date, tags }: EventProps) => {
	const handleSubscribe = async () => {
		await apiInstance.post('/events/subscribe', {
			eventId: id,
		});
		//events/unsubscribe
	};

	return (
		<div
			className="p-4 bg-secondary rounded-lg text-primary grid grid-cols-eventLayout grid-rows-eventLayout gap-4
        max-w-5xl ">
			<h3 className="uppercase text-3xl text-primary font-black tracking-wider grid place-content-center">
				{name}
			</h3>
			<div className="text-md rounded-md bg-primary overflow-hidden grid place-content-center">
				<div className="">
					{tags && tags.map((tag) => <span className="text-sm">{tag}</span>)}
					<div className="  font-montserrat p-4 pb-2 text-contrast">
						<p className=" font-medium line-clamp-3">{description}</p>
						<div className="text-sm py-2 text-end font-bold ">
							<div>{dayjs(date).format('Начало DD.MM.YYYY в hh:mm')}</div>
						</div>
					</div>
				</div>
			</div>
			<p className="text-md">Где: {place}</p>
			<button onClick={handleSubscribe} className="btn">
				Участвую!
			</button>
		</div>
	);
};

export default Event;
