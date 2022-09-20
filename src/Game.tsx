import * as React from 'react';
import qB from './utils/questionBank';
import anime from 'animejs';

interface GameProps {
	currentQuestion: number;
	nextQuestion: () => void;
	showTestResults: () => void;
	numberOfLifes: number;
	gameOver: () => void;
}

const Game: React.FC<GameProps> = ({
	currentQuestion,
	nextQuestion,
	numberOfLifes,
	showTestResults,
	gameOver,
}) => {
	const [lives, setLives] = React.useState(numberOfLifes);

	const [showAnswer, setShowAnswer] = React.useState(false);
	//@ts-ignore
	const { question, options, answer } = qB[currentQuestion];
	const [mounted, setMounted] = React.useState(true);

	const decreaseLives = () => setLives((prev) => prev - 1);

	const checkAnswer = (response: number, selectedButton: EventTarget) => {
		setShowAnswer(true);

		let tl = anime.timeline({
			easing: 'easeOutExpo',
			complete: () => {
				if (currentQuestion < 40) {
					nextQuestion();
				} else {
					showTestResults();
				}
				setShowAnswer(false);
			},
		});

		tl.add(
			{
				targets: [selectedButton],
				backgroundColor: '#c02',
				duration: 300,
				complete: () => {
					if (response != answer) {
						decreaseLives();
					}
				},
			},
			0
		);

		tl.add(
			{
				targets: ['.option-correct'],
				backgroundColor: '#0b6',
				duration: 300,
			},
			0
		);

		tl.add({
			duration: 500,
		});
	};

	React.useEffect(() => {
		if (lives == 0) {
			gameOver();
		}

		setMounted(false);

		anime({
			targets: ['#game'],
			opacity: [0, 1],
			duration: 300,
			easing: 'easeInOutExpo',
			begin: () => setMounted(true),
		});
	}, [currentQuestion]);

	return (
		<div id="game" className="w-full max-w-lg  flex flex-col gap-8 opacity-0">
			<div className="flex justify-between items-center">
				<span className="font-bold text-xl">Pregunta {currentQuestion}</span>

				<div className="self-end">
					{[...Array(numberOfLifes)].map((l, i) => (
						<span className="text-4xl lives">
							{i >= lives ? <>🖤</> : <>❤</>}
						</span>
					))}
				</div>
			</div>

			<p className="text-lg">{question}</p>

			{mounted && (
				<div className="flex flex-col gap-4">
					{options.map((option: string, i: number) => (
						<button
							className={`btn option ${
								i + 1 == answer ? 'option-correct' : null
							}`}
							onClick={(e) => {
								if (!showAnswer) {
									checkAnswer(i + 1, e.currentTarget);
								}
							}}>
							{option}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default Game;
