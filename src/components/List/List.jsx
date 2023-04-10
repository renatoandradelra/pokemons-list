import { useMemo } from 'react';
import './List.css';

function List({ items = []}) {

	const itemsMap = useMemo(() => {
		return items.map((pokemon)=> {

			const sprite = pokemon.sprites.other['official-artwork'].front_default;

			return (
				<div key={pokemon.name} className='list-item'>
					<div className='list-item-image-wrapper'>
						<img src={sprite} alt={pokemon.name} className='list-item-image'/>
					</div>
					<p>{pokemon.name}</p>
				</div>
			);
		});
	}, [items]);

	return (
		<div className='list-wrapper'>
			{itemsMap}
		</div>
	);
}

export default List;
