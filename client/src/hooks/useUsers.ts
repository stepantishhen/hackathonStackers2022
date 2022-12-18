import React from 'react';
import axios from 'axios';
import useSWR from 'swr';

export default function useUser() {
	const address = `https://api`;
	const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);
	const { data, error } = useSWR(address, fetcher);
	return {};
}
