import { useCallback, useMemo } from 'react';
import './List.css';
import Heart from '../Heart/Heart';
import { Link } from 'react-router-dom';

function List({ items = [], favorites = [], onItemFavorite}) {

	const handleOnHeartClick = useCallback ((value) => {
		onItemFavorite && onItemFavorite(value);

	}, [onItemFavorite]);

	const itemsMap = useMemo(() => {
		return items.map((pokemon)=> {
			const isFAvorite = favorites.includes(pokemon.name);

			const sprite = pokemon.sprite;

			return (
				<div key={pokemon.name} className='list-item'>
					<div className='list-item-heart-adapter'>
						<Heart
							selected={isFAvorite}
							onClick={() => handleOnHeartClick(pokemon)}/>
					</div>
					<div className='list-item-image-wrapper'>
						<img src={sprite} alt={pokemon.name} className='list-item-image'/>
					</div>
					<Link to={`/details/${pokemon.name}`}>{pokemon.name}</Link>
				</div>
			);
		});
	}, [items, handleOnHeartClick, favorites]);

	return (
		<div className='list-wrapper'>
			{itemsMap}
		</div>
	);
}

export default List;
