export const RoutePath = Object.freeze({
	Home: '/',
	Profile: '/profile',
	Login: '/login',
	Register: '/register',
	Discover: '/discover',
	DiscoverComics: '/discover/comics',
	DiscoverComicIssues: '/discover/comic-issues',
	DiscoverCreators: '/discover/creators',
	Library: '/library',
	Comic: (comicSlug: string) => `/comic/${comicSlug}`,
	ComicIssue: (comicIssueId: string | number) => `/comic-issue/${comicIssueId}`,
	Creator: (creatorSlug: string) => `/creator/${creatorSlug}`,
})
