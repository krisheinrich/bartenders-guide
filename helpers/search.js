import Router from 'next/router';

export const goToSearchResults = query => Router.push(`/search?q=${query}`);
