import { useState, useEffect } from "react";
import "./App.scss";

function App() {
	const [time, setTime] = useState(0);
	const [runtime, setRuntime] = useState(false);

	useEffect(() => {
		let interval;

		if (runtime) {
			interval = setInterval(() => {
				setTime((prevTime) => prevTime + 10);
			}, 10);
		} else if (!runtime) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [runtime]);

	const handleClick = (bool) => {
		setRuntime(bool);
	};

	const resetTimeHandler = () => setTime(0);

	const formatTime = (time) => {
		const hour = String(Math.floor((time / 600000) % 60)).padStart(2, "0");
		const minutes = String(Math.floor((time / 60000) % 60)).padStart(2, "0");
		const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
		const milliseconds = String(Math.floor((time / 10) % 100)).padStart(2, "0");
		return `${hour}:${minutes}:${seconds}:${milliseconds}`;
	};

	return (
		<div className="stop-watch-container">
			<h1 className="stop-watch-header">Stop Watch</h1>
			<div className="timer">{formatTime(time)}</div>
			<div className="button-container">
				{runtime ? (
					<button onClick={() => handleClick(false)}>Stop</button>
				) : (
					<button onClick={() => handleClick(true)}>Start</button>
				)}

				<button onClick={resetTimeHandler}>Reset</button>
			</div>
		</div>
	);
}

export default App;
