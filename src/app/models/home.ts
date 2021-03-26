export interface Home {
    id?: any;
    houseNumber?: number;
    houseAddress?: string;
    members?: Member[];
}

export interface Member {
    name: string,
    gender: string,
    age: number
}

export interface HomeResolved {
    home: Home;
    error?: any;
}

export interface HomesResolved {
    homes: Home[];
    error?: any;
}