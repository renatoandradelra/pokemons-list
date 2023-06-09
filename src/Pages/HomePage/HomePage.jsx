import { useEffect } from 'react';
import { useCallback } from 'react';
import List from '../../components/List/List';
import { useDispatch, useSelector } from 'react-redux';
import { favoritesActions } from '../../store/favorites';
import { pokemonsActions } from '../../store/pokemons';

function HomePage() {
	const dispatch = useDispatch();
	const pokemons = useSelector(({ pokemons }) => pokemons);
	const favorites = useSelector(({ favorites }) => favorites);

	const getTargets = useCallback (async (url) => {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	}, []);

	const getDetails = useCallback(async (targets) => {
		const promises = targets.map((target) => {
			return fetch(target.url)
				.then((response) => response.json())
				.then((data) => {
					const { name, sprites } = data;
					const sprite = sprites.other['official-artwork'].front_default;
					return { name, sprite };
				});
		});
		return await Promise.all(promises);
	}, []);

	const getPokemons = useCallback(async() => {
		try {
			const { results, next } = await getTargets('https://pokeapi.co/api/v2/pokemon?limit=30');
			const details = await getDetails(results);

			dispatch(pokemonsActions.init({
				nextPage: next,
				list: details
			}));
		} catch(error) {
			console.error(error);
		}
	}, [dispatch, getDetails, getTargets]);

	useEffect (() => {
		// Get local data
		const localData = localStorage.getItem('pokemons-list');
		if (localData) {
			const parsedData = JSON.parse(localData);
			const { favorites, pokemons } = parsedData;
			dispatch(favoritesActions.init(favorites));
			dispatch(pokemonsActions.init(pokemons));
			return;
		}
		getPokemons();
	}, [dispatch, getPokemons]);

	const loadMore = useCallback( async() => {
		try {
			const { results, next} = await getTargets(pokemons.nextPage);
			const details = await getDetails(results);
			dispatch(pokemonsActions.set({
				nextPage: next,
				list: [ ...pokemons.list, ...details ]
			}));
		} catch(error) {
			console.error(error);
		}

	}, [dispatch, pokemons, getDetails, getTargets]);

	const handleItemFavorite = useCallback ((value) => {
		const targetName = value.name;
		if (favorites.includes(targetName)) {
			//remove
			dispatch(favoritesActions.remove(targetName));
		} else {
			//add
			dispatch(favoritesActions.add(targetName));
		}
	},[dispatch, favorites]);

	useEffect(() => {
	});

	return (
		<div>
			<p>App</p>
			<List
				items={pokemons.list}
				favorites={favorites}
				onItemFavorite={handleItemFavorite}/>
			<button onClick={loadMore}>Carregar mais</button>
		</div>
	);
}

export default HomePage;
