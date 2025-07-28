interface IAddressDetail {
    city: string;
    country: string;
    country_code: string;
    county: string;
    name: string;
    postcode: string;
    state: string;
    suburb: string;
}

export interface ILocationIQAddress {
    address: IAddressDetail;
    boundingbox: [string, string, string, string];
    class: string;
    display_address: string;
    display_name: string;
    display_place: string;
    lat: string;
    licence: string;
    lon: string;
    osm_id: string;
    osm_type: string;
    place_id: string;
    type: string;
}
