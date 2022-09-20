import * as React from 'react';
import qB from './utils/questionBank';
import anime from 'animejs';

interface QuizProps {
	markAsCorrect: () => void;
	showQuizResults: () => void;
}

const Quiz: React.FC<QuizProps> = ({ markAsCorrect, showQuizResults }) => {
	const [currentQuestion, setCurrentQuestion] = React.useState(1);
	const [showAnswer, setShowAnswer] = React.useState(false);
	const { question, options, answer } = qB[currentQuestion];
	const [mounted, setMounted] = React.useState(true);

	const nextQuestion = () => setCurrentQuestion((prev) => prev + 1);

	const checkAnswer = (response: number, selectedButton: EventTarget) => {
		setShowAnswer(true);
		let tl = anime.timeline({
			complete: () => {
				if (response == answer) {
					markAsCorrect();
				}

				if (currentQuestion < 40) {
					nextQuestion();
				} else {
					showQuizResults();
				}

				setShowAnswer(false);
			},
		});

		tl.add({
			duration: 200,
		});
	};

	React.useEffect(() => {
		anime({
			targets: ['#Quiz'],
			opacity: [0, 1],
			duration: 300,
			easing: 'easeInOutExpo',
		});
	}, [currentQuestion]);

	return (
		<div id="Quiz" className="w-full max-w-lg  flex flex-col gap-8 opacity-0">
			<div className="flex justify-between items-center">
				<span className="font-bold text-xl">Pregunta {currentQuestion}</span>

				<button
					className="btn btn-secondary btn-sm self-end"
					onClick={() => showQuizResults()}>
					Finalizar Examen
				</button>
			</div>

			<progress
				className="progress progress-primary"
				value={currentQuestion}
				max="40"></progress>

			<p className="text-lg">{question}</p>

			<div className="flex flex-col gap-4">
				{options.map((option, i) => (
					<button
						className="btn"
						onClick={(e) => {
							if (!showAnswer) {
								checkAnswer(i + 1, e.currentTarget);
							}
						}}>
						{option}
					</button>
				))}
			</div>
		</div>
	);
};

export default Quiz;
