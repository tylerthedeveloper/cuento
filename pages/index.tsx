import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useStore } from '../context/store';
import { GlobalDict } from './api/openai/constants';
import { SpeechType } from './api/openai/types';
import CardInputContainer from './components/CardInputContainer';

export default function Home() {
	const router = useRouter();
	const { store, setStore } = useStore();
	const navigate = (speechType: SpeechType) => {
		setStore((prevStore) => ({
			...prevStore,
			currentStep: 'input',
			inputData: {
				...store.inputData,
				speechType,
			},
		}));
		router.push('/main');
	};

	return (
		<div className='flex flex-col justify-center items-center h-screen'>
			<h1 className='text-3xl font-bold mb-4'>SpeechCraft</h1>
			<p className='text-lg mb-8'>
				Get feedback on your <span className='font-bold'>presentation </span>
				and
				<span className='font-bold'> debate skills!</span>.
			</p>
			<div className='flex flex-row justify-evenly flex-wrap gap-12'>
					{Object.keys(GlobalDict).map((key) => {
						if (GlobalDict[key as SpeechType]) {
							const { description, photoUrl } = GlobalDict[key as SpeechType]!;
							return (
								<CardInputContainer key={key} onPress={() => navigate(key as SpeechType)}>
									<CardBody className='overflow-visible py-2'>
										<Image
											alt='Card background'
  											className='object-cover rounded-xl h-40 w-60'
											src={photoUrl}
										/>
									</CardBody>
									<CardHeader className='pb-0 pt-2 px-4 flex-col h-full min-h-32'>
										<h4 className='font-bold text-large'>{key}</h4>
										<p className=''>{description}</p>
									</CardHeader>
								</CardInputContainer>
							);
						}
					})}
			</div>
		</div>
	);
}
