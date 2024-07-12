import NavBar from './_component/NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='h-full dark:bg-[#1f1f1f]'>
			<NavBar />
			<main className='h-full pt-40'>{children}</main>
		</div>
	);
}
