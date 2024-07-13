import Footer from './_component/Footer';
import Header from './_component/Header';
import Heros from './_component/Heros';

export default function MarketingPage() {
	return (
		<div className='min-h-full flex flex-col dark:bg-[#1f1f1f]'>
			<div className='flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10 selection:bg-black selection:text-white selection:dark:bg-white selection:dark:text-black'>
				<Header />
				<Heros />
				<Footer />
			</div>
		</div>
	);
}
