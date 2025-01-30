"use client";
import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { FormSchema } from "@/lib/formSchema";

interface UserContextType {
	userID: string | null;
	setUserID: (id: string) => void;
	formData: FormSchema | null;
	setFormData: (data: FormSchema) => void;
	clearUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [userID, setUserIDState] = useState<string | null>(null);
	const [formData, setFormDataState] = useState<FormSchema | null>(null);

	// โหลดข้อมูลจาก localStorage เมื่อ component ถูก mount
	useEffect(() => {
		const storedUserID = localStorage.getItem("userID");
		const storedFormData = localStorage.getItem("formData");

		if (storedUserID) setUserIDState(storedUserID);
		if (storedFormData) setFormDataState(JSON.parse(storedFormData));
	}, []);

	// ฟังก์ชันเซ็ตค่าและบันทึกลง localStorage
	const setUserID = (id: string) => {
		setUserIDState(id);
		localStorage.setItem("userID", id);
	};

	const setFormData = (data: FormSchema) => {
		setFormDataState(data);
		localStorage.setItem("formData", JSON.stringify(data));
	};

	const clearUserData = () => {
		setUserIDState(null);
		setFormDataState(null);
		localStorage.removeItem("userID");
		localStorage.removeItem("formData");
	};

	return (
		<UserContext.Provider
			value={{ userID, setUserID, formData, setFormData, clearUserData }}
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
