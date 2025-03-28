// ฟังก์ชันสำหรับตรวจสอบการป้องกันเส้นทาง
export const checkRouteProtection = () => {
  // ตรวจสอบว่าอยู่ในฝั่ง client หรือไม่
  if (typeof window === "undefined") return { allowed: false, redirectTo: "/" }

  const userID = localStorage.getItem("userID")
  const quizStarted = localStorage.getItem("quizStarted") === "true"
  const quizCompleted = localStorage.getItem("quizCompleted") === "true"
  const surveyCompleted = localStorage.getItem("surveyCompleted") === "true"

  // ถ้าไม่มี userID ให้กลับไปหน้าแรก
  if (!userID) {
    return { allowed: false, redirectTo: "/" }
  }

  // ตรวจสอบลำดับการทำงาน
  const pathname = window.location.pathname

  if (pathname === "/quiz") {
    // ตรวจสอบว่าผู้ใช้เคยทำแบบทดสอบเสร็จแล้วหรือไม่
    if (quizCompleted && surveyCompleted) {
      return { allowed: false, redirectTo: "/result" }
    }
    return { allowed: true }
  }

  if (pathname === "/survey") {
    // ต้องทำแบบทดสอบเสร็จก่อนจึงจะเข้าหน้าแบบสอบถามได้
    if (!quizCompleted) {
      return { allowed: false, redirectTo: "/quiz" }
    }
    return { allowed: true }
  }

  if (pathname === "/result") {
    // ต้องทำแบบสอบถามเสร็จก่อนจึงจะเข้าหน้าผลลัพธ์ได้
    if (!surveyCompleted) {
      return { allowed: false, redirectTo: "/survey" }
    }
    return { allowed: true }
  }

  if (pathname === "/thankpage") {
    // ต้องทำแบบทดสอบและแบบสอบถามเสร็จก่อนจึงจะเข้าหน้าขอบคุณได้
    if (!quizCompleted || !surveyCompleted) {
      return { allowed: false, redirectTo: "/" }
    }
    return { allowed: true }
  }

  return { allowed: true }
}

// ฟังก์ชันสำหรับตรวจสอบว่าผู้ใช้เคยทำแบบทดสอบแล้วหรือไม่
export const checkQuizAttempt = async (userId) => {
  try {
    const response = await fetch(`/api/quiz-attempts?user_id=${userId}`)
    const data = await response.json()

    return {
      hasCompleted: data.has_completed,
      lastAttempt: data.last_attempt,
      incompleteAttempt: data.incomplete_attempt,
    }
  } catch (error) {
    console.error("Error checking quiz attempt:", error)
    return { hasCompleted: false }
  }
}

