"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	useRef,
} from "react";

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
	const [userID, setUserIDState] = useState(null);
	const [formData, setFormDataState] = useState(null);
	const [userJourney, setUserJourneyState] = useState({
		quizStarted: false,
		quizCompleted: false,
		surveyCompleted: false,
	});
	const isInitialized = useRef(false);

	// โหลดข้อมูลจาก localStorage เมื่อ component ถูก mount
	useEffect(() => {
		if (isInitialized.current) return;

		try {
			const storedUserID = localStorage.getItem("userID");
			const storedFormData = localStorage.getItem("formData");
			const storedQuizStarted = localStorage.getItem("quizStarted");
			const storedQuizCompleted = localStorage.getItem("quizCompleted");
			const storedSurveyCompleted = localStorage.getItem("surveyCompleted");

			if (storedUserID) setUserIDState(storedUserID);
			if (storedFormData) setFormDataState(JSON.parse(storedFormData));

			setUserJourneyState({
				quizStarted: storedQuizStarted === "true",
				quizCompleted: storedQuizCompleted === "true",
				surveyCompleted: storedSurveyCompleted === "true",
			});

			isInitialized.current = true;
		} catch (error) {
			console.error("Error loading data from localStorage:", error);
		}
	}, []);

	// ฟังก์ชันเซ็ตค่าและบันทึกลง localStorage
	const setUserID = (id) => {
		setUserIDState(id);
		localStorage.setItem("userID", id);
	};

	const setFormData = (data) => {
		setFormDataState(data);
		localStorage.setItem("formData", JSON.stringify(data));
	};

	const setQuizStarted = (started) => {
		setUserJourneyState((prev) => ({ ...prev, quizStarted: started }));
		localStorage.setItem("quizStarted", started.toString());
	};

	const setQuizCompleted = (completed) => {
		setUserJourneyState((prev) => ({ ...prev, quizCompleted: completed }));
		localStorage.setItem("quizCompleted", completed.toString());
	};

	const setSurveyCompleted = (completed) => {
		setUserJourneyState((prev) => ({ ...prev, surveyCompleted: completed }));
		localStorage.setItem("surveyCompleted", completed.toString());
	};

	const clearUserData = useCallback(() => {
		setUserJourneyState({
			quizStarted: false,
			quizCompleted: false,
			surveyCompleted: false,
		});
		setUserIDState(null);
		setFormDataState(null);

		localStorage.removeItem("userID");
		localStorage.removeItem("formData");
		localStorage.removeItem("quizStarted");
		localStorage.removeItem("quizCompleted");
		localStorage.removeItem("surveyCompleted");
	}, []);

	return (
		<UserContext.Provider
			value={{
				userID,
				setUserID,
				formData,
				setFormData,
				userJourney,
				setQuizStarted,
				setQuizCompleted,
				setSurveyCompleted,
				clearUserData,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
