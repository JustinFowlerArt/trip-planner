import { useCallback, useEffect, useState } from 'react';

export const useFetch = <T,E>(
	url: string,
	{
		immediate,
	}: {
		immediate: boolean;
	}
) => {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<E | null>(null);
    const [loading, setLoading] = useState(false)

	const getData = useCallback(async () => {
		setError(null);
        setLoading(true)
		try {
			const response = await fetch(url);
			if (response.ok) {
				const json = await response.json();
				setData(json);
			} else {
				const json = await response.json();
				throw json;
			}
		} catch (error) {
			setError(error as E);
		} finally {
            setLoading(false)
        }
	}, [url]);

	useEffect(() => {
		if (immediate) {
			getData();
		}
	}, [getData, immediate]);

	return { data, error, loading, getData };
};
