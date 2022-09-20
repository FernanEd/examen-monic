import * as React from 'react';
import Game from './Game';
import anime from 'animejs';
import Quiz from './Quiz';

interface AppProps {}

const App: React.FC<AppProps> = () => {
	const [currentQuestion, setCurrentQuestion] = React.useState(1);
	const [screen, setScreen] = React.useState(0);

	const [correctAnswers, setCorrectAnswers] = React.useState(0);

	const nextQuestion = () => setCurrentQuestion((prev) => prev + 1);
	const markAsCorrect = () => setCorrectAnswers((prev) => prev + 1);

	const startTest = () => {
		setCurrentQuestion(1);
		setScreen(1);
	};

	const startQuiz = () => {
		setCorrectAnswers(0);
		setScreen(3);
	};

	const showTestResults = () => {
		setScreen(2);
	};

	const showQuizResults = () => {
		setScreen(4);
	};

	React.useEffect(() => {
		anime({
			targets: ['#app'],
			opacity: [0, 1],
			duration: 300,
			easing: 'easeInOutExpo',
		});
	}, [screen]);

	return (
		<div
			id="app"
			className="min-w-screen min-h-screen flex justify-center lg:pt-20 pt-12 p-4">
			{screen == 0 ? (
				<div className="flex flex-col gap-4">
					<h1 className="text-3xl">PLANEACIÓN Y DISEÑO DE INSTALACIONES</h1>
					<p>Cuestionario Unidad 1</p>
					<button className="btn btn-primary" onClick={() => startTest()}>
						Comenzar prueba
					</button>
					<button className="btn btn-accent" onClick={() => startQuiz()}>
						Comenzar examen
					</button>

					<img
						src="https://i.pinimg.com/originals/5f/6f/0c/5f6f0cc5877d1076d3eccdc4b0d5964d.gif"
						alt=""
					/>
				</div>
			) : screen == 1 ? (
				<Game
					currentQuestion={currentQuestion}
					nextQuestion={nextQuestion}
					numberOfLifes={5}
					showTestResults={showTestResults}
					gameOver={() => setScreen(2)}
				/>
			) : screen == 2 ? (
				<div className="flex flex-col gap-4">
					<h1 className="text-3xl">FIN DE LA PRUEBA</h1>

					{currentQuestion >= 40 ? (
						<p className="text-success font-bold text-lg">
							Completaste todas las preguntas!
						</p>
					) : (
						<p>Llegaste a la pregunta {currentQuestion - 1}</p>
					)}

					<div className="mt-8 flex flex-col gap-2 text-center">
						<button className="btn btn-secondary" onClick={() => startTest()}>
							Reintentar
						</button>
						<button className="btn" onClick={() => setScreen(0)}>
							Volver a inicio
						</button>
					</div>
				</div>
			) : screen == 3 ? (
				<Quiz showQuizResults={showQuizResults} markAsCorrect={markAsCorrect} />
			) : screen == 4 ? (
				<div className="flex flex-col gap-4">
					<h1 className="text-3xl">RESULTADOS</h1>

					<div className="flex flex-col gap-2 items-center text-center">
						<p>Aciertos</p>
						<div
							className="radial-progress text-primary bg-gray-200"
							style={{
								//@ts-ignore
								'--value': Math.round((correctAnswers / 40) * 100),
							}}>
							{correctAnswers}/40
						</div>
					</div>

					<div className="mt-4 flex flex-col gap-2 items-center text-center">
						<p>Puntaje</p>
						<p className="text-2xl font-bold">{(correctAnswers / 40) * 100}</p>
					</div>

					<div className="mt-4 flex flex-col gap-2 items-center text-center">
						<p>Estado</p>
						{(correctAnswers / 40) * 100 < 70 ? (
							<p className="text-xl font-bold text-error">Reprobado</p>
						) : (
							<p className="text-xl font-bold text-success">Aprobado</p>
						)}
					</div>

					<div className="mt-8 flex flex-col gap-2 text-center">
						<button className="btn btn-secondary" onClick={() => startQuiz()}>
							Reintentar
						</button>
						<button className="btn" onClick={() => setScreen(0)}>
							Volver a inicio
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default App;
