import { Component, createRef } from 'react';
import mapboxgl, { Map, Marker } from 'mapbox-gl';

import { fetchAllBank } from '@/api/banks';
import { FeatureWithCurrencies } from '@/Map/interfaces';

import * as styles from './styles.module.scss';

interface IState {
	lon: number;
	lat: number;
	zoom: number;
	features: FeatureWithCurrencies[];
}

type IProps = {
	inputValue: string;
};
export default class MapComponent extends Component<IProps, IState> {
	private mapContainer = createRef<HTMLDivElement>();

	private map: Map | undefined;

	private markers: Marker[] = [];

	override componentDidMount(): void {
		const success = (position: GeolocationPosition): void => {
			this.map = new mapboxgl.Map({
				container: this.mapContainer.current as HTMLElement,
				style: 'mapbox://styles/mapbox/streets-v12',
				center: [position.coords.longitude, position.coords.latitude],
				zoom: 12,
				accessToken:
					'pk.eyJ1IjoieWF1aGVuaWZyb250IiwiYSI6ImNseDA0bHd6cDBibTcybHNlanpiejF3ZnAifQ.SmsNWNEpcHVYW15ddYz5Vw',
			});
			new mapboxgl.Marker({ color: 'black' })
				.setLngLat([position.coords.longitude, position.coords.latitude])
				.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('I am'))
				.addTo(this.map as Map);
			const getBanks = async () => {
				const featureWithCurrencies: FeatureWithCurrencies[] =
					await fetchAllBank(
						position.coords.longitude.toString(),
						position.coords.latitude.toString()
					);
				this.setState((prevState) => ({
					...prevState,
					features: featureWithCurrencies,
				}));
			};
			getBanks();
		};
		const getLocation = (): void => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(success);
			}
		};
		getLocation();
	}

	override componentDidUpdate(): void {
		const { features } = this.state;
		const { inputValue } = this.props;
		this.markers.map((marker) => marker.remove());
		this.markers = [];
		features
			.filter((feature) =>
				inputValue === '' ? true : feature.currencies.includes(inputValue)
			)
			.map((feature) => {
				const marker = new mapboxgl.Marker()
					.setLngLat(feature.geometry.coordinates)
					.setPopup(
						new mapboxgl.Popup({ offset: 25 }).setHTML(
							`${feature.properties.name}`
						)
					)
					.addTo(this.map as Map);
				this.markers.push(marker);

				return marker;
			});
	}

	override componentWillUnmount(): void {
		this.map?.remove();
	}

	override render() {
		return <div ref={this.mapContainer} className={styles.mapContainer} />;
	}
}
